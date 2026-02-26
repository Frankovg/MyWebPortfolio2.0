import * as Sentry from "@sentry/nextjs";

export function handleError(error: unknown, context: string): void {
  Sentry.captureException(error);
  console.error(context, error);
}
