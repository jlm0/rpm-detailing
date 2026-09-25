import type { SelectField } from 'payload'

export const iconNames = [
  'Award',
  'CalendarDays',
  'Car',
  'Clock',
  'Heart',
  'Palette',
  'Settings2',
  'Shield',
  'ShieldCheck',
  'Sparkles',
  'SprayCan',
  'Star',
  'Trophy',
  'Users',
  'Wind',
  'Wrench',
] as const

export const icon = (name = 'icon'): SelectField => ({
  name,
  type: 'select',
  required: true,
  options: iconNames.map((value) => ({
    label: value.replace(/([a-z])([A-Z0-9])/g, '$1 $2'),
    value,
  })),
})
