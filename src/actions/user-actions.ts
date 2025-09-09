"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/lib/auth";
import { sleep } from "@/lib/utils";

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
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/admin"
    });
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
