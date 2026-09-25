import type { ReactNode } from 'react'

import Reveal from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const tones = {
  light: { eyebrow: 'text-brandRed', title: 'text-brandInk', body: 'text-brandMediumGray' },
  dark: { eyebrow: 'text-brandRedBright', title: 'text-white', body: 'text-white/70' },
  red: { eyebrow: 'text-white/80', title: 'text-white', body: 'text-white/85' },
}

interface SectionHeadingProps {
  title: string
  eyebrow?: string | null
  description?: ReactNode
  align?: 'start' | 'center'
  tone?: keyof typeof tones
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  align = 'start',
  tone = 'light',
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  const colors = tones[tone]

  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('mb-4 text-xs font-semibold tracking-[0.2em] uppercase', colors.eyebrow)}>
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          'text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.025em]',
          colors.title,
        )}
      >
        {title}
      </Heading>
      {description && (
        <div
          className={cn(
            'mt-5 max-w-2xl text-base leading-relaxed md:text-lg',
            align === 'center' && 'mx-auto',
            colors.body,
          )}
        >
          {description}
        </div>
      )}
    </Reveal>
  )
}
