import { Category, Gallery, Project, Tech } from "@prisma/client";
import { Session } from "next-auth";

export type ProjectEssentials = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'categoryId'>

export type UserSession = Session | null

export type ProjectShort = Pick<Project, 'title' | 'description' | 'company' | 'companyUrl' | 'client' | 'clientUrl' | 'repository' | 'websiteUrl'> & {
  gallery: Gallery[]
}

export interface IProjectWithTechStack extends Project {
  techStack: Tech[]
}

export interface ICategoryWithProjects extends Category {
  projects: IProjectWithTechStack[]
}