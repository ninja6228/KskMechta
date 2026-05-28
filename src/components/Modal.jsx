import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '../context/ModalContext'
import CustomSelect from './CustomSelect'
import { sendTelegramNotification } from '../utils/telegram'
import styles from './Modal.module.css'

const PROGRAM_OPTIONS = [
  { value: 'first-meet',  label: 'Первое знакомство' },
  { value: 'forest-walk', label: 'Лесная прогулка' },
  { value: 'horse-trek',  label: 'Конный поход' },
  { value: 'rider-school',label: 'Школа всадника' },
  { value: 'corporate',   label: 'День в седле (корпоратив)' },
  { value: 'other',       label: 'Иное / Не определились' },
]

const EMPTY_FIELDS = { name: '', phone: '', program: '' }
const EMPTY_ERRORS = { name: '',  phone: '',  program: '' }
const EMPTY_CUSTOM = { name: '', contact: '', programTitle: '', programDesc: '' }
const EMPTY_CUSTOM_ERRORS = { name: '', contact: '', programTitle: '', programDesc: '' }

const CLUB_PHONE = '+7 (495) 123-45-67'
const CLUB_PHONE_HREF = 'tel:+74951234567'
const CLUB_EMAIL = 'mgs2010@yandex.ru'
const CLUB_EMAIL_HREF = 'mailto:mgs2010@yandex.ru'

function isPhoneValid(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) return /^[78]/.test(digits)
  if (digits.length === 10) return true
  return false
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function isContactValid(contact) {
  const value = contact.trim()
  if (!value) return false
  if (value.includes('@')) return isEmailValid(value)
  return isPhoneValid(value)
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''

  // normalize leading digit: 8 → 7
  const normalized = digits.startsWith('8') ? '7' + digits.slice(1) : digits

  let result = '+' + normalized[0]
  if (normalized.length > 1) result += ' (' + normalized.slice(1, 4)
  if (normalized.length > 4) result += ') ' + normalized.slice(4, 7)
  if (normalized.length > 7) result += '-' + normalized.slice(7, 9)
  if (normalized.length > 9) result += '-' + normalized.slice(9, 11)
  return result
}

export default function Modal() {
  const { open, closeModal, defaultProgram, modalMode } = useModal()
  const isCustom = modalMode === 'custom'

  const [fields, setFields]   = useState(EMPTY_FIELDS)
  const [errors, setErrors]   = useState(EMPTY_ERRORS)
  const [customFields, setCustomFields] = useState(EMPTY_CUSTOM)
  const [customErrors, setCustomErrors] = useState(EMPTY_CUSTOM_ERRORS)
  const [sent, setSent] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const [loading, setLoading] = useState(false)
  const overlayRef = useRef(null)

  // очистка при открытии и закрытии
  useEffect(() => {
    if (open) {
      if (isCustom) {
        setCustomFields(EMPTY_CUSTOM)
        setCustomErrors(EMPTY_CUSTOM_ERRORS)
      } else {
        setFields({ ...EMPTY_FIELDS, program: defaultProgram || '' })
        setErrors(EMPTY_ERRORS)
      }
      setSent(false)
      setSendFailed(false)
    } else {
      // небольшая задержка чтобы не мигало во время анимации закрытия
      const t = setTimeout(() => {
        setFields(EMPTY_FIELDS)
        setErrors(EMPTY_ERRORS)
        setCustomFields(EMPTY_CUSTOM)
        setCustomErrors(EMPTY_CUSTOM_ERRORS)
        setSent(false)
        setSendFailed(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [open, defaultProgram, isCustom])

  // блокировка скролла
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // закрытие на Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, closeModal])

  const setField = (key, value) => {
    setFields(prev => ({ ...prev, [key]: value }))
    // сбрасываем ошибку поля при вводе
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const setCustomField = (key, value) => {
    setCustomFields(prev => ({ ...prev, [key]: value }))
    if (customErrors[key]) setCustomErrors(prev => ({ ...prev, [key]: '' }))
  }

  const validateCustom = () => {
    const errs = { ...EMPTY_CUSTOM_ERRORS }
    if (!customFields.name.trim()) errs.name = 'Введите ваше имя'
    if (!customFields.contact.trim()) errs.contact = 'Укажите телефон или email'
    else if (!isContactValid(customFields.contact)) errs.contact = 'Введите корректный телефон или email'
    if (!customFields.programTitle.trim()) errs.programTitle = 'Укажите название программы'
    if (!customFields.programDesc.trim()) errs.programDesc = 'Опишите, что вы хотите'
    setCustomErrors(errs)
    return Object.values(errs).every(v => !v)
  }

  const validate = () => {
    const errs = { ...EMPTY_ERRORS }
    if (!fields.name.trim())         errs.name    = 'Введите ваше имя'
    if (!fields.phone.trim())        errs.phone   = 'Введите номер телефона'
    else if (!isPhoneValid(fields.phone)) errs.phone = 'Введите корректный номер (+7 или 8, 10–11 цифр)'
    if (!fields.program)             errs.program = 'Выберите программу'
    setErrors(errs)
    return Object.values(errs).every(v => !v)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setSendFailed(false)
    try {
      const programLabel = PROGRAM_OPTIONS.find(o => o.value === fields.program)?.label || fields.program
      await sendTelegramNotification({ name: fields.name, phone: fields.phone, program: programLabel })
      setSent(true)
    } catch {
      setSendFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCustomSubmit = async (e) => {
    e.preventDefault()
    if (!validateCustom()) return

    setLoading(true)
    setSendFailed(false)
    try {
      await sendTelegramNotification({
        name: customFields.name.trim(),
        contact: customFields.contact.trim(),
        programTitle: customFields.programTitle.trim(),
        programDesc: customFields.programDesc.trim(),
      })
      setSent(true)
    } catch {
      setSendFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const handleContactChange = (value) => {
    if (value.includes('@') || /[a-zA-Z]/.test(value)) {
      setCustomField('contact', value)
      return
    }
    setCustomField('contact', formatPhone(value))
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeModal()
  }

  if (!open) return null

  return createPortal(
    <div
      className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={closeModal} aria-label="Закрыть">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {sent ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>
              {isCustom ? 'Идея отправлена!' : 'Заявка отправлена!'}
            </h3>
            <p className={styles.successText}>
              {isCustom
                ? 'Мы получили вашу заявку и свяжемся с вами, чтобы обсудить программу.'
                : 'И мы скоро с вами свяжемся.'}
            </p>
            <button className="btn-glass accent" onClick={closeModal} style={{ marginTop: 8 }}>
              Закрыть
            </button>
          </div>
        ) : sendFailed ? (
          <div className={styles.sendFailed}>
            <div className={styles.sendFailedIcon}>!</div>
            <h3 className={styles.sendFailedTitle}>Не удалось отправить</h3>
            <p className={styles.sendFailedText}>
              К сожалению, не получилось отправить заявку. Нам очень жаль.
            </p>
            <p className={styles.sendFailedHint}>
              Пожалуйста, свяжитесь с нами по телефону или напишите на почту:
            </p>
            <div className={styles.contactLinks}>
              <a href={CLUB_PHONE_HREF} className={`btn-glass accent ${styles.contactLink}`}>
                {CLUB_PHONE}
              </a>
              <a href={CLUB_EMAIL_HREF} className={`btn-glass ${styles.contactLink}`}>
                {CLUB_EMAIL}
              </a>
            </div>
            <div className={styles.sendFailedActions}>
              <button
                type="button"
                className="btn-glass"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setSendFailed(false)}
              >
                Попробовать снова
              </button>
              <button
                type="button"
                className="btn-glass accent"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={closeModal}
              >
                Закрыть
              </button>
            </div>
          </div>
        ) : isCustom ? (
          <>
            <div className={styles.header}>
              <div className={styles.icon}>✨</div>
              <h2 className={styles.title}>Своя программа</h2>
              <p className={styles.subtitle}>
                Расскажите, что хотите — мы подберём или организуем занятие под вас
              </p>
            </div>

            <form className={styles.form} onSubmit={handleCustomSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label}>Название программы</label>
                <input
                  className={`${styles.input} ${customErrors.programTitle ? styles.inputError : ''}`}
                  type="text"
                  placeholder="Например: Прогулка на рассвете"
                  value={customFields.programTitle}
                  onChange={e => setCustomField('programTitle', e.target.value)}
                />
                {customErrors.programTitle && (
                  <span className={styles.fieldError}>{customErrors.programTitle}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Описание</label>
                <textarea
                  className={`${styles.input} ${styles.textarea} ${customErrors.programDesc ? styles.inputError : ''}`}
                  placeholder="Опишите формат, длительность, пожелания…"
                  rows={4}
                  value={customFields.programDesc}
                  onChange={e => setCustomField('programDesc', e.target.value)}
                />
                {customErrors.programDesc && (
                  <span className={styles.fieldError}>{customErrors.programDesc}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Ваше имя</label>
                <input
                  className={`${styles.input} ${customErrors.name ? styles.inputError : ''}`}
                  type="text"
                  placeholder="Иван Иванов"
                  value={customFields.name}
                  onChange={e => setCustomField('name', e.target.value)}
                />
                {customErrors.name && <span className={styles.fieldError}>{customErrors.name}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Телефон или email</label>
                <input
                  className={`${styles.input} ${customErrors.contact ? styles.inputError : ''}`}
                  type="text"
                  placeholder="+7 (___) ___-__-__ или email@example.com"
                  value={customFields.contact}
                  onChange={e => handleContactChange(e.target.value)}
                />
                {customErrors.contact && (
                  <span className={styles.fieldError}>{customErrors.contact}</span>
                )}
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className="btn-glass accent"
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={loading}
                >
                  {loading ? 'Отправляем…' : 'Отправить'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.icon}>🐎</div>
              <h2 className={styles.title}>Записаться на занятие</h2>
              <p className={styles.subtitle}>
                Оставьте заявку — и мы скоро с вами свяжемся
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              <div className={styles.field}>
                <label className={styles.label}>Ваше имя</label>
                <input
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  type="text"
                  placeholder="Иван Иванов"
                  value={fields.name}
                  onChange={e => setField('name', e.target.value)}
                />
                {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Номер телефона</label>
                <input
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={fields.phone}
                  onChange={e => setField('phone', formatPhone(e.target.value))}
                />
                {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Программа</label>
                <CustomSelect
                  options={PROGRAM_OPTIONS}
                  placeholder="Выберите программу"
                  value={fields.program}
                  onChange={v => setField('program', v)}
                  hasError={!!errors.program}
                />
                {errors.program && <span className={styles.fieldError}>{errors.program}</span>}
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className="btn-glass accent"
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={loading}
                >
                  {loading ? 'Отправляем…' : 'Отправить заявку'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
