import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  const isProductionBuild = phase === PHASE_PRODUCTION_BUILD;

  const publicStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!publicStrapiUrl && process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not set");
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
    output: "standalone",
    async rewrites() {
      return [{ source: "/strapi/:path*", destination: `${strapiInternalUrl}/:path*` }];
    },
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Content-Security-Policy",
              value: `frame-ancestors 'self' ${publicStrapiUrl ?? ""}`,
            },
            {
              key: "X-Frame-Options",
              value: "ALLOWALL",
            },
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
          pathname: "/uploads/**",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "*.r2.dev",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "mgpwebsiteuat.s3.amazonaws.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "mgpwebsiteuat.s3.*.amazonaws.com",
          pathname: "/**",
        },
      ],
      // Strapi runs on localhost in dev; Next 16 blocks image URLs that resolve
      // to a private/loopback IP unless explicitly opted in.
      dangerouslyAllowLocalIP: isLocalStrapi,
    },
  };
}
