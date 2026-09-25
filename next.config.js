import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

// Get the server URL for image configuration
const getServerURL = () => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      ...[getServerURL() /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.cal.com https://*.cal.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https: blob:;
              font-src 'self' data:;
              connect-src 'self' https://app.cal.com https://*.cal.com https://*.vercel.app https://www.rpmdetail.co https://rpmdetail.co http://localhost:3000;
              frame-src 'self' https://app.cal.com https://*.cal.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              upgrade-insecure-requests;
            `
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
        ],
      },
      {
        // Allow Cal.com embed to load in iframe
        source: '/booking',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
