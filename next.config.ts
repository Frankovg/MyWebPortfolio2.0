import path from "path";

import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 120,
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: false,
    unoptimized: false,
    qualities: [40, 50, 60, 75, 100],
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
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "fran-amoroso",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
