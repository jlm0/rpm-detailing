'use client'

import { useEffect } from 'react'

import { useErrorCopy } from '@/components/error-copy'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const copy = useErrorCopy()

  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  if (!copy) return null

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-brandInk px-4 text-center text-white">
      <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-brandRedBright uppercase">
        {copy.businessName}
      </p>
      <h1 className="mb-4 max-w-2xl text-4xl font-bold md:text-5xl">{copy.title}</h1>
      <p className="mb-10 max-w-md leading-relaxed text-white/65">{copy.message}</p>
      <Button onClick={reset} variant="brand" size="lg" className="w-full sm:w-auto">
        {copy.retryLabel}
      </Button>
    </div>
  )
}
