import type { NextConfig } from "next";

const publicStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiUrl = new URL(
  publicStrapiUrl && /^https?:\/\//.test(publicStrapiUrl) ? publicStrapiUrl : "http://localhost:1337"
);

// Resolved at build time; the default matches the ECS Service Connect name for the backend.
const strapiInternalUrl = (process.env.STRAPI_INTERNAL_URL || "http://strapi:1337").replace(/\/+$/, "");

const isLocalStrapi = ["localhost", "127.0.0.1", "::1"].includes(strapiUrl.hostname);

const nextConfig: NextConfig = {
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

export default nextConfig;
