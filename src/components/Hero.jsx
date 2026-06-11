import { useModal } from '../context/ModalContext'
import { useSyncedCountUp } from '../hooks/useCountUp'
import StatCounter from './StatCounter'
import WalkingHorse from './WalkingHorse'
import { WALKING_HORSE_BY_SECTION } from '../data/walkingHorsePlacements'
import horseSvg from '../imgs/horse.svg'
import styles from './Hero.module.css'

export default function Hero() {
  const { openModal } = useModal()
  const { ref: statsRef, progress } = useSyncedCountUp()

  return (
    <section className={styles.hero}>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />
      <div className={styles.circle4} />



      <WalkingHorse {...WALKING_HORSE_BY_SECTION.hero} />
      <div className={styles.heroDecor} aria-hidden="true">
        <div className={styles.decorOrbit1} />
        <div className={styles.decorOrbit2} />
        <div className={styles.decorOrbit3} />
        <div className={styles.decorGlow} />
        <div className={styles.decorEmblem}>
          <img src={horseSvg} alt="" />
        </div>
      </div>
      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span>🐎</span> Конно-спортивный клуб
        </div>

        <h1 className={styles.title}>
          Живи в ритме <span className={styles.accent}>Мечты</span>
        </h1>

        <p className={styles.subtitle}>
          КСК «Мечта» — ваш портал в мир верховой езды, конного туризма
          и незабываемых приключений под открытым небом
        </p>

        <div className={styles.ctas}>
          <button className="btn-glass accent" onClick={() => openModal()}>
            Записаться на занятие
          </button>
          <a href="#programs" className="btn-glass">Выбрать программу</a>
        </div>

        <div className={styles.stats} ref={statsRef}>
          <div className={styles.stat}>
            <StatCounter end={15} progress={progress} suffix="+" />
            <span className={styles.statLabel}>лет опыта</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <StatCounter end={40} progress={progress} />
            <span className={styles.statLabel}>лошадей</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <StatCounter end={5000} progress={progress} suffix="+" spaceThousands />
            <span className={styles.statLabel}>счастливых гостей</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <StatCounter end={12} progress={progress} />
            <span className={styles.statLabel}>маршрутов</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <StatCounter end={4.9} progress={progress} suffix=" ★" decimals={1} />
            <span className={styles.statLabel}>средняя оценка</span>
          </div>
        </div>
      </div>
    </section>
  )
}
