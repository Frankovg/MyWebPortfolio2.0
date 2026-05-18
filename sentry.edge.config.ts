// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://ca0769c1f09fb00af4651ba0fae8c0b9@o4510900555612160.ingest.de.sentry.io/4510900572389456",
  enabled: process.env.NODE_ENV === "production",

  tracesSampleRate: 0,
  enableLogs: false,

  sendDefaultPii: true,
});
