import { useState, useRef, useEffect } from 'react'
import styles from './WalkingHorse.module.css'

/** Декоративная 🐎 в секции: reverse — справа налево; иначе слева направо (с зеркалом). */
export default function WalkingHorse({
  top = '50%',
  size = 30,
  duration = 36,
  delay = 0,
  reverse = false,
}) {
  const [reaction, setReaction] = useState(false)
  const hideTimer = useRef(null)

  useEffect(() => () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }, [])

  const handleClick = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setReaction(true)
    hideTimer.current = setTimeout(() => setReaction(false), 1600)
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`${styles.horse} ${reverse ? styles.reverse : styles.facingRight}`}
        style={{
          top,
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--delay': `${delay}s`,
        }}
        onClick={handleClick}
        aria-label="Погладить лошадку"
      >
        {reaction && (
          <span className={styles.bubble} role="status">
            <span className={styles.bubbleHeart}>❤️</span>
          </span>
        )}
        <div className={`${styles.horseInner} ${reaction ? styles.jumping : ''}`}>
          <span className={styles.emoji}>🐎</span>
        </div>
      </button>
    </div>
  )
}
