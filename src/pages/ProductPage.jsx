import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import PageHeroDecor from '../components/PageHeroDecor'
import ProductOrderModal from '../components/ProductOrderModal'
import Seo, { buildBreadcrumbLd } from '../components/Seo'
import styles from './ProductPage.module.css'

function VideoPlaceholder({ label }) {
  return (
    <div className={styles.videoBox} aria-hidden="true">
      <div className={styles.playBtn}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </div>
      <span className={styles.videoText}>{label}</span>
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [orderOpen, setOrderOpen] = useState(false)
  const product = PRODUCTS.find(p => p.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!product) {
    return (
      <div className={styles.notFound}>
        <Seo title="Товар не найден" path={`/product/${id}`} noindex />
        <h1>Товар не найден</h1>
        <Link to="/" className="btn-glass accent">На главную</Link>
      </div>
    )
  }

  return (
    <div className={styles.page} key={id}>
      <Seo
        title={product.title}
        description={`${product.title} — ${product.shortDesc}`}
        path={`/product/${product.id}`}
        image={product.cover || undefined}
        type="article"
        jsonLd={buildBreadcrumbLd([
          { name: 'Главная', path: '/' },
          { name: 'Наши товары', path: '/#products' },
          { name: product.title, path: `/product/${product.id}` },
        ])}
      />

      {/* Header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <button className={`btn-glass ${styles.backBtn}`} onClick={() => navigate(-1)}>← Назад</button>
          <Link to="/" className={styles.logo}>
            <img src="https://kskmechta.ru/images/icons/logo.svg" alt="КСК Мечта" draggable={false} />
            <span>КСК Мечта</span>
          </Link>
          <button className="btn-glass accent" onClick={() => setOrderOpen(true)}>Заказать</button>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <PageHeroDecor variant="purple" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={styles.tag}>{product.tag}</span>
            <h1 className={styles.heroTitle}>{product.title}</h1>
            <p className={styles.heroSub}>{product.shortDesc}</p>
            <div className={styles.heroMeta}>
              <span className={styles.price}>{product.price}</span>
              <button className="btn-glass accent" onClick={() => setOrderOpen(true)}>Заказать</button>
            </div>
          </div>
          <div className={styles.heroImage}>
            {product.cover ? (
              <img src={product.cover} alt={product.title} />
            ) : (
              <div className="img-placeholder" style={{ height: '100%', fontSize: '120px' }}>
                {product.icon}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Почему это важно */}
      <section className={styles.block}>
        <div className={`container ${styles.blockGrid}`}>
          <div className={styles.blockMedia}>
            <VideoPlaceholder label="Видео скоро появится" />
          </div>
          <div className={styles.blockText}>
            <h2 className={styles.blockTitle}>Почему это важно</h2>
            {product.why.map((p, i) => (
              <p key={i} className={styles.blockPara}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Как создавались */}
      <section className={`${styles.block} ${styles.blockAlt}`}>
        <div className={`container ${styles.blockGrid} ${styles.blockGridReverse}`}>
          <div className={styles.blockMedia}>
            <VideoPlaceholder label="Видео скоро появится" />
          </div>
          <div className={styles.blockText}>
            <h2 className={styles.blockTitle}>Как создавались</h2>
            {product.how.map((p, i) => (
              <p key={i} className={styles.blockPara}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Финальный CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Хотите такую же?</h2>
            <p className={styles.ctaText}>
              Выберите цвет, размер, принт и материал — и оформите заказ прямо сейчас.
            </p>
            <div className={styles.ctaPriceRow}>
              <span className={styles.ctaPrice}>{product.price}</span>
              <button
                className="btn-glass accent"
                style={{ minWidth: 200, justifyContent: 'center' }}
                onClick={() => setOrderOpen(true)}
              >
                Заказать
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProductOrderModal product={product} open={orderOpen} onClose={() => setOrderOpen(false)} />
    </div>
  )
}
