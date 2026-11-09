import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '../context/ModalContext'
import styles from './Modal.module.css'

const CLUB_PHONE = '+7 (921) 723-44-41'
const CLUB_PHONE_HREF = 'tel:+79217234441'
const CLUB_VK = 'https://vk.com/ksk.mechta'

export default function Modal() {
  const { open, closeModal, modalMode } = useModal()
  const isCustom = modalMode === 'custom'
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeModal])

  if (!open) return null

  return createPortal(
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) closeModal() }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={closeModal} aria-label="Закрыть">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={styles.header}>
          <div className={styles.icon}>{isCustom ? '✨' : '🐎'}</div>
          <h2 className={styles.title}>
            {isCustom ? 'Своя программа' : 'Записаться на занятие'}
          </h2>
          <p className={styles.subtitle}>
            {isCustom
              ? 'Расскажите, что хотите — мы подберём или организуем занятие под вас. Позвоните или напишите нам во ВКонтакте.'
              : 'Запись — по телефону или во ВКонтакте. Мы поможем выбрать программу и ответим на вопросы.'}
          </p>
        </div>

        <div className={styles.contactLinks}>
          <a href={CLUB_PHONE_HREF} className={`btn-glass accent ${styles.contactLink}`}>
            {CLUB_PHONE}
          </a>
          <a
            href={CLUB_VK}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-glass ${styles.contactLink}`}
          >
            Написать в VK
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}
