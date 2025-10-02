"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { SAMPLE_ACTION } from "@/lib/action-constants";
import { checkAuth } from "@/lib/check-auth";
import prisma from "@/lib/db";
import { getDownloadFileById } from "@/lib/server-utils-admin";
import { DownloadEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { downloadFormSchema, downloadIdSchema } from "@/lib/validations";

export async function addFile(newFile: DownloadEssentials) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return {
      message: SAMPLE_ACTION,
    };
  }
  console.warn("NEW FILE ", newFile);

  const validatedFile = downloadFormSchema.safeParse(newFile);
  if (!validatedFile.success) {
    console.warn(validatedFile.error);

    return {
      message: "Invalid file data.",
    };
  }

  try {
    await prisma.download.create({
      data: {
        ...validatedFile.data,
      },
    });
  } catch (error) {
    console.error("Error adding a file:", error);
    return {
      message: "Could not add the file.",
    };
  }
  redirect(`/admin/downloads`);
}

export async function editFile(
  downloadId: string,
  download: DownloadEssentials
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

  const validatedDownloadId = downloadIdSchema.safeParse(downloadId);
  if (!validatedDownloadId.success) {
    return {
      message: "Invalid download ID.",
    };
  }
  const validatedDownload = downloadFormSchema.safeParse(download);
  if (!validatedDownload.success) {
    return {
      message: "Invalid download data.",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const originalFile = await tx.download.findUnique({
        where: {
          id: validatedDownloadId.data,
        },
      });

      if (!originalFile) {
        return {
          message: "Download not found.",
        };
      }

      const updateData = {
        ...validatedDownload.data,
      };

      await tx.download.update({
        where: {
          id: validatedDownloadId.data,
        },
        data: updateData,
      });
    });
  } catch (error) {
    console.error("Error editing the file:", error);
    return {
      message: "Could not edit the file.",
    };
  }

  redirect(`/admin/downloads`);
}

export async function deleteFile(downloadId: string) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return {
      message: SAMPLE_ACTION,
    };
  }
  const validatedDownloadId = downloadIdSchema.safeParse(downloadId);
  if (!validatedDownloadId.success) {
    return {
      message: "Invalid download ID.",
    };
  }
  const download = await getDownloadFileById(validatedDownloadId.data);
  if (!download) {
    return {
      message: "Download not found.",
    };
  }

  try {
    await prisma.$transaction([
      prisma.download.delete({
        where: { id: download.id },
      }),
    ]);
  } catch (error) {
    console.error("Error deleting the file:", error);
    return {
      message: "Could not delete the file.",
    };
  }
  revalidatePath("/admin", "layout");
}
