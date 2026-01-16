import "server-only";

import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";
import prisma from "./db";
import { CACHE_TAGS } from "./server-utils-public";

export async function checkAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export const getCategoriesAdmin = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "desc",
      },
      include: {
        projects: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return categories;
  },
  ["categories-admin"],
  { revalidate: 3600, tags: [CACHE_TAGS.categories] }
);

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return category;
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: {
      value: slug,
    },
  });
  return category;
}

export const getDownloadsContent = unstable_cache(
  async () => {
    const downloads = await prisma.download.findMany({
      orderBy: { createdAt: "desc" },
    });
    return downloads;
  },
  ["downloads"],
  { revalidate: 3600, tags: [CACHE_TAGS.downloads] }
);

export async function getDownloadFileById(id: string) {
  const download = await prisma.download.findUnique({
    where: {
      id,
    },
  });
  return download;
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      gallery: true,
      roles: true,
      techStack: true,
    },
  });
  return project;
}

export async function getUsersAdmin() {
  const users = await prisma.user.findMany();
  return users;
}
