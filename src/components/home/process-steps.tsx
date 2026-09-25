'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useId, useRef, useState, type KeyboardEvent } from 'react'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'

import type { CmsImage } from './types'

export interface ProcessStep {
  title: string
  image: CmsImage
}

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()
  const active = Math.min(selected, steps.length - 1)
  const activeStep = steps.at(active)

  if (!activeStep) return null

  const select = (index: number, focus = false) => {
    const next = (index + steps.length) % steps.length
    setSelected(next)
    if (focus) tabs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowLeft: active - 1,
      ArrowRight: active + 1,
      Home: 0,
      End: steps.length - 1,
    }
    const target = moves[event.key]
    if (target === undefined) return
    event.preventDefault()
    select(target, true)
  }

  const tabId = (index: number) => `${id}-tab-${String(index)}`
  const panelId = `${id}-panel`

  return (
    <>
      <ScrollAnimate
        variantName="fadeInUp"
        delay={0.1}
        className="mb-8 flex items-center justify-center space-x-2 sm:space-x-4"
      >
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous step"
          aria-controls={panelId}
          onClick={() => {
            select(active - 1)
          }}
          className="text-brandDark hover:bg-neutral-200"
        >
          <ChevronLeft />
        </Button>
        <div
          role="tablist"
          onKeyDown={onKeyDown}
          className="flex items-center space-x-2 sm:space-x-4"
        >
          {steps.map((step, index) => (
            <Button
              key={tabId(index)}
              ref={(element) => {
                tabs.current[index] = element
              }}
              id={tabId(index)}
              role="tab"
              aria-selected={index === active}
              aria-controls={panelId}
              tabIndex={index === active ? 0 : -1}
              variant={index === active ? 'destructive' : 'outline'}
              onClick={() => {
                select(index)
              }}
              className={`${
                index === active
                  ? 'bg-brandRed text-white'
                  : 'border-brandMediumGray text-brandMediumGray hover:bg-brandMediumGray hover:text-white'
              } px-3 py-1 text-xs sm:px-6 sm:py-2 sm:text-sm`}
            >
              {step.title}
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Next step"
          aria-controls={panelId}
          onClick={() => {
            select(active + 1)
          }}
          className="text-brandDark hover:bg-neutral-200"
        >
          <ChevronRight />
        </Button>
      </ScrollAnimate>
      <ScrollAnimate
        variantName="zoomIn"
        delay={0.2}
        className="relative mx-auto mb-12 aspect-[16/7] w-full max-w-5xl overflow-hidden rounded-lg shadow-xl"
      >
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(active)}
          className="absolute inset-0"
        >
          <Image
            src={activeStep.image.url}
            alt={activeStep.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      </ScrollAnimate>
    </>
  )
}
