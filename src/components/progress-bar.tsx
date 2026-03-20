"use client";

import dynamic from "next/dynamic";

const NextNProgress = dynamic(() => import("nextjs-toploader"), { ssr: false });

export function ProgressBar() {
  return (
    <NextNProgress
      color="#e453bc"
      initialPosition={0.2}
      crawlSpeed={300}
      showSpinner={false}
      height={4}
    />
  );
}
