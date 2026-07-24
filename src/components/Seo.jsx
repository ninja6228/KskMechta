import { useEffect, useMemo } from 'react'
import { SITE, absoluteUrl, pageTitle } from '../data/seo'

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Обновляет title / description / Open Graph / Twitter / canonical / JSON-LD для страницы.
 */
export default function Seo({
  title,
  description = SITE.descriptionDefault,
  path = '/',
  image = SITE.ogImage,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const jsonLdSerialized = useMemo(
    () => (jsonLd ? JSON.stringify(jsonLd) : ''),
    [jsonLd],
  )

  useEffect(() => {
    const fullTitle = pageTitle(title)
    const url = absoluteUrl(path)
    const desc = description || SITE.descriptionDefault
    const imgRaw = image || SITE.ogImage
    const img = imgRaw.startsWith('http') ? imgRaw : absoluteUrl(imgRaw)

    document.title = fullTitle
    document.documentElement.lang = SITE.lang

    upsertMeta('name', 'description', desc)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    upsertMeta('name', 'theme-color', '#4a9ac5')
    upsertMeta('name', 'author', SITE.name)
    upsertMeta('name', 'geo.region', 'RU-VLG')
    upsertMeta('name', 'geo.placename', 'Череповец')

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:locale', SITE.locale)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', img)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', img)

    upsertLink('canonical', url)

    upsertJsonLd('seo-jsonld-page', jsonLdSerialized ? JSON.parse(jsonLdSerialized) : null)
  }, [title, description, path, image, type, noindex, jsonLdSerialized])

  return null
}

export function buildSportsActivityLocationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'КСК «Мечта»',
    alternateName: 'Конно-спортивный клуб Мечта',
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.ogImage,
    description: SITE.descriptionDefault,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressRegion: 'Вологодская область',
      addressLocality: 'пос. Борисово',
      streetAddress: 'Череповецкий район',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      opens: '09:00',
      closes: '20:00',
    },
    sameAs: [SITE.social.vk],
    priceRange: '₽₽',
  }
}

export function buildBreadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
