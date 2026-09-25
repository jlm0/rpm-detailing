'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useId, useRef, useState, type KeyboardEvent } from 'react'

import Reveal from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { duration, ease, scrollBehavior } from '@/lib/motion'

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
    const tab = tabs.current[next]
    tab?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: scrollBehavior() })
    if (focus) tab?.focus({ preventScroll: true })
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
      <Reveal order={1} className="mx-auto mb-6 flex max-w-5xl items-center gap-2 md:mb-8">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous step"
          aria-controls={panelId}
          onClick={() => {
            select(active - 1)
          }}
          className="hidden shrink-0 text-brandInk hover:bg-neutral-200 sm:inline-flex"
        >
          <ChevronLeft />
        </Button>
        <motion.div
          layoutScroll
          role="tablist"
          onKeyDown={onKeyDown}
          className="-mx-4 flex flex-1 snap-x [scrollbar-width:none] gap-1 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0"
        >
          {steps.map((step, index) => (
            <button
              key={tabId(index)}
              ref={(element) => {
                tabs.current[index] = element
              }}
              id={tabId(index)}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={panelId}
              tabIndex={index === active ? 0 : -1}
              onClick={() => {
                select(index)
              }}
              className="group relative flex shrink-0 snap-start items-baseline gap-2 px-4 pt-2 pb-4 text-sm font-medium whitespace-nowrap text-brandMediumGray transition-colors hover:text-brandInk aria-selected:text-brandInk"
            >
              <span className="text-xs text-neutral-400 tabular-nums group-aria-selected:text-brandRed">
                {String(index + 1).padStart(2, '0')}
              </span>
              {step.title}
              {index === active && (
                <motion.span
                  aria-hidden
                  layoutId={`${id}-indicator`}
                  transition={{ duration: duration.base, ease: ease.standard }}
                  className="absolute inset-x-4 bottom-0 h-0.5 bg-brandRed"
                />
              )}
            </button>
          ))}
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Next step"
          aria-controls={panelId}
          onClick={() => {
            select(active + 1)
          }}
          className="hidden shrink-0 text-brandInk hover:bg-neutral-200 sm:inline-flex"
        >
          <ChevronRight />
        </Button>
      </Reveal>
      <Reveal
        variant="fade"
        order={2}
        className="relative mx-auto aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-lg bg-brandInk shadow-[0_40px_80px_-40px_rgb(17_17_17/0.45)] sm:aspect-[16/8]"
      >
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(active)}
          className="absolute inset-0"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0 z-1"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, zIndex: 0, transition: { delay: duration.slow, duration: 0 } }}
              transition={{ duration: duration.slow, ease: ease.enter }}
            >
              <Image
                src={activeStep.image.url}
                alt={activeStep.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </motion.div>
          </AnimatePresence>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-linear-to-t from-brandInk/80 to-transparent px-6 pt-16 pb-5 text-white md:px-8 md:pb-7"
          >
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.base, ease: ease.enter }}
              className="font-display text-xl font-bold [font-stretch:112%] md:text-2xl"
            >
              {activeStep.title}
            </motion.p>
            <p className="text-xs font-medium tracking-[0.2em] text-white/70 tabular-nums">
              {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      </Reveal>
    </>
  )
}
