import { Icon } from '@/components/icon'
import { CmsLink } from '@/components/layout/cms-link'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import type { HomePage } from '@/payload-types'

export function CtaBannerSection({ ctaBanner }: { ctaBanner: HomePage['ctaBanner'] }) {
  return (
    <section className="bg-brandRed py-16 text-white lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInDown" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-wider text-white/80 uppercase">
            {ctaBanner.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">{ctaBanner.heading}</h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.15}
          className="mb-12 grid gap-8 text-center md:grid-cols-3 lg:gap-12"
        >
          {ctaBanner.steps.map((step, index) => (
            <ScrollAnimate variantName="fadeInUp" key={step.id ?? index}>
              <div className="flex flex-col items-center">
                <Icon name={step.icon} className="mb-4 h-12 w-12 text-white" />
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/90">{step.description}</p>
              </div>
            </ScrollAnimate>
          ))}
        </ScrollAnimate>
        <ScrollAnimate variantName="fadeInUp" delay={0.3} className="text-center">
          <Button asChild variant="light" size="lg" className="w-full sm:w-auto">
            <CmsLink url={ctaBanner.button.url}>{ctaBanner.button.label}</CmsLink>
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  )
}
