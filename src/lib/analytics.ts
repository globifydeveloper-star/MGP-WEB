declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    /** "AW-xxx/label" — set by components/analytics/GoogleAds.tsx */
    __gadsConversion?: string;
  }
}

/**
 * Standard GA4 / GTM event names configured for Muthoot GoldPoint
 */
export type GAEventName =
  | 'page_view'
  | 'form_submission___lp'
  | 'contact_us_form'
  | 'location_based_pages_leads'
  | 'home_write_us_form'
  | (string & {});

/**
 * Trigger an event to both GTM (dataLayer) and direct GA4 (gtag)
 */
export function trackEvent(eventName: GAEventName, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // 1. Send to GTM dataLayer (triggers GTM tags like GA4, Meta Pixel, Google Ads)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });

  // 2. Also send directly to GA4 gtag if direct GA4 is configured
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

const trackedLeads = new Set<string>();

/**
 * Call once when a lead is saved (OTP verified + leadRef returned).
 * - Google Ads: fires the conversion set by GOOGLE_ADS_ID / GOOGLE_ADS_CONVERSION_LABEL.
 * - Meta Pixel: fires the standard "Lead" event if the pixel is installed.
 * - GTM / GA4: pushes a "generate_lead" event with the form name.
 * The same leadRef is only counted once, even if the success handler re-runs.
 */
export function trackLeadConversion(formName: string, leadRef?: string) {
  if (typeof window === 'undefined') return;
  if (leadRef) {
    if (trackedLeads.has(leadRef)) return;
    trackedLeads.add(leadRef);
  }

  trackEvent('generate_lead', { form_name: formName });

  if (typeof window.gtag === 'function' && window.__gadsConversion) {
    window.gtag('event', 'conversion', {
      send_to: window.__gadsConversion,
      ...(leadRef ? { transaction_id: leadRef } : {}),
    });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: formName }, leadRef ? { eventID: leadRef } : undefined);
  }
}
