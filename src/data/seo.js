/** Базовые SEO-константы сайта КСК «Мечта» */
export const SITE = {
  name: 'КСК Мечта',
  titleDefault: 'КСК Мечта — конно-спортивный клуб в Череповце',
  descriptionDefault:
    'Конно-спортивный клуб «Мечта» в Череповце: верховая езда, иппотерапия, детские и взрослые программы, прогулки и праздники. Запись: +7 (921) 723-44-41',
  url: 'https://kskmechta.ru',
  locale: 'ru_RU',
  lang: 'ru',
  phone: '+79217234441',
  phoneDisplay: '+7 (921) 723-44-41',
  email: 'mgs2010@yandex.ru',
  address: 'Вологодская область, п. Борисово, Череповецкий район',
  logo: 'https://kskmechta.ru/images/icons/logo.svg',
  ogImage: 'https://kskmechta.ru/images/icons/logo.svg',
  social: {
    vk: 'https://vk.com/ksk.mechta',
  },
  geo: {
    // приблизительные координаты пос. Борисово (Череповецкий р-н)
    latitude: '59.1267',
    longitude: '37.9092',
  },
}

export function absoluteUrl(path = '/') {
  const base = SITE.url.replace(/\/$/, '')
  if (!path || path === '/') return `${base}/`
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageTitle(title) {
  if (!title) return SITE.titleDefault
  if (title.includes(SITE.name)) return title
  return `${title} — ${SITE.name}`
}
