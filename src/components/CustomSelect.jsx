import { useState, useRef, useEffect } from 'react'
import styles from './CustomSelect.module.css'

export default function CustomSelect({ options, placeholder = 'Выберите', value, onChange, hasError = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find(o => o.value === value)

  return (
    <div className={`${styles.wrap} ${open ? styles.open : ''} ${hasError ? styles.error : ''}`} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? styles.selectedText : styles.placeholder}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`${styles.arrow} ${open ? styles.arrowUp : ''}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {open && (
        <ul className={styles.dropdown} role="listbox">
          {options.map(o => (
            <li
              key={o.value}
              className={`${styles.option} ${o.value === value ? styles.optionActive : ''}`}
              role="option"
              aria-selected={o.value === value}
              onClick={() => { onChange(o.value); setOpen(false) }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
