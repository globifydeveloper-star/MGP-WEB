import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  const isProductionBuild = phase === PHASE_PRODUCTION_BUILD;

  const publicStrapiUrl = process.env.STRAPI_PUBLIC_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!publicStrapiUrl && process.env.NODE_ENV === "production") {
    throw new Error("STRAPI_PUBLIC_URL or NEXT_PUBLIC_STRAPI_URL is not set");
  }
  const strapiUrl = new URL(
    publicStrapiUrl && /^https?:\/\//.test(publicStrapiUrl) ? publicStrapiUrl : "http://localhost:1337"
  );

  if (!process.env.STRAPI_INTERNAL_URL && process.env.NODE_ENV === "production" && !isProductionBuild) {
    throw new Error("STRAPI_INTERNAL_URL is not set");
  }
  const strapiInternalUrl = (process.env.STRAPI_INTERNAL_URL || "http://localhost:1337").replace(/\/+$/, "");

  const isLocalStrapi = ["localhost", "127.0.0.1", "::1"].includes(strapiUrl.hostname);

  return {
    reactStrictMode: true,
    compress: true,
    poweredByHeader: false,
    output: "standalone",
    async rewrites() {
      return [{ source: "/strapi/:path*", destination: `${strapiInternalUrl}/:path*` }];
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
      remotePatterns: [
        {
          protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
          hostname: strapiUrl.hostname,
          port: strapiUrl.port,
          pathname: "/**",
        },
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
