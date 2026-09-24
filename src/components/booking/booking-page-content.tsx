'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'

import CalEmbed from './cal-embed'

interface BookingPageContentProps {
  calLink: string
  eventSlug?: string
  companyName: string
  phone?: string
  email?: string
}

export default function BookingPageContent({
  calLink,
  eventSlug,
  companyName,
  phone,
  email,
}: BookingPageContentProps) {
  return (
    <div className="min-h-screen bg-brandLightGray">
      {/* Header */}
      <header className="bg-brandDark py-4 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-brandRed">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:px-8 md:py-12">
        <ScrollAnimate variantName="fadeInDown" className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-brandDark md:text-4xl lg:text-5xl">
            Book Your Detailing Service
          </h1>
          <p className="mx-auto max-w-2xl text-brandMediumGray">
            Schedule your professional car detailing appointment with {companyName}. Choose a
            convenient time and we&apos;ll take care of the rest.
          </p>
        </ScrollAnimate>

        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.2}
          className="mx-auto h-[600px] max-w-5xl overflow-auto rounded-lg bg-white p-4 shadow-xl md:h-[800px] md:p-8"
        >
          <CalEmbed calLink={calLink} eventSlug={eventSlug} />
        </ScrollAnimate>

        {/* Contact Information */}
        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.4}
          className="mt-8 space-y-2 text-center md:space-y-4"
        >
          <p className="text-brandMediumGray">Having trouble booking? Contact us directly:</p>
          {phone && (
            <p className="font-semibold text-brandDark">
              Phone:{' '}
              <a href={`tel:${phone}`} className="text-brandRed hover:underline">
                {phone}
              </a>
            </p>
          )}
          {email && (
            <p className="font-semibold text-brandDark">
              Email:{' '}
              <a href={`mailto:${email}`} className="text-brandRed hover:underline">
                {email}
              </a>
            </p>
          )}
        </ScrollAnimate>
      </main>
    </div>
  )
}
