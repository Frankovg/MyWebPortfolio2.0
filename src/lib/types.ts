import { Project } from "@prisma/client";
import { Session } from "next-auth";

export type ProjectEssentials = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'categoryId'>

export type UserSession = Session | null