"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Button } from "@/components/ui/button";

interface AboutCtaProps {
  title: string;
  buttonText: string;
  buttonLink: string;
}

export default function AboutCta({
  title,
  buttonText,
  buttonLink,
}: AboutCtaProps) {
  return (
    <section className="py-16 lg:py-24 bg-brandDark text-white">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">{title}</h2>
          <Link href={buttonLink}>
            <Button
              size="default"
              variant="outline"
              className="sm:text-base sm:px-6 sm:py-3 border-white text-white bg-transparent hover:bg-white hover:text-brandDark"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </ScrollAnimate>
      </div>
    </section>
  );
}