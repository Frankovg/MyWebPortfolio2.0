import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

//Utils
import bcrypt from 'bcryptjs'
import { getUserByEmail } from "./server-utils";
import { sleep } from "./utils";

//Validations
import { authSchema } from "./validations";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on logIn

        // validation
        const validatedFormData = authSchema.safeParse(credentials)
        if (!validatedFormData.success) {
          return null
        }

        // extract values
        const { email, password } = validatedFormData.data
        const user = await getUserByEmail(email)
        if (!user || !user.isActive) {
          console.error('User not found')
          return null
        }

        const passwordsMatch = await bcrypt.compare(password, user.hashedpassword)
        if (!passwordsMatch) {
          console.error('Invalid credentials')
          return null
        }

        return user
      }
    })
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = !!auth?.user
      const isSuperUser = auth?.user?.isAdmin ?? false
      const isTryingToAccessAdmin = request.nextUrl.pathname.includes('/admin')
      const isTryingToAccessLogin = request.nextUrl.pathname.includes('/login')

      // Case for non logged user trying to access admin or sample
      if (!isLoggedIn && isTryingToAccessAdmin) return Response.redirect(new URL('/login', request.nextUrl))
      // Case for non logged user which is not navigating to admin or sample
      if (!isLoggedIn && !isTryingToAccessAdmin) return true

      // Case for logged super user trying to access login or sample
      if (isLoggedIn && isSuperUser && isTryingToAccessLogin) return Response.redirect(new URL('/admin', request.nextUrl))
      // Case for logged super user trying to access admin
      if (isLoggedIn && isSuperUser) return true

      // Case for logged sample account trying to access login or admin
      if (isLoggedIn && !isSuperUser && (isTryingToAccessLogin || isTryingToAccessAdmin)) return Response.redirect(new URL('/sample', request.nextUrl))
      // Case for logged sample account which is not navigating to admin
      if (isLoggedIn && !isSuperUser) return true

      return false
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on sign in
        token.userId = user.id! //TODO: fix this type
        token.email = user.email! //TODO: fix this type
        token.isAdmin = user.isAdmin
        token.exp = Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      }
      if (trigger === 'update') {
        if (process.env.NODE_ENV === 'development') {
          await sleep(1000)
        }
        // on every request
        const userFromDb = await getUserByEmail(token.email)
        if (userFromDb) {
          token.isAdmin = userFromDb.isAdmin
        }
      }

      return token
    },
    session: ({ session, token }) => {
      session.user.id = token.userId,
        session.user.isAdmin = token.isAdmin

      return session
    }
  }
} satisfies NextAuthConfig

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = NextAuth(config)
