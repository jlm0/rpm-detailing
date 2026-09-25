import type { Metadata, Viewport } from 'next'

import '@/app/globals.css'

import { ErrorCopyProvider } from '@/components/error-copy'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { MotionProvider } from '@/components/motion/motion-provider'
import { PreviewOverlay } from '@/components/preview-overlay'
import { getGlobal, isEditorPreview, isPreview } from '@/lib/cms'
import { fontVariables } from '@/lib/fonts'
import { icons } from '@/lib/icons'

export async function generateMetadata(): Promise<Metadata> {
  const { business, seo } = await getGlobal('site-settings')

  return {
    metadataBase: new URL(seo.siteUrl),
    title: { default: business.name, template: `%s ${seo.titleSuffix}` },
    robots: { index: true, follow: true },
    icons,
  }
}

export async function generateViewport(): Promise<Viewport> {
  const { branding } = await getGlobal('site-settings')
  return { themeColor: branding.brandColor }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [preview, editor, { business, errorPage }] = await Promise.all([
    isPreview(),
    isEditorPreview(),
    getGlobal('site-settings'),
  ])

  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth">
      <body>
        <MotionProvider>
          <ErrorCopyProvider value={{ ...errorPage, businessName: business.name }}>
            <div className="overflow-x-clip">{children}</div>
          </ErrorCopyProvider>
        </MotionProvider>
        {preview && (
          <>
            <LivePreviewListener />
            <div className="fixed bottom-4 left-4 z-60 flex items-center gap-3 rounded-full bg-brandDark/90 px-4 py-2 text-sm text-neutral-300 shadow-lg backdrop-blur-xs">
              <span>Preview mode</span>
              {editor && <PreviewOverlay />}
              <a
                href="/next/exit-preview"
                className="font-semibold text-white transition-colors hover:text-brandRed"
              >
                Exit preview
              </a>
            </div>
          </>
        )}
      </body>
    </html>
  )
}
