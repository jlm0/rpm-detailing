import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getGlobal } from '@/lib/cms'

export default async function NotFound() {
  const { business, notFound } = await getGlobal('site-settings')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brandLightGray py-8">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brandRed">{business.name.toUpperCase()}</h1>
        </div>

        <div className="max-w-xs space-y-4 px-4 sm:max-w-md">
          <h2 className="text-4xl font-bold text-brandDark sm:text-6xl">404</h2>
          <h3 className="mb-4 text-2xl font-semibold text-brandDark">{notFound.title}</h3>
          <p className="mb-8 text-brandMediumGray">{notFound.message}</p>

          <Link href="/">
            <Button className="w-full bg-brandRed hover:bg-brandRed/90 sm:w-auto">
              {notFound.buttonLabel}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
