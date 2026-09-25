import { Icon } from '@/components/icon'
import Reveal from '@/components/motion/reveal'
import type { HomePage } from '@/payload-types'

type Items = NonNullable<NonNullable<HomePage['servicesBar']>['items']>

export function ServicesBar({ items }: { items: Items }) {
  return (
    <section className="border-b border-white/5 bg-brandInk">
      <div className="container mx-auto px-4">
        <Reveal stagger className="grid grid-cols-3 md:grid-cols-6 md:divide-x md:divide-white/10">
          {items.map((item, index) => (
            <Reveal
              key={item.id ?? index}
              className="group flex flex-col items-center gap-3 px-2 py-7 text-center md:py-9"
            >
              <Icon
                name={item.icon}
                strokeWidth={1.5}
                className="size-7 text-brandRed transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-0.5 md:size-8"
              />
              <span className="text-xs font-medium tracking-wide text-white/70 transition-colors group-hover:text-white md:text-sm">
                {item.label}
              </span>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
