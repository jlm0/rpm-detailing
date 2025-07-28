"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Button } from "@/components/ui/button";


interface AboutUsSectionProps {
  whyChooseSection?: {
    subtitle: string
    title: string
    content: string
    image?: string
  }
  transformationSection?: {
    subtitle: string
    title: string
    content: string
    features: string[]
  }
  yearsOfExperience?: number
}

const AboutUsSection = ({
  whyChooseSection = {
    subtitle: '// WHY CHOOSE RPM DETAILING',
    title: 'Expert Car Detailing Since 2020',
    content: 'Modern vehicle finishes and interiors require specialized care. Our detailing service excels by combining advanced techniques, premium products, and highly skilled technicians to restore and protect your vehicle\'s beauty. Trust RPM Detailing for meticulous attention to detail.',
    image: '/placeholder.svg',
  },
  transformationSection = {
    subtitle: '// COMPLETE TRANSFORMATION',
    title: 'We Offer Comprehensive Detailing for Your Car',
    content: 'From a meticulous hand wash to full paint correction and ceramic coatings, we provide a complete suite of detailing services. We\'re the preferred choice for discerning car owners who value quality and lasting results.',
    features: [
      'Premium hand wash and decontamination',
      'Multi-stage paint correction and polishing',
      'Durable ceramic coatings and paint protection',
    ],
  },
  yearsOfExperience = 20
}: AboutUsSectionProps) => {
  return (
    <section
      id="about"
      className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollAnimate
            variantName="slideInLeft"
            className="relative">
            <Image
              src={whyChooseSection.image || "/placeholder.svg"}
              alt="Professional car polishing service"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
            <div className="absolute -bottom-8 -left-8 bg-brandRed text-white p-6 rounded-lg shadow-lg w-52 text-center">
              <p className="text-4xl font-bold">{yearsOfExperience}+</p>
              <p className="text-sm">Years of Experience</p>
            </div>
          </ScrollAnimate>
          <ScrollAnimate
            variantName="slideInRight"
            delay={0.2}
            className="">
            <p className="text-brandRed uppercase text-sm font-semibold tracking-wider mb-2">
              {whyChooseSection.subtitle}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-4">{whyChooseSection.title}</h2>
            <p className="text-brandMediumGray mb-6 leading-relaxed">
              {whyChooseSection.content}
            </p>
            <Link href="/booking">
              <Button
                variant="outline"
                className="border-brandRed text-brandRed hover:bg-brandRed hover:text-white">
                Book Now
              </Button>
            </Link>
          </ScrollAnimate>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-16 lg:mt-24">
          <ScrollAnimate
            variantName="slideInRight"
            delay={0.1}
            className="order-2 md:order-1">
            <p className="text-brandRed uppercase text-sm font-semibold tracking-wider mb-2">
              {transformationSection.subtitle}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-4">
              {transformationSection.title}
            </h2>
            <p className="text-brandMediumGray mb-6 leading-relaxed">
              {transformationSection.content}
            </p>
            <ul className="space-y-3">
              {transformationSection.features.map((item) => (
                <li
                  key={item}
                  className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-brandRed flex-shrink-0" />
                  <span className="text-brandMediumGray">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollAnimate>
          <ScrollAnimate
            variantName="slideInLeft"
            delay={0.2}
            staggerChildren={0.1}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 order-1 md:order-2">
            {/* TODO: Implement interactive before/after slider here instead of static images. */}
            {[
              "/placeholder.svg",
              "/placeholder.svg",
              "/placeholder.svg",
            ].map((src, index) => (
              <ScrollAnimate
                variantName="zoomIn"
                key={index}>
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Car detailing process ${index + 1}`}
                  width={200}
                  height={150}
                  className="rounded-lg shadow-md object-cover w-full aspect-[4/3]"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, 200px"
                />
              </ScrollAnimate>
            ))}
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
