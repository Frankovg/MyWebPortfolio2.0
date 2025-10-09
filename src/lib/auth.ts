import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import authConfig from "./auth.config";
import { getUserByEmail } from "./server-utils-public";
import { sleep } from "./utils";
import { authSchema } from "./validations";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
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
    ...authConfig.callbacks,
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
        // on every request - this requires database access
        const userFromDb = await getUserByEmail(token.email);
        if (userFromDb) {
          token.isAdmin = userFromDb.isAdmin;
        }
      }

      return token;
    },
  },
});
