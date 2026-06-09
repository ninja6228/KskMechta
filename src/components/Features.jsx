import WalkingHorse from './WalkingHorse'
import { WALKING_HORSE_BY_SECTION } from '../data/walkingHorsePlacements'
import styles from './Features.module.css'

const FEATURES = [
  {
    icon: '🐎',
    title: 'Открываем конный мир',
    desc: 'Рассказываем, как живут лошади, учим ухаживать за ними и беречь — с любовью и уважением',
  },
  {
    icon: '💙',
    title: 'Бережно к людям и лошадям',
    desc: 'Это наш девиз. Каждый гость — желанный, каждая лошадь — любимая',
  },
  {
    icon: '🌈',
    title: 'Для всех без исключения',
    desc: 'Маленьким и большим, юным и зрелым, обычным и особенным — для каждого в нашем клубе есть место',
  },
  {
    icon: '🤝',
    title: 'Сообщество единомышленников',
    desc: 'КСК «Мечта» — клуб, где объединились люди, любящие лошадей. Здесь легко найти друзей и поддержку',
  },
  {
    icon: '✨',
    title: 'Влюбляем в лошадей',
    desc: 'Даже если вы были к ним равнодушны — после визита в «Мечту» всё меняется',
  },
  {
    icon: '📚',
    title: 'Много занятий на любой вкус',
    desc: 'Иппотерапия, обучение верховой езде, прогулки, праздники, фото, пленэр — выбор огромный',
  },
]

export default function Features() {
  return (
    <section className={`section ${styles.section}`} id="features">
      <WalkingHorse {...WALKING_HORSE_BY_SECTION.features} />
      <div className="container">
        <h2 className="section-title">
          О клубе <span className="highlight">«Мечта»</span>
        </h2>
        <p className="section-subtitle">
          Чему нас учат эти прекрасные создания — бережности, терпению, любви. Добро пожаловать в наш мир
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
