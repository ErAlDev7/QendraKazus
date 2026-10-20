import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { postImage } from '../lib/content.js'
import { useLang } from '../lib/i18n.jsx'
import { Img } from './Img.jsx'
import { ProjectTags } from './ProjectTags.jsx'

// Sliding carousel of posts. Native scroll-snap gives swipe on touch; buttons, dots and arrow keys
// give keyboard control. No autoplay.
export function Carousel({ posts }) {
  const { t, pick, formatDate } = useLang()
  const track = useRef(null)
  const [index, setIndex] = useState(0)

  const goTo = useCallback((i) => {
    const el = track.current
    if (!el) return
    const slide = el.children[i]
    if (!slide) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  // Keep the active dot in sync with what is scrolled into view.
  useEffect(() => {
    const el = track.current
    if (!el) return
    let frame
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const w = el.clientWidth
        setIndex(Math.max(0, Math.min(posts.length - 1, Math.round(el.scrollLeft / w))))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [posts.length])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(Math.min(posts.length - 1, index + 1))
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(Math.max(0, index - 1))
    }
  }

  if (!posts.length) return null

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={t('carousel.label')}>
      <div
        className="carousel__track"
        ref={track}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {posts.map((post, i) => {
          const image = postImage(post)
          return (
            <article
              key={post.id}
              className="slide"
              inert={i !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={t('carousel.position', { n: i + 1, total: posts.length })}
            >
              <div className="slide__media">
                {image && (
                  <Img
                    src={image.src}
                    alt=""
                    sizes="(min-width: 1024px) 800px, 100vw"
                    eager={i === 0}
                  />
                )}
              </div>
              <div className="slide__body">
                <time dateTime={post.date} className="meta">
                  {formatDate(post.date)}
                </time>
                <h3 className="slide__title">
                  <Link to={`/posts/${post.slug}`}>{pick(post.title)}</Link>
                </h3>
                {pick(post.excerpt) && <p className="slide__excerpt">{pick(post.excerpt)}</p>}
                <ProjectTags post={post} />
                <Link to={`/posts/${post.slug}`} className="btn btn--ghost">
                  {t('post.read')}
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {posts.length > 1 && (
        <div className="carousel__controls">
          <button
            type="button"
            className="round-btn"
            onClick={() => goTo(Math.max(0, index - 1))}
            disabled={index === 0}
            aria-label={t('carousel.prev')}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="dots">
            {posts.map((post, i) => (
              <button
                key={post.id}
                type="button"
                className={`dot ${i === index ? 'is-active' : ''}`}
                aria-label={t('carousel.goto', { n: i + 1 })}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="round-btn"
            onClick={() => goTo(Math.min(posts.length - 1, index + 1))}
            disabled={index === posts.length - 1}
            aria-label={t('carousel.next')}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
