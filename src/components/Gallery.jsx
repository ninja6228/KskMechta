import { useState, useRef, useCallback } from 'react'
import WalkingHorse from './WalkingHorse'
import { WALKING_HORSE_BY_SECTION } from '../data/walkingHorsePlacements'
import styles from './Gallery.module.css'

const GALLERY_IMGS = import.meta.glob('../imgs/gal/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

function gallerySrc(name) {
  return (
    GALLERY_IMGS[`../imgs/gal/${name}.jpg`] ??
    GALLERY_IMGS[`../imgs/gal/${name}.jpeg`] ??
    GALLERY_IMGS[`../imgs/gal/${name}.png`] ??
    GALLERY_IMGS[`../imgs/gal/${name}.webp`] ??
    null
  )
}

const PHOTOS = [
  { src: gallerySrc('1'),  label: 'Утренняя прогулка',  span: 'wide' },
  { src: gallerySrc('2'),  label: 'Лесной маршрут',     span: '' },
  { src: gallerySrc('3'),  label: 'Обучение',            span: '' },
  { src: gallerySrc('4'),  label: 'Конный поход',        span: '' },
  { src: gallerySrc('5'),  label: 'Закат',               span: '' },
  { src: gallerySrc('6'),  label: 'Соревнования',        span: 'tall' },
  { src: gallerySrc('7'),  label: 'Детская школа',       span: '' },
  { src: gallerySrc('8'),  label: 'Весенние прогулки',   span: 'wide' },
  { src: gallerySrc('9'),  label: 'Вечер у костра',      span: '' },
  { src: gallerySrc('10'), label: 'Фотосессии',          span: '' },
].filter((p) => p.src)

const MIN_ZOOM = 1
const MAX_ZOOM = 4

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef(null)
  const imgRef = useRef(null)

  const openLightbox = (i) => {
    setLightbox(i)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setIsDragging(false)
  }

  const closeLightbox = () => {
    setLightbox(null)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setIsDragging(false)
  }

  const navigate = (dir) => {
    setLightbox(l => (l + dir + PHOTOS.length) % PHOTOS.length)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setIsDragging(false)
  }

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z - e.deltaY * 0.002)))
    if (zoom <= 1) setOffset({ x: 0, y: 0 })
  }, [zoom])

  const onMouseDown = (e) => {
    if (zoom <= 1) return
    e.preventDefault()
    dragRef.current = { startX: e.clientX - offset.x, startY: e.clientY - offset.y }
    setIsDragging(true)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }
  const onMouseMove = (e) => {
    if (!dragRef.current) return
    setOffset({ x: e.clientX - dragRef.current.startX, y: e.clientY - dragRef.current.startY })
  }
  const onMouseUp = () => {
    dragRef.current = null
    setIsDragging(false)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  const onTouchStart = (e) => {
    if (zoom <= 1) return
    const t = e.touches[0]
    dragRef.current = { startX: t.clientX - offset.x, startY: t.clientY - offset.y }
    setIsDragging(true)
  }
  const onTouchMove = (e) => {
    if (!dragRef.current) return
    e.preventDefault()
    const t = e.touches[0]
    setOffset({ x: t.clientX - dragRef.current.startX, y: t.clientY - dragRef.current.startY })
  }
  const onTouchEnd = () => {
    dragRef.current = null
    setIsDragging(false)
  }

  return (
    <section className={`section ${styles.section}`} id="gallery">
      <WalkingHorse {...WALKING_HORSE_BY_SECTION.gallery} />
      <div className="container">
        <h2 className="section-title">
          Фото <span className="highlight">галерея</span>
        </h2>
        <p className="section-subtitle">
          Моменты, которые остаются в памяти навсегда — жизнь клуба в объективе
        </p>

        <div className={styles.grid}>
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className={`${styles.item} ${photo.span === 'wide' ? styles.wide : ''} ${photo.span === 'tall' ? styles.tall : ''}`}
              onClick={() => openLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className={styles.itemImg}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>✕</button>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={e => { e.stopPropagation(); navigate(-1) }}
          >‹</button>

          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <div
              className={styles.lightboxImgWrap}
              onWheel={handleWheel}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
            >
              <img
                ref={imgRef}
                src={PHOTOS[lightbox].src}
                alt={PHOTOS[lightbox].label}
                className={styles.lightboxImg}
                decoding="async"
                style={{
                  transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease',
                }}
                draggable={false}
              />
            </div>
          </div>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={e => { e.stopPropagation(); navigate(1) }}
          >›</button>
        </div>
      )}
    </section>
  )
}
