import { useEffect, useState } from 'react'
import clubMap from '../imgs/club-map.jpg'
import styles from './ClubMap.module.css'

const YANDEX_MAP = 'https://yandex.ru/maps/-/CPHB6Q0t'

export default function ClubMap() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <section className={`section ${styles.section}`} id="map">
      <div className="container">
        <h2 className="section-title">
          План <span className="highlight">клуба</span>
        </h2>
        <p className="section-subtitle">
          Конюшни, манежи, левады и тропа впечатлений — ориентируйтесь на территории КСК «Мечта»
        </p>

        <button
          type="button"
          className={styles.mapFrame}
          onClick={() => setOpen(true)}
          aria-label="Открыть план клуба крупнее"
        >
          <img
            src={clubMap}
            alt="План конно-спортивного клуба Мечта: парковки, конюшни, манежи, левады и тропа впечатлений"
            className={styles.mapImg}
            loading="lazy"
            decoding="async"
          />
          <span className={styles.zoomHint}>🔍 Нажмите, чтобы увеличить</span>
        </button>

        <div className={styles.actions}>
          <a
            href={YANDEX_MAP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass accent"
          >
            Как добраться
          </a>
          <p className={styles.address}>
            Вологодская область, п. Борисово, Череповецкий район
          </p>
        </div>
      </div>

      {open && (
        <div className={styles.lightbox} onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Закрыть">
            ✕
          </button>
          <img
            src={clubMap}
            alt="План клуба Мечта"
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
