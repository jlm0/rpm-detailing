'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import type { HomePage } from '@/payload-types'

type Slides = NonNullable<HomePage['hero']['slides']>

const SLIDE_DURATION_MS = 6500

const eyebrowClass = 'mb-5 text-xs font-semibold tracking-[0.2em] text-white/85 uppercase'
const titleClass =
  'text-[clamp(2.5rem,4.4vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.03em] [font-stretch:118%]'

export function HeroSlides({ slides, children }: { slides: Slides; children: ReactNode }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const currentSlide = slides.at(activeSlide)
  const rotates = slides.length > 1 && !paused && !reduceMotion

  useEffect(() => {
    if (!rotates) return
    const timeout = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [rotates, activeSlide, slides.length])

  return (
    <div
      className="animate-rise"
      onPointerEnter={() => {
        setPaused(true)
      }}
      onPointerLeave={() => {
        setPaused(false)
      }}
      onFocus={() => {
        setPaused(true)
      }}
      onBlur={() => {
        setPaused(false)
      }}
    >
      <div className="mb-10 grid">
        {slides.map((slide, index) => (
          <div key={slide.id ?? index} aria-hidden className="invisible col-start-1 row-start-1">
            <p className={eyebrowClass}>{slide.eyebrow}</p>
            <p className={titleClass}>{slide.title}</p>
          </div>
        ))}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeSlide}
            className="col-start-1 row-start-1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.3, ease: 'easeIn' } }}
          >
            <p className={eyebrowClass}>{currentSlide?.eyebrow}</p>
            <h1 className={titleClass}>{currentSlide?.title}</h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {children}

      {slides.length > 1 && (
        <div className="mt-10 flex gap-2">
          {slides.map((slide, index) => {
            const isActive = activeSlide === index
            return (
              <button
                key={slide.id ?? index}
                type="button"
                aria-label={slide.title}
                aria-current={isActive}
                onClick={() => {
                  setActiveSlide(index)
                }}
                className="group flex w-14 flex-col gap-2 py-2 text-left text-xs font-medium text-white/60 tabular-nums transition-colors hover:text-white aria-[current=true]:text-white"
              >
                {String(index + 1).padStart(2, '0')}
                <span className="relative h-0.5 w-full overflow-hidden bg-white/25">
                  <span
                    key={isActive && rotates ? `run-${String(activeSlide)}` : 'idle'}
                    className={cn(
                      'absolute inset-0 origin-left bg-white',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                      isActive && rotates && 'animate-[slide-progress_linear_both]',
                    )}
                    style={
                      isActive && rotates
                        ? { animationDuration: `${String(SLIDE_DURATION_MS)}ms` }
                        : undefined
                    }
                  />
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
