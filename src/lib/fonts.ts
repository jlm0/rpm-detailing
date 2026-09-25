import { Archivo, Geist } from 'next/font/google'

const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export const fontVariables = `${display.variable} ${sans.variable}`
