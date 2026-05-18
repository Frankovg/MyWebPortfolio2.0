import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isLoggedIn = !!session?.user;
  const isTryingToAccessAdmin = request.nextUrl.pathname.startsWith("/admin");
  const isTryingToAccessLogin = request.nextUrl.pathname.startsWith("/login");

  if (!isLoggedIn && isTryingToAccessAdmin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isTryingToAccessLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
