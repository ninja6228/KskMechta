import styles from './PageHeroDecor.module.css'

export default function PageHeroDecor({ variant = 'light' }) {
  return (
    <div className={variant === 'purple' ? styles.purple : undefined} aria-hidden="true">
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />
      <div className={styles.circle4} />
    </div>
  )
}
