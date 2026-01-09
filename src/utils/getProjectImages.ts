import { IProjectFull } from "@/lib/types";

export const getProjectImages = (project?: IProjectFull) => {
  if (!project) return null;
  return project.gallery.map((image) => ({
    alt: image.alt,
    description: image.description ?? null,
    imageUrl: image.imageUrl,
  }));
};
