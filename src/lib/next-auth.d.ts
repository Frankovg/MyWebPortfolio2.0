import type { User } from 'next-auth'

declare module "next-auth" {
  interface User {
    isAdmin: boolean,
    email: string
  }

  interface Session {
    user: User & {
      id: string,
    }
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string,
    isAdmin: boolean,
    email: string
  }
}