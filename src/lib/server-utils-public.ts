import "server-only";

import { unstable_cache } from "next/cache";

import prisma from "./db";

import type { Project, user as User } from "@/generated/prisma/client";

export const CACHE_TAGS = {
  categories: "categories",
  projects: "projects",
  downloads: "downloads",
} as const;

const CACHE_DURATION = {
  categories: 3600,
  projects: 3600,
  downloads: 3600,
} as const;

export const getCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "desc",
      },
      include: {
        projects: {
          where: {
            published: true,
          },
          include: {
            techStack: true,
          },
          orderBy: {
            date: "desc",
          },
        },
      },
    });
    return categories;
  },
  ["categories"],
  { revalidate: CACHE_DURATION.categories, tags: [CACHE_TAGS.categories] }
);

export const getCategoriesForChart = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      include: {
        projects: true,
      },
    });
    return categories;
  },
  ["categories-chart"],
  { revalidate: CACHE_DURATION.categories, tags: [CACHE_TAGS.categories] }
);


export const getProjectBySlug = (slug: Project["slug"]) =>
  unstable_cache(
    async () => {
      const project = await prisma.project.findUnique({
        where: {
          slug: slug,
          published: true,
        },
        include: {
          category: true,
          gallery: true,
          techStack: true,
          roles: true,
        },
      });

      return project;
    },
    [`project-by-slug-${slug}`],
    { revalidate: CACHE_DURATION.projects, tags: [CACHE_TAGS.projects] }
  )();

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function getUserById(id: User["id"]) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}
