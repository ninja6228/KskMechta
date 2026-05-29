import { useState } from 'react'
import WalkingHorse from './WalkingHorse'
import { WALKING_HORSE_BY_SECTION } from '../data/walkingHorsePlacements'
import styles from './Gallery.module.css'

const PHOTOS = [
  { icon: '🐎', label: 'Утренняя прогулка', span: 'wide' },
  { icon: '🌲', label: 'Лесной маршрут', span: '' },
  { icon: '🤠', label: 'Обучение', span: '' },
  { icon: '⛺', label: 'Конный поход', span: '' },
  { icon: '🌅', label: 'Закат', span: '' },
  { icon: '🏆', label: 'Соревнования', span: 'tall' },
  { icon: '👧', label: 'Детская школа', span: '' },
  { icon: '🌸', label: 'Весенние прогулки', span: 'wide' },
  { icon: '🔥', label: 'Вечер у костра', span: '' },
  { icon: '📸', label: 'Фотосессии', span: '' },
]

/* 🌾 Пастбище — тёплые летние тона поля и солнца */
const GRADIENTS = [
  'linear-gradient(135deg, #f0f8e8 0%, #ddf0c8 100%)',  /* утреннее поле */
  'linear-gradient(135deg, #e4f0e0 0%, #c8e4b8 100%)',  /* луг */
  'linear-gradient(135deg, #f4f8e4 0%, #e8f4cc 100%)',  /* солнечная трава */
  'linear-gradient(135deg, #e8f4dc 0%, #d0e8b8 100%)',  /* клевер */
  'linear-gradient(135deg, #faf5e4 0%, #f5ead0 100%)',  /* сухая трава, золото */
  'linear-gradient(135deg, #f8f4e0 0%, #f0e8c4 100%)',  /* колосья */
  'linear-gradient(135deg, #eef8e8 0%, #d8f0cc 100%)',  /* ранняя зелень */
  'linear-gradient(135deg, #f5f8e8 0%, #e8f4d4 100%)',  /* поляна */
  'linear-gradient(135deg, #fdf8ec 0%, #f8f0d4 100%)',  /* вечернее поле */
  'linear-gradient(135deg, #f0f5e4 0%, #e4ecd0 100%)',  /* туман над лугом */
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section className={`section ${styles.section}`} id="gallery">
      <WalkingHorse {...WALKING_HORSE_BY_SECTION.gallery} />
      <div className="container">
        <h2 className="section-title">
          Фото <span className="highlight">галерея</span>
        </h2>
        <p className="section-subtitle">
          Моменты, которые остаются в памяти навсегда — жизнь клуба в объективе
        </p>

        <div className={styles.grid}>
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className={`${styles.item} ${photo.span === 'wide' ? styles.wide : ''} ${photo.span === 'tall' ? styles.tall : ''}`}
              style={{ background: GRADIENTS[i % GRADIENTS.length] }}
              onClick={() => setLightbox(i)}
            >
              <span className={styles.itemIcon}>{photo.icon}</span>
              <div className={styles.itemOverlay}>
                <span className={styles.itemLabel}>{photo.label}</span>
                <span className={styles.itemZoom}>🔍</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          <button
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + PHOTOS.length) % PHOTOS.length) }}
          >‹</button>
          <div
            className={styles.lightboxContent}
            style={{ background: GRADIENTS[lightbox % GRADIENTS.length] }}
            onClick={e => e.stopPropagation()}
          >
            <span className={styles.lightboxIcon}>{PHOTOS[lightbox].icon}</span>
            <p className={styles.lightboxLabel}>{PHOTOS[lightbox].label}</p>
          </div>
          <button
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % PHOTOS.length) }}
          >›</button>
        </div>
      )}
    </section>
  )
}
