import { useState, useEffect } from 'react'
import styles from './SlideshowComp.module.css'

const FALLBACK_COLORS = [
  'linear-gradient(135deg, #1e1940 0%, #322b65 100%)',
  'linear-gradient(135deg, #1a2a10 0%, #2a4020 100%)',
  'linear-gradient(135deg, #2a1000 0%, #3d1800 100%)',
  'linear-gradient(135deg, #101830 0%, #1a2848 100%)',
  'linear-gradient(135deg, #201020 0%, #341840 100%)',
]

export default function SlideshowComp({ slides, slideColors }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000)
    return () => clearInterval(t)
  }, [slides.length, paused])

  const prev = () => { setPaused(true); setCurrent(c => (c - 1 + slides.length) % slides.length) }
  const next = () => { setPaused(true); setCurrent(c => (c + 1) % slides.length) }

  return (
    <div className={styles.slideshow}>
      <div className={styles.slides}>
        {slides.map((icon, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.active : ''}`}
            style={{ background: slideColors?.[i] || FALLBACK_COLORS[i % FALLBACK_COLORS.length] }}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.counter}>{i + 1} / {slides.length}</span>
          </div>
        ))}
      </div>

      <button className={`${styles.nav} ${styles.prev}`} onClick={prev}>‹</button>
      <button className={`${styles.nav} ${styles.next}`} onClick={next}>›</button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => { setPaused(true); setCurrent(i) }}
          />
        ))}
      </div>
    </div>
  )
}
