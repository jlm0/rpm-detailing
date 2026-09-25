'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const headerOffset = 96

export function LivePreviewListener() {
  const router = useRouter()

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get('section')
    const target = section && document.getElementById(section)
    if (target) {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerOffset })
    }
  }, [])

  return (
    <RefreshRouteOnSave
      refresh={() => {
        router.refresh()
      }}
      serverURL={typeof window === 'undefined' ? '' : window.location.origin}
    />
  )
}
