'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'

export function TestimonialsCarousel({ children }: { children: ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">{children}</div>
      </div>
      <div className="mt-8 flex justify-center gap-4 md:mt-12">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous testimonial"
          onClick={scrollPrev}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Next testimonial" onClick={scrollNext}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
