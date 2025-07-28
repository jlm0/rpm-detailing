"use client";

import { Shield, Star, Heart, Users, Sparkles, Award } from "lucide-react";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Shield,
  Star,
  Heart,
  Users,
  Sparkles,
  Award,
};

interface Value {
  title: string;
  description: string;
  icon?: string;
}

interface AboutValuesProps {
  values: Value[];
}

export default function AboutValues({ values }: AboutValuesProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-brandLightGray">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-brandMediumGray max-w-2xl mx-auto">
            These principles guide everything we do and define who we are as a company
          </p>
        </ScrollAnimate>

        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.1}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value, index) => {
            const IconComponent = value.icon ? iconMap[value.icon] || Star : Star;
            return (
              <ScrollAnimate key={index} variantName="fadeInUp">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-brandRed/10 rounded-lg">
                        <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-brandRed" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium sm:font-semibold text-brandDark mb-3">
                      {value.title}
                    </h3>
                    <p className="text-brandMediumGray">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimate>
            );
          })}
        </ScrollAnimate>
      </div>
    </section>
  );
}