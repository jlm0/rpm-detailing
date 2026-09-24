import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getGlobalSettings } from '@/lib/payload'

import BookingPageContent from './booking-page-content'

export default async function BookingPageWrapper() {
  const siteSettings = await getGlobalSettings('site-settings')

  const calcomConfig = siteSettings?.calcom || {}

  // If Cal.com is not enabled or configured, show a fallback
  if (!calcomConfig.enabled || !calcomConfig.link) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brandLightGray p-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-brandDark">
          {calcomConfig.fallbackTitle || 'Book Your Detailing Service'}
        </h1>
        <p className="mb-8 text-brandMediumGray">
          {calcomConfig.fallbackMessage ||
            `Online booking is currently unavailable. Please contact us directly at ${siteSettings?.phone || '(425) 345-3564'} to schedule your appointment.`}
        </p>
        <Link href="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <BookingPageContent
      calLink={calcomConfig.link}
      eventSlug={calcomConfig.eventSlug || undefined}
      companyName={siteSettings?.companyName || 'RPM Detailing'}
      phone={siteSettings?.phone || undefined}
      email={siteSettings?.email || undefined}
    />
  )
}
