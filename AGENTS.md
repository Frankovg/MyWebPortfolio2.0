# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Non-Obvious Project Patterns

- **Database**: Uses SQLite for development, PostgreSQL for production (switch commented in [`prisma/schema.prisma`](prisma/schema.prisma:5-16))
- **Prisma Seed**: Custom seed command uses ts-node with CommonJS module override in [`package.json`](package.json:6)
- **Jest Config**: Has mismatched displayName "@f3d-commerce/b2b" that doesn't match project name "fran-web" in [`jest.config.ts`](jest.config.ts:9)
- **Auth Logic Bug**: Line 65 in [`src/lib/auth.ts`](src/lib/auth.ts:65) allows non-admin users to access admin routes (should return false)
- **Server-Only Pattern**: [`src/lib/server-utils-admin.ts`](src/lib/server-utils-admin.ts:1) and [`src/lib/server-utils-public.ts`](src/lib/server-utils-public.ts:1) use "server-only" import to prevent client-side usage
- **Development Sleep**: [`src/lib/utils.ts`](src/lib/utils.ts:8-11) includes sleep() function used in auth and email actions for dev simulation
- **Root Redirect**: [`src/app/page.tsx`](src/app/page.tsx:4) redirects root "/" to "/app/home" instead of serving content
- **Empty Tailwind Config**: [`tailwind.config.ts`](tailwind.config.ts) is empty - configuration likely handled by Tailwind v4 in [`postcss.config.mjs`](postcss.config.mjs:4)
- **React Scan**: Development script in [`src/app/layout.tsx`](src/app/layout.tsx:64-67) loads react-scan for performance debugging
- **Gmail SMTP**: Email service hardcoded to "gmail" in [`src/actions/contact-actions.ts`](src/actions/contact-actions.ts:15) despite using custom SMTP env vars
- **Import Order**: ESLint enforces strict import grouping with newlines between groups in [`.eslintrc.json`](eslintrc.json:16-35)
- **Coverage Thresholds**: Jest requires 80% coverage across all metrics in [`jest.config.ts`](jest.config.ts:39-46)

## Test Commands

- `npm run test:coverage:open` - Opens coverage report in browser (macOS-specific `open` command)
- Tests must be co-located with source files or in `__tests__` directories for Jest to find them
