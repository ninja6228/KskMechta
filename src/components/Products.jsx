import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import styles from './Products.module.css'

export default function Products() {
  return (
    <section className={`section ${styles.section}`} id="products">
      <div className="container">
        <h2 className="section-title">
          Наши <span className="highlight">товары</span>
        </h2>
        <p className="section-subtitle">
          Забирайте частичку «Мечты» с собой — авторские вещи от нашей команды
        </p>

        <div className={styles.grid}>
          {PRODUCTS.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className={styles.card}>
              <div className={styles.cardTop}>
                {p.cover ? (
                  <img src={p.cover} alt={p.title} className={styles.cover} />
                ) : (
                  <div className="img-placeholder" style={{ height: '220px', fontSize: '72px' }}>
                    {p.icon}
                  </div>
                )}
                <span className={styles.tag}>{p.tag}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.shortDesc}</p>
                <div className={styles.meta}>
                  <span className={styles.price}>{p.price}</span>
                  <span className={styles.more}>
                    Подробнее
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8h8M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
