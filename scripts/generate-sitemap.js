/**
 * Генерирует public/sitemap.xml из данных программ / команды / услуг.
 * Запуск: node scripts/generate-sitemap.js
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const SITE = 'https://kskmechta.ru'
const today = new Date().toISOString().slice(0, 10)

const programs = [
  'constructor', 'date', 'excursion', 'birthday-murzik', 'hippotherapy', 'riding-adults', 'riding-kids',
  'dev-riding', 'gymnastics', 'ipponya', 'hobbyhorsing', 'step-riding', 'vaulting', 'family-program',
  'summer-camp', 'ippo-english', 'mini-horse-walk', 'horse-magic', 'day-at-stable-adult', 'day-at-stable-teen',
  'horse-rent-photo', 'ippo-companion', 'mom-and-baby', 'horse-ride-territory', 'plein-air', 'barefoot-trail',
]
const team = [
  'khmeleva', 'stolyarova', 'soboleva', 'pelevina', 'kanavina', 'yakovleva', 'simurina', 'senatorova',
  'sukhanova', 'sakova', 'chaikina', 'demin', 'shunchenkova', 'matveeva', 'tsygankov',
]
const services = [
  'corporate', 'kids', 'tourism', 'rental', 'lessons', 'photo', 'holidays', 'individual',
]

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  ...programs.map((id) => ({ loc: `/program/${id}`, priority: '0.8', changefreq: 'monthly' })),
  ...team.map((id) => ({ loc: `/team/${id}`, priority: '0.7', changefreq: 'monthly' })),
  ...services.map((id) => ({ loc: `/service/${id}`, priority: '0.7', changefreq: 'monthly' })),
]

const body = urls.map((u) => `  <url>
    <loc>${SITE}${u.loc === '/' ? '/' : u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
console.log(`sitemap.xml: ${urls.length} urls`)
