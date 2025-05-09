"use server";

import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { signIn, signOut } from "@/lib/auth";
import { checkAuth } from "@/lib/check-auth";
import { SAMPLE_ACTION } from "@/lib/constants";
import prisma from "@/lib/db";
import { getCategoryById, getProjectById } from "@/lib/server-utils-admin";
import { getUserById } from "@/lib/server-utils-public";
import { ProjectEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import {
  categoryIdSchema,
  emailSchema,
  isActiveSchema,
  projectFormSchema,
  projectIdSchema,
  userIdSchema,
} from "@/lib/validations";

// --- user actions ---

export async function logIn(prevState: unknown, formData: unknown) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }

  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. Could not sign in.",
          };
        }
      }
    }
    throw error; // nextjs redirects throw error, so we need rethrow it
  }
}

export async function logOut() {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }
  await signOut({ redirectTo: "/" });
}

// --- Contact actions ---

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

type SendMailProps = {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendMail(mail: SendMailProps) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }

  const validateEmail = emailSchema.safeParse(mail);
  if (!validateEmail.success) {
    console.error("Invalid mail data.", validateEmail.error);
  }

  const { email, subject, text, html, sendTo } = mail;

  let isVerified = false;
  try {
    isVerified = await transporter.verify();
  } catch (error) {
    console.error(
      "Something Went Wrong",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error
    );
    return;
  }

  let info: SMTPTransport.SentMessageInfo | undefined;
  if (isVerified) {
    info = await transporter.sendMail({
      from: email,
      to: sendTo || SITE_MAIL_RECIEVER,
      subject: subject,
      text: text,
      html: html ? html : "",
    });
    console.log("Message Sent", info.messageId);
    console.log("Mail sent to", SITE_MAIL_RECIEVER);
  }

  return info;
}

// --- User Management actions ---

export async function activateAccount(userId: User["id"], isActive: boolean) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }

  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return {
      message: SAMPLE_ACTION,
    };
  }

  const validatedUserId = userIdSchema.safeParse(userId);
  const validatedIsActive = isActiveSchema.safeParse(isActive);
  if (!validatedIsActive.success || !validatedUserId.success) {
    return {
      message: "Invalid user data.",
    };
  }

  const user = await getUserById(validatedUserId.data);
  if (!user) {
    return {
      message: "Account not found.",
    };
  }
  if (user.isAdmin) {
    return {
      message: "Admin cannot be deactivated.",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: validatedUserId.data,
      },
      data: {
        isActive: validatedIsActive.data,
      },
    });
  } catch (error) {
    return {
      message: "Could not edit the account.",
    };
  }

  revalidatePath("/admin/user-management", "page");
}

// --- Project actions ---

export async function addProject(
  project: ProjectEssentials,
  categoryId: string
) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return {
      message: SAMPLE_ACTION,
    };
  }
  const validatedProject = projectFormSchema.safeParse(project);
  if (!validatedProject.success) {
    return {
      message: "Invalid project data.",
    };
  }
  const validateCategoryId = categoryIdSchema.safeParse(categoryId);
  if (!validateCategoryId.success) {
    return {
      message: "Invalid category data.",
    };
  }

  const category = await getCategoryById(validateCategoryId.data);
  if (!category) {
    return {
      message: "Category not found.",
    };
  }

  try {
    await prisma.project.create({
      data: {
        ...validatedProject.data,
        categoryId: validateCategoryId.data,
        gallery: {
          create: validatedProject.data.gallery.map((item) => ({
            imageUrl: item.imageUrl,
            alt: item.alt,
            description: item.description,
          })),
        },
        techStack: {
          connect: validatedProject.data.techStack.map((tech) => ({
            value: tech.value,
          })),
        },
        roles: {
          create: validatedProject.data.roles,
        },
      },
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return {
      message: "Could not add project.",
    };
  }
  redirect(`/admin/portfolio?category=${category.value}`);
}

export async function editProject(projectId: unknown, newProjectData: unknown) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
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

export async function deleteProject(projectId: string) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return {
      message: SAMPLE_ACTION,
    };
  }
  const validatedProjectId = projectIdSchema.safeParse(projectId);
  if (!validatedProjectId.success) {
    return {
      message: "Invalid project ID.",
    };
  }
  const project = await getProjectById(validatedProjectId.data);
  if (!project) {
    return {
      message: "Project not found.",
    };
  }

  try {
    await prisma.$transaction([
      prisma.gallery.deleteMany({
        where: { projectId: project.id },
      }),
      prisma.role.deleteMany({
        where: { projectId: project.id },
      }),
      prisma.project.update({
        where: { id: project.id },
        data: {
          techStack: {
            set: [],
          },
        },
      }),
      prisma.project.delete({
        where: { id: project.id },
      }),
    ]);
  } catch (error) {
    return {
      message: "Could not delete project.",
    };
  }
  revalidatePath("/admin", "layout");
}
