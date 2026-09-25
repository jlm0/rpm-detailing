export interface SiteSection {
  label: string
  where: string
  anchor?: string
  collection?: { slug: string; label: string }
}

export interface SitePart {
  label: string
  path: string
  summary: string
  outline?: { items: string[]; active: number } | false
  sections: Record<string, SiteSection>
}

const packagesList = { slug: 'services', label: 'Service Packages' }
const reviewsList = { slug: 'testimonials', label: 'Reviews' }
const brandsList = { slug: 'brands', label: 'Brands' }

const seo: SiteSection = {
  label: 'SEO',
  where: 'Not on the page itself. How it looks in Google results and when a link is shared.',
}

export const siteMap = {
  'home-page': {
    label: 'Home',
    path: '/',
    summary: 'The first page visitors see, from the hero down to the car brands.',
    sections: {
      hero: {
        label: 'Hero',
        where: 'The big photo and rotating headlines at the very top.',
      },
      servicesBar: {
        label: 'Services strip',
        where: 'The dark row of service icons right under the hero.',
      },
      about: {
        label: 'About',
        where: 'Your photo, years of experience badge and short story.',
        anchor: 'about',
      },
      transformation: {
        label: 'Transformation',
        where: 'Ticked points beside three photos, straight after About.',
      },
      packages: {
        label: 'Packages',
        where: 'The package cards with prices. Prices come from Service Packages.',
        anchor: 'services',
        collection: packagesList,
      },
      ctaBanner: {
        label: 'Booking steps',
        where: 'The red band with three steps to book.',
      },
      process: {
        label: 'Process',
        where: 'The photo tabs that walk through each step, with stats underneath.',
      },
      testimonials: {
        label: 'Reviews',
        where: 'The customer review carousel. The reviews themselves are in Reviews.',
        anchor: 'testimonials',
        collection: reviewsList,
      },
      brands: {
        label: 'Brands',
        where: 'The car brand logos on the dark band just above the footer.',
        anchor: 'brands',
        collection: brandsList,
      },
      meta: seo,
    },
  },
  'services-page': {
    label: 'Services',
    path: '/services',
    summary: 'Every package in full, with prices and what’s included.',
    sections: {
      hero: { label: 'Hero', where: 'The photo and heading at the top of the Services page.' },
      labels: {
        label: 'Packages',
        where: 'The words around each package. The packages themselves are in Service Packages.',
        collection: packagesList,
      },
      cta: { label: 'Booking banner', where: 'The red band at the bottom, above the footer.' },
      meta: seo,
    },
  },
  'about-page': {
    label: 'About',
    path: '/about',
    summary: 'Your story, what you stand for and the team.',
    sections: {
      hero: { label: 'Hero', where: 'The photo and heading at the top of the About page.' },
      story: { label: 'Story', where: 'Your story beside a photo, straight after the hero.' },
      values: { label: 'Values', where: 'The dark band of values with icons.' },
      team: { label: 'Team', where: 'The team photos and bios. Hidden when empty.' },
      cta: { label: 'Booking banner', where: 'The red band at the bottom, above the footer.' },
      meta: seo,
    },
  },
  'booking-page': {
    label: 'Booking',
    path: '/booking',
    summary: 'The online booking calendar and what shows around it.',
    sections: {
      content: {
        label: 'Page text',
        where: 'The heading at the top and the help box under the calendar.',
      },
      calendar: { label: 'Calendar', where: 'The Cal.com calendar in the middle of the page.' },
      calendarError: {
        label: 'Calendar error',
        where: 'Replaces the calendar only if it fails to load.',
      },
      unavailable: {
        label: 'Booking off',
        where: 'Replaces the whole page while online booking is turned off.',
      },
      meta: seo,
    },
  },
  header: {
    label: 'Header & Menu',
    path: '/',
    summary: 'The bar at the top of every page.',
    outline: { items: ['Header', 'Page', 'Footer'], active: 0 },
    sections: {
      menu: { label: 'Menu', where: 'The links across the top of every page.' },
      button: { label: 'Header button', where: 'The red button at the top right.' },
      phoneMenu: {
        label: 'Phone menu',
        where: 'The menu that slides in on phones and tablets.',
      },
      contactPopup: {
        label: 'Contact popup',
        where:
          'Opens from a menu item set to Open contact popup. Contact details and hours come from Business & SEO.',
      },
    },
  },
  footer: {
    label: 'Footer',
    path: '/',
    summary: 'The dark band at the bottom of every page.',
    outline: { items: ['Header', 'Page', 'Footer'], active: 2 },
    sections: {
      intro: { label: 'Intro', where: 'The short text under your logo, bottom left.' },
      contact: { label: 'Contact & hours', where: 'The two headings in the middle columns.' },
      booking: { label: 'Booking box', where: 'The boxed button on the right.' },
      copyright: { label: 'Copyright', where: 'The small line at the very bottom.' },
    },
  },
  'site-settings': {
    label: 'Business & SEO',
    path: '/',
    summary: 'Details used across every page.',
    outline: false,
    sections: {
      business: {
        label: 'Business details',
        where: 'The hero, footer, contact popup and booking page.',
      },
      branding: {
        label: 'Logo & colour',
        where: 'The logo in the header and footer, and the colour of the booking calendar.',
      },
      notFound: { label: '404 page', where: 'Shown when someone opens a link that doesn’t exist.' },
      errorPage: { label: 'Error page', where: 'Shown only if a page fails to load.' },
      seo: {
        label: 'Search & sharing',
        where: 'Not on the page itself. Defaults for Google results and shared links.',
      },
    },
  },
} satisfies Record<string, SitePart>

export type SiteSlug = keyof typeof siteMap

export const pageSlugs = ['home-page', 'services-page', 'about-page', 'booking-page'] as const
export const siteSlugs = ['header', 'footer', 'site-settings'] as const

export const siteSection = (slug: SiteSlug, name: string) => {
  const section = (siteMap[slug] as SitePart).sections[name]
  if (!section) throw new Error(`The ${slug} site map has no ${name} section`)
  return section
}

export const trail = (...parts: string[]) => parts.join(' › ')

export const outlineFor = (slug: SiteSlug, name: string) => {
  const part: SitePart = siteMap[slug]
  if (part.outline !== undefined) return part.outline || undefined
  const items = Object.entries(part.sections)
    .filter(([key]) => key !== 'meta')
    .map(([, section]) => section.label)
  const active = items.indexOf(part.sections[name]?.label ?? '')
  return active === -1 ? undefined : { items, active }
}

export const adminPath = (slug: string, id?: number | string) =>
  id === undefined ? `/admin/globals/${slug}` : `/admin/collections/${slug}/${String(id)}`

export const serviceAnchor = (id: number | string) => `package-${String(id)}`

const collectionTargets: Record<string, { path: string; anchor: string }> = {
  testimonials: { path: '/', anchor: 'testimonials' },
  brands: { path: '/', anchor: 'brands' },
}

interface Entity {
  globalSlug?: string
  collectionSlug?: string
  id?: number | string
}

export const liveTarget = ({ globalSlug, collectionSlug, id }: Entity) => {
  if (globalSlug && globalSlug in siteMap) return { path: siteMap[globalSlug as SiteSlug].path }
  if (collectionSlug === 'services') {
    return { path: '/services', anchor: id === undefined ? undefined : serviceAnchor(id) }
  }
  return collectionSlug ? collectionTargets[collectionSlug] : undefined
}

export const livePath = (entity: Entity) => {
  const target = liveTarget(entity)
  if (!target) return null
  return target.anchor ? `${target.path}#${target.anchor}` : target.path
}
