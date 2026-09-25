import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { getSafeRedirect } from 'payload/shared'

import config from '@payload-config'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = getSafeRedirect({ redirectTo: searchParams.get('path') ?? '/', fallbackTo: '/' })

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) return new Response('Sign in to preview changes', { status: 403 })

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
