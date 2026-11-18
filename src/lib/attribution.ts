/**
 * Lead attribution (where did this visitor come from?).
 *
 * Captures UTM parameters and ad click IDs from the landing URL, stores them in
 * localStorage for 30 days (last non-direct touch wins), and exposes them so
 * every OTP lead form can send them with the enquiry.
 *
 * Ad links should carry UTMs, e.g.
 *   /sell-gold-for-cash?utm_source=facebook&utm_medium=paid_social&utm_campaign=sell_gold_nov
 *   /sell-gold-for-cash?utm_source=twitter&utm_medium=paid_social&utm_campaign=sell_gold_nov
 * Facebook (fbclid) and X/Twitter (twclid) click IDs are detected as a fallback.
 * Any other parameters on the ad link (the client's own tags) are kept in `customParams`.
 * They are recorded only together with a real traffic source (UTM, click ID or external
 * referrer), so internal links such as ?page=2 never overwrite the ad source.
 */

export interface LeadAttribution {
  channel: string; // facebook | instagram | twitter | google | <referrer host> | direct
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  clickIdType?: 'fbclid' | 'twclid' | 'gclid';
  clickId?: string;
  referrer?: string;
  landingPage?: string;
  /** Any other query parameters on the ad link (the client's own tags), e.g. { ref: 'diwali' } */
  customParams?: Record<string, string>;
  capturedAt: string;
}

const STORAGE_KEY = 'mgp_lead_attribution';
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_LEN = 200;
const MAX_CUSTOM_PARAMS = 15;
const CUSTOM_KEY_PATTERN = /^[A-Za-z0-9_.-]{1,50}$/;
const KNOWN_PARAMS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'twclid', 'gclid',
]);

function readCustomParams(params: URLSearchParams): Record<string, string> | undefined {
  const out: Record<string, string> = {};
  let count = 0;
  for (const [key, value] of params) {
    if (count >= MAX_CUSTOM_PARAMS) break;
    if (KNOWN_PARAMS.has(key.toLowerCase()) || !CUSTOM_KEY_PATTERN.test(key) || key in out) continue;
    const v = clip(value);
    if (!v) continue;
    out[key] = v;
    count++;
  }
  return count ? out : undefined;
}

const clip = (v: string | null | undefined): string | undefined => {
  const s = v?.trim();
  return s ? s.slice(0, MAX_LEN) : undefined;
};

const REFERRER_CHANNELS: Array<[RegExp, string]> = [
  [/(^|\.)(facebook\.com|fb\.com|fb\.me|m\.facebook\.com|l\.facebook\.com|lm\.facebook\.com)$/, 'facebook'],
  [/(^|\.)instagram\.com$/, 'instagram'],
  [/(^|\.)(twitter\.com|x\.com|t\.co)$/, 'twitter'],
  [/(^|\.)google\.[a-z.]+$/, 'google'],
  [/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube'],
  [/(^|\.)linkedin\.com$/, 'linkedin'],
  [/(^|\.)bing\.com$/, 'bing'],
];

const normaliseSource = (src: string): string => {
  const s = src.toLowerCase();
  if (s === 'fb' || s.includes('facebook') || s === 'meta') return 'facebook';
  if (s === 'ig' || s.includes('instagram')) return 'instagram';
  if (s === 'x' || s.includes('twitter')) return 'twitter';
  return s;
};

function fromCurrentUrl(): LeadAttribution | null {
  const params = new URLSearchParams(window.location.search);
  const utmSource = clip(params.get('utm_source'));
  const fbclid = clip(params.get('fbclid'));
  const twclid = clip(params.get('twclid'));
  const gclid = clip(params.get('gclid'));

  let referrer: string | undefined;
  let referrerHost: string | undefined;
  try {
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.host !== window.location.host) {
        referrer = clip(ref.origin + ref.pathname);
        referrerHost = ref.hostname.replace(/^www\./, '');
      }
    }
  } catch {
    /* ignore malformed referrer */
  }

  let channel: string | undefined;
  if (utmSource) channel = normaliseSource(utmSource);
  else if (fbclid) channel = 'facebook';
  else if (twclid) channel = 'twitter';
  else if (gclid) channel = 'google';
  else if (referrerHost) {
    channel = REFERRER_CHANNELS.find(([re]) => re.test(referrerHost!))?.[1] ?? referrerHost;
  }

  // Internal navigation / direct visit: nothing new to record.
  if (!channel) return null;

  const clickIdType = fbclid ? 'fbclid' : twclid ? 'twclid' : gclid ? 'gclid' : undefined;

  return {
    channel: channel.slice(0, MAX_LEN),
    utmSource,
    utmMedium: clip(params.get('utm_medium')),
    utmCampaign: clip(params.get('utm_campaign')),
    utmTerm: clip(params.get('utm_term')),
    utmContent: clip(params.get('utm_content')),
    clickIdType,
    clickId: fbclid || twclid || gclid,
    referrer,
    landingPage: clip(window.location.pathname),
    customParams: readCustomParams(params),
    capturedAt: new Date().toISOString(),
  };
}

/** Call once per page view (client only). Keeps the last non-direct touch. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    const fresh = fromCurrentUrl();
    if (fresh) localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch {
    /* storage blocked – attribution is best-effort */
  }
}

/** Attribution to attach to a lead. Falls back to "direct". */
export function getAttribution(): LeadAttribution | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as LeadAttribution;
      if (parsed?.channel && Date.now() - Date.parse(parsed.capturedAt) < TTL_MS) {
        return parsed;
      }
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    /* fall through */
  }
  // Storage may be unavailable, so re-read the current URL before giving up.
  return (
    fromCurrentUrl() ?? {
      channel: 'direct',
      landingPage: clip(window.location.pathname),
      capturedAt: new Date().toISOString(),
    }
  );
}
