import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TEAM } from '../data/team'
import PageHeroDecor from '../components/PageHeroDecor'
import { useModal } from '../context/ModalContext'
import styles from './TeamPage.module.css'

export default function TeamPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { openModal } = useModal()
  const member = TEAM.find(m => m.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!member) {
    return (
      <div className={styles.notFound}>
        <h1>Сотрудник не найден</h1>
        <Link to="/" className="btn-glass">← На главную</Link>
      </div>
    )
  }

  const others = TEAM.filter(m => m.id !== id).slice(0, 4)
  const firstName = member.name.split(' ')[0]

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
      <section className={styles.hero} style={{ background: member.avatarGradient }}>
        <PageHeroDecor />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.heroEmoji}>{member.emoji}</span>
          <span className={styles.tag} style={{ background: member.tagColor }}>
            {member.tag}
          </span>
          <h1 className={styles.heroTitle}>{member.name}</h1>
          <p className={styles.heroSub}>{member.shortBio}</p>
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>⏱</span>
              <span className={styles.featureValue}>{member.experience}</span>
              <span className={styles.featureLabel}>Опыт</span>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🎯</span>
              <span className={styles.featureValue}>{member.specialization.length}</span>
              <span className={styles.featureLabel}>Направления</span>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🏆</span>
              <span className={styles.featureValue}>{member.achievements.length}</span>
              <span className={styles.featureLabel}>Достижения</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className={styles.content}>
        <div className="container">
          <div className={styles.contentGrid}>

            {/* Left column */}
            <div className={styles.descCol}>
              <h2 className={styles.colTitle}>О специалисте</h2>
              <p className={styles.descPara}>{member.fullDesc}</p>

              <blockquote className={styles.quote}>
                «{member.quote}»
              </blockquote>

              <h2 className={styles.colTitle}>Достижения</h2>
              <ul className={styles.achList}>
                {member.achievements.map((a, i) => (
                  <li key={i} className={styles.achItem}>
                    <span className={styles.achCheck}>✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right sidebar */}
            <div className={styles.sideCol}>
              <div className={styles.includesCard}>
                <h3 className={styles.includesTitle}>Специализация</h3>
                <div className={styles.specs}>
                  {member.specialization.map(s => (
                    <span key={s} className={styles.spec}>{s}</span>
                  ))}
                </div>

                <h3 className={styles.includesTitle} style={{ marginTop: 24 }}>Образование</h3>
                <p className={styles.education}>{member.education}</p>
              </div>

              <div className={styles.ctaCard}>
                <p className={styles.ctaNote}>Хотите заниматься с {firstName}?</p>
                <a
                  href="tel:+79217234441"
                  className="btn-glass"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Позвонить
                </a>
                <div className={styles.ctaPhone}>+7 (921) 723-44-41</div>
                <div className={styles.ctaHours}>Пн–Вс: 9:00 – 20:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other team members */}
      <section className={styles.related}>
        <div className="container">
          <h2 className={styles.relatedTitle}>
            Другие члены <span className="highlight">команды</span>
          </h2>
          <div className={styles.relatedGrid}>
            {others.map(m => (
              <Link key={m.id} to={`/team/${m.id}`} className={styles.relatedCard}>
                <span className={styles.relatedIcon}>{m.emoji}</span>
                <div>
                  <div className={styles.relatedName}>{m.name}</div>
                  <div className={styles.relatedDesc}>{m.tag}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <span>© {new Date().getFullYear()} КСК Мечта</span>
          <Link to="/" className={styles.footerHome}>← На главную</Link>
        </div>
      </footer>

    </div>
  )
}
