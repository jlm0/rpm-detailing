import { readFile } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const escapeXml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function photo(label: string, width = 1600, height = 1000) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(width)}" height="${String(height)}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1a1a1a"/>
        <stop offset="1" stop-color="#3d3d3d"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect y="${String(height - 16)}" width="100%" height="16" fill="#D9232D"/>
    <text x="50%" y="50%" fill="#ffffff" font-family="Helvetica, Arial, sans-serif" font-size="${String(Math.round(width / 20))}" font-weight="700" text-anchor="middle" dominant-baseline="middle">${escapeXml(label)}</text>
  </svg>`
  return {
    data: await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toBuffer(),
    mimetype: 'image/jpeg',
  }
}

export async function wordmark(text: string, color: string, width = 600, height = 160) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(width)}" height="${String(height)}">
    <text x="50%" y="50%" fill="${color}" font-family="Helvetica, Arial, sans-serif" font-size="${String(Math.round(height / 2.6))}" font-weight="800" letter-spacing="4" text-anchor="middle" dominant-baseline="middle">${escapeXml(text)}</text>
  </svg>`
  return { data: await sharp(Buffer.from(svg)).png().toBuffer(), mimetype: 'image/png' }
}

export async function detailingPhoto() {
  const data = await readFile(path.resolve(process.cwd(), 'public/uploads/detailing1.jpg'))
  return { data, mimetype: 'image/jpeg' }
}
