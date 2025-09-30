# Project Architecture Rules (Non-Obvious Only)

- Database abstraction split by access level: admin queries in [`server-utils-admin.ts`](src/lib/server-utils-admin.ts), public in [`server-utils-public.ts`](src/lib/server-utils-public.ts)
- Server-only pattern enforced via "server-only" imports to prevent client bundling leaks
- Root application entry redirects "/" to "/app/home" - no content architecture at root level
- Auth middleware logic has security flaw at line 65 in [`src/lib/auth.ts`](src/lib/auth.ts:65) - non-admin users bypass admin restrictions
- Email architecture hardcoded to Gmail service despite flexible SMTP configuration in [`src/actions/contact-actions.ts`](src/actions/contact-actions.ts:15)
- Development simulation layer uses [`sleep()`](src/lib/utils.ts:8-11) in auth/email flows to mimic production latency
- Database schema designed for dual-environment: SQLite (dev) and PostgreSQL (prod) with commented switching in [`prisma/schema.prisma`](prisma/schema.prisma:5-16)
- Tech stack validation enforced via predefined constants array [`TECH_STACK_DATA`](src/lib/constants.ts:157-188) - not extensible without code changes
- Tailwind v4 architecture bypasses traditional config file - configuration handled in [`postcss.config.mjs`](postcss.config.mjs:4)
