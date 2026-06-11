import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './CustomSelect.module.css'

export default function CustomSelect({ options, placeholder = 'Выберите', value, onChange, hasError = false }) {
  const [open, setOpen] = useState(false)
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 })
  const wrapRef = useRef(null)
  const triggerRef = useRef(null)

  const calcPos = () => {
    if (!triggerRef.current) return
    const r = triggerRef.current.getBoundingClientRect()
    setDropPos({ top: r.bottom + 6, left: r.left, width: r.width })
  }

  useEffect(() => {
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  useEffect(() => {
    if (!open) return
    calcPos()
    window.addEventListener('scroll', calcPos, true)
    window.addEventListener('resize', calcPos)
    return () => {
      window.removeEventListener('scroll', calcPos, true)
      window.removeEventListener('resize', calcPos)
    }
  }, [open])

  const selected = options.find(o => o.value === value)

  const handleToggle = () => {
    if (!open) calcPos()
    setOpen(v => !v)
  }

  return (
    <div
      className={`${styles.wrap} ${open ? styles.open : ''} ${hasError ? styles.error : ''}`}
      ref={wrapRef}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
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

      {open && createPortal(
        <ul
          className={styles.dropdown}
          role="listbox"
          style={{ top: dropPos.top, left: dropPos.left, width: dropPos.width }}
        >
          {options.map(o => (
            <li
              key={o.value}
              className={`${styles.option} ${o.value === value ? styles.optionActive : ''}`}
              role="option"
              aria-selected={o.value === value}
              onMouseDown={(e) => { e.preventDefault(); onChange(o.value); setOpen(false) }}
            >
              {o.label}
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  )
}
