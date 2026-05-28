import { useState, useEffect, useRef } from 'react'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export function formatCountValue(value, decimals = 0, spaceThousands = false) {
  const num = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value))
  if (!spaceThousands) return num
  const [intPart, decPart] = num.split('.')
  const spaced = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return decPart ? `${spaced}.${decPart}` : spaced
}

/** Общий прогресс 0→1 для синхронного набора нескольких счётчиков */
export function useSyncedCountUp({ duration = 1800 } = {}) {
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (started.current) return
      started.current = true

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setProgress(1)
        return
      }

      const startTime = performance.now()
      const step = (now) => {
        const t = Math.min((now - startTime) / duration, 1)
        setProgress(easeOutCubic(t))
        if (t < 1) requestAnimationFrame(step)
        else setProgress(1)
      }
      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [duration])

  return { ref, progress }
}
