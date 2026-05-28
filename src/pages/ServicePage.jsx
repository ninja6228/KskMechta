import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { SERVICES } from '../data/services'
import SlideshowComp from '../components/SlideshowComp'
import PageHeroDecor from '../components/PageHeroDecor'
import { useModal } from '../context/ModalContext'
import styles from './ServicePage.module.css'

export default function ServicePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { openModal } = useModal()
  const service = SERVICES.find(s => s.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!service) {
    return (
      <div className={styles.notFound}>
        <h1>Услуга не найдена</h1>
      </div>
    )
  }

  const others = SERVICES.filter(s => s.id !== id).slice(0, 4)
  const priceFeature = service.features.find(f => f.title === 'Стоимость')

  return (
    <div className={styles.page} key={id}>

      {/* Header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <button className={`btn-glass ${styles.backBtn}`} onClick={() => navigate(-1)}>← Назад</button>
          <Link to="/" className={styles.logo}>
            <img src="https://kskmechta.ru/images/icons/logo.svg" alt="КСК Мечта" draggable={false} />
            <span>КСК Мечта</span>
          </Link>
          <button className="btn-glass accent" onClick={() => openModal()}>Записаться</button>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero} style={{ background: service.gradient }}>
        <PageHeroDecor />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.tag}>{service.tag}</span>
          <h1 className={styles.heroTitle}>{service.icon} {service.title}</h1>
          <p className={styles.heroSub}>{service.shortDesc}</p>
          <div className={styles.features}>
            {service.features.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span className={styles.featureValue}>{f.value}</span>
                <span className={styles.featureLabel}>{f.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slideshow */}
      <section className={styles.slideshowSection}>
        <div className="container">
          <SlideshowComp slides={service.slides} slideColors={service.slideColors} />
        </div>
      </section>

      {/* Content */}
      <section className={styles.content}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.descCol}>
              <h2 className={styles.colTitle}>Об услуге</h2>
              {service.fullDesc.map((p, i) => (
                <p key={i} className={styles.descPara}>{p}</p>
              ))}
            </div>

            <div className={styles.sideCol}>
              <div className={styles.includesCard}>
                <h3 className={styles.includesTitle}>Что входит</h3>
                <ul className={styles.includesList}>
                  {service.includes.map((item, i) => (
                    <li key={i} className={styles.includesItem}>
                      <span className={styles.check}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.ctaCard}>
                {priceFeature && <div className={styles.ctaPrice}>{priceFeature.value}</div>}
                <p className={styles.ctaNote}>Запись по телефону или онлайн</p>
                <a href="tel:+74951234567" className="btn-glass accent" style={{ width: '100%', justifyContent: 'center' }}>
                  Позвонить
                </a>
                <button className="btn-glass" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={() => openModal()}>
                  Оставить заявку
                </button>
                <div className={styles.ctaPhone}>+7 (495) 123-45-67</div>
                <div className={styles.ctaHours}>Пн–Вс: 9:00 – 20:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className={styles.related}>
        <div className="container">
          <h2 className={styles.relatedTitle}>
            Другие <span className="highlight">услуги</span>
          </h2>
          <div className={styles.relatedGrid}>
            {others.map(s => (
              <Link key={s.id} to={`/service/${s.id}`} className={styles.relatedCard} style={{ background: s.gradient }}>
                <span className={styles.relatedIcon}>{s.icon}</span>
                <div>
                  <div className={styles.relatedName}>{s.title}</div>
                  <div className={styles.relatedDesc}>{s.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
