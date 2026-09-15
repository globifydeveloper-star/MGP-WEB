import type { NextConfig } from "next";

const strapiUrlString = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
  console.warn("WARNING: NEXT_PUBLIC_STRAPI_URL is missing in environment variables. Falling back to http://localhost:1337.");
}

const strapiUrl = new URL(strapiUrlString);

const isLocalStrapi = ["localhost", "127.0.0.1", "::1"].includes(strapiUrl.hostname);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${process.env.NEXT_PUBLIC_STRAPI_URL}`,
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
