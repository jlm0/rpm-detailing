'use client'

import {
  Award,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock,
  Settings2,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, LucideIcon> = {
  Users,
  Car,
  Award,
  Settings2,
  Trophy,
  Clock,
}

interface Stat {
  value: string
  label: string
  iconName: string
}

interface WorkingProcessSectionProps {
  preHeading?: string
  heading?: string
  processTabs?: string[]
  activeTab?: number
  processImage?: string
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  { value: '858', label: 'Happy Clients', iconName: 'Users' },
  { value: '984', label: 'Vehicles Detailed', iconName: 'Car' },
  { value: '29', label: 'Years of Detailing', iconName: 'Settings2' },
  { value: '55', label: 'Detailing Awards', iconName: 'Award' },
]

const defaultProcessTabs = ['Wash & Decon', 'Paint Correction', 'Protection', 'Interior Finishing']

const WorkingProcessSection = ({
  preHeading = '// OUR DETAILING METHOD',
  heading = 'Our Meticulous Detailing Process',
  processTabs = defaultProcessTabs,
  activeTab: initialActiveTab = 0,
  processImage = '/placeholder.svg',
  stats = defaultStats,
}: WorkingProcessSectionProps) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab)
  // Client will provide more subject matter; section wording or structure may change.
  return (
    <section className="bg-brandLightGray py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInDown" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-wider text-brandRed uppercase">
            {preHeading}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">{heading}</h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.1}
          className="mb-8 flex items-center justify-center space-x-2 sm:space-x-4"
        >
          <Button variant="ghost" size="icon" className="text-brandDark hover:bg-neutral-200">
            <ChevronLeft />
          </Button>
          {processTabs.map((tab, index) => (
            <Button
              key={tab}
              variant={index === activeTab ? 'destructive' : 'outline'}
              onClick={() => {
                setActiveTab(index)
              }}
              className={`${
                index === activeTab
                  ? 'bg-brandRed text-white'
                  : 'border-brandMediumGray text-brandMediumGray hover:bg-brandMediumGray hover:text-white'
              } px-3 py-1 text-xs sm:px-6 sm:py-2 sm:text-sm`}
            >
              {tab}
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="text-brandDark hover:bg-neutral-200">
            <ChevronRight />
          </Button>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="zoomIn"
          delay={0.2}
          className="relative mx-auto mb-12 aspect-[16/7] w-full max-w-5xl overflow-hidden rounded-lg shadow-xl"
        >
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
          className="grid grid-cols-2 gap-8 text-center md:grid-cols-4"
        >
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.iconName] ?? Users
            return (
              <ScrollAnimate variantName="fadeInUp" key={stat.label}>
                <div className="flex flex-col items-center">
                  <IconComponent className="mb-3 h-10 w-10 text-brandRed" />
                  <p className="text-4xl font-bold text-brandDark">{stat.value}</p>
                  <p className="text-sm text-brandMediumGray">{stat.label}</p>
                </div>
              </ScrollAnimate>
            )
          })}
        </ScrollAnimate>
      </div>
    </section>
  )
}

export default WorkingProcessSection
