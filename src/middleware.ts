import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isLoggedIn = !!session?.user;
  const isSuperUser = session?.user?.isAdmin ?? false;
  const isTryingToAccessAdmin = request.nextUrl.pathname.includes("/admin");
  const isTryingToAccessLogin = request.nextUrl.pathname.includes("/login");

  // Case for non logged user trying to access admin - redirect to login
  if (!isLoggedIn && isTryingToAccessAdmin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Case for non logged user accessing public routes - allow
  if (!isLoggedIn && !isTryingToAccessAdmin) {
    return NextResponse.next();
  }

  // Case for logged user trying to access login - redirect to admin
  if (isLoggedIn && isTryingToAccessLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Case for logged super user trying to access admin - allow
  if (isLoggedIn && isSuperUser && isTryingToAccessAdmin) {
    return NextResponse.next();
  }

  // Case for logged non-super user trying to access admin - allow (keep existing behavior)
  if (isLoggedIn && !isSuperUser && isTryingToAccessAdmin) {
    return NextResponse.next();
  }

  // Case for logged user accessing other routes - allow
  if (isLoggedIn) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
