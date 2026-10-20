import { useEffect, useRef, useState } from 'react'
import manifest from '../data/imageManifest.json'
import { useLang } from '../lib/i18n.jsx'
import { Img } from './Img.jsx'

// Photo grid with a full-size viewer (native <dialog>: focus is trapped, Esc closes).
// `images` = [{ src, alt: { sq, en } }]. `layout` = 'grid' | 'mosaic'.
export function Gallery({ images, layout = 'grid', title }) {
  const { t, pick } = useLang()
  const dialog = useRef(null)
  const [current, setCurrent] = useState(0)
  const opener = useRef(null)

  const open = (i, el) => {
    opener.current = el
    setCurrent(i)
    dialog.current?.showModal()
  }
  const close = () => dialog.current?.close()
  const step = (d) => setCurrent((c) => (c + d + images.length) % images.length)

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    const onClose = () => opener.current?.focus()
    const onKey = (e) => {
      if (!el.open) return
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    el.addEventListener('close', onClose)
    document.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('close', onClose)
      document.removeEventListener('keydown', onKey)
    }
  }, [images.length])

  if (!images.length) return null
  const big = images[current]
  const m = manifest[big.src]
  const largest = m ? m.widths[m.widths.length - 1] : null

  return (
    <>
      <ul className={`gallery gallery--${layout}`}>
        {images.map((img, i) => (
          <li key={img.src} className={`gallery__item gallery__item--${i}`}>
            <button
              type="button"
              className="gallery__open"
              onClick={(e) => open(i, e.currentTarget)}
              aria-label={`${t('gallery.open')}: ${pick(img.alt)}`}
            >
              <Img src={img.src} alt={img.alt} sizes={layout === 'mosaic' ? '(min-width: 820px) 760px, 100vw' : '(min-width: 1024px) 520px, (min-width: 600px) 50vw, 100vw'} />
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="lightbox" aria-label={title || t('projects.gallery')} onClick={(e) => e.target === dialog.current && close()}>
        <div className="lightbox__inner">
          <button type="button" className="lightbox__close round-btn" onClick={close} aria-label={t('gallery.close')}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
          {largest && (
            <img
              className="lightbox__img"
              src={`/img/${big.src}-${largest[0]}.webp`}
              alt={pick(big.alt)}
              width={m.w}
              height={m.h}
            />
          )}
          {images.length > 1 && (
            <div className="lightbox__nav">
              <button type="button" className="round-btn" onClick={() => step(-1)} aria-label={t('gallery.prev')}>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="meta">
                {current + 1} / {images.length}
              </span>
              <button type="button" className="round-btn" onClick={() => step(1)} aria-label={t('gallery.next')}>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  )
}
