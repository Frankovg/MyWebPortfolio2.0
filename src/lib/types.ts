import {
  Category,
  Download,
  Gallery,
  Project,
  Role,
  Tech,
} from "@prisma/client";
import { Session } from "next-auth";

export type ProjectEssentials = Omit<
  Project,
  "id" | "createdAt" | "updatedAt" | "categoryId"
>;

export type DownloadEssentials = Omit<
  Download,
  "id" | "createdAt" | "updatedAt"
>;

export type UserSession = Session | null;

export type ProjectShort = Pick<
  Project,
  | "title"
  | "description"
  | "date"
  | "company"
  | "companyUrl"
  | "client"
  | "clientUrl"
  | "repository"
  | "websiteUrl"
> & {
  gallery: Gallery[];
};

export interface IProjectFull extends Project {
  gallery: Gallery[];
  techStack: Tech[];
  roles: Role[];
}

export interface IProjectWithTechStack extends Project {
  techStack: Tech[];
}

export interface ICategoryWithProjects extends Category {
  projects: IProjectWithTechStack[];
}
export interface ICategoryWithOneProject extends Category {
  firstProjectSlug: string;
}
export type PrevOrNextProject = ICategoryWithProjects["projects"][0];

export interface ICategoryWithProjectsAdmin extends Category {
  projects: Project[];
}

export type Action = "add" | "delete" | "edit";

type PayloadCreate = ProjectEssentials & { categoryId: string };
type PayloadEdit = ProjectEssentials & {
  projectId: string;
  categoryId: string;
};
type PayloadDelete = { projectId: string; categoryId: string };
export type Payload = PayloadCreate | PayloadEdit | PayloadDelete;
