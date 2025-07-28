"use client";

import Image from "next/image";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Button } from "@/components/ui/button";

interface Brand {
  name: string;
  logo: {
    url: string;
    alt?: string;
  };
}

interface BrandsSectionProps {
  brands: Brand[];
}

const BrandsSection = ({ brands }: BrandsSectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-brandDark text-white">
      <div className="container mx-auto px-4">
        <ScrollAnimate
          variantName="fadeInDown"
          className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">We Detail All Makes and Models</h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.05}
          delay={0.2}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <ScrollAnimate
              variantName="zoomIn"
              key={brand.name}>
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src={brand.logo.url}
                  alt={brand.logo.alt || `${brand.name} logo`}
                  width={100}
                  height={50}
                  className="object-contain"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 100px"
                />
              </div>
            </ScrollAnimate>
          ))}
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.4}
          className="text-center mt-12">
          <Button
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white hover:text-brandRed">
            Book Your Make
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default BrandsSection;
