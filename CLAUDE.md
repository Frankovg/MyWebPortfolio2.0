# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern full-stack portfolio application built with Next.js 15 (App Router), featuring a custom CMS for content management. The application showcases projects across Web Development, Industrial Design, and UX/UI Design disciplines, with role-based authentication and complete admin capabilities.

## Development Commands

### Essential Commands

```bash
# Development
npm run dev                    # Start dev server (localhost:3000)

# Building
npm run build                  # Production build
npm start                      # Start production server

# Testing
npm test                       # Run Jest tests
npm run test:watch             # Run tests in watch mode
npm run test:coverage          # Generate coverage report (80% threshold required)
npm run test:coverage:open     # Open coverage report in browser (macOS)

# Linting
npm run lint                   # Run ESLint
npm run lint:fix               # Fix ESLint issues automatically

# Database
npx prisma generate            # Generate Prisma client after schema changes
npx prisma migrate dev         # Run migrations (development)
npx prisma db seed             # Seed database with sample data
npx prisma studio              # Open database GUI (localhost:5555)
```

### Database Environment Switching

**Development (SQLite)**: Uncomment SQLite datasource in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**Production (PostgreSQL)**: Uncomment PostgreSQL datasource:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

After switching, run: `npx prisma generate && npx prisma migrate dev`

## Architecture

### Core Architectural Patterns

**1. Route Organization (App Router)**

- `/(app)/` - Public routes (home, projects, contact)
- `/(auth)/` - Authentication routes (login)
- `/(admin)/` - Protected admin routes (CMS)
- Route groups use parentheses for layout organization without affecting URLs

**2. Server Actions Pattern**
All mutations use server actions (marked with `"use server"`) located in `/src/actions/`:

- `user-actions.ts` - Authentication (login, logout)
- `project-actions.ts` - Project CRUD operations
- `download-actions.ts` - Download resource management
- `contact-actions.ts` - Email sending via Nodemailer
- `password-actions.ts` - Password changes
- `user-management-actions.ts` - Admin user controls

All server actions:

- Check authentication via `checkAuth()` from `lib/check-auth.ts`
- Validate inputs with Zod schemas from `lib/validations.ts`
- Include development sleep delays (1 second) for testing async states
- Use `revalidatePath()` for cache invalidation after mutations
- Return error objects instead of throwing for better UX

**3. Authentication Flow (NextAuth.js v5)**

- Credentials provider (email + password)
- JWT tokens with 24h expiry
- Session includes: `userId`, `email`, `isAdmin`
- Middleware in `src/middleware.ts` protects `/admin` routes
- Server-only auth checks via `checkAuth()` in actions
- Password hashing with bcryptjs

**4. Database Architecture (Prisma)**

- Singleton pattern in `lib/db.ts` (prevents hot-reload issues)
- Models: `Project`, `Tech`, `Category`, `Gallery`, `Role`, `User`, `Download`
- Many-to-many: Projects ↔ Tech
- One-to-many: Project → Gallery, Project → Roles, Category → Projects
- Use transactions for complex mutations (e.g., editing projects with nested data)

**5. State Management**

- **React Context** for global state (`ProjectProvider`, `UserDataProvider`)
- **React Hook Form + Zod** for form validation
- **useOptimistic** for optimistic UI updates in CMS
- No external state library needed at current scale

**6. Data Fetching Strategy**

- Server Components fetch data using functions from `lib/server-utils-public.ts` and `lib/server-utils-admin.ts`
- React `cache()` wrapper for request deduplication (e.g., `getCachedProject()`)
- Page-level revalidation:
  - Static pages: `export const revalidate = 3600`
  - Admin pages: `export const dynamic = 'force-dynamic'`

### Path Aliases (tsconfig.json)

```typescript
@/*              -> src/*
@/components/*   -> src/components/*
@/actions/*      -> src/actions/*
@/context/*      -> src/context/*
@/hooks/*        -> src/hooks/*
@/public/*       -> public/*
```

### Key Files and Their Roles

**Authentication**

- `src/lib/auth.ts` - NextAuth.js configuration with Credentials provider
- `src/lib/auth.config.ts` - Callbacks (jwt, session, authorized)
- `src/middleware.ts` - Route protection middleware
- `src/lib/check-auth.ts` - Server-only auth check utility (imported with `"server-only"`)

**Database**

- `src/lib/db.ts` - Prisma singleton instance
- `prisma/schema.prisma` - Database schema (switch between SQLite/PostgreSQL here)
- `prisma/seed.ts` - Seeding script (creates superuser from env vars)

**Validation**

- `src/lib/validations.ts` - All Zod schemas for forms
- Schemas: `projectFormSchema`, `loginFormSchema`, `contactFormSchema`, `passwordChangeSchema`

**Types**

- `src/lib/types.ts` - TypeScript types extracted from Prisma models
- `src/lib/next-auth.d.ts` - NextAuth.js type augmentation

**Server Utilities**

- `src/lib/server-utils-public.ts` - Public data fetching (marked `"server-only"`)
- `src/lib/server-utils-admin.ts` - Admin data fetching (marked `"server-only"`)
- Functions: `getCategories()`, `getProjectBySlug()`, `getTechStack()`, etc.

## CMS Workflow

### Adding/Editing Projects

1. **Form Structure**: Projects have nested data

   - Gallery images (array of `{ imageUrl, alt, description }`)
   - Tech stack (many-to-many relationship via `Tech` model)
   - Roles (array of `{ label, value, percentage }`)

2. **Form Management**

   - `ProjectFormProvider` manages form state (React Hook Form)
   - `ProjectProvider` manages category list with optimistic updates
   - Form validation via `projectFormSchema` from `lib/validations.ts`

3. **Server Action Flow**

   ```
   Form Submit → useProjectContext.createProjectByCategoryId()
   → addProject/editProject server action
   → Prisma transaction (create project + nested relations)
   → revalidatePath('/admin/portfolio')
   → redirect('/admin/portfolio')
   ```

4. **Image Upload**: Projects use Google Drive URLs for images
   - Main project image: `image` field
   - Gallery images: `gallery` array with `imageUrl` per item

### Optimistic Updates

CMS uses `useOptimistic` hook for instant UI feedback:

```typescript
const [optimisticCategories, addOptimisticCategory] = useOptimistic(
  categories,
  (state, newCategory) => [...state, newCategory]
);
```

This provides immediate visual feedback before server confirmation.

## Important Conventions

### Server-Only Modules

Files that MUST run only on server are marked with:

```typescript
import "server-only";
```

Examples: `check-auth.ts`, `server-utils-public.ts`, `server-utils-admin.ts`

### Development vs Production

- **Development sleep delays**: Many server actions include 1 second delays for testing loading states
- **Database**: SQLite for dev, PostgreSQL for production
- **Token refresh**: In development, `jwt()` callback queries database on every request for fresh user data

### Seeding Data

The seed script (`prisma/seed.ts`) creates:

- Superuser from `SUPERUSER_ACCOUNT_EMAIL` and `SUPERUSER_ACCOUNT_PASSWORD` env vars
- Sample projects across all categories
- Tech stack data (Next.js, React, TypeScript, etc.)
- Categories (Web Development, Industrial Design, UX/UI)
- Downloadable resources (CV, portfolios)

The superuser account is the initial admin with full CMS access.

### Email System (Nodemailer)

- Contact form sends emails via `sendMail()` server action
- SMTP configuration in `.env`:
  - `SMTP_SERVER_USERNAME` - Email account
  - `SMTP_SERVER_PASSWORD` - App password (for Gmail: create at https://support.google.com/accounts/answer/185833)
  - `SMTP_SERVER_HOST` - SMTP server
  - `SITE_MAIL_RECIEVER` - Recipient email

### Environment Variables

Required variables (see `example.env`):

- `DATABASE_URL` - SQLite path (development)
- `POSTGRES_PRISMA_URL` / `POSTGRES_URL_NON_POOLING` - PostgreSQL (production)
- `AUTH_SECRET` - Generate with `openssl rand -base64 32`
- `AUTH_URL` - Site URL for NextAuth.js
- `CANONICAL_URL` - Canonical URL for SEO
- SMTP credentials (see Email System above)
- `SUPERUSER_ACCOUNT_EMAIL` / `SUPERUSER_ACCOUNT_PASSWORD` - Initial admin
- Social URLs (LinkedIn, GitHub)
- Contact information

### Testing

- Jest with React Testing Library
- Coverage threshold: 80% (branches, functions, lines, statements)
- Test files: `**/__tests__/**/*.test.ts(x)` or `**/*.spec.ts(x)`
- Mock CSS imports with `identity-obj-proxy`

## Common Development Patterns

### Creating a New Server Action

1. Create file in `/src/actions/` with `"use server"` directive
2. Import `checkAuth()` and validate authentication
3. Define Zod schema in `lib/validations.ts`
4. Validate input with `schema.safeParse()`
5. Use `db` from `lib/db.ts` for database operations
6. Call `revalidatePath()` after mutations
7. Return error objects or success data
8. Add development sleep delay: `await new Promise(resolve => setTimeout(resolve, 1000))`

### Adding a New Protected Route

1. Create route in `/src/app/(admin)/admin/`
2. Add `export const dynamic = 'force-dynamic'` at top of page
3. Check auth in page component with `checkAuth()`
4. Middleware automatically protects `/admin` routes

### Adding a New Form

1. Define Zod schema in `lib/validations.ts`
2. Create form component with React Hook Form: `useForm<z.infer<typeof schema>>()`
3. Use `@hookform/resolvers/zod` for validation
4. Create corresponding server action in `/src/actions/`
5. Use `useFormState` or `useTransition` for submission handling
6. Display errors with `toast` from `sonner`

### Querying Data in Server Components

```typescript
import { getCategories } from "@/lib/server-utils-public";

export default async function Page() {
  const categories = await getCategories();
  return <div>{/* render */}</div>;
}
```

For repeated queries in same render, use `cache()` wrapper:

```typescript
import { cache } from "react";

const getCachedProject = cache(async (slug: string) => {
  return getProjectBySlug(slug);
});
```

## Deployment

**Platform**: Vercel (optimized for Next.js)

**Pre-deployment Checklist**:

1. Switch `prisma/schema.prisma` to PostgreSQL datasource
2. Run `npx prisma generate`
3. Set all environment variables in Vercel dashboard
4. Configure PostgreSQL database (Vercel Postgres or external)
5. Run migrations: `npx prisma migrate deploy`
6. Seed database: `npx prisma db seed` (or manually via Prisma Studio)

**Post-deployment**:

- First-time setup creates superuser from env vars
- Access admin panel at `/admin` with superuser credentials
- Configure social URLs and contact info via environment variables

## Architecture Decisions

### Why NextAuth.js v5?

- Built for Next.js App Router
- Server-side session handling with JWT
- Flexible authentication strategies
- Easy role-based access control via session callbacks

### Why Prisma?

- Type-safe database queries
- Automatic migrations
- Introspection and studio GUI
- Easy switching between SQLite (dev) and PostgreSQL (prod)

### Why Server Actions?

- Progressive enhancement (forms work without JS)
- Type-safe RPC-style mutations
- Automatic revalidation integration
- Simplified data flow (no API route boilerplate)

### Why React Hook Form + Zod?

- Minimal re-renders (uncontrolled components)
- Type-safe validation schemas
- Excellent TypeScript integration
- Resolver pattern integrates seamlessly

### Why Optimistic Updates?

- Instant user feedback without waiting for server
- Better perceived performance
- Automatic rollback on errors
- Native React 19 support with `useOptimistic`
