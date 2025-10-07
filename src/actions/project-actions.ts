"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { SAMPLE_ACTION } from "@/lib/action-constants";
import { checkAuth } from "@/lib/check-auth";
import prisma from "@/lib/db";
import { getCategoryById, getProjectById } from "@/lib/server-utils-admin";
import { ProjectEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import {
  categoryIdSchema,
  projectFormSchema,
  projectIdSchema,
} from "@/lib/validations";

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
          create: validatedProject.data.roles.map((role) => ({
            label: role.label,
            value: role.value,
            percentage: role.percentage,
          })),
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

export async function editProject(
  projectId: string,
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

  const category = await getCategoryById(categoryId);
  if (!category) {
    return {
      message: "Category not found.",
    };
  }

  const validatedProjectId = projectIdSchema.safeParse(projectId);
  if (!validatedProjectId.success) {
    return {
      message: "Invalid project ID.",
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

  try {
    await prisma.$transaction(async (tx) => {
      const originalProject = await tx.project.findUnique({
        where: {
          id: validatedProjectId.data,
        },
        include: {
          gallery: true,
          techStack: true,
          roles: true,
        },
      });

      if (!originalProject) {
        return {
          message: "Project not found.",
        };
      }

      const galleryForComparison = originalProject.gallery.map((item) => ({
        imageUrl: item.imageUrl,
        alt: item.alt,
        description: item.description,
      }));

      const techStackForComparison = originalProject.techStack.map((item) => ({
        value: item.value,
      }));

      const rolesForComparison = originalProject.roles.map((item) => ({
        label: item.label,
        value: item.value,
        percentage: item.percentage,
      }));

      const galleryChanged =
        JSON.stringify(galleryForComparison) !==
        JSON.stringify(validatedProject.data.gallery);

      const techStackChanged =
        JSON.stringify(techStackForComparison) !==
        JSON.stringify(validatedProject.data.techStack);

      const rolesChanged =
        JSON.stringify(rolesForComparison) !==
        JSON.stringify(validatedProject.data.roles);

      const updateData: any = {
        ...validatedProject.data,
        categoryId: originalProject.categoryId,
      };

      if (galleryChanged) {
        await tx.gallery.deleteMany({
          where: { projectId: validatedProjectId.data },
        });
        updateData.gallery = {
          create: validatedProject.data.gallery.map((item) => ({
            imageUrl: item.imageUrl,
            alt: item.alt,
            description: item.description,
          })),
        };
      } else {
        delete updateData.gallery;
      }

      if (techStackChanged) {
        updateData.techStack = {
          set: [],
          connect: validatedProject.data.techStack.map((tech) => ({
            value: tech.value,
          })),
        };
      } else {
        delete updateData.techStack;
      }

      if (rolesChanged) {
        await tx.role.deleteMany({
          where: { projectId: validatedProjectId.data },
        });
        updateData.roles = {
          create: validatedProject.data.roles.map((role) => ({
            label: role.label,
            value: role.value,
            percentage: role.percentage,
          })),
        };
      } else {
        delete updateData.roles;
      }

      await tx.project.update({
        where: {
          id: validatedProjectId.data,
        },
        data: updateData,
      });
    });
  } catch (error) {
    console.error("Error editing project:", error);
    return {
      message: "Could not edit project.",
    };
  }

  redirect(`/admin/portfolio?category=${category.value}`);
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
    console.error("Could not delete project.", error);
    return {
      message: "Could not delete project.",
    };
  }
  revalidatePath("/admin", "layout");
}
