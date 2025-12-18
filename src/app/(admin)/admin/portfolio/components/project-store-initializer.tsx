"use client";

import { useEffect, useRef } from "react";

import { ICategoryWithProjectsAdmin } from "@/lib/types";
import { useProjectStore } from "@/stores/use-project-store";

type ProjectStoreInitializerProps = {
  data: ICategoryWithProjectsAdmin[];
};

export function ProjectStoreInitializer({ data }: ProjectStoreInitializerProps) {
  const initialized = useRef(false);
  const setCategories = useProjectStore((state) => state.setCategories);

  useEffect(() => {
    if (!initialized.current) {
      setCategories(data);
      initialized.current = true;
    }
  }, [data, setCategories]);

  useEffect(() => {
    if (initialized.current) {
      setCategories(data);
    }
  }, [data, setCategories]);

  return null;
}
