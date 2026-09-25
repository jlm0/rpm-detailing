import { Suspense, type ComponentProps } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getGlobalSettings, getMediaUrl } from '@/lib/payload'
import { defaultValues, defaultTeamMembers } from '@/lib/default-content'

import AboutPage from './about-page'

async function getAboutPageProps(): Promise<ComponentProps<typeof AboutPage>> {
  // Default navigation items if not in CMS
  const defaultNavigation = [
    { label: 'Home', link: '/', order: 1 },
    { label: 'Services', link: '/services', order: 2 },
    { label: 'About', link: '/about', order: 3 },
    { label: 'Testimonials', link: '#testimonials', order: 4 },
    { label: 'Contact', link: '#contact', order: 5 },
  ]

  try {
    const siteSettings = await getGlobalSettings('site-settings')
    const pageData = await getGlobalSettings('about-page')

    // Sort navigation by order field if it exists
    const navigation = siteSettings?.navigation ?? defaultNavigation
    const sortedNavigation =
      Array.isArray(navigation) && navigation.length > 0
        ? [...navigation]
            .flatMap((item) =>
              item.label && item.link
                ? [{ label: item.label, link: item.link, order: item.order || 0 }]
                : [],
            )
            .sort((a, b) => (a.order || 0) - (b.order || 0))
        : defaultNavigation

    return {
      heroTitle: pageData?.heroTitle || 'About RPM Detailing',
      heroSubtitle: pageData?.heroSubtitle || 'Your trusted partner in premium auto detailing',
      heroImage:
        pageData?.heroImage && typeof pageData.heroImage === 'object' && 'url' in pageData.heroImage
          ? pageData.heroImage.url || '/placeholder.svg'
          : '/placeholder.svg',
      heroImageAlt:
        pageData?.heroImage && typeof pageData.heroImage === 'object' && 'alt' in pageData.heroImage
          ? pageData.heroImage.alt || 'About hero background'
          : 'About hero background',
      storyTitle: pageData?.storyTitle || 'Our Story',
      storyContent:
        pageData?.storyContent ??
        'RPM Detailing was founded with a passion for excellence and a commitment to providing the highest quality auto detailing services.',
      storyImage:
        pageData?.storyImage &&
        typeof pageData.storyImage === 'object' &&
        'url' in pageData.storyImage
          ? pageData.storyImage.url || '/placeholder.svg'
          : '/placeholder.svg',
      storyImageAlt:
        pageData?.storyImage &&
        typeof pageData.storyImage === 'object' &&
        'alt' in pageData.storyImage
          ? pageData.storyImage.alt || 'Our story'
          : 'Our story',
      values:
        pageData?.values && pageData.values.length > 0
          ? pageData.values.map((v) => ({
              title: v.title || '',
              description: v.description || '',
              icon: v.icon || undefined,
            }))
          : defaultValues,
      valuesSectionTitle: pageData?.valuesSectionTitle || 'Our Core Values',
      valuesSectionSubtitle:
        pageData?.valuesSectionSubtitle ||
        'These principles guide everything we do and define who we are as a company',
      teamTitle: pageData?.teamTitle || 'Meet Our Team',
      teamSubtitle:
        pageData?.teamSubtitle || 'Dedicated professionals passionate about auto detailing',
      teamMembers:
        pageData?.teamMembers && pageData.teamMembers.length > 0
          ? pageData.teamMembers.map((m) => ({
              name: m.name || '',
              position: m.position || undefined,
              bio: m.bio || undefined,
              image:
                m.image && typeof m.image === 'object' && 'url' in m.image
                  ? { url: m.image.url || '', alt: m.image.alt || undefined }
                  : undefined,
            }))
          : defaultTeamMembers,
      ctaTitle: pageData?.ctaTitle || "Let's Work Together",
      ctaButtonText: pageData?.ctaButtonText || 'Get in Touch',
      ctaButtonLink: pageData?.ctaButtonLink || '/booking',
      headerProps: {
        logo: getMediaUrl(siteSettings?.darkLogo) || '/placeholder.svg',
        companyName: siteSettings?.companyName || 'RPM Detailing',
        navigation: sortedNavigation,
        headerCTA: {
          text: siteSettings?.headerCTA?.text || 'Book Now',
          link: siteSettings?.headerCTA?.link || '/booking',
          show: siteSettings?.headerCTA?.show ?? true,
        },
      },
      footerProps: {
        logo: getMediaUrl(siteSettings?.darkLogo) || '/placeholder.svg',
        companyName: siteSettings?.companyName || 'RPM Detailing',
        description: siteSettings?.description || undefined,
        phone: siteSettings?.phone || undefined,
        email: siteSettings?.email || undefined,
        address: siteSettings?.address || undefined,
        hours: siteSettings?.hours
          ? {
              weekdays: siteSettings.hours.weekdays || 'Mon - Fri: 8.00 am - 6.00 pm',
              saturday: siteSettings.hours.saturday || 'Saturday: 9.00 am - 4.00 pm',
              sunday: siteSettings.hours.sunday || 'Sunday: Closed',
            }
          : undefined,
        ctaHeading: siteSettings?.footerCTA?.heading || undefined,
        ctaText: siteSettings?.footerCTA?.text || undefined,
        ctaButtonText: siteSettings?.footerCTA?.buttonText || undefined,
        ctaButtonLink: siteSettings?.footerCTA?.buttonLink || undefined,
        copyright: siteSettings?.copyright || undefined,
      },
    }
  } catch (error) {
    console.error('Error loading about page:', error)
    // Return with default data
    return {
      heroTitle: 'About RPM Detailing',
      heroSubtitle: 'Your trusted partner in premium auto detailing',
      heroImage: '/placeholder.svg',
      storyTitle: 'Our Story',
      storyContent:
        'RPM Detailing was founded with a passion for excellence and a commitment to providing the highest quality auto detailing services.',
      storyImage: '/placeholder.svg',
      values: [],
      teamTitle: 'Meet Our Team',
      teamSubtitle: 'Dedicated professionals passionate about auto detailing',
      teamMembers: [],
      ctaTitle: "Let's Work Together",
      ctaButtonText: 'Get in Touch',
      ctaButtonLink: '/booking',
    }
  }
}

async function AboutPageContent() {
  const props = await getAboutPageProps()
  return <AboutPage {...props} />
}

export default function AboutPageWrapper() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<LoadingSpinner />}>
        <AboutPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}
