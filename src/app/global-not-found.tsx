import type { Metadata } from 'next'

import '@/app/globals.css'

import { getGlobal } from '@/lib/cms'

import NotFound from './(frontend)/not-found'

export async function generateMetadata(): Promise<Metadata> {
  const { notFound, seo } = await getGlobal('site-settings')
  return { title: `${notFound.title} ${seo.titleSuffix}` }
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
