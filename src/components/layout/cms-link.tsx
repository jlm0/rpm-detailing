import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

type CmsLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { url: string }

export function CmsLink({ url, ...props }: CmsLinkProps) {
  if (url.startsWith('/')) return <Link href={url} {...props} />
  if (url.startsWith('#')) return <Link href={`/${url}`} {...props} />
  return <a href={url} {...props} />
}
