import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const columnsFor = (count: number) => {
  if (count <= 1) return ''
  if (count === 2) return 'md:grid-cols-2'
  if (count === 4) return 'md:grid-cols-2 xl:grid-cols-4'
  return 'md:grid-cols-2 lg:grid-cols-3'
}
