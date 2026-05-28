import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PROGRAMS } from '../data/programs'
import SlideshowComp from '../components/SlideshowComp'
import PageHeroDecor from '../components/PageHeroDecor'
import { useModal } from '../context/ModalContext'
import styles from './ProgramPage.module.css'

export default function ProgramPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { openModal } = useModal()
  const program = PROGRAMS.find(p => p.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!program) {
    return (
      <div className={styles.notFound}>
        <h1>Программа не найдена</h1>
      </div>
    )
  }

  const others = PROGRAMS.filter(p => p.id !== id).slice(0, 3)

  return (
    <div className={styles.page} key={id}>
      {/* Back header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <button className={`btn-glass ${styles.backBtn}`} onClick={() => navigate(-1)}>
            ← Назад
          </button>
          <Link to="/" className={styles.logo}>
            <img src="https://kskmechta.ru/images/icons/logo.svg" alt="КСК Мечта" draggable={false} />
            <span>КСК Мечта</span>
          </Link>
          <button className="btn-glass accent" onClick={() => openModal(id)}>Записаться</button>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <PageHeroDecor variant="purple" />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.tag}>{program.tag}</span>
          <h1 className={styles.heroTitle}>{program.title}</h1>
          <p className={styles.heroSub}>{program.shortDesc}</p>
          <div className={styles.heroMeta}>
            <div className={styles.metaCard}>
              <span className={styles.metaIcon}>⏱</span>
              <span className={styles.metaValue}>{program.duration}</span>
              <span className={styles.metaLabel}>Длительность</span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaIcon}>👥</span>
              <span className={styles.metaValue}>{program.groupSize}</span>
              <span className={styles.metaLabel}>Группа</span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaIcon}>📊</span>
              <span className={styles.metaValue}>{program.difficulty}</span>
              <span className={styles.metaLabel}>Уровень</span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaIcon}>💰</span>
              <span className={styles.metaValue}>{program.price}</span>
              <span className={styles.metaLabel}>Стоимость</span>
            </div>
          </div>
        </div>
      </section>

      {/* Slideshow */}
      <section className={styles.slideshowSection}>
        <div className="container">
          <SlideshowComp slides={program.slides} slideColors={program.slideColors} />
        </div>
      </section>

      {/* Content */}
      <section className={styles.content}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Left */}
            <div className={styles.descCol}>
              <h2 className={styles.colTitle}>О программе</h2>
              {program.fullDesc.map((p, i) => (
                <p key={i} className={styles.descPara}>{p}</p>
              ))}

              <h2 className={styles.colTitle} style={{ marginTop: 40 }}>Расписание</h2>
              <div className={styles.schedule}>
                {program.schedule.map((s, i) => (
                  <div key={i} className={styles.scheduleRow}>
                    <span className={styles.scheduleTime}>{s.time}</span>
                    <span className={styles.scheduleLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className={styles.sideCol}>
              <div className={styles.includesCard}>
                <h3 className={styles.includesTitle}>Что включено</h3>
                <ul className={styles.includesList}>
                  {program.includes.map((item, i) => (
                    <li key={i} className={styles.includesItem}>
                      <span className={styles.check}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.ctaCard}>
                <div className={styles.ctaPrice}>{program.price}</div>
                <p className={styles.ctaNote}>Запись по телефону или онлайн</p>
                <a href="tel:+74951234567" className="btn-glass accent" style={{ width: '100%', justifyContent: 'center' }}>
                  Позвонить
                </a>
                <button className="btn-glass" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={() => openModal(id)}>
                  Оставить заявку
                </button>
                <div className={styles.ctaPhone}>+7 (495) 123-45-67</div>
                <div className={styles.ctaHours}>Пн–Вс: 9:00 – 20:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other programs */}
      <section className={styles.others}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 32 }}>
            Другие <span className="highlight">программы</span>
          </h2>
          <div className={styles.othersGrid}>
            {others.map(p => (
              <Link key={p.id} to={`/program/${p.id}`} className={styles.otherCard}>
                <div className={styles.otherIcon}>{p.icon}</div>
                <div>
                  <div className={styles.otherTitle}>{p.title}</div>
                  <div className={styles.otherMeta}>{p.duration} · {p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
