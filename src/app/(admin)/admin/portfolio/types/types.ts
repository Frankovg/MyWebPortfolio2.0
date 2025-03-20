import { Category, Project } from "@prisma/client";

export interface ICategoryWithProjectsAdmin extends Category {
  projects: Project[];
}
