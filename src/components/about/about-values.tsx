'use client'

import { Shield, Star, Heart, Users, Sparkles, Award } from 'lucide-react'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Card, CardContent } from '@/components/ui/card'

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Shield,
  Star,
  Heart,
  Users,
  Sparkles,
  Award,
}

interface Value {
  title: string
  description: string
  icon?: string
}

interface AboutValuesProps {
  values: Value[]
  sectionTitle?: string
  sectionSubtitle?: string
}

export default function AboutValues({
  values,
  sectionTitle = 'Our Core Values',
  sectionSubtitle = 'These principles guide everything we do and define who we are as a company',
}: AboutValuesProps) {
  return (
    <section className="bg-brandLightGray py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">{sectionTitle}</h2>
          <p className="mx-auto max-w-2xl text-lg text-brandMediumGray">{sectionSubtitle}</p>
        </ScrollAnimate>

        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.1}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value, index) => {
            const IconComponent = value.icon ? iconMap[value.icon] || Star : Star
            return (
              <ScrollAnimate key={index} variantName="fadeInUp">
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center">
                      <div className="rounded-lg bg-brandRed/10 p-3">
                        <IconComponent className="h-6 w-6 text-brandRed md:h-8 md:w-8" />
                      </div>
                    </div>
                    <h3 className="mb-3 text-xl font-medium text-brandDark sm:font-semibold">
                      {value.title}
                    </h3>
                    <p className="text-brandMediumGray">{value.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimate>
            )
          })}
        </ScrollAnimate>
      </div>
    </section>
  )
}
