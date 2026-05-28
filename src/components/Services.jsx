import { Link } from 'react-router-dom'
import { SERVICES } from '../data/services'
import WalkingHorse from './WalkingHorse'
import { WALKING_HORSE_BY_SECTION } from '../data/walkingHorsePlacements'
import styles from './Services.module.css'

export default function Services() {
  return (
    <section className={`section ${styles.section}`} id="services">
      <WalkingHorse {...WALKING_HORSE_BY_SECTION.services} />
      <div className="container">
        <h2 className="section-title">
          Наши <span className="highlight">услуги</span>
        </h2>
        <p className="section-subtitle">
          Выберите формат, который подходит именно вам — от разовой прогулки до полного курса обучения
        </p>

        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <Link key={s.id} to={`/service/${s.id}`} className={styles.tile}>
              <div className={styles.tileBg} style={{ background: s.gradient }} />
              <div className={styles.tileIcon}>{s.icon}</div>
              <div className={styles.overlay}>
                <h3 className={styles.tileTitle}>{s.title}</h3>
                <p className={styles.tileDesc}>{s.desc}</p>
                <span className={`btn-glass ${styles.tileBtn}`}>Подробнее</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
