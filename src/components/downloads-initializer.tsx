"use client";

import { useLayoutEffect, useRef } from "react";

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
  const isInitialized = useRef(false);
  const { setDownloads, reset } = useDownloadsStore();

  useLayoutEffect(() => {
    if (!isInitialized.current) {
      setDownloads(downloads);
      isInitialized.current = true;
    }

    return () => {
      reset();
      isInitialized.current = false;
    };
  }, [downloads, setDownloads, reset]);

  if (!isInitialized.current) {
    return null;
  }

  return <>{children}</>;
}
