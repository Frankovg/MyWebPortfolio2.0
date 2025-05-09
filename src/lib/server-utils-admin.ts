import "server-only";

import { redirect } from "next/navigation";

import { auth } from "./auth";
import prisma from "./db";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function getUsersAdmin() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getCategoriesAdmin() {
  const categories = await prisma.category.findMany({
    include: {
      projects: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: {
      value: slug,
    },
  });
  return category;
}

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return category;
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
