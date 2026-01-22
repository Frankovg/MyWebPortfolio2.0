"use client";

import { useEffect, useRef } from "react";

import { useDownloadsStore } from "@/stores/use-downloads-store";

import type { Download } from "@/generated/prisma/client";

type DownloadsInitializerProps = {
  downloads: Download[];
  children: React.ReactNode;
};

export function DownloadsInitializer({
  downloads,
  children,
}: DownloadsInitializerProps) {
  const isFirstRender = useRef(true);
  const setDownloads = useDownloadsStore((state) => state.setDownloads);

  // Sync on first render (before paint) to avoid hydration mismatch
  if (isFirstRender.current) {
    setDownloads(downloads);
    isFirstRender.current = false;
  }

  // Sync when downloads prop changes (after navigation/revalidation)
  useEffect(() => {
    setDownloads(downloads);
  }, [downloads, setDownloads]);

  return <>{children}</>;
}
