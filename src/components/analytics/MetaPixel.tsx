import Script from 'next/script';
import MetaPixelPageView from './MetaPixelPageView';

interface MetaPixelProps {
  nonce?: string;
}

// Pixel ID comes from env (see .env.example), read at request time like GTM_ID,
// so the deployed container picks it up without a rebuild. Nothing loads if it's unset.

/**
 * Meta Pixel base code, on every page (production only, so local testing never
 * sends fake events). PageView fires on load and on every client-side navigation.
 * The "Lead" event is fired by trackLeadConversion() in src/lib/analytics.ts when a
 * lead is saved, because the forms show an inline thank-you instead of a thank-you page.
 */
export default function MetaPixel({ nonce }: MetaPixelProps) {
  if (process.env.NODE_ENV !== 'production') return null;

  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
  if (!/^\d{10,20}$/.test(pixelId)) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
      <MetaPixelPageView />
    </>
  );
}
