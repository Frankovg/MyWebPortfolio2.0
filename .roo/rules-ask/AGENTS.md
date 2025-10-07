# Project Documentation Rules (Non-Obvious Only)

- Root "/" redirects to "/app/home" - no content served at root in [`src/app/page.tsx`](src/app/page.tsx:4)
- Database schema supports both SQLite (dev) and PostgreSQL (prod) - switch via comments in [`prisma/schema.prisma`](prisma/schema.prisma:5-16)
- Tech stack validation uses predefined array [`TECH_STACK_DATA`](src/lib/constants.ts:157-188) - not all techs are allowed
- Server utilities split by access level: admin ([`server-utils-admin.ts`](src/lib/server-utils-admin.ts)) vs public ([`server-utils-public.ts`](src/lib/server-utils-public.ts))
- Empty Tailwind config - actual configuration in [`postcss.config.mjs`](postcss.config.mjs:4) using Tailwind v4
- Jest config has wrong displayName "@f3d-commerce/b2b" instead of "fran-web" in [`jest.config.ts`](jest.config.ts:9)
- Email service hardcoded to "gmail" despite custom SMTP env configuration in [`src/actions/contact-actions.ts`](src/actions/contact-actions.ts:15)
- Development includes React Scan performance debugging script in [`src/app/layout.tsx`](src/app/layout.tsx:64-67)
- Auth logic bug allows non-admin access to admin routes at line 65 in [`src/lib/auth.ts`](src/lib/auth.ts:65)
