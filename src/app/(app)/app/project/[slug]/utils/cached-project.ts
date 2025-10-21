import { notFound } from "next/navigation";
import { cache } from "react";

import { getProjectBySlug } from "@/lib/server-utils-public";

export const getCachedProject = (cache(async (slug: string) => {
  const project = await getProjectBySlug(slug)
  if (!project) notFound();
  return project
}))
