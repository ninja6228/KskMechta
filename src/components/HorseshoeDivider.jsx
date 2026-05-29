import { useState, useCallback } from 'react'
import styles from './HorseshoeDivider.module.css'

/**
 * Декоративный разделитель между секциями — SVG-подкова с гвоздевыми отверстиями.
 * Клик → 360° прокрутка с пружинистым ease.
 */
export default function HorseshoeDivider({ flipped = false }) {
  const [spinning, setSpinning] = useState(false)

  const handleClick = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    setTimeout(() => setSpinning(false), 700)
  }, [spinning])

  const shoeClass = [
    styles.shoe,
    spinning ? (flipped ? styles.spinFlipped : styles.spin) : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={[styles.wrap, flipped ? styles.flipped : ''].filter(Boolean).join(' ')}
      onClick={handleClick}
      role="button"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className={styles.line} />

      <div className={styles.emblem}>
        {/* Подкова: внешняя дуга R=32, внутренняя R=20, два «рога», 4 гвоздевых отверстия */}
        <svg
          className={shoeClass}
          viewBox="0 0 80 72"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d={[
              /* ── Тело подковы ── */
              'M 8,42',
              'A 32,32 0 0 1 72,42',   /* внешняя дуга, CW → вверх */
              'L 72,70 L 60,70',        /* правый рог — вниз */
              'L 60,42',                /* правый рог — вверх до дуги */
              'A 20,20 0 0 0 20,42',   /* внутренняя дуга, CCW → вверх */
              'L 20,70 L 8,70 Z',      /* левый рог — вниз, закрытие */

              /* ── Гвоздевые отверстия (evenodd пробивает «дырки») ── */
              /* Позиции проверены: y > y_дуги + r, x±r строго внутри тела  */
              /* левое верхнее  (13,33) r=3 */ 'M 16,33 A 3,3 0 1 0 10,33 A 3,3 0 1 0 16,33 Z',
              /* левое нижнее   (13,55) r=3 */ 'M 16,55 A 3,3 0 1 0 10,55 A 3,3 0 1 0 16,55 Z',
              /* правое верхнее (67,33) r=3 */ 'M 70,33 A 3,3 0 1 0 64,33 A 3,3 0 1 0 70,33 Z',
              /* правое нижнее  (67,55) r=3 */ 'M 70,55 A 3,3 0 1 0 64,55 A 3,3 0 1 0 70,55 Z',
            ].join(' ')}
          />
        </svg>
      </div>

      <div className={styles.line} />
    </div>
  )
}
