'use client'

import {
  FormSubmit,
  toast,
  useConfig,
  useDocumentInfo,
  useEditDepth,
  useForm,
  useFormModified,
  useHotkey,
} from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'

import { livePath } from '@/lib/site-map'

function PublishedToast({ href }: { href: string | null }) {
  return (
    <div className="publish-toast">
      <p>
        <strong>Published successfully.</strong> Your changes are live on the site within a few
        seconds.
      </p>
      {href && (
        <a href={href} target="_blank" rel="noopener noreferrer">
          View live
        </a>
      )}
    </div>
  )
}

export function PublishButton() {
  const {
    id,
    collectionSlug,
    globalSlug,
    hasPublishedDoc,
    hasPublishPermission,
    setHasPublishedDoc,
    setMostRecentVersionIsAutosaved,
    setUnpublishedVersionCount,
    unpublishedVersionCount,
    uploadStatus,
  } = useDocumentInfo()
  const {
    config: {
      routes: { api },
    },
  } = useConfig()
  const { submit } = useForm()
  const modified = useFormModified()
  const editDepth = useEditDepth()

  const resource: `/${string}` = globalSlug
    ? `/globals/${globalSlug}`
    : `/${String(collectionSlug)}${id ? `/${String(id)}` : ''}`
  const endpoint = (query: string) =>
    formatAdminURL({ apiRoute: api, path: `${resource}?${query}` })

  useHotkey({ cmdCtrlKey: true, editDepth, keyCodes: ['s'] }, (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (modified) {
      void submit({
        action: endpoint('depth=0&draft=true'),
        overrides: { _status: 'draft' },
        skipValidation: true,
      })
    }
  })

  if (!hasPublishPermission) return null

  const publish = async () => {
    if (uploadStatus === 'uploading') return
    const result = await submit({
      action: endpoint('depth=0'),
      overrides: { _status: 'published' },
      disableSuccessStatus: true,
    })
    if (!result?.res.ok) return
    setUnpublishedVersionCount(0)
    setMostRecentVersionIsAutosaved(false)
    setHasPublishedDoc(true)
    toast.success(<PublishedToast href={livePath({ collectionSlug, globalSlug, id })} />)
  }

  const canPublish =
    (modified || unpublishedVersionCount > 0 || !hasPublishedDoc) && uploadStatus !== 'uploading'

  return (
    <FormSubmit
      buttonId="action-save"
      disabled={!canPublish}
      onClick={() => void publish()}
      size="medium"
      type="button"
    >
      Publish changes
    </FormSubmit>
  )
}
