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
              <a href="#" className={styles.social} aria-label="VK">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.149-1.744-1.149-.356 0-.458.102-.458.593v1.566c0 .424-.136.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.408 4 8.307c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.745-.576.745z"/>
                </svg>
              </a>
              <a href="#" className={styles.social} aria-label="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-2.026 9.541c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.889.68z"/>
                </svg>
              </a>
              <a href="#" className={styles.social} aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Навигация</h4>
            <ul className={styles.list}>
              <li><a href="#features">О клубе</a></li>
              <li><a href="#services">Услуги</a></li>
              <li><a href="#programs">Программы</a></li>
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
            <a href="tel:+74951234567" className={styles.ctaPhone}>
              +7 (495) 123-45-67
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
                <a href="tel:+74951234567">+7 (8202) 51-55-99</a>
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
