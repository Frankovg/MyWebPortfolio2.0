/** @type {import('next').NextConfig} */

import { HOME_CACHE_CONFIG } from "@/lib/cache-config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 120,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${HOME_CACHE_CONFIG.STATIC_ASSETS_MAX_AGE}, immutable`,
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${HOME_CACHE_CONFIG.IMAGES_MAX_AGE}`,
          },
        ],
      },
    ];
  },
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
    minimumCacheTTL: HOME_CACHE_CONFIG.IMAGES_MAX_AGE,
    dangerouslyAllowSVG: false,
    unoptimized: false,
  },
};

export default nextConfig;
