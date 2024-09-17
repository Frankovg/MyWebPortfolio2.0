// --- Project actions ---

import prisma from "@/lib/db"
import { getProjectById } from "@/lib/server-utils"
import { sleep } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export async function addProject(project: unknown) {
  if (process.env.NODE_ENV === 'development') {
    await sleep(1000)
  }

  // const session = await checkAuth()

  // const validatedProject = projectFormSchema.safeParse(project)
  // if (!validatedProject.success) {
  //   return {
  //     message: 'Invalid project data.'
  //   }
  // }

  // try {
  //   await prisma.project.create({
  //     data: {
  //       ...validatedProject.data,
  //       user: {
  //         connect: {
  //           id: session.user.id
  //         }
  //       }
  //     }
  //   })
  // } catch (error) {
  //   return {
  //     message: 'Could not add project.'
  //   }
  // }

  // revalidatePath('/app', 'layout')
}

export async function editProject(projectId: unknown, newProjectData: unknown) {
  if (process.env.NODE_ENV === 'development') {
    await sleep(1000)
  }

  // authentication check
  // const session = await checkAuth()

  // validation
  // const validatedProjectId = projectIdSchema.safeParse(projectId)
  // const validatedProject = projectFormSchema.safeParse(newProjectData)
  // if (!validatedProject.success || !validatedProjectId.success) {
  //   return {
  //     message: 'Invalid project data.'
  //   }
  // }

  // authorization check
  // const project = await getProjectById(validatedProjectId.data)
  // if (!project) {
  //   return {
  //     message: 'Project not found.'
  //   }
  // }

  // database mutation
  // try {
  //   await prisma.project.update({
  //     where: {
  //       id: validatedProjectId.data
  //     },
  //     data: validatedProject.data
  //   })
  // } catch (error) {
  //   return {
  //     message: 'Could not edit project.'
  //   }
  // }

  // revalidatePath('/app', 'layout')
}

export async function deleteProject(projectId: unknown) {
  if (process.env.NODE_ENV === 'development') {
    await sleep(1000)
  }

  // authentication check
  // const session = await checkAuth()

  // validation
  // const validatedProjectId = projectIdSchema.safeParse(projectId)
  // if (!validatedProjectId.success) {
  //   return {
  //     message: 'Invalid project data.'
  //   }
  // }

  // authorization check
  // const project = await getProjectById(validatedProjectId.data)
  // if (!project) {
  //   return {
  //     message: 'Project not found.'
  //   }
  // }

  // database mutation
  // try {
  //   await prisma.project.delete({
  //     where: {
  //       id: validatedProjectId.data
  //     }
  //   })
  // } catch (error) {
  //   return {
  //     message: 'Could not delete project.'
  //   }
  // }

  // revalidatePath('/app', 'layout')

}