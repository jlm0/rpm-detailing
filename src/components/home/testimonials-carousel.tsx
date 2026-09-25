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
      <div className="mt-8 flex justify-end gap-2 md:mt-10">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous testimonial"
          onClick={scrollPrev}
          className="size-12 border-neutral-300 bg-transparent hover:border-brandInk hover:bg-brandInk hover:text-white"
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next testimonial"
          onClick={scrollNext}
          className="size-12 border-neutral-300 bg-transparent hover:border-brandInk hover:bg-brandInk hover:text-white"
        >
          <ArrowRight />
        </Button>
      </div>
    </>
  )
}
