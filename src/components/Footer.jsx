import { useModal } from '../context/ModalContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { openModal } = useModal()

  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.top}>

          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoWrap}>
              <img src="https://kskmechta.ru/images/icons/logo.svg" alt="КСК Мечта" draggable={false} />
              <span>КСК Мечта</span>
            </div>
            <p className={styles.brandDesc}>
              Конно-спортивный клуб «Мечта» — место, где рождается любовь к лошадям
              и начинаются настоящие приключения.
            </p>
            <div className={styles.socials}>
              <a href="https://vk.com/ksk.mechta" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="VK">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.149-1.744-1.149-.356 0-.458.102-.458.593v1.566c0 .424-.136.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.408 4 8.307c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.745-.576.745z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Навигация</h4>
            <ul className={styles.list}>
              <li><a href="#features">О клубе</a></li>
              <li><a href="#programs">Программы</a></li>
              <li><a href="#team">Команда</a></li>
              <li><a href="#gallery">Галерея</a></li>
              <li><a href="#testimonials">Отзывы</a></li>
            </ul>
          </div>

          {/* CTA block */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Запись</h4>
            <p className={styles.ctaText}>
              Хотите записаться на занятие или узнать стоимость? Оставьте заявку — и мы скоро с вами свяжемся.
            </p>
            <button
              className={`btn-glass accent ${styles.ctaBtn}`}
              onClick={() => openModal()}
            >
              Записаться на занятие
            </button>
            <a href="tel:+79217234441" className={styles.ctaPhone}>
              +7 (921) 723-44-41
            </a>
            <span className={styles.ctaHours}>Пн–Вс: 9:00 – 20:00</span>
          </div>

          {/* Contacts */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Контакты</h4>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}>📍</span>
                <a href="https://yandex.ru/maps/-/CPHB6Q0t" target="_blank" rel="noopener noreferrer">Вологдская область,
                п.Борисово, Череповецкого района</a>
              </li>
              <li>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:+79217234441">+7 (921) 723-44-41</a>
              </li>
              <li>
                <span className={styles.contactIcon}>✉️</span>
                <a href="mailto:info@kskmechta.ru">mgs2010@yandex.ru</a>
              </li>
              <li>
                <span className={styles.contactIcon}>🕐</span>
                <span>Пн–Вс: 9:00 – 20:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
