import { readFile } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const escapeXml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const assetPath = (name: string) => path.resolve(process.cwd(), 'src/seed/assets', `${name}.jpg`)

export async function photo(name: string) {
  return { data: await readFile(assetPath(name)), mimetype: 'image/jpeg' }
}

export async function socialCard(name: string) {
  return {
    data: await sharp(assetPath(name))
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer(),
    mimetype: 'image/jpeg',
  }
}

export async function wordmark(text: string, color: string, width = 600, height = 160) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${String(width)}" height="${String(height)}">
    <text x="50%" y="50%" fill="${color}" font-family="Helvetica, Arial, sans-serif" font-size="${String(Math.round(height / 2.6))}" font-weight="800" letter-spacing="4" text-anchor="middle" dominant-baseline="middle">${escapeXml(text)}</text>
  </svg>`
  return { data: await sharp(Buffer.from(svg)).png().toBuffer(), mimetype: 'image/png' }
}
