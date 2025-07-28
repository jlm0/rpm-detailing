"use client";

import { Users, Car, Award, Settings2, ChevronLeft, ChevronRight, Trophy, Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Button } from "@/components/ui/button";


const iconMap = {
  Users,
  Car,
  Award,
  Settings2,
  Trophy,
  Clock,
};

interface Stat {
  value: string;
  label: string;
  iconName: string;
}

interface WorkingProcessSectionProps {
  preHeading?: string;
  heading?: string;
  processTabs?: string[];
  activeTab?: number;
  processImage?: string;
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: "858", label: "Happy Clients", iconName: "Users" },
  { value: "984", label: "Vehicles Detailed", iconName: "Car" },
  { value: "29", label: "Years of Detailing", iconName: "Settings2" },
  { value: "55", label: "Detailing Awards", iconName: "Award" },
];

const defaultProcessTabs = ["Wash & Decon", "Paint Correction", "Protection", "Interior Finishing"];

const WorkingProcessSection = ({
  preHeading = "// OUR DETAILING METHOD",
  heading = "Our Meticulous Detailing Process",
  processTabs = defaultProcessTabs,
  activeTab: initialActiveTab = 0,
  processImage = "/placeholder.svg",
  stats = defaultStats,
}: WorkingProcessSectionProps) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  // Client will provide more subject matter; section wording or structure may change.
  return (
    <section className="py-16 lg:py-24 bg-brandLightGray">
      <div className="container mx-auto px-4">
        <ScrollAnimate
          variantName="fadeInDown"
          className="text-center mb-12">
          <p className="text-brandRed uppercase text-sm font-semibold tracking-wider mb-2">{preHeading}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-4">{heading}</h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.1}
          className="flex justify-center items-center space-x-2 sm:space-x-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="text-brandDark hover:bg-neutral-200">
            <ChevronLeft />
          </Button>
          {processTabs.map((tab, index) => (
            <Button
              key={tab}
              variant={index === activeTab ? "destructive" : "outline"}
              onClick={() => setActiveTab(index)}
              className={`${
                index === activeTab
                  ? "bg-brandRed text-white"
                  : "border-brandMediumGray text-brandMediumGray hover:bg-brandMediumGray hover:text-white"
              } px-3 py-1 sm:px-6 sm:py-2 text-xs sm:text-sm`}>
              {tab}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="text-brandDark hover:bg-neutral-200">
            <ChevronRight />
          </Button>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="zoomIn"
          delay={0.2}
          className="relative aspect-[16/7] w-full max-w-5xl mx-auto mb-12 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={processImage}
            alt="Car detailing process in action"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.1}
          delay={0.3}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.iconName as keyof typeof iconMap] || Users;
            return (
              <ScrollAnimate
                variantName="fadeInUp"
                key={stat.label}>
                <div className="flex flex-col items-center">
                  <IconComponent className="h-10 w-10 text-brandRed mb-3" />
                  <p className="text-4xl font-bold text-brandDark">{stat.value}</p>
                  <p className="text-brandMediumGray text-sm">{stat.label}</p>
                </div>
              </ScrollAnimate>
            );
          })}
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default WorkingProcessSection;
