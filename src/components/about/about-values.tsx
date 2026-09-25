import { Icon } from '@/components/icon'
import Reveal from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn, columnsFor } from '@/lib/utils'
import type { AboutPage } from '@/payload-types'

type AboutValuesProps = AboutPage['values']

export default function AboutValues({ title, subtitle, items }: AboutValuesProps) {
  return (
    <section
      data-cms="about-page/values"
      className="bg-brandDark bg-tire-track-pattern py-20 text-white md:py-28 lg:py-32"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title={title}
          description={subtitle}
          tone="dark"
          className="mb-14 md:mb-20"
        />

        <Reveal
          stagger
          order={1}
          className={cn('grid gap-10 md:gap-8 lg:gap-12', columnsFor(items.length))}
        >
          {items.map((value, index) => (
            <Reveal key={value.id ?? index} className="border-t border-white/15 pt-6">
              <div className="mb-10 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-white/50 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon name={value.icon} strokeWidth={1.5} className="size-8 text-brandRed" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">{value.title}</h3>
              <p className="max-w-sm leading-relaxed text-white/65">{value.description}</p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
