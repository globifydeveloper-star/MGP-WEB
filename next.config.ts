import type { NextConfig } from "next";

export default function nextConfig(): NextConfig {
  const isDev = process.env.NODE_ENV === "development";

  // Optional: only needed if Strapi ever returns media on its own host. Production media
  // comes back as absolute S3 URLs, so the build must not depend on the CMS host.
  const publicStrapiUrl = process.env.STRAPI_PUBLIC_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const strapiUrl = publicStrapiUrl && /^https?:\/\//.test(publicStrapiUrl) ? new URL(publicStrapiUrl) : null;

  const isLocalStrapi = !!strapiUrl && ["localhost", "127.0.0.1", "::1"].includes(strapiUrl.hostname);

  return {
    reactStrictMode: true,
    compress: true,
    poweredByHeader: false,
    output: "standalone",
    async rewrites() {
      // Dev only: serve local-provider uploads (/uploads/...) through the Next origin.
      // Production has no /strapi rewrite, so the public site can never proxy to Strapi.
      if (!isDev) return [];
      const strapiInternalUrl = (process.env.STRAPI_INTERNAL_URL || "http://localhost:1337").replace(/\/+$/, "");
      return [{ source: "/strapi/uploads/:path*", destination: `${strapiInternalUrl}/uploads/:path*` }];
    },
    async redirects() {
      return [
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
        {
          source: '/index.php',
          destination: '/',
          permanent: true,
        },
        {
          source: '/index.html',
          destination: '/',
          permanent: true,
        },
        {
          source: '/faqs',
          destination: '/faq',
          permanent: true,
        },
        {
          source: '/faq.php',
          destination: '/faq',
          permanent: true,
        },
        {
          source: '/faq.html',
          destination: '/faq',
          permanent: true,
        },
        {
          source: '/about-us.php',
          destination: '/about-us',
          permanent: true,
        },
        {
          source: '/about-us.html',
          destination: '/about-us',
          permanent: true,
        },
        {
          source: '/contact-us.php',
          destination: '/contact-us',
          permanent: true,
        },
        {
          source: '/contact-us.html',
          destination: '/contact-us',
          permanent: true,
        },
        {
          source: '/sell-gold',
          destination: '/sell-gold-for-cash',
          permanent: true,
        },
        {
          source: '/sell-gold.php',
          destination: '/sell-gold-for-cash',
          permanent: true,
        },
        {
          source: '/sell-gold.html',
          destination: '/sell-gold-for-cash',
          permanent: true,
        },
        {
          source: '/branches',
          destination: '/#branches',
          permanent: true,
        },
        {
          source: '/branch-locator',
          destination: '/#branches',
          permanent: true,
        },
      ];
    },
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
            {
              key: "Strict-Transport-Security",
              value: "max-age=31536000; includeSubDomains",
            },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=(self)",
            }
          ],
        },
      ];
    },
    images: {
      formats: ["image/avif", "image/webp"],
      qualities: [75, 90],
      remotePatterns: [
        ...(strapiUrl
          ? [
              {
                protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
                hostname: strapiUrl.hostname,
                port: strapiUrl.port,
                pathname: "/**",
              },
            ]
          : []),
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "*.amazonaws.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "*.r2.dev",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "pub-*.r2.dev",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "*.r2.cloudflarestorage.com",
          pathname: "/**",
        },
      ],
      // Strapi runs on localhost in dev; Next 16 blocks image URLs that resolve
      // to a private/loopback IP unless explicitly opted in.
      dangerouslyAllowLocalIP: isLocalStrapi,
    },
  };
}
