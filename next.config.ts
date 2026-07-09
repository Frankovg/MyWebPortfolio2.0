import path from "path";

import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  staticPageGenerationTimeout: 120,
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
    qualities: [40, 50, 60, 90],
  },
  async headers() {
    return [
      {
        // Icon sprites are fetched once per client and cached; keep them out of
        // per-request egress. Filenames are stable, so revalidate in background.
        source: "/:sprite(techs-sprite|about-sprite).svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/app/home",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/app/about-me",
        destination: "/about-me",
        permanent: true,
      },
      {
        source: "/app/contact",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/app/project",
        destination: "/project",
        permanent: true,
      },
      {
        source: "/app/project/:slug",
        destination: "/project/:slug",
        permanent: true,
      },
      {
        source: "/app/privacy-policy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/app/cookies-policy",
        destination: "/cookies-policy",
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "fran-amoroso",
  project: "mywebportfolio-2",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
