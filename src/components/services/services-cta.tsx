"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Button } from "@/components/ui/button";

interface ServicesCtaProps {
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
}

export default function ServicesCta({
  title,
  text,
  buttonText,
  buttonLink,
}: ServicesCtaProps) {
  return (
    <section className="py-16 lg:py-24 bg-brandRed text-white">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-lg mb-8 text-white/90">{text}</p>
          <Link href={buttonLink}>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brandRed"
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