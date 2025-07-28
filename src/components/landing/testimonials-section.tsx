"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";




interface Testimonial {
  name: string
  title: string
  review: string
  avatar: string
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
}

const TestimonialsSection = ({ 
  testimonials = [
    {
      name: "Mark Farell",
      title: "Client of Company",
      review: "The team at RPM is meticulous. My car hasn't looked this good since it left the showroom. The paint correction was flawless.",
      avatar: "/placeholder.svg",
    },
    {
      name: "Jessica Block",
      title: "Satisfied Customer",
      review: "Very impressed. Friendly, very efficient and knowledgeable. The interior detail was extremely thorough. Will call on them again.",
      avatar: "/placeholder.svg",
    },
    {
      name: "Nelly Popins",
      title: "Regular Client",
      review: "I'm on the RPM+ maintenance plan and it's worth every penny. My car always looks pristine, and the convenience is unbeatable.",
      avatar: "/placeholder.svg",
    },
  ]
}: TestimonialsSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimate
          variantName="fadeInDown"
          className="text-center mb-12">
          <p className="text-brandRed uppercase text-sm font-semibold tracking-wider mb-2">CLIENT LOVE</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-4">
            What Our Clients Say About Our Detailing
          </h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.2}>
          <div
            className="overflow-hidden"
            ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4"
                  key={`${testimonial.name}-${index}`}>
                  <Card className="bg-brandLightGray border-neutral-200 shadow-lg h-full">
                    <CardContent className="p-6 relative flex flex-col h-full">
                      <Quote className="absolute top-4 right-4 h-12 w-12 text-brandRed/20" />
                      <div className="flex items-center mb-4">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full mr-4"
                          sizes="60px"
                        />
                        <div>
                          <h3 className="font-semibold text-brandDark">{testimonial.name}</h3>
                          <p className="text-xs text-brandMediumGray">{testimonial.title}</p>
                        </div>
                      </div>
                      <p className="text-brandMediumGray text-sm leading-relaxed italic flex-grow">
                        &ldquo;{testimonial.review}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default TestimonialsSection;
