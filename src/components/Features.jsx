import WalkingHorse from './WalkingHorse'
import { WALKING_HORSE_BY_SECTION } from '../data/walkingHorsePlacements'
import styles from './Features.module.css'

const FEATURES = [
  {
    icon: '🏆',
    title: 'Опытные тренеры',
    desc: 'Мастера спорта с 15-летним стажем проведут от первого шага в седле до уверенной езды',
  },
  {
    icon: '🌿',
    title: 'Живописные маршруты',
    desc: 'Конные прогулки по лесным тропам, полям и берегам рек — для вас 12 уникальных маршрутов',
  },
  {
    icon: '🛡️',
    title: 'Полная безопасность',
    desc: 'Все лошади прошли специальную подготовку. Для новичков — обязательный инструктаж и защитное снаряжение',
  },
  {
    icon: '🎖️',
    title: 'Спортивные программы',
    desc: 'Секции для детей и взрослых, подготовка к соревнованиям, персональные тренировки с тренером',
  },
  {
    icon: '🧒',
    title: 'Детская школа',
    desc: 'Занятия с детьми от 4 лет. Ребята учатся ухаживать за лошадьми и уверенно держаться в седле',
  },
  {
    icon: '🎉',
    title: 'Мероприятия под ключ',
    desc: 'Корпоративы, дни рождения, свадьбы и фотосессии — организуем любое событие с конной программой',
  },
]

export default function Features() {
  return (
    <section className={`section ${styles.section}`} id="features">
      <WalkingHorse {...WALKING_HORSE_BY_SECTION.features} />
      <div className="container">
        <h2 className="section-title">
          Почему выбирают <span className="highlight">КСК Мечта</span>
        </h2>
        <p className="section-subtitle">
          Мы создаём не просто занятия верховой ездой — мы создаём воспоминания на всю жизнь
        </p>

        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{f.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
