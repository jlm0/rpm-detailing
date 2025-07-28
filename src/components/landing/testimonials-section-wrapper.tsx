import { Suspense } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getPayloadData } from '@/lib/payload'

import TestimonialsSection from './testimonials-section'

interface Testimonial {
  id: string
  name?: string
  title?: string
  review?: string
  avatar?: {
    url?: string
    alt?: string
  }
}

async function TestimonialsSectionData() {
  try {
    // Fetch testimonials from CMS
    const testimonialsData = await getPayloadData<Testimonial>('testimonials', {
      limit: 10,
      sort: '-createdAt',
    })
    
    // Default testimonials if CMS data not available
    const defaultTestimonials = [
      {
        name: "Mark Farell",
        title: "Client of Company",
        review: "The team at RPM is meticulous. My car hasn't looked this good since it left the showroom. The paint correction was flawless.",
        avatar: "/placeholder.svg?width=80&height=80",
      },
      {
        name: "Jessica Block",
        title: "Satisfied Customer",
        review: "Very impressed. Friendly, very efficient and knowledgeable. The interior detail was extremely thorough. Will call on them again.",
        avatar: "/placeholder.svg?width=80&height=80",
      },
      {
        name: "Nelly Popins",
        title: "Regular Client",
        review: "I'm on the RPM+ maintenance plan and it's worth every penny. My car always looks pristine, and the convenience is unbeatable.",
        avatar: "/placeholder.svg?width=80&height=80",
      },
    ]
    
    const testimonials = testimonialsData?.docs?.length 
      ? testimonialsData.docs.map(t => ({
          name: t.name || '',
          title: t.title || '',
          review: t.review || '',
          avatar: t.avatar?.url || "/placeholder.svg?width=80&height=80",
        }))
      : defaultTestimonials
    
    return <TestimonialsSection testimonials={testimonials} />
  } catch (error) {
    console.error('Error loading testimonials:', error)
    // Return with default testimonials on error
    const defaultTestimonials = [
      {
        name: "Mark Farell",
        title: "Client of Company",
        review: "The team at RPM is meticulous. My car hasn't looked this good since it left the showroom. The paint correction was flawless.",
        avatar: "/placeholder.svg?width=80&height=80",
      },
      {
        name: "Jessica Block",
        title: "Satisfied Customer",
        review: "Very impressed. Friendly, very efficient and knowledgeable. The interior detail was extremely thorough. Will call on them again.",
        avatar: "/placeholder.svg?width=80&height=80",
      },
      {
        name: "Nelly Popins",
        title: "Regular Client",
        review: "I'm on the RPM+ maintenance plan and it's worth every penny. My car always looks pristine, and the convenience is unbeatable.",
        avatar: "/placeholder.svg?width=80&height=80",
      },
    ]
    return <TestimonialsSection testimonials={defaultTestimonials} />
  }
}

function TestimonialsSectionLoading() {
  return (
    <div className="py-20 flex items-center justify-center bg-brandLightGray">
      <LoadingSpinner size="lg" />
    </div>
  )
}

export default function TestimonialsSectionWrapper() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<TestimonialsSectionLoading />}>
        <TestimonialsSectionData />
      </Suspense>
    </ErrorBoundary>
  )
}