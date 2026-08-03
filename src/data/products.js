/**
 * Товары КСК «Мечта».
 * Фото пока нет — карточки показывают иконку-заглушку.
 */

const PRODUCT_PHOTOS = import.meta.glob('../imgs/product/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

function photosFor(id) {
  return Object.entries(PRODUCT_PHOTOS)
    .filter(([path]) => path.includes(`/product/${id}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url)
}

const PRODUCTS_DATA = [
  {
    id: 'futbolki-daniila',
    icon: '👕',
    tag: 'Новинка',
    title: 'Футболки от Даниила',
    price: 'от 1 500 ₽',
    basePrice: 1500,
    shortDesc:
      'Авторские футболки с принтами, которые Даниил рисует сам. Каждый рисунок — про лошадей, свободу и мечту.',

    // ── Блок «Почему это важно» ──
    why: [
      'Покупая футболку, вы поддерживаете Даниила и наш клуб напрямую. Часть средств идёт на корм и уход за лошадьми, а сам Даниил получает возможность развивать своё творчество.',
      'Это не просто одежда, а маленькая история: каждый принт нарисован от руки, с любовью к животным. Надевая такую футболку, вы носите с собой кусочек «Мечты».',
    ],

    // ── Блок «Как создавались» ──
    how: [
      'Даниил — наш юный художник и большой друг лошадей. Он сам придумывает сюжеты, делает наброски карандашом, а потом переносит рисунок в цвет.',
      'Ни один принт не повторяет другой: где-то это конь на закате, где-то целый табун в поле. Даниил рисует то, что видит и чувствует на конюшне, — поэтому его работы такие живые.',
      'Мы гордимся тем, какой Даниил молодец: он не боится пробовать, много трудится и вкладывает душу в каждую футболку.',
    ],

    // ── Опции заказа ──
    colors: [
      { value: 'white',   label: 'Белый',        hex: '#f4f4f4' },
      { value: 'black',   label: 'Чёрный',       hex: '#1a1a1a' },
      { value: 'sky',     label: 'Голубой',      hex: '#8ecae6' },
      { value: 'indigo',  label: 'Индиго',       hex: '#322b65' },
      { value: 'melange', label: 'Серый меланж', hex: '#b8bcc4' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    // icon — временная мок-иллюстрация принта (настоящие картинки добавим позже)
    prints: [
      { value: 'sunset',  label: 'Конь на закате', icon: '🌅' },
      { value: 'dream',   label: 'Мечта',          icon: '✨' },
      { value: 'herd',    label: 'Табун в поле',   icon: '🐎' },
      { value: 'freedom', label: 'Свобода',        icon: '🕊️' },
    ],
    materials: [
      { value: 'cotton',   label: 'Хлопок 100%',           extra: 0 },
      { value: 'stretch',  label: 'Хлопок с эластаном',    extra: 200 },
      { value: 'premium',  label: 'Премиум-хлопок (плотный)', extra: 500 },
    ],
    delivery: [
      { value: 'pickup',  label: 'Самовывоз из КСК «Мечта»', price: 0 },
      { value: 'courier', label: 'Курьер по Череповцу',      price: 250 },
      { value: 'cdek',    label: 'СДЭК до пункта выдачи',    price: 350 },
      { value: 'post',    label: 'Почта России',             price: 300 },
    ],
  },
]

export const PRODUCTS = PRODUCTS_DATA.map((p) => ({
  ...p,
  photos: photosFor(p.id),
  cover: photosFor(p.id)[0] || null,
}))
