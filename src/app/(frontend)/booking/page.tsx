import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import CalEmbed from '@/components/booking/cal-embed'
import { telHref } from '@/components/layout/contact'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import { getGlobal } from '@/lib/cms'
import { pageMetadata } from '@/lib/metadata'

export function generateMetadata() {
  return pageMetadata('booking-page', '/booking')
}

export default async function BookingPage() {
  const [{ calendar, content, calendarError, unavailable }, { business, branding }] =
    await Promise.all([getGlobal('booking-page'), getGlobal('site-settings')])

  if (!calendar.enabled) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brandLightGray p-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-brandDark">{unavailable.title}</h1>
        <p className="mb-8 text-brandMediumGray">
          {unavailable.message.replaceAll('{phone}', business.phone)}
        </p>
        <Button asChild variant="brand" size="lg">
          <Link href="/">{unavailable.buttonLabel}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brandLightGray">
      <header className="bg-brandDark py-4 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <Button asChild variant="ghost" className="-ml-3 text-white hover:bg-white/10">
            <Link href="/">
              <ArrowLeft />
              {content.backLabel}
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-8 md:py-12">
        <ScrollAnimate variantName="fadeInDown" className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-brandDark md:text-4xl lg:text-5xl">
            {content.title}
          </h1>
          <p className="mx-auto max-w-2xl text-brandMediumGray">
            {content.intro.replaceAll('{business}', business.name)}
          </p>
        </ScrollAnimate>

        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.2}
          className="mx-auto h-[600px] max-w-5xl overflow-auto rounded-lg bg-white p-4 shadow-xl md:h-[800px] md:p-8"
        >
          <CalEmbed
            calLink={calendar.calLink}
            eventSlug={calendar.eventSlug}
            brandColor={branding.brandColor}
            loadingText={content.loadingText}
            calendarError={calendarError}
            phone={business.phone}
          />
        </ScrollAnimate>

        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.4}
          className="mt-8 space-y-2 text-center md:space-y-4"
        >
          <p className="text-brandMediumGray">{content.helpText}</p>
          <p className="font-semibold text-brandDark">
            {content.phoneLabel}{' '}
            <a href={telHref(business.phone)} className="text-brandRed hover:underline">
              {business.phone}
            </a>
          </p>
          <p className="font-semibold text-brandDark">
            {content.emailLabel}{' '}
            <a href={`mailto:${business.email}`} className="text-brandRed hover:underline">
              {business.email}
            </a>
          </p>
        </ScrollAnimate>
      </main>
    </div>
  )
}
