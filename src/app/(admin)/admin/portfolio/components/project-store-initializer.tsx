"use client";

import { useEffect, useRef } from "react";

import { ICategoryWithProjectsAdmin } from "@/lib/types";
import { useProjectStore } from "@/stores/use-project-store";

type ProjectStoreInitializerProps = {
  data: ICategoryWithProjectsAdmin[];
};

export function ProjectStoreInitializer({ data }: ProjectStoreInitializerProps) {
  const isFirstRender = useRef(true);
  const setCategories = useProjectStore((state) => state.setCategories);

  // Sync on first render (before paint) to avoid hydration mismatch
  if (isFirstRender.current) {
    setCategories(data);
    isFirstRender.current = false;
  }

  // Sync when data prop changes (after navigation/revalidation)
  useEffect(() => {
    setCategories(data);
  }, [data, setCategories]);

  return null;
}
