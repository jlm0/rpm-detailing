import Image from 'next/image'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { SectionHeading } from '@/components/ui/section-heading'
import { image } from '@/lib/cms'
import type { HomePage, Testimonial } from '@/payload-types'

import { TestimonialsCarousel } from './testimonials-carousel'

interface TestimonialsSectionProps {
  section: HomePage['testimonials']
  testimonials: Testimonial[]
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')

export function TestimonialsSection({ section, testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="bg-white py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          className="mb-12 md:mb-16"
        />
        <ScrollAnimate variantName="fadeInUp" delay={0.15}>
          <TestimonialsCarousel>
            {testimonials.map((testimonial) => {
              const avatar = image(testimonial.avatar, 'thumbnail')
              return (
                <div className="w-[88%] shrink-0 pl-4 sm:w-1/2 lg:w-1/3" key={testimonial.id}>
                  <figure className="flex h-full flex-col rounded-lg bg-brandLightGray p-7 md:p-8">
                    <span
                      aria-hidden
                      className="mb-4 font-display text-6xl leading-[0.6] font-bold text-brandRed"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="mb-8 flex-1 text-base leading-relaxed text-brandInk md:text-lg">
                      <p>{testimonial.review}</p>
                    </blockquote>
                    <figcaption className="flex items-center gap-4 border-t border-neutral-200 pt-6">
                      {avatar ? (
                        <Image
                          src={avatar.url}
                          alt={avatar.alt}
                          width={44}
                          height={44}
                          className="size-11 rounded-md object-cover"
                          sizes="44px"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="flex size-11 items-center justify-center rounded-md bg-brandInk text-sm font-semibold text-white"
                        >
                          {initials(testimonial.name)}
                        </span>
                      )}
                      <div>
                        <p className="font-semibold text-brandInk">{testimonial.name}</p>
                        {testimonial.title && (
                          <p className="text-sm text-brandMediumGray">{testimonial.title}</p>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              )
            })}
          </TestimonialsCarousel>
        </ScrollAnimate>
      </div>
    </section>
  )
}
