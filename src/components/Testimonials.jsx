import WalkingHorse from './WalkingHorse'
import { WALKING_HORSE_BY_SECTION } from '../data/walkingHorsePlacements'
import styles from './Testimonials.module.css'

const REVIEWS = [
  {
    name: 'Анна Ковалёва',
    role: 'Корпоративный клиент',
    avatar: '👩',
    stars: 5,
    text: 'Провели корпоратив всем отделом — восторг! Даже те, кто боялся лошадей, уехали влюблёнными в этих прекрасных животных. Тренеры деликатные, лошади спокойные. Планируем приехать снова!',
  },
  {
    name: 'Дмитрий Волков',
    role: 'Родитель',
    avatar: '👨',
    stars: 5,
    text: 'Записали сына (7 лет) в детскую школу верховой езды. Теперь он буквально живёт там — рассказывает про каждую лошадку, учит уходу за ними. Тренеры внимательные, атмосфера семейная.',
  },
  {
    name: 'Марина Соколова',
    role: 'Частный клиент',
    avatar: '👩‍🦰',
    stars: 5,
    text: 'Конный поход на 2 дня — лучшее, что я делала в этом году. Пейзажи, свежий воздух, ночь у костра и эти невероятные животные рядом. Уже записалась на следующий поход!',
  },
]

const Stars = ({ count }) => (
  <div className={styles.stars}>
    {'★'.repeat(count)}{'☆'.repeat(5 - count)}
  </div>
)

export default function Testimonials() {
  return (
    <section className={`section ${styles.section}`} id="testimonials">
      <WalkingHorse {...WALKING_HORSE_BY_SECTION.testimonials} />
      <div className="container">
        <h2 className="section-title">
          Что говорят <span className="highlight">наши гости</span>
        </h2>
        <p className="section-subtitle">
          Отзывы тех, кто уже побывал в КСК «Мечта» и навсегда полюбил верховую езду
        </p>

        <div className={styles.grid}>
          {REVIEWS.map((r, i) => (
            <div key={i} className={styles.card}>
              <Stars count={r.stars} />
              <p className={styles.text}>«{r.text}»</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{r.avatar}</div>
                <div>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.role}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
