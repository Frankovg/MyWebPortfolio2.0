import { Project, User } from '@prisma/client'
import prisma from './db'

export async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      projects: true
    }
  })
  return categories
}

export async function getProjects() {
  const projects = await prisma.project.findMany({
    include: {
      category: true,
      gallery: true,
    }
  })
  return projects
}

export async function getProjectById(projectId: Project['id']) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId
    },
    include: {
      category: true,
      gallery: true,
    }
  })
  return project
}

export async function getUserByEmail(email: User['email']) {
  const user = await prisma.user.findUnique({
    where: {
      email
    },
  })
  return user
}