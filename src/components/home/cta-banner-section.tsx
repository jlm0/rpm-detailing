import { ArrowRight } from 'lucide-react'

import { Icon } from '@/components/icon'
import { CmsLink } from '@/components/layout/cms-link'
import { Magnetic } from '@/components/motion/magnetic'
import Reveal from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import type { HomePage } from '@/payload-types'

export function CtaBannerSection({ ctaBanner }: { ctaBanner: HomePage['ctaBanner'] }) {
  return (
    <section
      data-cms="home-page/ctaBanner"
      className="bg-brandRed bg-grunge-texture py-20 text-white bg-blend-multiply md:py-28 lg:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={ctaBanner.eyebrow} title={ctaBanner.heading} tone="red" />
          <Reveal order={1} className="shrink-0">
            <Magnetic className="w-full sm:w-auto">
              <Button asChild variant="light" size="lg" className="w-full">
                <CmsLink url={ctaBanner.button.url}>
                  {ctaBanner.button.label}
                  <ArrowRight />
                </CmsLink>
              </Button>
            </Magnetic>
          </Reveal>
        </div>
        <Reveal stagger order={1} className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {ctaBanner.steps.map((step, index) => (
            <Reveal key={step.id ?? index} className="border-t border-white/30 pt-6">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-white/75 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon name={step.icon} strokeWidth={1.5} className="size-8 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">{step.title}</h3>
              <p className="max-w-sm leading-relaxed text-white/85">{step.description}</p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
