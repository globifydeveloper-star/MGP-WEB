import Script from 'next/script';

interface GoogleAdsProps {
  nonce?: string;
}

// IDs come from env (see .env.example), read at request time like GTM_ID, so the
// deployed container picks them up without a rebuild. Nothing loads if they're unset.
const ID_PATTERN = /^AW-\d+$/;
const LABEL_PATTERN = /^[A-Za-z0-9_-]+$/;

/**
 * Google Ads global site tag. Loaded on every page (production only, so local
 * testing never records fake conversions). The conversion itself is fired by
 * trackLeadConversion() in src/lib/analytics.ts when a lead is saved, since the
 * forms show an inline thank-you instead of navigating to a thank-you page.
 */
export default function GoogleAds({ nonce }: GoogleAdsProps) {
  if (process.env.NODE_ENV !== 'production') return null;

  const adsId = process.env.GOOGLE_ADS_ID || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';
  const label = process.env.GOOGLE_ADS_CONVERSION_LABEL || process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || '';
  if (!ID_PATTERN.test(adsId) || !LABEL_PATTERN.test(label)) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        nonce={nonce}
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
      />
      <Script
        id="google-ads"
        strategy="afterInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){dataLayer.push(arguments);};
            gtag('js', new Date());
            gtag('config', '${adsId}');
            window.__gadsConversion = '${adsId}/${label}';
          `,
        }}
      />
    </>
  );
}
