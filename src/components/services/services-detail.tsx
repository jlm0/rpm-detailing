"use client";

import { Check, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Card } from "@/components/ui/card";

interface Service {
  title: string;
  description: string;
  features?: { feature: string }[];
  image?: { url: string; alt?: string };
  price?: string;
  duration?: string;
}

interface ServicesDetailProps {
  services: Service[];
}

export default function ServicesDetail({ services }: ServicesDetailProps) {
  if (!services || services.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-brandMediumGray">
            No services available at the moment. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="space-y-24">
          {services.map((service, index) => (
            <ScrollAnimate
              key={index}
              variantName="fadeInUp"
              delay={index * 0.1}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <Card className="overflow-hidden">
                  <div className="relative h-96">
                    <Image
                      src={service.image?.url || "/placeholder.svg"}
                      alt={service.image?.alt || service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Card>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-4">
                    {service.title}
                  </h2>
                  <div className="text-brandMediumGray prose prose-lg max-w-none">
                    {typeof service.description === 'string' 
                      ? service.description 
                      : <p>Professional detailing service for your vehicle.</p>
                    }
                  </div>
                </div>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-brandDark">
                      Service Includes:
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-brandRed mt-0.5 flex-shrink-0" />
                          <span className="text-brandMediumGray">{feature.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Price and Duration */}
                <div className="flex flex-wrap gap-6 pt-4">
                  {service.price && (
                    <div className="flex items-center gap-2 text-brandDark">
                      <DollarSign className="h-5 w-5 text-brandRed" />
                      <span className="font-semibold">Starting at {service.price}</span>
                    </div>
                  )}
                  {service.duration && (
                    <div className="flex items-center gap-2 text-brandDark">
                      <Clock className="h-5 w-5 text-brandRed" />
                      <span className="font-semibold">{service.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}