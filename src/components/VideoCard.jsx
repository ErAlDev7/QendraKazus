import { useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { Img } from './Img.jsx'

// One video slot. Placeholder when empty; YouTube loads only after a click (no tracking before);
// mp4 files use the browser's own player.
export function VideoCard({ video, n }) {
  const { t, pick } = useLang()
  const [playing, setPlaying] = useState(false)
  const title = pick(video.title)
  const hasVideo = Boolean(video.youtube || video.file)
  const label = title || `${t('videos.item')} ${n}`

  const play = (
    <span className="video-card__play" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
      </svg>
    </span>
  )

  let media
  if (!hasVideo) {
    media = (
      <div className="video-card__plate video-card__plate--empty" role="img" aria-label={`${label}: ${t('videos.soon')}`}>
        {play}
        <span className="video-card__soon">{t('videos.soon')}</span>
      </div>
    )
  } else if (video.file) {
    media = (
      <video
        className="video-card__video"
        controls
        preload={video.poster ? 'none' : 'metadata'}
        poster={video.poster ? `/img/${video.poster}-960.webp` : undefined}
        aria-label={label}
      >
        <source src={`/videos/${video.file}#t=1`} type="video/mp4" />
      </video>
    )
  } else if (playing) {
    media = (
      <iframe
        className="video-card__video"
        src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0`}
        title={label}
        allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  } else {
    media = (
      <button
        type="button"
        className="video-card__plate video-card__plate--button"
        onClick={() => setPlaying(true)}
        aria-label={`${t('videos.play')}: ${label}`}
      >
        {video.poster && <Img src={video.poster} alt="" sizes="(min-width: 900px) 380px, 100vw" />}
        {play}
      </button>
    )
  }

  return (
    <figure className={`video-card ${hasVideo ? '' : 'is-empty'}`}>
      <div className="video-card__media">{media}</div>
      {title && <figcaption className="video-card__caption">{title}</figcaption>}
    </figure>
  )
}
