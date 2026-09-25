import { Icon } from '@/components/icon'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { Card, CardContent } from '@/components/ui/card'
import type { AboutPage } from '@/payload-types'

type AboutValuesProps = AboutPage['values']

export default function AboutValues({ title, subtitle, items }: AboutValuesProps) {
  return (
    <section className="bg-brandLightGray py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-brandMediumGray">{subtitle}</p>
        </ScrollAnimate>

        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.1}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((value, index) => (
            <ScrollAnimate key={value.id ?? index} variantName="fadeInUp">
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="rounded-lg bg-brandRed/10 p-3">
                      <Icon name={value.icon} className="h-6 w-6 text-brandRed md:h-8 md:w-8" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-medium text-brandDark sm:font-semibold">
                    {value.title}
                  </h3>
                  <p className="text-brandMediumGray">{value.description}</p>
                </CardContent>
              </Card>
            </ScrollAnimate>
          ))}
        </ScrollAnimate>
      </div>
    </section>
  )
}
