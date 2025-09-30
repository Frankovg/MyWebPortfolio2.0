# Project Debug Rules (Non-Obvious Only)

- React Scan debugging script loaded in development via [`src/app/layout.tsx`](src/app/layout.tsx:64-67) for performance analysis
- Development sleep delays in [`src/lib/utils.ts`](src/lib/utils.ts:8-11) simulate real-world latency in auth/email actions
- Auth logic bug at line 65 in [`src/lib/auth.ts`](src/lib/auth.ts:65) - non-admin users can access admin routes (returns true instead of false)
- Email service hardcoded to "gmail" despite custom SMTP env vars - check [`src/actions/contact-actions.ts`](src/actions/contact-actions.ts:15)
- Jest displayName "@f3d-commerce/b2b" doesn't match project "fran-web" in [`jest.config.ts`](jest.config.ts:9)
- Database switches between SQLite (dev) and PostgreSQL (prod) - check commented config in [`prisma/schema.prisma`](prisma/schema.prisma:5-16)
- Coverage reports open with macOS-specific `open` command in `npm run test:coverage:open`
- Server-only imports prevent client bundling - missing import causes silent failures
