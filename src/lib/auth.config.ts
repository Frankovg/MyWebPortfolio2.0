import { NextAuthConfig } from "next-auth";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [],
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
    jwt: async ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = user.id!;
        token.email = user.email!;
        token.isAdmin = user.isAdmin;
        token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userId as string;
      session.user.isAdmin = token.isAdmin as boolean;

      return session;
    },
  },
} satisfies NextAuthConfig;

export default config;
