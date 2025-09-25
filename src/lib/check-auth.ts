import 'server-only'

import { auth } from "./auth"

export async function checkAuth() {
  const session = await auth()

  return session
}
