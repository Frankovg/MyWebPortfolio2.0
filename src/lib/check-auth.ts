import "server-only";

import { headers } from "next/headers";

import { auth } from "./auth";

export async function checkAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}
