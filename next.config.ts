/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 120,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/*",
      },
    ],
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: false,
    unoptimized: false,
  },
};

export default nextConfig;
