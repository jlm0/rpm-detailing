'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect, useState } from 'react'

import { telHref } from '@/components/layout/contact'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import type { BookingPage } from '@/payload-types'

interface CalEmbedProps {
  calLink: string
  eventSlug?: string | null
  brandColor: string
  loadingText: string
  calendarError: BookingPage['calendarError']
  phone: string
}

export default function CalEmbed({
  calLink,
  eventSlug,
  brandColor,
  loadingText,
  calendarError,
  phone,
}: CalEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    void (async function () {
      try {
        const cal = await getCalApi()
        cal('ui', {
          theme: 'light',
          cssVarsPerTheme: {
            light: {
              'cal-brand': brandColor,
              'cal-text': '#1f2937',
              'cal-text-subtle': '#6b7280',
              'cal-bg': '#f3f4f6',
              'cal-bg-subtle': '#ffffff',
              'cal-bg-muted': '#f9fafb',
              'cal-border': '#e5e7eb',
              'cal-border-subtle': '#f3f4f6',
            },
            dark: {
              'cal-brand': brandColor,
              'cal-text': '#ffffff',
              'cal-text-subtle': '#9ca3af',
              'cal-bg': '#1f2937',
              'cal-bg-subtle': '#111827',
              'cal-bg-muted': '#374151',
              'cal-border': '#4b5563',
              'cal-border-subtle': '#374151',
            },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        })
        setIsLoading(false)
      } catch (error) {
        console.error('Error initializing Cal.com:', error)
        setHasError(true)
        setIsLoading(false)
      }
    })()
  }, [brandColor])

  const calUrl = eventSlug ? `${calLink}/${eventSlug}` : calLink

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
    window.location.reload()
  }

  if (hasError) {
    return (
      <div className="flex h-full min-h-[600px] w-full items-center justify-center rounded-lg bg-brandLightGray md:min-h-[800px]">
        <div className="max-w-md p-8 text-center">
          <h3 className="mb-4 text-xl font-semibold text-brandDark">{calendarError.title}</h3>
          <p className="mb-6 text-brandMediumGray">{calendarError.message}</p>
          <div className="space-y-4">
            <Button onClick={handleRetry} className="w-full bg-brandRed hover:bg-brandRed/90">
              {calendarError.retryLabel}
            </Button>
            <div className="text-sm text-brandMediumGray">
              <p>{calendarError.callLabel}</p>
              <p className="text-lg font-semibold">
                <a href={telHref(phone)}>{phone}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full min-h-[600px] w-full md:min-h-[800px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-brandLightGray">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-brandMediumGray">{loadingText}</p>
          </div>
        </div>
      )}
      <Cal
        calLink={calUrl}
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ theme: 'light' }}
        onLoad={() => {
          setIsLoading(false)
        }}
      />
    </div>
  )
}
