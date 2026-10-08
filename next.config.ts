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
    async headers() {
      const isDev = process.env.NODE_ENV !== "production";
      const csp = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data: https:;
        font-src 'self' data: https:;
        connect-src 'self' https:;
        frame-src 'self' https://maps.google.com https://www.google.com https://challenges.cloudflare.com;
        frame-ancestors 'self' ${publicStrapiUrl ?? ""};
      `.replace(/\s{2,}/g, ' ').trim();

      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Content-Security-Policy",
              value: csp,
            },
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
