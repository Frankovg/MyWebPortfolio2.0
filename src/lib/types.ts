import { Project } from "@prisma/client";

export type ProjectEssentials = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'categoryId'>