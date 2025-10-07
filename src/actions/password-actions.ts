"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { SAMPLE_ACTION } from "@/lib/action-constants";
import { checkAuth } from "@/lib/check-auth";
import prisma from "@/lib/db";
import { getUserByEmail } from "@/lib/server-utils-public";
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
  const email = session.user.email;

  if (!email) {
    return {
      message: "Account email not found.",
    };
  }

  const user = await getUserByEmail(email);
  if (!user || !user.isActive) {
    const message = "User not found";
    console.error(message);
    return {
      message,
    };
  }

  const passwordsMatch = await bcrypt.compare(
    currentPassword,
    user.hashedpassword
  );
  if (!passwordsMatch) {
    const message = "Invalid credentials";
    console.warn(message);
    return {
      message,
    };
  }

  const hashedSuperuserPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        hashedpassword: hashedSuperuserPassword,
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
