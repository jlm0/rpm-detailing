import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import CalEmbed from '@/components/booking/cal-embed'
import { telHref } from '@/components/layout/contact'
import Reveal from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { getGlobal, image } from '@/lib/cms'
import { pageMetadata } from '@/lib/metadata'

export function generateMetadata() {
  return pageMetadata('booking-page', '/booking')
}

export default async function BookingPage() {
  const [{ calendar, content, calendarError, unavailable }, { business, branding }] =
    await Promise.all([getGlobal('booking-page'), getGlobal('site-settings')])

  if (!calendar.enabled) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-brandInk p-4 text-center text-white">
        <h1 className="mb-4 max-w-2xl text-4xl font-bold md:text-5xl">{unavailable.title}</h1>
        <p className="mb-10 max-w-md leading-relaxed text-white/65">
          {unavailable.message.replaceAll('{phone}', business.phone)}
        </p>
        <Button asChild variant="brand" size="lg">
          <Link href="/">{unavailable.buttonLabel}</Link>
        </Button>
      </div>
    )
  }

  const logo = image(branding.logo, 'thumbnail')
  const contactLinkClass =
    'font-semibold text-brandInk underline decoration-brandRed/40 underline-offset-4 transition-colors hover:text-brandRed hover:decoration-brandRed'

  return (
    <div className="min-h-svh bg-brandLightGray">
      <div className="bg-brandInk bg-grain pb-40 text-white md:pb-48">
        <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
          <Button
            asChild
            variant="ghost"
            className="-ml-3 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link href="/">
              <ArrowLeft />
              {content.backLabel}
            </Link>
          </Button>
          {logo && (
            <span className="relative block h-10 w-28">
              <Image
                src={logo.url}
                alt={logo.alt}
                fill
                className="object-contain object-right"
                sizes="112px"
              />
            </span>
          )}
        </header>

        <div className="container mx-auto px-4 pt-10 md:px-8 md:pt-16">
          <div className="mx-auto max-w-5xl animate-rise">
            <h1 className="max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.03em] [font-stretch:118%]">
              {content.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {content.intro.replaceAll('{business}', business.name)}
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto -mt-28 px-4 pb-20 md:-mt-36 md:px-8">
        <div className="mx-auto h-[600px] max-w-5xl animate-rise overflow-auto rounded-xl bg-white p-3 shadow-[0_40px_80px_-40px_rgb(17_17_17/0.5)] ring-1 ring-black/5 enter-step-2 md:h-[800px] md:p-6">
          <CalEmbed
            calLink={calendar.calLink}
            eventSlug={calendar.eventSlug}
            brandColor={branding.brandColor}
            loadingText={content.loadingText}
            calendarError={calendarError}
            phone={business.phone}
          />
        </div>

        <Reveal className="mx-auto mt-6 flex max-w-5xl flex-col gap-4 rounded-xl bg-white p-6 ring-1 ring-black/5 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-brandMediumGray">{content.helpText}</p>
          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-8">
            <p className="text-brandMediumGray">
              {content.phoneLabel}{' '}
              <a href={telHref(business.phone)} className={`${contactLinkClass} tabular-nums`}>
                {business.phone}
              </a>
            </p>
            <p className="text-brandMediumGray">
              {content.emailLabel}{' '}
              <a href={`mailto:${business.email}`} className={contactLinkClass}>
                {business.email}
              </a>
            </p>
          </div>
        </Reveal>
      </main>
    </div>
  )
}
