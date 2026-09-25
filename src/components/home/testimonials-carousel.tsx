'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useSyncExternalStore, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'

interface TestimonialsCarouselProps {
  children: ReactNode
  previousLabel: string
  nextLabel: string
}

export function TestimonialsCarousel({
  children,
  previousLabel,
  nextLabel,
}: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', duration: 30 })
  const jump = Boolean(useReducedMotion())

  const subscribe = useCallback(
    (notify: () => void) => {
      emblaApi?.on('reInit', notify).on('select', notify)
      return () => {
        emblaApi?.off('reInit', notify).off('select', notify)
      }
    },
    [emblaApi],
  )
  const scrollable = useSyncExternalStore(
    subscribe,
    () => !emblaApi || emblaApi.canScrollPrev() || emblaApi.canScrollNext(),
    () => true,
  )

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev(jump)
  }, [emblaApi, jump])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext(jump)
  }, [emblaApi, jump])

  return (
    <>
      <div
        className={
          scrollable ? 'cursor-grab overflow-hidden active:cursor-grabbing' : 'overflow-hidden'
        }
        ref={emblaRef}
      >
        <div className="-ml-4 flex">{children}</div>
      </div>
      {scrollable && (
        <div className="mt-8 flex justify-end gap-2 md:mt-10">
          <Button
            variant="outline"
            size="icon"
            aria-label={previousLabel}
            onClick={scrollPrev}
            className="size-12 border-neutral-300 bg-transparent hover:border-brandInk hover:bg-brandInk hover:text-white motion-safe:hover:[&_svg]:-translate-x-0.75"
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={nextLabel}
            onClick={scrollNext}
            className="size-12 border-neutral-300 bg-transparent hover:border-brandInk hover:bg-brandInk hover:text-white motion-safe:hover:[&_svg]:translate-x-0.75"
          >
            <ArrowRight />
          </Button>
        </div>
      )}
    </>
  )
}
