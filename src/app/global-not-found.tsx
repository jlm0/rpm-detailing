import type { Metadata } from 'next'

import '@/app/globals.css'

import NotFound from './(frontend)/not-found'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="overflow-x-clip">
        <NotFound />
      </body>
    </html>
  )
}
