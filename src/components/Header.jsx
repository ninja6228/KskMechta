import { useState, useEffect } from 'react'
import { useModal } from '../context/ModalContext'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'О нас', href: '#features' },
  { label: 'Программы', href: '#programs' },
  { label: 'Команда', href: '#team' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#footer' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openModal } = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          <img src="https://kskmechta.ru/images/icons/logo.svg" alt="КСК Мечта" draggable={false} />
          <span>КСК Мечта</span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className={styles.navLink} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="tel:+79217234441" className={styles.phone}>+7 (921) 723-44-41</a>
          <button className="btn-glass" onClick={() => { openModal(); setMenuOpen(false) }}>
            Записаться
          </button>
        </div>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Меню"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
