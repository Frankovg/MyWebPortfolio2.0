
import { getProjectImages } from "./getProjectImages";
import { getRoles } from "./getRoles";
import { getTechStack } from "./getTechStack";

import type { IProjectFull } from "@/lib/types";
import type { TProjectForm } from "@/lib/validations";

export const getDefaultProjectFormValues = (project?: IProjectFull): TProjectForm => ({
  title: project?.title ?? "",
  image: project?.image ?? "",
  slug: project?.slug ?? "",
  date: project?.date ?? new Date(),
  published: project?.published ?? false,
  shortDescription: project?.shortDescription ?? "",
  description: project?.description ?? "",
  gallery: getProjectImages(project) ?? [
    {
      imageUrl: "",
      alt: "",
      description: null,
    },
  ],
  techStack: getTechStack(project) ?? [{ value: "" }],
  roles: getRoles(project) ?? [
    {
      label: "",
      value: "",
      percentage: 50,
    },
  ],
  websiteUrl: project?.websiteUrl ?? null,
  company: project?.company ?? null,
  companyUrl: project?.companyUrl ?? null,
  client: project?.client ?? null,
  clientUrl: project?.clientUrl ?? null,
  repository: project?.repository ?? null,
  videoUrl: project?.videoUrl ?? null,
  videoTitle: project?.videoTitle ?? null,
  videoDescription: project?.videoDescription ?? null,
});
