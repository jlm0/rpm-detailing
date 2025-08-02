import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getGlobalSettings } from '@/lib/payload'

export default async function NotFound() {
  const siteSettings = await getGlobalSettings('site-settings')
  const companyName = siteSettings?.companyName || 'RPM DETAILING'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brandLightGray py-8">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brandRed">{companyName.toUpperCase()}</h1>
        </div>

        <div className="max-w-xs sm:max-w-md px-4 space-y-4">
          <h2 className="text-4xl sm:text-6xl font-bold text-brandDark">404</h2>
          <h3 className="mb-4 text-2xl font-semibold text-brandDark">Page Not Found</h3>
          <p className="mb-8 text-brandMediumGray">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved
            or doesn&apos;t exist.
          </p>

          <Link href="/">
            <Button className="w-full sm:w-auto bg-brandRed hover:bg-brandRed/90">Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
