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

const GRADIENTS = [
  'linear-gradient(135deg, #1e2a10 0%, #2a3d18 100%)',
  'linear-gradient(135deg, #1a1040 0%, #322b65 100%)',
  'linear-gradient(135deg, #2a1500 0%, #3d2200 100%)',
  'linear-gradient(135deg, #101a30 0%, #1a2d4a 100%)',
  'linear-gradient(135deg, #2a1800 0%, #3d2800 100%)',
  'linear-gradient(135deg, #1a0a30 0%, #2d1a50 100%)',
  'linear-gradient(135deg, #0a2010 0%, #183020 100%)',
  'linear-gradient(135deg, #2a1a10 0%, #3d2a18 100%)',
  'linear-gradient(135deg, #1a1000 0%, #2a1a00 100%)',
  'linear-gradient(135deg, #0a1020 0%, #1a2030 100%)',
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
