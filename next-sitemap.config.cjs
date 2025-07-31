// Determine the site URL based on environment
// Priority order:
// 1. NEXT_PUBLIC_SERVER_URL (if not localhost - for production override)
// 2. VERCEL_PROJECT_PRODUCTION_URL (Vercel's production domain)
// 3. VERCEL_URL (for preview deployments)
// 4. NEXT_PUBLIC_SERVER_URL (including localhost)
// 5. Fallback to localhost
const SITE_URL = (() => {
  // Skip localhost values for sitemap generation
  if (process.env.NEXT_PUBLIC_SERVER_URL && !process.env.NEXT_PUBLIC_SERVER_URL.includes('localhost')) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }
  
  // Vercel's production domain (when system env vars are enabled)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  
  // Vercel preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  // Fallback including localhost
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
})()

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/*', '/posts/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
}
