import type { SiteSetting } from '@/payload-types'

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

export function OpeningHours({ hours }: { hours: SiteSetting['business']['hours'] }) {
  return (
    <ul className="space-y-2 text-sm">
      {hours.map((entry) => (
        <li key={entry.id ?? entry.days}>
          {entry.days}: <span className="text-white">{entry.time}</span>
        </li>
      ))}
    </ul>
  )
}
