// --- Project actions ---

import prisma from "@/lib/db"
import { getProjectById } from "@/lib/server-utils"
import { sleep } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import nodemailer from 'nodemailer'

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
})

type SendMailProps = {
  email: string,
  sendTo?: string,
  subject: string,
  text: string,
  html?: string,
}

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: SendMailProps) {
  try {
    const isVerified = await transporter.verify()
  } catch (error) {
    console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error)
    return
  }

  const info = await transporter.sendMail({
    from: email,
    to: sendTo || SITE_MAIL_RECIEVER,
    subject: subject,
    text: text,
    html: html ? html : '',
  })

  console.log('Message Sent', info.messageId)
  console.log('Mail sent to', SITE_MAIL_RECIEVER)

  return info
}

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