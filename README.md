# RPM Detailing

Marketing site and CMS for RPM Detailing, built with Next.js and Payload CMS on Postgres (Neon), deployed to Vercel.

## Stack

- Next.js 16 (App Router) + React 19
- Payload CMS 3 (`/admin`) with Postgres and Vercel Blob media storage
- Tailwind CSS 4
- Playwright for end-to-end tests

## Getting started

Requires Node 24+ (`nvm use`) and pnpm (the pinned version is installed automatically from `packageManager`).

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts a local embedded Postgres in `.tmp/dev-db`, seeds it on first run and serves the site at http://localhost:3000 with the CMS at http://localhost:3000/admin. No `.env.local` is needed.

Local accounts (local databases only):

| Role                        | Email                   | Password            |
| --------------------------- | ----------------------- | ------------------- |
| Admin (developer)           | `admin@rpmdetail.test`  | `local-Password-1!` |
| Editor (client permissions) | `client@rpmdetail.test` | `local-Password-1!` |

`pnpm seed` resets the local content and accounts; `pnpm dev:reset` wipes the local database and starts fresh.

## Content editing

Everything on the site comes from Payload:

- **Pages** (Home, Services, About, Booking) and **Site** (Business & SEO, Header & Menu, Footer) are globals.
- **Service Packages**, **Testimonials**, **Brands** and **Photos** are collections, ordered by drag and drop.

Edits autosave as drafts. Use the eye icon for live preview, or open the preview link to see drafts on the real site, then **Publish changes** to go live. Publishing clears the page cache immediately; no redeploy is needed.

Editors can manage all content and photos. Only admins can manage users, and the last admin can't be removed or demoted.

## Scripts

| Script                       | What it does                                                          |
| ---------------------------- | --------------------------------------------------------------------- |
| `pnpm dev`                   | Start the dev server with a local seeded database                     |
| `pnpm seed`                  | Reset local content and accounts                                      |
| `pnpm build` / `pnpm start`  | Production build and serve                                            |
| `pnpm check`                 | Typecheck, lint, format check and dead-code check (knip)              |
| `pnpm format`                | Format everything with Prettier                                       |
| `pnpm lint:fix`              | Auto-fix lint issues                                                  |
| `pnpm test:e2e`              | Build and run the Playwright suite against a throwaway local database |
| `pnpm test:e2e:remote <url>` | Run the suite against a deployed URL                                  |
| `pnpm deploy:preview`        | Check, test, migrate, deploy a preview, then test the deployment      |
| `pnpm deploy:prod`           | Same as above for production                                          |
| `pnpm generate:types`        | Regenerate `src/payload-types.ts` after schema changes                |
| `pnpm migrate:create <name>` | Create a migration after schema changes                               |

## Testing

`pnpm test:e2e` needs no setup. It starts an embedded Postgres instance, runs migrations, seeds the same content and accounts as `pnpm dev`, serves a production build on port 3100 and runs the suite on desktop and mobile Chrome. Tests tagged `@local` (signing in, drafting, previewing, publishing and uploading) only run against that throwaway database.

## Deploying

Deploys run from your machine through the Vercel CLI; there is no Git integration or hosted CI. Link the checkout once with `pnpm exec vercel link`, then run `pnpm deploy:preview` or `pnpm deploy:prod`. Each deploy:

1. runs `pnpm check` and the local E2E suite
2. pulls the target environment's variables from Vercel
3. applies pending database migrations to that environment
4. builds locally and uploads the prebuilt output
5. runs the E2E suite against the new deployment

Set `VERCEL_AUTOMATION_BYPASS_SECRET` if deployment protection is enabled so the post-deploy tests can reach the site.

## Schema changes

Payload syncs schema automatically in development, but deployed environments only change through migrations. After editing `src/payload.config.ts`:

1. `pnpm generate:types`
2. stop the dev server, then `pnpm migrate:create <description>`
3. review and commit the generated files in `src/migrations/`; never edit a migration once committed
