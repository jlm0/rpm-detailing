# Vercel Environment Variables Setup

## Overview
This guide explains how to set up environment variables for the RPM Detailing project on Vercel.

## IMPORTANT: Enable System Environment Variables

Before proceeding, you MUST enable system environment variables in Vercel:

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to "Environment Variables" section
4. Enable "Automatically expose System Environment Variables"

This will make `VERCEL_PROJECT_PRODUCTION_URL` available, which automatically contains your custom domain.

## Environment Variables Required

### Production Environment
Set these variables in Vercel's Production environment:

```
# Database Configuration
DATABASE_URI=<your-database-uri>
DATABASE_URL=<your-database-url>
DATABASE_URL_UNPOOLED=<your-database-url-unpooled>

# Postgres Configuration
PGDATABASE=<your-database-name>
PGHOST=<your-host>
PGHOST_UNPOOLED=<your-host-unpooled>
PGPASSWORD=<your-password>
PGUSER=<your-username>
POSTGRES_DATABASE=<your-database-name>
POSTGRES_HOST=<your-host>
POSTGRES_PASSWORD=<your-password>
POSTGRES_PRISMA_URL=<your-prisma-url>
POSTGRES_URL=<your-postgres-url>
POSTGRES_URL_NON_POOLING=<your-postgres-url-non-pooling>
POSTGRES_URL_NO_SSL=<your-postgres-url-no-ssl>
POSTGRES_USER=<your-username>

# Neon Configuration
NEON_PROJECT_ID=<your-neon-project-id>

# Payload CMS Configuration
PAYLOAD_SECRET=<your-payload-secret>

# Stack Authentication Configuration
NEXT_PUBLIC_STACK_PROJECT_ID=<your-stack-project-id>
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=<your-stack-publishable-key>
STACK_SECRET_SERVER_KEY=<your-stack-secret-key>

# IMPORTANT: Set this to your production URL
NEXT_PUBLIC_SERVER_URL=https://www.rpmdetail.co
```

### Preview Environment
For preview deployments, use the same variables as production, but DO NOT set `NEXT_PUBLIC_SERVER_URL`. 
Vercel will automatically use the preview URL.

## How to Set Environment Variables in Vercel

### Using Vercel CLI

1. First, clear existing environment variables:
```bash
# Remove all environment variables from production
vercel env rm <variable-name> production

# Remove all environment variables from preview
vercel env rm <variable-name> preview
```

2. Add environment variables from your .env file:
```bash
# Add to production
vercel env add <variable-name> production

# Add to preview (same as production, except NEXT_PUBLIC_SERVER_URL)
vercel env add <variable-name> preview
```

3. For bulk operations, you can use:
```bash
# Pull current environment variables
vercel env pull

# After editing .env.production.local, push to Vercel
vercel env push production
```

### Using Vercel Dashboard

1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with the appropriate value
4. Select the environments (Production/Preview/Development)
5. Save changes

## Important Notes

1. **URL Resolution Priority**:
   - The system uses this priority order:
     1. `NEXT_PUBLIC_SERVER_URL` (manual override)
     2. `VERCEL_PROJECT_PRODUCTION_URL` (automatic - requires system env vars enabled)
     3. `VERCEL_URL` (automatic for preview deployments)
     4. Fallback to `http://localhost:3000`

2. **NEXT_PUBLIC_SERVER_URL**: 
   - Currently needed because system environment variables are NOT enabled
   - Once you enable system env vars, this becomes optional
   - Production: Set to `https://www.rpmdetail.co`
   - Preview: Leave unset - Vercel will use the preview URL automatically
   - Local: Uses `http://localhost:3000` from your .env file

3. **Vercel Automatic Variables**:
   - `VERCEL_URL`: Automatically set by Vercel for each deployment
   - `VERCEL_ENV`: Automatically set to 'production', 'preview', or 'development'
   - `VERCEL_PROJECT_PRODUCTION_URL`: Your production domain

4. **Sitemap Generation**:
   The next-sitemap.config.cjs is configured to:
   - Use NEXT_PUBLIC_SERVER_URL if set (and not localhost)
   - Fall back to VERCEL_PROJECT_PRODUCTION_URL for production
   - Use VERCEL_URL for preview deployments
   - Default to localhost for local development

## Verification

After setting up environment variables:

1. Deploy to Vercel
2. Check the build logs for the sitemap generation output
3. Verify the sitemap uses the correct URL (not localhost)
4. Access `/sitemap.xml` on your deployed site to confirm