'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'

export function TestimonialsCarousel({ children }: { children: ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', duration: 30 })
  const jump = Boolean(useReducedMotion())

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev(jump)
  }, [emblaApi, jump])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext(jump)
  }, [emblaApi, jump])

  return (
    <>
      <div className="cursor-grab overflow-hidden active:cursor-grabbing" ref={emblaRef}>
        <div className="-ml-4 flex">{children}</div>
      </div>
      <div className="mt-8 flex justify-end gap-2 md:mt-10">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous testimonial"
          onClick={scrollPrev}
          className="size-12 border-neutral-300 bg-transparent hover:border-brandInk hover:bg-brandInk hover:text-white motion-safe:hover:[&_svg]:-translate-x-0.75"
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next testimonial"
          onClick={scrollNext}
          className="size-12 border-neutral-300 bg-transparent hover:border-brandInk hover:bg-brandInk hover:text-white motion-safe:hover:[&_svg]:translate-x-0.75"
        >
          <ArrowRight />
        </Button>
      </div>
    </>
  )
}
