import { Quote } from 'lucide-react'
import Image from 'next/image'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Card, CardContent } from '@/components/ui/card'
import { image } from '@/lib/cms'
import type { HomePage, Testimonial } from '@/payload-types'

import { TestimonialsCarousel } from './testimonials-carousel'

interface TestimonialsSectionProps {
  section: HomePage['testimonials']
  testimonials: Testimonial[]
}

export function TestimonialsSection({ section, testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInDown" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-wider text-brandRed uppercase">
            {section.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">{section.title}</h2>
        </ScrollAnimate>
        <ScrollAnimate variantName="fadeInUp" delay={0.2}>
          <TestimonialsCarousel>
            {testimonials.map((testimonial) => {
              const avatar = image(testimonial.avatar, 'thumbnail')
              return (
                <div className="w-full shrink-0 pl-4 md:w-1/2 lg:w-1/3" key={testimonial.id}>
                  <Card className="h-full min-h-[300px] border-neutral-200 bg-brandLightGray shadow-lg">
                    <CardContent className="relative flex h-full flex-col p-6">
                      <Quote className="absolute top-4 right-4 h-12 w-12 text-brandRed/20" />
                      <div className="mb-4 flex items-center">
                        {avatar && (
                          <Image
                            src={avatar.url}
                            alt={avatar.alt}
                            width={60}
                            height={60}
                            className="mr-4 rounded-full"
                            sizes="60px"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold text-brandDark">{testimonial.name}</h3>
                          {testimonial.title && (
                            <p className="text-xs text-brandMediumGray">{testimonial.title}</p>
                          )}
                        </div>
                      </div>
                      <p className="flex-grow text-sm leading-relaxed text-brandMediumGray italic">
                        &ldquo;{testimonial.review}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </TestimonialsCarousel>
        </ScrollAnimate>
      </div>
    </section>
  )
}
