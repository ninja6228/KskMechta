import { formatCountValue } from '../hooks/useCountUp'
import styles from './Hero.module.css'

export default function StatCounter({
  end,
  progress,
  suffix = '',
  decimals = 0,
  spaceThousands = false,
}) {
  const value = progress * end
  const display = formatCountValue(value, decimals, spaceThousands)

  return (
    <span className={styles.statNum}>
      {display}{suffix}
    </span>
  )
}
