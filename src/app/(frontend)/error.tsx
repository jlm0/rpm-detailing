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
    <div className="flex min-h-svh flex-col items-center justify-center bg-brandInk px-4 text-center text-white">
      <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-brandRedBright uppercase">
        RPM DETAILING
      </p>
      <h1 className="mb-4 text-4xl font-bold md:text-5xl">Something went wrong</h1>
      <p className="mb-10 max-w-md leading-relaxed text-white/65">
        We apologize for the inconvenience. An unexpected error has occurred. Please try again or
        contact us if the problem persists.
      </p>
      <Button onClick={reset} variant="brand" size="lg" className="w-full sm:w-auto">
        Try again
      </Button>
    </div>
  )
}
