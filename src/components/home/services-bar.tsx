import { Icon } from '@/components/icon'
import Reveal from '@/components/motion/reveal'
import type { HomePage } from '@/payload-types'

type Items = NonNullable<NonNullable<HomePage['servicesBar']>['items']>

export function ServicesBar({ items }: { items: Items }) {
  return (
    <section data-cms="home-page/servicesBar" className="border-b border-white/5 bg-brandInk">
      <div className="container mx-auto px-4">
        <Reveal
          stagger
          className="flex flex-wrap justify-center md:flex-nowrap md:divide-x md:divide-white/10"
        >
          {items.map((item, index) => (
            <Reveal
              key={item.id ?? index}
              className="flex min-w-0 basis-1/3 flex-col items-center gap-3 px-2 py-7 text-center md:flex-1 md:py-9"
            >
              <Icon name={item.icon} strokeWidth={1.5} className="size-7 text-brandRed md:size-8" />
              <span className="text-xs font-medium tracking-wide text-white/70 md:text-sm">
                {item.label}
              </span>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
