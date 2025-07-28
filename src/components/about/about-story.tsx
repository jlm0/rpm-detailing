"use client";

import Image from "next/image";

import ScrollAnimate from "@/components/motion/scroll-animate";

interface AboutStoryProps {
  title: string;
  content: string;
  image: string;
}

export default function AboutStory({ title, content, image }: AboutStoryProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <ScrollAnimate variantName="fadeInUp">
            <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-6">
              {title}
            </h2>
            <div className="text-brandMediumGray prose prose-lg max-w-none">
              {typeof content === 'string' ? (
                <p>{content}</p>
              ) : (
                <div>
                  <p>RPM Detailing was founded with a passion for excellence and a commitment to providing the highest quality auto detailing services. Our journey began with a simple belief: every vehicle deserves to look its absolute best.</p>
                  <p className="mt-4">Over the years, we&apos;ve built a reputation for meticulous attention to detail, using only the finest products and techniques. Our team of skilled professionals takes pride in transforming vehicles and exceeding our customers&apos; expectations.</p>
                  <p className="mt-4">Today, we continue to innovate and improve our services, staying at the forefront of the auto detailing industry while maintaining the personal touch that sets us apart.</p>
                </div>
              )}
            </div>
          </ScrollAnimate>

          {/* Image */}
          <ScrollAnimate variantName="fadeInUp" delay={0.2}>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={image}
                alt="Our story"
                fill
                className="object-cover"
              />
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}