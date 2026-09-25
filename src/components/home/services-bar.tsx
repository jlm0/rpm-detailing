import { Icon } from '@/components/icon'
import ScrollAnimate from '@/components/motion/scroll-animate'
import type { HomePage } from '@/payload-types'

type Items = NonNullable<NonNullable<HomePage['servicesBar']>['items']>

export function ServicesBar({ items }: { items: Items }) {
  return (
    <section className="bg-brandDark py-8">
      <div className="container mx-auto px-4">
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.1}
          className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 md:grid-cols-6"
        >
          {items.map((item, index) => (
            <ScrollAnimate
              variantName="fadeInUp"
              key={item.id ?? index}
              className="group flex flex-col items-center space-y-2 text-white/80 hover:text-white"
            >
              <Icon
                name={item.icon}
                className="h-10 w-10 text-brandRed transition-transform group-hover:scale-110"
              />
              <span className="text-sm font-medium">{item.label}</span>
            </ScrollAnimate>
          ))}
        </ScrollAnimate>
      </div>
    </section>
  )
}
