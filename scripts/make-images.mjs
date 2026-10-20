// Resizes the original site photos into web-friendly WebP files in public/img.
// Originals live in crawl/assets (kept out of the build). Run: npm run images
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const src = 'crawl/assets/'
const out = 'public/img/'
mkdirSync(out, { recursive: true })

// [output name, original file, fit?, crop?]  fit 'contain' = never crop (posters, slides). crop = { left, top, width, height }
const photos = [
  ['group-flags', 'WhatsApp-Image-2026-09-02-at-17.34.02.jpeg'],
  ['group-photo-2', 'WhatsApp-Image-2026-09-02-at-17.27.51.jpeg'],
  ['team-meeting', 'WhatsApp-Image-2026-09-02-at-17.27.51-1.jpeg'],
  ['riverside-walk', 'WhatsApp-Image-2026-09-02-at-17.35.17.jpeg'],
  ['bootcamp-1', 'Bootcamp-1.jpeg'],
  ['bootcamp-2', 'Bootcamp-2.jpeg'],
  ['bootcamp-3', 'Bootcamp-3.jpeg'],
  ['bootcamp-4', 'Bootcamp-4.jpeg'],
  ['devoll', 'Lumi-Devoll-6.jpeg'],
  ['ecoaction-poster', 'Eco-action-web-1.png', 'contain'],
  ['ecoaction-cover', 'eco-action-picnic-copy.jpg'],
  ['pustec-exhibition', '48B525C0-935E-4680-8CDF-970C76CA7F16.jpeg', 'contain'],
  ['pustec-cover', 'WhatsApp-Image-2026-09-02-at-17.22.56.jpeg', 'contain'],
  ['photo-album-cover', 'Kopertina-Roland-Beqiraj-pdf.jpg', 'contain'],
  ['cycling-group', 'WhatsApp-Image-2026-09-02-at-10.24.56.jpeg'],
  ['heritage-cover', 'WhatsApp-Image-2026-08-29-at-19.12.56.jpeg', 'contain'],
  ['cultural-wordmark', 'IMG_2403.png', 'contain', { left: 40, top: 440, width: 1456, height: 420 }],
  ['council-of-europe', 'IMG_4816-scaled.jpeg'],
  ['slide-vullnetarizem', 'IMG_5519.jpeg', 'contain'],
  ['workshop-flipchart', 'P1190640-scaled.jpg'],
  ['pustec-rollup-gallery', 'WhatsApp-Image-2026-09-02-at-17.14.58.jpeg'],
  ['pustec-rollup-tall', 'WhatsApp-Image-2026-09-02-at-17.19.01.jpeg', 'contain'],
  ['logo-kazus-dark', 'WhatsApp-Image-2026-08-28-at-18.38.40.jpeg', 'contain'],
  ['mission-wordmark', 'Green-Textured-Field-Landscape-Motivational-Quote-Desktop-Wallpaper-edited.png', 'contain'],
  ['logo-kazus-blue', 'LOGO-KAZUS.jpeg', 'contain'],
  ['logo-mark', 'cropped-E42D573F-6D0B-4F72-9100-BF87CBB839AA.png', 'contain'],
]

const manifest = {}
for (const [name, file, fit, crop] of photos) {
  manifest[name] = { w: 0, h: 0, widths: [], fit: fit || 'auto' }
  const base = () => (crop ? sharp(src + file, { failOn: 'none' }).extract(crop) : sharp(src + file, { failOn: 'none' }))
  const meta = crop ? { width: crop.width, height: crop.height } : await sharp(src + file, { failOn: 'none' }).metadata()
  for (const w of [480, 960, 1600]) {
    if (meta.width < w * 0.7 && w !== 480) continue
    await base()
      .resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(`${out}${name}-${w}.webp`)
    manifest[name].widths.push([w, Math.min(w, meta.width)])
  }
  manifest[name].w = meta.width
  manifest[name].h = meta.height
  console.log(name, meta.width + 'x' + meta.height)
}

import { writeFileSync } from 'node:fs'
writeFileSync('src/data/imageManifest.json', JSON.stringify(manifest, null, 2))
