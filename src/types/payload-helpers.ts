// Type helpers for Payload CMS data
export interface PayloadCollectionResult<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

// Global settings type with all possible fields
export interface SiteSettings {
  companyName?: string
  phone?: string
  email?: string
  address?: string
  logo?: {
    url: string
    alt?: string
  }
  darkLogo?: {
    url: string
    alt?: string
  }
  hours?: {
    weekdays?: string
    saturday?: string
    sunday?: string
  }
  description?: string
  copyright?: string
  calcom?: {
    enabled?: boolean
    link?: string
    eventSlug?: string
  }
  navigation?: Array<{
    label: string
    link: string
    order?: number
  }>
  contactInfo?: {
    additionalPhones?: Array<{
      number: string
      label?: string
    }>
  }
  yearsOfExperience?: number
  headerCTA?: {
    text: string
    link: string
    show: boolean
  }
  footerCTA?: {
    heading?: string
    text?: string
    buttonText?: string
    buttonLink?: string
  }
}