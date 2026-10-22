declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
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
