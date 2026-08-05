import type { NextConfig } from "next";

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337");

const isLocalStrapi = ["localhost", "127.0.0.1", "::1"].includes(strapiUrl.hostname);

const nextConfig: NextConfig = {
  images: {
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
    ],
    // Strapi runs on localhost in dev; Next 16 blocks image URLs that resolve
    // to a private/loopback IP unless explicitly opted in.
    dangerouslyAllowLocalIP: isLocalStrapi,
  },
};

export default nextConfig;
