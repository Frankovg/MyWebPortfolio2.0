// Must go in src/ folder 

/*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico, sitemap.xml, robots.txt (metadata files)
    */

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};