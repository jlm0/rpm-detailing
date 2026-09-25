import { Icon } from '@/components/icon'
import ScrollAnimate from '@/components/motion/scroll-animate'
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
        <ProcessSteps steps={steps} />
        {process.stats && process.stats.length > 0 && (
          <ScrollAnimate
            variantName="fadeIn"
            staggerChildren={0.1}
            className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-y-10 md:mt-24 md:grid-cols-4"
          >
            {process.stats.map((stat, index) => (
              <ScrollAnimate
                variantName="fadeInUp"
                key={stat.id ?? index}
                className="flex flex-col items-center gap-2 border-neutral-300 px-4 text-center md:border-l md:first:border-l-0"
              >
                <Icon name={stat.icon} strokeWidth={1.5} className="mb-2 size-6 text-brandRed" />
                <p className="font-display text-5xl leading-none font-bold tracking-tight text-brandInk [font-stretch:118%] tabular-nums lg:text-6xl">
                  {stat.value}
                </p>
                <p className="text-sm text-brandMediumGray">{stat.label}</p>
              </ScrollAnimate>
            ))}
          </ScrollAnimate>
        )}
      </div>
    </section>
  )
}
