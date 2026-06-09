import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TEAM } from '../data/team'
import WalkingHorse from './WalkingHorse'
import { WALKING_HORSE_BY_SECTION } from '../data/walkingHorsePlacements'
import styles from './Team.module.css'

const PAGE_SIZE = 3

export default function Team() {
  const [visible, setVisible] = useState(PAGE_SIZE)
  const shown = TEAM.slice(0, visible)
  const hasMore = visible < TEAM.length

  return (
    <section className={`section ${styles.section}`} id="team">
      <WalkingHorse {...WALKING_HORSE_BY_SECTION.team} />
      <div className="container">
        <h2 className="section-title">
          Наша <span className="highlight">команда</span>
        </h2>
        <p className="section-subtitle">
          Профессионалы, которым мы доверяем лошадей и людей — познакомьтесь с каждым
        </p>

        <div className={styles.grid}>
          {shown.map((m) => (
            <Link key={m.id} to={`/team/${m.id}`} className={styles.card}>
              <div className={styles.cardTop} style={{ background: m.avatarGradient }}>
                <span className={styles.avatar}>{m.emoji}</span>
                <span className={styles.tag} style={{ background: m.tagColor }}>
                  {m.tag}
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.name}>{m.name}</h3>
                <p className={styles.bio}>{m.shortBio}</p>
                <div className={styles.metaRow}>
                  <span className={styles.exp}>⏱ Опыт: <strong>{m.experience}</strong></span>
                  <div className={styles.specTags}>
                    {m.specialization.slice(0, 2).map(s => (
                      <span key={s} className={styles.specTag}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.detailHint}>
                  Подробнее <span className={styles.arrow}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className={styles.showMoreWrap}>
            <button className="btn-glass" onClick={() => setVisible(v => v + PAGE_SIZE)}>
              Показать ещё
            </button>
            <button className="btn-glass" onClick={() => setVisible(TEAM.length)}>
              Показать всех
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
