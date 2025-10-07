"use server";

import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { SAMPLE_ACTION } from "@/lib/action-constants";
import { checkAuth } from "@/lib/check-auth";
import prisma from "@/lib/db";
import { getUserById } from "@/lib/server-utils-public";
import { sleep } from "@/lib/utils";
import { isActiveSchema, userIdSchema } from "@/lib/validations";

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
    console.error("Could not edit the account.", error)
    return {
      message: "Could not edit the account.",
    };
  }

  revalidatePath("/admin/user-management", "page");
}
