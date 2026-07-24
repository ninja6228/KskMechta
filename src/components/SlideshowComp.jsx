import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './SlideshowComp.module.css'

const FALLBACK_COLORS = [
  'linear-gradient(135deg, #1e1940 0%, #322b65 100%)',
  'linear-gradient(135deg, #1a2a10 0%, #2a4020 100%)',
  'linear-gradient(135deg, #2a1000 0%, #3d1800 100%)',
  'linear-gradient(135deg, #101830 0%, #1a2848 100%)',
  'linear-gradient(135deg, #201020 0%, #341840 100%)',
]

function clampHeight(width, ratio) {
  const maxH = Math.min(window.innerHeight * 0.68, 560)
  const minH = window.innerWidth <= 560 ? 200 : window.innerWidth <= 900 ? 240 : 280
  if (!ratio || !width) return minH
  return Math.round(Math.min(maxH, Math.max(minH, width / ratio)))
}

export default function SlideshowComp({ slides = [], slideColors, images = [] }) {
  const items = images.length > 0 ? images : slides
  const isPhoto = images.length > 0
  const itemsKey = isPhoto ? images.join('|') : slides.join('|')
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [frameHeight, setFrameHeight] = useState(null)
  const [ratios, setRatios] = useState({})
  const rootRef = useRef(null)
  const currentRef = useRef(0)

  currentRef.current = current

  const syncHeight = useCallback((index, nextRatios = ratios) => {
    if (!isPhoto || !rootRef.current) return
    const ratio = nextRatios[index]
    if (!ratio) return
    setFrameHeight(clampHeight(rootRef.current.clientWidth, ratio))
  }, [isPhoto, ratios])

  // Preload natural sizes so height is ready before/on slide change
  useEffect(() => {
    setCurrent(0)
    setPaused(false)
    setFrameHeight(null)
    setRatios({})
    if (!isPhoto) return undefined

    let cancelled = false

    images.forEach((src, i) => {
      const img = new Image()
      img.onload = () => {
        if (cancelled || !img.naturalWidth) return
        const ratio = img.naturalWidth / img.naturalHeight
        setRatios((prev) => ({ ...prev, [i]: ratio }))
        if (i === currentRef.current && rootRef.current) {
          setFrameHeight(clampHeight(rootRef.current.clientWidth, ratio))
        }
      }
      img.src = src
    })

    return () => { cancelled = true }
  }, [itemsKey, isPhoto, images])

  useEffect(() => {
    if (paused || items.length <= 1) return
    const t = setInterval(() => setCurrent(c => (c + 1) % items.length), 4500)
    return () => clearInterval(t)
  }, [items.length, paused, itemsKey])

  useEffect(() => {
    syncHeight(current)
  }, [current, syncHeight])

  useEffect(() => {
    if (!isPhoto) return
    const onResize = () => syncHeight(currentRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isPhoto, syncHeight])

  if (!items.length) return null

  const go = (index) => {
    setPaused(true)
    setCurrent(index)
  }
  const prev = () => go((current - 1 + items.length) % items.length)
  const next = () => go((current + 1) % items.length)

  return (
    <div
      ref={rootRef}
      className={`${styles.slideshow} ${isPhoto ? styles.slideshowPhotos : ''}`}
      style={isPhoto && frameHeight ? { height: frameHeight } : undefined}
    >
      <div className={styles.slides}>
        {items.map((item, i) => {
          const active = i === current
          return (
            <div
              key={i}
              className={`${styles.slide} ${active ? styles.active : ''} ${isPhoto ? styles.slidePhoto : ''}`}
              style={isPhoto ? undefined : { background: slideColors?.[i] || FALLBACK_COLORS[i % FALLBACK_COLORS.length] }}
              aria-hidden={!active}
            >
              {isPhoto ? (
                <img src={item} alt="" className={styles.photo} draggable={false} />
              ) : (
                <span className={styles.icon}>{item}</span>
              )}
            </div>
          )
        })}
      </div>

      <span className={styles.counter}>{current + 1} / {items.length}</span>

      {items.length > 1 && (
        <>
          <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={prev} aria-label="Предыдущее">‹</button>
          <button type="button" className={`${styles.nav} ${styles.next}`} onClick={next} aria-label="Следующее">›</button>

          <div className={styles.dots}>
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => go(i)}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
