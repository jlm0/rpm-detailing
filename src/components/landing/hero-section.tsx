"use client";
import { Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Button } from "@/components/ui/button";


interface HeroSectionProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  ctaText?: string
  ctaLink?: string
  showPhoneNumbers?: boolean
  showAddress?: boolean
  phone?: string
  address?: string
}

const HeroSection = ({
  title = 'Advanced Detailing Solutions for Your Prized Automobile',
  subtitle = '// PREMIUM CAR DETAILING',
  backgroundImage = '/placeholder.svg',
  ctaText = 'Book Now',
  ctaLink = '/booking',
  showPhoneNumbers = true,
  showAddress = true,
  phone = '(425) 345-3564',
  address = 'Boise, ID, USA',
}: HeroSectionProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const heroContent = [
    {
      title: title || 'Advanced Detailing Solutions for Your Prized Automobile',
      subtitle: subtitle || '// PREMIUM CAR DETAILING',
    },
    {
      title: 'Protect Your Investment with Expert Care',
      subtitle: '// CERAMIC COATING & PPF',
    },
    {
      title: 'Restore Your Vehicle to Showroom Condition',
      subtitle: '// PAINT CORRECTION',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroContent.length]);
  return (
    <section className="relative bg-brandDark text-white h-[calc(100vh-80px)] min-h-[600px] flex items-center">
      {/* Background image and overlay remain as is */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="A beautifully detailed luxury sports car"
          fill
          priority
          className="object-cover opacity-40"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-1/2 md:w-2/5 bg-brandRed bg-grunge-texture bg-blend-multiply opacity-90">
        {/* Grunge texture applied via tailwind.config.ts */}
      </div>

      <div className="container mx-auto px-4 relative z-10 flex justify-between items-center h-full">
        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.2}
          className="w-full md:w-1/2 lg:w-2/5 space-y-6">
          <p className="text-sm uppercase tracking-wider">{heroContent[activeSlide].subtitle}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {heroContent[activeSlide].title}
          </h1>
          <Link href={ctaLink}>
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-brandRed px-8 py-3 text-lg">
              {ctaText}
            </Button>
          </Link>
          <div className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 space-y-4 hidden lg:block">
            {["01", "02", "03"].map((num, index) => (
              <button
                key={num}
                onClick={() => setActiveSlide(index)}
                className={`text-sm transition-all duration-300 ${
                  activeSlide === index 
                    ? 'text-white font-bold scale-110' 
                    : 'text-white/50 hover:text-white/70'
                }`}>
                {num}
              </button>
            ))}
          </div>
        </ScrollAnimate>

        {(showPhoneNumbers || showAddress) && (
          <ScrollAnimate
            variantName="fadeInRight"
            delay={0.4}
            className="hidden md:flex flex-col space-y-4 absolute right-4 bottom-10 p-4 bg-black/30 rounded">
            {showPhoneNumbers && phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-brandRed" />
                <span>Call Us: {phone}</span>
              </div>
            )}
            {showAddress && address && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-brandRed" />
                <span>{address}</span>
              </div>
            )}
          </ScrollAnimate>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
