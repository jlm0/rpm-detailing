// Type definitions for Payload CMS collections

export interface MediaItem {
  id: string
  url?: string
  alt?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}

export interface AboutPageData {
  id: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: MediaItem
  storyTitle?: string
  storyContent?: string
  storyImage?: MediaItem
  values?: Array<{
    id: string
    title?: string
    description?: string
    icon?: string
  }>
  teamTitle?: string
  teamSubtitle?: string
  teamMembers?: Array<{
    id: string
    name?: string
    position?: string
    bio?: string
    image?: MediaItem
  }>
  ctaTitle?: string
  ctaButtonText?: string
  ctaButtonLink?: string
}

export interface CTABannerData {
  id: string
  heading?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  backgroundImage?: MediaItem
  preHeading?: string
  ctaItems?: Array<{
    id: string
    title?: string
    description?: string
    iconName?: string
  }>
}

export interface ServicesPageData {
  id: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: MediaItem
  services?: Array<{
    id: string
    title?: string
    description?: string
    price?: string
    features?: string[]
    icon?: string
    image?: MediaItem
  }>
  ctaTitle?: string
  ctaText?: string
  ctaButtonText?: string
  ctaButtonLink?: string
}

export interface ProcessStep {
  id: string
  order?: number
  title?: string
  description?: string
  active?: boolean
  image?: MediaItem
}

export interface PackageItem {
  id: string
  name?: string
  price?: string
  duration?: string
  description?: string
  features?: string[]
  isPopular?: boolean
  image?: MediaItem
}

export interface ServiceBarItem {
  id: string
  title?: string
  icon?: string
  description?: string
}

export interface TestimonialItem {
  id: string
  name?: string
  rating?: number
  review?: string
  date?: string
  image?: MediaItem
}

export interface StatItem {
  id: string
  value?: string
  label?: string
  icon?: string
}

export interface AboutContentData {
  id: string
  title?: string
  subtitle?: string
  description?: string
  features?: Array<{
    id: string
    title?: string
    description?: string
  }>
  images?: MediaItem[]
}

export interface HeroContentData {
  id: string
  headline?: string
  subheadline?: string
  buttonText?: string
  buttonLink?: string
  backgroundImage?: MediaItem
  stats?: Array<{
    id: string
    value?: string
    label?: string
  }>
}