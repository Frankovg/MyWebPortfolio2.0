import "server-only";

import prisma from "./db";

import type { Project, user as User } from "@/generated/prisma/client";


export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'desc'
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
}

export async function getCategoriesForChart() {
  const categories = await prisma.category.findMany({
    include: {
      projects: true,
    },
  });
  return categories;
}

export async function getProjectBySlug(slug: Project["slug"]) {
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
}

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
