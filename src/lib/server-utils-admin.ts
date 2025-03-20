import "server-only";

import prisma from "./db";

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
