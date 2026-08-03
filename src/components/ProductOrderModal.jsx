import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CustomSelect from './CustomSelect'
import styles from './ProductOrderModal.module.css'

const RUB = new Intl.NumberFormat('ru-RU')

function initialConfig(product) {
  return {
    color: product.colors[0]?.value ?? '',
    size: '',
    print: product.prints[0]?.value ?? '',
    material: product.materials[0]?.value ?? '',
    delivery: product.delivery[0]?.value ?? '',
  }
}

const EMPTY_CARD = { number: '', holder: '', expiry: '', cvc: '' }
const EMPTY_CONTACT = { firstName: '', lastName: '', phone: '', address: '' }

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function isPhoneValid(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) return /^[78]/.test(digits)
  if (digits.length === 10) return true
  return false
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  const normalized = digits.startsWith('8') ? '7' + digits.slice(1) : digits
  let result = '+' + normalized[0]
  if (normalized.length > 1) result += ' (' + normalized.slice(1, 4)
  if (normalized.length > 4) result += ') ' + normalized.slice(4, 7)
  if (normalized.length > 7) result += '-' + normalized.slice(7, 9)
  if (normalized.length > 9) result += '-' + normalized.slice(9, 11)
  return result
}

export default function ProductOrderModal({ product, open, onClose }) {
  const [step, setStep] = useState('config') // config | details | payment | done
  const [config, setConfig] = useState(() => initialConfig(product))
  const [configError, setConfigError] = useState('')
  const [contact, setContact] = useState(EMPTY_CONTACT)
  const [contactErrors, setContactErrors] = useState(EMPTY_CONTACT)
  const [card, setCard] = useState(EMPTY_CARD)
  const [cardErrors, setCardErrors] = useState(EMPTY_CARD)
  const [loading, setLoading] = useState(false)
  const overlayRef = useRef(null)

  // сброс при открытии
  useEffect(() => {
    if (open) {
      setStep('config')
      setConfig(initialConfig(product))
      setConfigError('')
      setContact(EMPTY_CONTACT)
      setContactErrors(EMPTY_CONTACT)
      setCard(EMPTY_CARD)
      setCardErrors(EMPTY_CARD)
      setLoading(false)
    }
  }, [open, product])

  // блокировка скролла
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const material = product.materials.find(m => m.value === config.material)
  const delivery = product.delivery.find(d => d.value === config.delivery)
  const color = product.colors.find(c => c.value === config.color)
  const print = product.prints.find(p => p.value === config.print)
  const total = product.basePrice + (material?.extra ?? 0) + (delivery?.price ?? 0)

  // Опции для селектов
  const colorOptions = product.colors.map(c => ({ value: c.value, label: c.label, dot: c.hex }))
  const sizeOptions = product.sizes.map(s => ({ value: s, label: `Размер ${s}` }))
  const materialOptions = product.materials.map(m => ({
    value: m.value,
    label: m.extra ? `${m.label} (+${RUB.format(m.extra)} ₽)` : m.label,
  }))
  const deliveryOptions = product.delivery.map(d => ({
    value: d.value,
    label: d.price ? `${d.label} — ${RUB.format(d.price)} ₽` : `${d.label} — бесплатно`,
  }))

  // Слайдер принтов
  const printIndex = Math.max(0, product.prints.findIndex(p => p.value === config.print))
  const setPrintByIndex = (i) => {
    const n = product.prints.length
    setConf('print', product.prints[((i % n) + n) % n].value)
  }

  const isPickup = config.delivery === 'pickup'

  const setConf = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
    if (configError) setConfigError('')
  }

  const setContactField = (key, value) => {
    setContact(prev => ({ ...prev, [key]: value }))
    if (contactErrors[key]) setContactErrors(prev => ({ ...prev, [key]: '' }))
  }

  const setCardField = (key, value) => {
    setCard(prev => ({ ...prev, [key]: value }))
    if (cardErrors[key]) setCardErrors(prev => ({ ...prev, [key]: '' }))
  }

  const goToDetails = () => {
    if (!config.size) {
      setConfigError('Пожалуйста, выберите размер')
      return
    }
    setStep('details')
  }

  const validateContact = () => {
    const errs = { ...EMPTY_CONTACT }
    if (!contact.firstName.trim()) errs.firstName = 'Введите имя'
    if (!contact.lastName.trim()) errs.lastName = 'Введите фамилию'
    if (!contact.phone.trim()) errs.phone = 'Введите телефон'
    else if (!isPhoneValid(contact.phone)) errs.phone = 'Введите корректный номер'
    if (!isPickup && !contact.address.trim()) errs.address = 'Введите адрес доставки'
    setContactErrors(errs)
    return Object.values(errs).every(v => !v)
  }

  const goToPayment = () => {
    if (!validateContact()) return
    setStep('payment')
  }

  const validateCard = () => {
    const errs = { ...EMPTY_CARD }
    if (card.number.replace(/\D/g, '').length !== 16) errs.number = 'Введите 16 цифр карты'
    if (!card.holder.trim()) errs.holder = 'Укажите имя держателя'
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) errs.expiry = 'ММ/ГГ'
    if (!/^\d{3,4}$/.test(card.cvc)) errs.cvc = '3 цифры'
    setCardErrors(errs)
    return Object.values(errs).every(v => !v)
  }

  const handlePay = (e) => {
    e.preventDefault()
    if (!validateCard()) return
    setLoading(true)
    // Демо-оплата: имитируем обработку без реального списания
    setTimeout(() => {
      setLoading(false)
      setStep('done')
    }, 900)
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return createPortal(
    <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {step === 'config' && (
          <>
            <div className={styles.header}>
              <div className={styles.icon}>{product.icon}</div>
              <h2 className={styles.title}>Оформление заказа</h2>
              <p className={styles.subtitle}>{product.title}</p>
            </div>

            <div className={`${styles.body} ${styles.configBody}`}>
              {/* Принт — слайдер с предпросмотром */}
              <div className={`${styles.group} ${styles.groupWide}`}>
                <span className={styles.groupLabel}>Принт</span>
                <div className={styles.slider}>
                  <button
                    type="button"
                    className={styles.sliderArrow}
                    onClick={() => setPrintByIndex(printIndex - 1)}
                    aria-label="Предыдущий принт"
                  >
                    ‹
                  </button>

                  <div className={styles.preview} style={{ background: color?.hex || '#eee' }}>
                    <span className={styles.previewMock}>👕</span>
                    <span className={styles.previewIcon}>{print?.icon}</span>
                  </div>

                  <button
                    type="button"
                    className={styles.sliderArrow}
                    onClick={() => setPrintByIndex(printIndex + 1)}
                    aria-label="Следующий принт"
                  >
                    ›
                  </button>
                </div>

                <div className={styles.printName}>{print?.label}</div>

                <div className={styles.dots}>
                  {product.prints.map((p, i) => (
                    <button
                      key={p.value}
                      type="button"
                      className={`${styles.dot} ${i === printIndex ? styles.dotActive : ''}`}
                      onClick={() => setPrintByIndex(i)}
                      aria-label={`Принт «${p.label}»`}
                    />
                  ))}
                </div>
              </div>

              {/* Цвет */}
              <div className={styles.group}>
                <span className={styles.groupLabel}>Цвет</span>
                <CustomSelect
                  options={colorOptions}
                  placeholder="Выберите цвет"
                  value={config.color}
                  onChange={v => setConf('color', v)}
                />
              </div>

              {/* Размер */}
              <div className={styles.group}>
                <span className={styles.groupLabel}>Размер</span>
                <CustomSelect
                  options={sizeOptions}
                  placeholder="Выберите размер"
                  value={config.size}
                  onChange={v => setConf('size', v)}
                  hasError={!!configError && !config.size}
                />
              </div>

              {/* Материал */}
              <div className={styles.group}>
                <span className={styles.groupLabel}>Материал</span>
                <CustomSelect
                  options={materialOptions}
                  placeholder="Выберите материал"
                  value={config.material}
                  onChange={v => setConf('material', v)}
                />
              </div>

              {/* Доставка */}
              <div className={styles.group}>
                <span className={styles.groupLabel}>Способ доставки</span>
                <CustomSelect
                  options={deliveryOptions}
                  placeholder="Выберите доставку"
                  value={config.delivery}
                  onChange={v => setConf('delivery', v)}
                />
              </div>

              {configError && <span className={styles.error}>{configError}</span>}

              <div className={styles.total}>
                <span>Итого</span>
                <span className={styles.totalValue}>{RUB.format(total)} ₽</span>
              </div>

              <div className={styles.submitWrap}>
                <button className="btn-glass accent" style={{ width: '100%', justifyContent: 'center' }} onClick={goToDetails}>
                  Продолжить
                </button>
              </div>
            </div>
          </>
        )}

        {step === 'details' && (
          <>
            <div className={styles.header}>
              <div className={styles.icon}>📦</div>
              <h2 className={styles.title}>Данные для заказа</h2>
              <p className={styles.subtitle}>
                {product.title} · {color?.label} · {config.size} · «{print?.label}»
              </p>
            </div>

            <form className={styles.body} onSubmit={e => { e.preventDefault(); goToPayment() }} noValidate>
              <div className={styles.cardRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Имя</label>
                  <input
                    className={`${styles.input} ${contactErrors.firstName ? styles.inputError : ''}`}
                    placeholder="Иван"
                    value={contact.firstName}
                    onChange={e => setContactField('firstName', e.target.value)}
                  />
                  {contactErrors.firstName && <span className={styles.fieldError}>{contactErrors.firstName}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Фамилия</label>
                  <input
                    className={`${styles.input} ${contactErrors.lastName ? styles.inputError : ''}`}
                    placeholder="Иванов"
                    value={contact.lastName}
                    onChange={e => setContactField('lastName', e.target.value)}
                  />
                  {contactErrors.lastName && <span className={styles.fieldError}>{contactErrors.lastName}</span>}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Телефон</label>
                <input
                  className={`${styles.input} ${contactErrors.phone ? styles.inputError : ''}`}
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={contact.phone}
                  onChange={e => setContactField('phone', formatPhone(e.target.value))}
                />
                {contactErrors.phone && <span className={styles.fieldError}>{contactErrors.phone}</span>}
              </div>

              {isPickup ? (
                <p className={styles.pickupNote}>
                  🏡 Самовывоз из КСК «Мечта» — адрес не нужен, заберёте заказ на месте.
                </p>
              ) : (
                <div className={styles.field}>
                  <label className={styles.label}>Адрес доставки</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea} ${contactErrors.address ? styles.inputError : ''}`}
                    placeholder="Город, улица, дом, квартира, индекс"
                    rows={3}
                    value={contact.address}
                    onChange={e => setContactField('address', e.target.value)}
                  />
                  {contactErrors.address && <span className={styles.fieldError}>{contactErrors.address}</span>}
                </div>
              )}

              <div className={styles.payActions}>
                <button
                  type="button"
                  className="btn-glass"
                  style={{ flex: '0 0 auto', justifyContent: 'center' }}
                  onClick={() => setStep('config')}
                >
                  Назад
                </button>
                <button
                  type="submit"
                  className="btn-glass accent"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Далее к оплате
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'payment' && (
          <>
            <div className={styles.header}>
              <div className={styles.icon}>💳</div>
              <h2 className={styles.title}>Оплата</h2>
              <p className={styles.subtitle}>
                {product.title} · {color?.label} · {config.size} · «{print?.label}»
              </p>
            </div>

            <form className={styles.body} onSubmit={handlePay} noValidate>
              <div className={styles.field}>
                <label className={styles.label}>Номер карты</label>
                <input
                  className={`${styles.input} ${cardErrors.number ? styles.inputError : ''}`}
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  value={card.number}
                  onChange={e => setCardField('number', formatCardNumber(e.target.value))}
                />
                {cardErrors.number && <span className={styles.fieldError}>{cardErrors.number}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Держатель карты</label>
                <input
                  className={`${styles.input} ${cardErrors.holder ? styles.inputError : ''}`}
                  placeholder="IVAN IVANOV"
                  value={card.holder}
                  onChange={e => setCardField('holder', e.target.value.toUpperCase())}
                />
                {cardErrors.holder && <span className={styles.fieldError}>{cardErrors.holder}</span>}
              </div>

              <div className={styles.cardRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Срок</label>
                  <input
                    className={`${styles.input} ${cardErrors.expiry ? styles.inputError : ''}`}
                    inputMode="numeric"
                    placeholder="ММ/ГГ"
                    value={card.expiry}
                    onChange={e => setCardField('expiry', formatExpiry(e.target.value))}
                  />
                  {cardErrors.expiry && <span className={styles.fieldError}>{cardErrors.expiry}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>CVC</label>
                  <input
                    className={`${styles.input} ${cardErrors.cvc ? styles.inputError : ''}`}
                    inputMode="numeric"
                    placeholder="•••"
                    value={card.cvc}
                    onChange={e => setCardField('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  />
                  {cardErrors.cvc && <span className={styles.fieldError}>{cardErrors.cvc}</span>}
                </div>
              </div>

              <p className={styles.demoNote}>
                Это демонстрационная форма — реальная оплата не производится.
              </p>

              <div className={styles.payActions}>
                <button
                  type="button"
                  className="btn-glass"
                  style={{ flex: '0 0 auto', justifyContent: 'center' }}
                  onClick={() => setStep('details')}
                  disabled={loading}
                >
                  Назад
                </button>
                <button
                  type="submit"
                  className="btn-glass accent"
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={loading}
                >
                  {loading ? 'Обработка…' : `Оплатить ${RUB.format(total)} ₽`}
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'done' && (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>Заказ оформлен!</h3>
            <p className={styles.successText}>
              Спасибо! Мы получили ваш заказ на «{product.title}» и скоро свяжемся с вами,
              чтобы подтвердить детали.
            </p>
            <button className="btn-glass accent" onClick={onClose} style={{ marginTop: 8 }}>
              Готово
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
