# Project Coding Rules (Non-Obvious Only)

- Use [`sleep()`](src/lib/utils.ts:8-11) from utils for development delays in server actions (auth, email)
- Server-only modules MUST import "server-only" first line to prevent client bundling
- Auth callback at line 65 in [`src/lib/auth.ts`](src/lib/auth.ts:65) has bug - returns true instead of false for non-admin admin access
- Email transporter hardcoded to "gmail" service despite custom SMTP env vars in [`src/actions/contact-actions.ts`](src/actions/contact-actions.ts:15)
- Prisma seed requires CommonJS module override: `ts-node --compiler-options {"module":"CommonJS"}` in [`package.json`](package.json:6)
- Root page [`src/app/page.tsx`](src/app/page.tsx:4) redirects to "/app/home" - no content served at "/"
- Tech stack validation uses [`TECH_STACK_DATA`](src/lib/constants.ts:157-188) array for allowed values
- Database queries split between admin ([`server-utils-admin.ts`](src/lib/server-utils-admin.ts)) and public ([`server-utils-public.ts`](src/lib/server-utils-public.ts)) utils
- Tailwind config is empty - v4 configuration handled in [`postcss.config.mjs`](postcss.config.mjs:4)
