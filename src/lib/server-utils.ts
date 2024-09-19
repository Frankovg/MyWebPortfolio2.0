import { Project } from '@prisma/client'
import prisma from './db'

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