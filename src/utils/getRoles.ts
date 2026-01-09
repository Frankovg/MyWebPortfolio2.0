import { IProjectFull } from "@/lib/types";

export const getRoles = (project?: IProjectFull) => {
  if (!project) return null;
  return project.roles.map((role) => ({
    label: role.label,
    value: role.value,
    percentage: role.percentage,
  }));
};
