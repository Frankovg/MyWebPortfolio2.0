"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { sleep } from "@/lib/utils";

export async function logIn(_prevState: unknown, formData: unknown) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }

  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
      email: "",
    };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      message: "Email and password are required.",
      email: email || "",
    };
  }

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (!result) {
      return {
        message: "Invalid credentials.",
        email,
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: "Invalid credentials.",
      email,
    };
  }

  redirect("/admin");
}

export async function logOut() {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }

  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
