import 'server-only'

import { auth } from "./auth"

export async function checkAuth() {
  const session = await auth()
  //TODO: Do I need a redirect here?
  // if (!session?.user) {
  //   redirect('/login')
  // }

  return session
}