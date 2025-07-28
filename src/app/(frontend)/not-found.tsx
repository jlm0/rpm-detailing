import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brandLightGray">
      <div className="text-center">
        {/* Logo placeholder */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brandRed">RPM DETAILING</h1>
        </div>
        
        {/* Error content */}
        <div className="max-w-md px-4">
          <h2 className="mb-2 text-6xl font-bold text-brandDark">404</h2>
          <h3 className="mb-4 text-2xl font-semibold text-brandDark">
            Page Not Found
          </h3>
          <p className="mb-8 text-brandMediumGray">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved or doesn&apos;t exist.
          </p>
          
          <Link href="/">
            <Button className="bg-brandRed hover:bg-brandRed/90">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}