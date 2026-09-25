'use client'

import { useEffect, useState, type ReactNode } from 'react'

import ScrollAnimate from '@/components/motion/scroll-animate'
import type { HomePage } from '@/payload-types'

type Slides = NonNullable<HomePage['hero']['slides']>

export function HeroSlides({ slides, children }: { slides: Slides; children: ReactNode }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const currentSlide = slides.at(activeSlide)

  useEffect(() => {
    if (slides.length < 2) return
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [slides.length])

  return (
    <div className="relative w-full md:w-1/2 lg:w-2/5">
      <ScrollAnimate variantName="fadeInUp" delay={0.2}>
        <div className="flex min-h-[280px] flex-col justify-center lg:min-h-[320px]">
          <p className="mb-4 text-sm tracking-wider uppercase">{currentSlide?.eyebrow}</p>
          <h1 className="mb-8 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {currentSlide?.title}
          </h1>
        </div>
        {children}
      </ScrollAnimate>
      {slides.length > 1 && (
        <div className="absolute top-1/2 left-[-50px] hidden -translate-y-1/2 transform flex-col space-y-4 lg:flex">
          {slides.map((slide, index) => (
            <button
              key={slide.id ?? index}
              type="button"
              aria-label={slide.title}
              aria-current={activeSlide === index}
              onClick={() => {
                setActiveSlide(index)
              }}
              className={`block text-sm transition-all duration-300 ${
                activeSlide === index
                  ? 'scale-110 font-bold text-white'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
