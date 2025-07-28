"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


interface DetailingPackage {
  id: string
  title: string
  description: string
  imgSrc: string
  imgAlt: string
}

interface DetailedServicesSectionProps {
  packages?: DetailingPackage[]
}

const DetailedServicesSection = ({
  packages = [
    {
      id: "01",
      title: "Restore",
      description: "Our restoration process goes beyond surface cleaning—it's a meticulous, multi-stage transformation designed to bring your vehicle back to its original beauty, or better.",
      imgSrc: "/placeholder.svg",
      imgAlt: "Professional exterior detailing service",
    },
    {
      id: "02",
      title: "Protect",
      description: "At RPM, we use only the highest-quality protective products to ensure your vehicle looks its best and stays that way. Our detailing solutions offer superior resistance against UV rays, road grime, water spots, and environmental contaminants.",
      imgSrc: "/placeholder.svg",
      imgAlt: "Applying ceramic coating to protect vehicle",
    },
    {
      id: "03",
      title: "Maintain — RPM+",
      description: "RPM+ (Subscription service – more to come)",
      imgSrc: "/placeholder.svg",
      imgAlt: "Premium interior detailing and maintenance",
    },
  ]
}: DetailedServicesSectionProps) => {
  return (
    <section
      id="services"
      className="py-16 lg:py-24 bg-brandDark text-white bg-tire-track-pattern">
      <div className="container mx-auto px-4">
        <ScrollAnimate
          variantName="fadeInDown"
          className="text-center mb-12">
          <p className="text-brandRed uppercase text-sm font-semibold tracking-wider mb-2">OUR DETAILING PACKAGES</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Transform Your Vehicle with Our Expert Detailing</h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.15}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((service) => (
            <ScrollAnimate
              variantName="zoomIn"
              key={service.id}>
              <Card className="bg-brandMediumGray border-neutral-700 text-white overflow-hidden group">
                <div className="relative h-56">
                  <Image
                    src={service.imgSrc || "/placeholder.svg"}
                    alt={service.imgAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-5xl font-bold text-brandRed mb-3">{service.id}</p>
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-neutral-300 text-sm mb-4 leading-relaxed h-24 overflow-hidden">
                    {" "}
                    {/* Increased height for longer descriptions */}
                    {service.description}
                  </p>
                  <Link href="/booking">
                    <Button
                      variant="ghost"
                      className="text-brandRed hover:bg-brandRed hover:text-white px-4 py-2">
                      Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimate>
          ))}
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.3}
          className="text-center mt-12">
          <Link href="/services">
            <Button className="bg-brandRed hover:bg-red-700 text-white px-8 py-3 text-lg">View All Services</Button>
          </Link>
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default DetailedServicesSection;
