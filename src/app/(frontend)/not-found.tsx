import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getGlobal, image } from '@/lib/cms'

export default async function NotFound() {
  const { business, branding, notFound } = await getGlobal('site-settings')
  const logo = image(branding.logo, 'thumbnail')

  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden bg-brandInk text-white">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 w-[38%] bg-brandRed bg-grunge-texture bg-blend-multiply [clip-path:polygon(4.5rem_0,100%_0,100%_100%,0_100%)] max-md:hidden"
      />
      <header className="container mx-auto flex h-20 items-center px-4 md:px-8">
        <Link href="/" className="rounded-sm">
          {logo ? (
            <span className="relative block h-10 w-32">
              <Image
                src={logo.url}
                alt={logo.alt}
                fill
                className="object-contain object-left"
                sizes="128px"
              />
            </span>
          ) : (
            <span className="font-display text-lg font-bold">{business.name}</span>
          )}
        </Link>
      </header>

      <main className="container mx-auto flex flex-1 items-center px-4 pb-20 md:px-8">
        <div className="max-w-2xl animate-rise">
          <h1 className="bg-brandRed bg-grunge-texture bg-clip-text font-display text-[clamp(7rem,22vw,17rem)] leading-[0.85] font-bold tracking-[-0.05em] text-transparent [font-stretch:125%] bg-blend-multiply">
            404
          </h1>
          <h2 className="mt-8 text-3xl font-bold md:text-4xl">{notFound.title}</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/65">{notFound.message}</p>
          <Button asChild variant="brand" size="lg" className="mt-10 w-full sm:w-auto">
            <Link href="/">
              <ArrowLeft />
              {notFound.buttonLabel}
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
