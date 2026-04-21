# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start Next.js dev server
npm run build            # Production build
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues

# Testing
npm test                 # Run all Jest tests
npm test -- path/to/file.test.ts  # Run single test file
npm test:watch           # Watch mode
npm test:coverage        # Generate coverage report (80% threshold required)

# Database
npx prisma generate      # Generate Prisma client
npx prisma migrate dev --name <name>  # Create migration
npx prisma db seed       # Seed database
npx prisma studio        # Visual DB editor (port 5555)
```

## Architecture

**Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Prisma 7, PostgreSQL, BetterAuth, Zustand

**Directory Structure**:
- `src/app/(app)` - Public pages: home, about-me, contact, projects, legal
- `src/app/(auth)` - Login page
- `src/app/(admin)` - Protected admin CMS (portfolio, downloads, user management)
- `src/actions` - Server Actions (contact, projects, downloads, users)
- `src/lib` - Core utilities: auth, database queries, validations, constants
- `src/components` - React components (shared, primitives, admin, UI via shadcn)
- `src/stores` - Zustand state stores
- `src/generated/prisma` - Auto-generated Prisma client (output path set in `prisma/schema.prisma`)

**Path Aliases**: `@/*` maps to `./src/*` (defined in `tsconfig.json`). Always use `@/` imports.

**Test Location**: Tests are co-located with source in `__tests__` folders or as `.test.ts` sibling files.

**Database Queries**:
- `src/lib/server-utils-public.ts` - Public cached queries using `unstable_cache` with `CACHE_TAGS` constants for revalidation
- `src/lib/server-utils-admin.ts` - Admin queries with auth checks

**Validations**: Zod schemas centralized in `src/lib/validations.ts`. Shared between server actions and client forms.

**Auth**: BetterAuth with email/password. User model has `isAdmin` and `isActive` flags. Route protection has two layers:
- `src/proxy.ts` — Next.js 16 proxy (replaces middleware). Redirects unauthenticated users away from `/admin` and logged-in users away from `/login`.
- `src/lib/check-auth.ts` — returns session for server components (used in layouts to pass session to Navbar)
- `src/lib/server-utils-admin.ts` — `checkAuth()` redirects unauthenticated users (used in admin data queries)

**Images**: Remote images from Cloudinary (`res.cloudinary.com`) and Google Drive are configured in `next.config.ts`.

## Key Patterns

**Store Initializer Pattern**: Server data is synced to Zustand stores via initializer components that wrap children in layouts. See `src/components/downloads-initializer.tsx` (root layout) and `src/app/(admin)/admin/portfolio/components/project-store-initializer.tsx` (admin layout). These use `useRef` for first-render sync + `useEffect` for subsequent updates.

**Parallel Routes**: The about-me page uses parallel routes (`@experience`, `@faqs`) composed in `src/app/(app)/about-me/layout.tsx`. Each slot has its own `default.tsx` and `error.tsx`.

**Admin Layout**: Uses shadcn sidebar (`SidebarProvider` + `AppSidebar`) in `src/app/(admin)/admin/layout.tsx`.

**ESLint Import Ordering**: Enforced order: builtin → external → internal → parent → sibling → index → type, with blank lines between groups and alphabetical sorting. `import/no-cycle` is enabled with `maxDepth: 10`.

## Sentry (Error Monitoring & Tracing)

**Config files**: `sentry.server.config.ts`, `sentry.edge.config.ts`, `src/instrumentation.ts` (server/edge registration), `src/instrumentation-client.ts` (client init). Init only happens in these files — never re-initialize elsewhere.

**Import**: Always use `import * as Sentry from "@sentry/nextjs"`.

**Exception Capturing**: Use `Sentry.captureException(error)` in try/catch blocks and error boundaries.

**Custom Spans**: Use `Sentry.startSpan({ op, name }, (span) => { ... })` for meaningful actions:
- `op: "ui.click"` for user interactions
- `op: "http.client"` for API calls
- `op: "db.query"` for database operations
- Attach relevant attributes via `span.setAttribute(key, value)`

**Structured Logging**: Use `Sentry.logger` (not `console.log`) for production logging. Available levels: `trace`, `debug`, `info`, `warn`, `error`, `fatal`. Use `logger.fmt` template literals for variables: `` logger.info(logger.fmt`User ${userId} logged in`) ``.

**Browser Tunnel**: Sentry requests are proxied through the Next.js server to avoid ad blockers.

## Known Issues

- Email transporter hardcoded to "gmail" despite custom SMTP env vars in `src/actions/contact-actions.ts:15`

## Non-Obvious Patterns

- Server-only modules must import `"server-only"` as first line
- Tailwind v4: no `tailwind.config.js` — PostCSS plugin in `postcss.config.mjs`, theme variables (colors, breakpoints, containers) defined in `src/styles/globals.css` using `@theme`
- Root `/` redirects to `/home`; legacy `/app/*` routes redirect to new paths
- Server Action `redirect()` targets must be **final routes** (not routes that call their own `redirect()`). The Server Action client `fetch` follows 3xx responses, so a double-redirect drops the `x-action-redirect` header and throws "An unexpected response was received from the server." Example: don't `redirect("/")` from a Server Action since `src/app/page.tsx` re-redirects to `/home` — use `redirect("/home")` directly. Same applies to `/project` (redirects to `/home#projects`).
- Tech stack validation uses `TECH_STACK_DATA` array in `src/lib/constants.ts`
- Use `sleep()` from `src/lib/utils.ts` for development delays in server actions
- BetterAuth user/session/account models use lowercase table names (`@@map`) in the Prisma schema
