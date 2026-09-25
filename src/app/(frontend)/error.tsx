'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brandLightGray">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brandRed sm:text-5xl">RPM DETAILING</h1>
        </div>

        <div className="max-w-xs px-4 sm:max-w-md">
          <h2 className="mb-4 text-3xl font-bold text-brandDark">Something went wrong</h2>
          <p className="mb-6 text-brandMediumGray">
            We apologize for the inconvenience. An unexpected error has occurred. Please try again
            or contact us if the problem persists.
          </p>

          <Button onClick={reset} className="w-full bg-brandRed hover:bg-brandRed/90">
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
