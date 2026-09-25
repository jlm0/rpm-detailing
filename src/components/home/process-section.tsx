import { Icon } from '@/components/icon'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { image } from '@/lib/cms'
import type { HomePage } from '@/payload-types'

import { ProcessSteps, type ProcessStep } from './process-steps'

export function ProcessSection({ process }: { process: HomePage['process'] }) {
  const steps = process.steps.flatMap((step): ProcessStep[] => {
    const photo = image(step.image, 'hero')
    return photo ? [{ title: step.title, image: photo }] : []
  })

  return (
    <section className="bg-brandLightGray py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInDown" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-wider text-brandRed uppercase">
            {process.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">{process.title}</h2>
        </ScrollAnimate>
        <ProcessSteps steps={steps} />
        {process.stats && process.stats.length > 0 && (
          <ScrollAnimate
            variantName="fadeIn"
            staggerChildren={0.1}
            delay={0.3}
            className="grid grid-cols-2 gap-8 text-center md:grid-cols-4"
          >
            {process.stats.map((stat, index) => (
              <ScrollAnimate variantName="fadeInUp" key={stat.id ?? index}>
                <div className="flex flex-col items-center">
                  <Icon name={stat.icon} className="mb-3 h-10 w-10 text-brandRed" />
                  <p className="text-4xl font-bold text-brandDark">{stat.value}</p>
                  <p className="text-sm text-brandMediumGray">{stat.label}</p>
                </div>
              </ScrollAnimate>
            ))}
          </ScrollAnimate>
        )}
      </div>
    </section>
  )
}
