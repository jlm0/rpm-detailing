import {
  Award,
  CalendarDays,
  Car,
  Clock,
  Heart,
  Palette,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
  Trophy,
  Users,
  Wind,
  Wrench,
  type LucideProps,
} from 'lucide-react'

import type { iconNames } from '@/fields/icon'

const icons = {
  Award,
  CalendarDays,
  Car,
  Clock,
  Heart,
  Palette,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
  Trophy,
  Users,
  Wind,
  Wrench,
} satisfies Record<(typeof iconNames)[number], unknown>

export function Icon({ name, ...props }: { name: (typeof iconNames)[number] } & LucideProps) {
  const Component = icons[name]
  return <Component aria-hidden {...props} />
}
