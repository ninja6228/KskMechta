import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLegalDoc, LEGAL_DOCS } from '../data/legal'
import { COMPANY } from '../data/company'
import PageHeroDecor from '../components/PageHeroDecor'
import Seo, { buildBreadcrumbLd } from '../components/Seo'
import styles from './LegalPage.module.css'

export default function LegalPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doc = getLegalDoc(id)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!doc) {
    return (
      <div className={styles.notFound}>
        <Seo title="Документ не найден" path={`/legal/${id}`} noindex />
        <h1>Документ не найден</h1>
        <Link to="/" className="btn-glass accent">На главную</Link>
      </div>
    )
  }

  const others = LEGAL_DOCS.filter(d => d.id !== id)

  return (
    <div className={styles.page} key={id}>
      <Seo
        title={doc.title}
        description={doc.intro}
        path={`/legal/${doc.id}`}
        type="article"
        jsonLd={buildBreadcrumbLd([
          { name: 'Главная', path: '/' },
          { name: doc.title, path: `/legal/${doc.id}` },
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
          <span className={styles.headerSpacer} />
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <PageHeroDecor variant="purple" />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.tag}>Документы</span>
          <h1 className={styles.heroTitle}>{doc.title}</h1>
          <p className={styles.updated}>Редакция от: {doc.updated}</p>
        </div>
      </section>

      {/* Content */}
      <section className={styles.content}>
        <div className={`container ${styles.contentInner}`}>
          {!COMPANY.filledIn && (
            <p className={styles.draftNote}>
              ⚠️ Черновик. Реквизиты продавца и дата редакции будут указаны перед публикацией.
              Документ носит шаблонный характер и требует проверки юристом.
            </p>
          )}

          {doc.intro && <p className={styles.intro}>{doc.intro}</p>}

          {doc.sections.map((s, i) => (
            <div key={i} className={styles.section}>
              <h2 className={styles.sectionTitle}>{s.h}</h2>
              {s.p.map((para, j) => (
                <p key={j} className={styles.para}>{para}</p>
              ))}
            </div>
          ))}

          <div className={styles.otherDocs}>
            <span className={styles.otherLabel}>Другие документы:</span>
            {others.map(d => (
              <Link key={d.id} to={`/legal/${d.id}`} className={styles.otherLink}>
                {d.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
