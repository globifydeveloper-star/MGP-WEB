import Script from 'next/script';

interface GoogleTagManagerProps {
  gtmId?: string;
  nonce?: string;
}

export default function GoogleTagManager({ gtmId, nonce }: GoogleTagManagerProps) {
  // GTM_ID is read at request time (set it on the ECS task / container env).
  // NEXT_PUBLIC_GTM_ID is inlined at `next build`, and the Docker build never sees .env.local.
  const containerId = gtmId || process.env.GTM_ID || process.env.NEXT_PUBLIC_GTM_ID;

  if (!containerId) {
    return null;
  }

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${containerId}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
