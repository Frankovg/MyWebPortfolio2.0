import 'server-only'

//DB
import { Project, User } from '@prisma/client'

import prisma from './db'

export async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      projects: {
        where: {
          published: true
        },
        include: {
          techStack: true,
        }
      },
    }
  })
  return categories
}

// export async function getProjects() {
//   const projects = await prisma.project.findMany({
//     include: {
//       category: true,
//       gallery: true,
//       techStack: true,
//     }
//   })
//   return projects
// }

export async function getFirstSoftwareProject() {
  const project = await prisma.project.findFirst({
    where: {
      category: {
        value: 'web-development'
      },
      published: true
    }
  })
  return project
}

// export async function getProjectById(projectId: Project['id']) {
//   const project = await prisma.project.findUnique({
//     where: {
//       id: projectId
//     },
//     include: {
//       category: true,
//       gallery: true,
//       techStack: true,
//     }
//   })
//   return project
// }

export async function getProjectBySlug(slug: Project['slug']) {
  const project = await prisma.project.findUnique({
    where: {
      slug: slug,
      published: true
    },
    include: {
      category: true,
      gallery: true,
      techStack: true,
      roles: true,
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

export async function getUserById(id: User['id']) {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
  })
  return user
}

export async function getUsers() {
  const users = await prisma.user.findMany()
  return users
}