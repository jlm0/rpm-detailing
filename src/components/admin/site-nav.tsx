'use client'

import { Link, NavGroup } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'

import { adminPath, pageSlugs, siteMap, siteSlugs } from '@/lib/site-map'

const groups = [
  { label: 'Pages', slugs: pageSlugs },
  { label: 'Site', slugs: siteSlugs },
]

export function SiteNav() {
  const pathname = usePathname()

  return groups.map(({ label, slugs }) => (
    <NavGroup key={label} label={label}>
      {slugs.map((slug) => {
        const href = adminPath(slug)
        const active = pathname === href || pathname.startsWith(`${href}/`)
        return (
          <Link
            key={slug}
            id={`nav-global-${slug}`}
            className="nav__link"
            href={href}
            prefetch={false}
            aria-current={active ? 'page' : undefined}
          >
            {active && <div className="nav__link-indicator" />}
            <span className="nav__link-label">{siteMap[slug].label}</span>
          </Link>
        )
      })}
    </NavGroup>
  ))
}
