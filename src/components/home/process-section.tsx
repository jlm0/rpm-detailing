import { Icon } from '@/components/icon'
import Reveal from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { image } from '@/lib/cms'
import type { HomePage } from '@/payload-types'

import { ProcessSteps, type ProcessStep } from './process-steps'

export function ProcessSection({ process }: { process: HomePage['process'] }) {
  const steps = process.steps.flatMap((step): ProcessStep[] => {
    const photo = image(step.image, 'hero')
    return photo ? [{ title: step.title, image: photo }] : []
  })

  return (
    <section className="bg-brandLightGray py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          align="center"
          className="mb-12 md:mb-14"
        />
        <ProcessSteps
          steps={steps}
          previousLabel={process.previousLabel}
          nextLabel={process.nextLabel}
        />
        {process.stats && process.stats.length > 0 && (
          <Reveal
            stagger
            className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-y-10 md:mt-24 md:flex-nowrap"
          >
            {process.stats.map((stat, index) => (
              <Reveal
                key={stat.id ?? index}
                className="flex min-w-0 basis-1/2 flex-col items-center gap-2 border-neutral-300 px-4 text-center md:flex-1 md:border-l md:first:border-l-0"
              >
                <Icon name={stat.icon} strokeWidth={1.5} className="mb-2 size-6 text-brandRed" />
                <p className="font-display text-4xl leading-none font-bold tracking-tight whitespace-nowrap text-brandInk [font-stretch:118%] tabular-nums lg:text-5xl xl:text-6xl">
                  {stat.value}
                </p>
                <p className="text-sm text-brandMediumGray">{stat.label}</p>
              </Reveal>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}
