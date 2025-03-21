import "server-only";

import prisma from "./db";
import { auth } from "./auth";
import { redirect } from "next/navigation";

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
      projects: true,
    },
  });
  return categories;
}
