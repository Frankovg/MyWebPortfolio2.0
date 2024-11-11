import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validations";
import { sleep } from "./utils";

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
        if (!user) {
          console.log('User not found');
          return null
        }

        const passwordsMatch = await bcrypt.compare(password, user.hashedpassword)
        if (!passwordsMatch) {
          console.log('Invalid credentials');
          return null
        }

        return user
      }
    })
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      //TODO: Add logic to check if user is an admin or not and what tyo do in each case
      // runs on every request with middleware
      // const isLoggedIn = !!auth?.user
      // const isTryingToAccessApp = request.nextUrl.pathname.includes('/app')

      // if (!isLoggedIn && isTryingToAccessApp) return false

      // if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess) return Response.redirect(new URL('/payment', request.nextUrl))

      // if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) return true

      // if (isLoggedIn && (request.nextUrl.pathname.includes('/login') || request.nextUrl.pathname.includes('/signup')) && auth?.user.hasAccess) return Response.redirect(new URL('/app/dashboard', request.nextUrl))

      // if (isLoggedIn && !isTryingToAccessApp && !auth?.user.hasAccess) {
      //   if (request.nextUrl.pathname.includes('/login') || request.nextUrl.pathname.includes('/signup')) return Response.redirect(new URL('/payment', request.nextUrl))
      //   else return true
      // }

      // if (!isLoggedIn && !isTryingToAccessApp) return true

      // return false
      return true
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on sign in
        token.userId = user.id! //TODO: fix this type
        token.email = user.email! //TODO: fix this type
        token.isAdmin = user.isAdmin
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
