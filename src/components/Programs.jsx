import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PROGRAMS, CATEGORIES } from '../data/programs'
import { useModal } from '../context/ModalContext'
import WalkingHorse from './WalkingHorse'
import { WALKING_HORSE_BY_SECTION } from '../data/walkingHorsePlacements'
import styles from './Programs.module.css'

const PAGE_SIZE = 3

export default function Programs() {
  const { openModal, openCustomProgramModal } = useModal()
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = PROGRAMS.filter(p => p.category === activeCategory)
  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  return (
    <section className={`section ${styles.section}`} id="programs">
      <WalkingHorse {...WALKING_HORSE_BY_SECTION.programs} />
      <div className="container">
        <h2 className="section-title">
          Популярные <span className="highlight">программы</span>
        </h2>
        <p className="section-subtitle">
          Готовые форматы на любой вкус — выбирайте и записывайтесь онлайн
        </p>

        {/* Category tabs */}
        <div className={styles.tabs}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ''}`}
              onClick={() => { setActiveCategory(cat.id); setVisible(PAGE_SIZE) }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {shown.map((p) => (
            <div key={p.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className="img-placeholder" style={{ height: '200px', fontSize: '64px' }}>
                  {p.icon}
                </div>
                <span className={styles.tag}>{p.tag}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.shortDesc}</p>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>⏱ {p.duration}</span>
                  <span className={styles.price}>{p.price}</span>
                </div>
                <div className={styles.cardActions}>
                  <Link
                    to={`/program/${p.id}`}
                    className="btn-glass"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Подробнее
                  </Link>
                  <button
                    className="btn-glass accent"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => openModal(p.id)}
                  >
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          ))}

          {hasMore && (
            <div className={styles.showMoreWrap}>
              <button className="btn-glass" onClick={() => setVisible(v => v + PAGE_SIZE)}>
                Показать ещё
              </button>
              <button className="btn-glass" onClick={() => setVisible(filtered.length)}>
                Показать все
              </button>
            </div>
          )}

          <div className={`${styles.card} ${styles.cardCustom}`}>
            <div className={styles.cardCustomInner}>
              <span className={styles.customIcon}>✨</span>
              <h3 className={styles.customTitle}>Не нашли ничего для себя?</h3>
              <p className={styles.customDesc}>
                Ничего страшного — расскажите, что хотите, и мы подберём или организуем программу под вас
              </p>
              <button
                type="button"
                className={`btn-glass accent ${styles.customCta}`}
                onClick={openCustomProgramModal}
              >
                Предложить свою программу
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
