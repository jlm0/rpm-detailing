"use client";

import { SprayCan, Car, Sparkles, Wind, ShieldCheck, Palette } from "lucide-react";

import ScrollAnimate from "@/components/motion/scroll-animate";

const iconMap = {
  SprayCan,
  Car,
  Sparkles,
  Wind,
  ShieldCheck,
  Palette,
};

const defaultServices = [
  { name: "Exterior Wash", icon: "SprayCan" },
  { name: "Interior Detail", icon: "Car" },
  { name: "Paint Correction", icon: "Sparkles" },
  { name: "Ceramic Coating", icon: "ShieldCheck" },
  { name: "Wheel & Tire Care", icon: "Palette" },
  { name: "Odor Removal", icon: "Wind" },
];

interface Service {
  name: string;
  icon: string;
}

interface ServicesOverviewBarProps {
  services?: Service[];
}

const ServicesOverviewBar = ({ services = defaultServices }: ServicesOverviewBarProps) => {
  return (
    <section className="bg-brandDark py-8">
      <div className="container mx-auto px-4">
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.1}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-center">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Car;
            return (
              <ScrollAnimate
                variantName="fadeInUp"
                key={service.name}
                className="flex flex-col items-center space-y-2 text-white/80 hover:text-white group">
                <IconComponent className="h-10 w-10 text-brandRed group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{service.name}</span>
              </ScrollAnimate>
            );
          })}
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default ServicesOverviewBar;
