import { IProjectFull } from "@/lib/types";

export const getTechStack = (project?: IProjectFull) => {
  if (!project) return null;
  return project.techStack.map((tech) => ({
    value: tech.value,
  }));
};
