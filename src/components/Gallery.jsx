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
  'linear-gradient(135deg, #eef8eb 0%, #d4f0c8 100%)',  /* борщевик луговой */
  'linear-gradient(135deg, #fce8ed 0%, #f5ccd8 100%)',  /* иван-чай нежный */
  'linear-gradient(135deg, #fdf6e0 0%, #f5e4b0 100%)',  /* венерин башмачок */
  'linear-gradient(135deg, #e8f4fd 0%, #ccdff5 100%)',  /* небо над лугом */
  'linear-gradient(135deg, #f5e8fe 0%, #e0ccf8 100%)',  /* кружевной сиреневый */
  'linear-gradient(135deg, #e8fdf5 0%, #c4f0e0 100%)',  /* луговой тил */
  'linear-gradient(135deg, #fde8f0 0%, #f8cce0 100%)',  /* тёплый иван-чай */
  'linear-gradient(135deg, #e8f5ee 0%, #cce8d8 100%)',  /* лесная зелень */
  'linear-gradient(135deg, #fef8e8 0%, #f8ecca 100%)',  /* золото заката */
  'linear-gradient(135deg, #eeeffe 0%, #d8dafc 100%)',  /* утренняя дымка */
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
