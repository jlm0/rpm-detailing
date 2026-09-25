import { Gutter } from '@payloadcms/ui'
import Link from 'next/link'
import type { AdminViewServerProps } from 'payload'

import { adminPath, pageSlugs, siteMap } from '@/lib/site-map'

const quickLinks = [
  {
    label: 'Services and pricing',
    detail: 'Packages, prices and what’s included',
    href: '/admin/collections/services',
  },
  {
    label: 'Reviews',
    detail: 'Customer reviews on the Home page',
    href: '/admin/collections/testimonials',
  },
  { label: 'Photos', detail: 'Every photo and logo on the site', href: '/admin/collections/media' },
  {
    label: 'Business details',
    detail: 'Phone, email, address and opening hours',
    href: adminPath('site-settings'),
  },
  { label: 'Header & menu', detail: 'The bar at the top of every page', href: adminPath('header') },
  { label: 'Footer', detail: 'The band at the bottom of every page', href: adminPath('footer') },
]

const publishingSteps = [
  {
    title: 'Edit',
    text: 'Your changes save as a draft while you type. Visitors don’t see drafts.',
  },
  {
    title: 'Preview',
    text: 'Open Live Preview to watch the page update beside the form, on phone, tablet or desktop.',
  },
  {
    title: 'Publish',
    text: 'Press Publish changes. The live site updates within a few seconds.',
  },
  {
    title: 'Undo',
    text: 'History keeps the last 25 versions of every page, so you can restore any of them.',
  },
]

export async function Dashboard({ payload, user }: AdminViewServerProps) {
  const statuses = await Promise.all(
    pageSlugs.map(async (slug) => {
      const latest = await payload.findGlobal({ slug, draft: true, depth: 0 })
      return latest._status === 'draft'
    }),
  )
  const name = user && 'name' in user && typeof user.name === 'string' ? user.name : undefined

  return (
    <Gutter className="rpm-dashboard">
      <header className="rpm-dashboard__welcome">
        <p className="rpm-dashboard__eyebrow">RPM Detailing website</p>
        <h1>{name ? `Welcome back, ${name}` : 'Welcome back'}</h1>
        <p>
          Pick a page to edit. Each page is laid out in the same order as the site, top to bottom,
          so you always know where a change will appear.
        </p>
      </header>

      <section className="rpm-dashboard__section" aria-labelledby="rpm-pages">
        <h2 id="rpm-pages">Your pages</h2>
        <ul className="rpm-dashboard__pages">
          {pageSlugs.map((slug, index) => {
            const { label, path, summary, sections } = siteMap[slug]
            const hasDraft = statuses[index]
            return (
              <li key={slug} className="rpm-page-card">
                <div className="rpm-page-card__head">
                  <h3>{label}</h3>
                  <span
                    className={`document-status__pill document-status__pill--${hasDraft ? 'changed' : 'live'}`}
                  >
                    {hasDraft ? 'Unpublished changes' : 'Live'}
                  </span>
                </div>
                <p className="rpm-page-card__summary">{summary}</p>
                <p className="rpm-page-card__sections">
                  {Object.entries(sections)
                    .filter(([key]) => key !== 'meta')
                    .map(([, section]) => section.label)
                    .join(' · ')}
                </p>
                <div className="rpm-page-card__actions">
                  <Link
                    className="rpm-button rpm-button--primary"
                    href={adminPath(slug)}
                    aria-label={`Edit the ${label} page`}
                  >
                    Edit
                  </Link>
                  <a
                    className="rpm-button"
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View the live ${label} page`}
                  >
                    View live
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <div className="rpm-dashboard__columns">
        <section className="rpm-dashboard__section" aria-labelledby="rpm-quick-links">
          <h2 id="rpm-quick-links">Quick links</h2>
          <ul className="rpm-dashboard__links">
            {quickLinks.map(({ label, detail, href }) => (
              <li key={href}>
                <Link href={href}>
                  <span className="rpm-dashboard__link-label">{label}</span>
                  <span className="rpm-dashboard__link-detail">{detail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rpm-dashboard__section" aria-labelledby="rpm-publishing">
          <h2 id="rpm-publishing">How publishing works</h2>
          <ol className="rpm-dashboard__steps">
            {publishingSteps.map(({ title, text }) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
          <p className="rpm-dashboard__note">
            Every field has a character limit and help text underneath. They keep the design looking
            right on phones, so if something can’t be published, the field and its tab turn red and
            tell you why.
          </p>
        </section>
      </div>
    </Gutter>
  )
}
