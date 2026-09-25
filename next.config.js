import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const isDev = process.env.NODE_ENV === 'development'
const servedOverHttp = process.env.NEXT_PUBLIC_SERVER_URL?.startsWith('http://') ?? false

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}https://app.cal.com https://*.cal.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://app.cal.com https://*.cal.com https://vercel.com https://*.blob.vercel-storage.com",
  "frame-src 'self' https://app.cal.com https://*.cal.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev || servedOverHttp ? [] : ['upgrade-insecure-requests']),
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  experimental: {
    globalNotFound: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    '/og/[page]': ['./src/assets/fonts/*.ttf'],
  },
  reactStrictMode: true,
  redirects,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
