import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import type { SiteSetting } from '@/payload-types'

type Business = SiteSetting['business']

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

function ContactItem({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10">
        <Icon className="size-4 text-brandRed" aria-hidden />
      </span>
      {children}
    </li>
  )
}

const linkClass =
  'break-all underline-offset-4 transition-colors hover:text-white hover:underline decoration-brandRed'

export function ContactDetails({ business }: { business: Business }) {
  return (
    <ul className="space-y-3 text-sm">
      <ContactItem icon={Phone}>
        <a href={telHref(business.phone)} className={`${linkClass} tabular-nums`}>
          {business.phone}
        </a>
      </ContactItem>
      <ContactItem icon={Mail}>
        <a href={`mailto:${business.email}`} className={linkClass}>
          {business.email}
        </a>
      </ContactItem>
      <ContactItem icon={MapPin}>
        <span>{business.address}</span>
      </ContactItem>
    </ul>
  )
}

export function OpeningHours({ hours }: { hours: Business['hours'] }) {
  return (
    <dl className="text-sm">
      {hours.map((entry) => (
        <div
          key={entry.id ?? entry.days}
          className="flex items-baseline justify-between gap-6 border-b border-white/10 py-2.5 first:pt-0 last:border-0"
        >
          <dt className="text-white/60">{entry.days}</dt>
          <dd className="text-white tabular-nums">{entry.time}</dd>
        </div>
      ))}
    </dl>
  )
}
