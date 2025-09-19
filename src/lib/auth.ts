import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./server-utils-public";
import { sleep } from "./utils";
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
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }

        // extract values
        const { email, password } = validatedFormData.data;
        const user = await getUserByEmail(email);
        if (!user || !user.isActive) {
          console.error("User not found");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedpassword
        );
        if (!passwordsMatch) {
          console.error("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const isSuperUser = auth?.user?.isAdmin ?? false;
      const isTryingToAccessAdmin = request.nextUrl.pathname.includes("/admin");
      const isTryingToAccessLogin = request.nextUrl.pathname.includes("/login");

      // Case for non logged user trying to access admin - deny access (middleware will handle redirect)
      if (!isLoggedIn && isTryingToAccessAdmin) return false;

      // Case for non logged user accessing public routes - allow
      if (!isLoggedIn && !isTryingToAccessAdmin) return true;

      // Case for logged user trying to access login - deny access (middleware will handle redirect)
      if (isLoggedIn && isTryingToAccessLogin) return Response.redirect(new URL("/admin", request.nextUrl));

      // Case for logged super user trying to access admin - allow
      if (isLoggedIn && isSuperUser && isTryingToAccessAdmin) return true;

      // Case for logged non-super user trying to access admin - deny
      if (isLoggedIn && !isSuperUser && isTryingToAccessAdmin) return true;

      // Case for logged user accessing other routes - allow
      if (isLoggedIn) return true;

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on sign in
        token.userId = user.id!; //TODO: fix this type
        token.email = user.email!; //TODO: fix this type
        token.isAdmin = user.isAdmin;
        token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      }
      if (trigger === "update" && token.email) {
        if (process.env.NODE_ENV === "development") {
          await sleep(1000);
        }
        // on every request
        const userFromDb = await getUserByEmail(token.email);
        if (userFromDb) {
          token.isAdmin = userFromDb.isAdmin;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      (session.user.id = token.userId as string),
        (session.user.isAdmin = token.isAdmin as boolean);

      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
