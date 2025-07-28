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
    // Log the error to console (in production, this would go to error tracking)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brandLightGray">
      <div className="text-center">
        {/* Logo placeholder */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brandRed">RPM DETAILING</h1>
        </div>
        
        {/* Error content */}
        <div className="max-w-md px-4">
          <h2 className="mb-4 text-3xl font-bold text-brandDark">
            Something went wrong
          </h2>
          <p className="mb-6 text-brandMediumGray">
            We apologize for the inconvenience. An unexpected error has occurred. 
            Please try again or contact us if the problem persists.
          </p>
          
          <div className="space-y-4">
            <Button
              onClick={reset}
              className="w-full bg-brandRed hover:bg-brandRed/90"
            >
              Try again
            </Button>
            
            <div className="text-sm text-brandMediumGray">
              <p>Need help? Contact us:</p>
              <p className="font-semibold">(425) 345-3564</p>
              <p>info@rpmdetailing.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}