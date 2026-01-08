"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { SAMPLE_ACTION } from "@/lib/action-constants";
import { checkAuth } from "@/lib/check-auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import {
  changePasswordFormSchema,
  TChangePasswordForm,
} from "@/lib/validations";

export async function changePassword(passwordValues: TChangePasswordForm) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return {
      message: SAMPLE_ACTION,
    };
  }
  const validatedPasswordValues =
    changePasswordFormSchema.safeParse(passwordValues);
  if (!validatedPasswordValues.success) {
    return {
      message: "Invalid password data.",
    };
  }

  const { currentPassword, password } = validatedPasswordValues.data;
  const userId = session.user.id;

  if (!userId) {
    return {
      message: "Account not found.",
    };
  }

  // Get the credential account for this user
  const account = await prisma.account.findFirst({
    where: {
      userId,
      providerId: "credential",
    },
  });

  if (!account || !account.password) {
    const message = "Account not found or no password set";
    console.error(message);
    return {
      message,
    };
  }

  const passwordsMatch = await bcrypt.compare(currentPassword, account.password);
  if (!passwordsMatch) {
    const message = "Invalid credentials";
    console.warn(message);
    return {
      message,
    };
  }

  const hashedNewPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        password: hashedNewPassword,
      },
    });
  } catch (error) {
    console.error("Could not change the password", error);
    return {
      message: "Could not change the password.",
    };
  }

  revalidatePath("/admin", "layout");
}
