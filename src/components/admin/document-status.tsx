'use client'

import { ExternalLinkIcon, useDocumentInfo } from '@payloadcms/ui'

import { livePath } from '@/lib/site-map'

const states = {
  draft: {
    label: 'Not published yet',
    hint: 'Only you can see this. Publish to put it on the site.',
  },
  changed: {
    label: 'Unpublished changes',
    hint: 'Your edits are saved as a draft. Visitors still see the published version.',
  },
  live: { label: 'Live', hint: 'Visitors see exactly what is here.' },
}

export function DocumentStatus() {
  const { id, collectionSlug, globalSlug, hasPublishedDoc, unpublishedVersionCount } =
    useDocumentInfo()
  const path = livePath({ collectionSlug, globalSlug, id })
  if (!path) return null

  const state = !hasPublishedDoc ? 'draft' : unpublishedVersionCount > 0 ? 'changed' : 'live'
  const { label, hint } = states[state]

  return (
    <div className="document-status">
      <span
        className={`document-status__pill document-status__pill--${state}`}
        title={hint}
        role="status"
      >
        {label}
      </span>
      {hasPublishedDoc && (
        <a className="document-status__live" href={path} target="_blank" rel="noopener noreferrer">
          View live page
          <ExternalLinkIcon />
        </a>
      )}
    </div>
  )
}
