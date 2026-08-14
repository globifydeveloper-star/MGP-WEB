import type { NextConfig } from "next";

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337");

const isLocalStrapi = ["localhost", "127.0.0.1", "::1"].includes(strapiUrl.hostname);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://localhost:1337 http://127.0.0.1:1337 https://mgp-strapi.onrender.com",
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
    ],
    // Strapi runs on localhost in dev; Next 16 blocks image URLs that resolve
    // to a private/loopback IP unless explicitly opted in.
    dangerouslyAllowLocalIP: isLocalStrapi,
  },
};

export default nextConfig;
