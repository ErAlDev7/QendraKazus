import { Link } from 'react-router-dom'
import { postImage } from '../lib/content.js'
import { useLang } from '../lib/i18n.jsx'
import { Img } from './Img.jsx'
import { ProjectTags } from './ProjectTags.jsx'

export function PostCard({ post, sizes = '(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw' }) {
  const { pick, t, formatDate } = useLang()
  const image = postImage(post)
  const excerpt = pick(post.excerpt)
  return (
    <article className="post-card">
      <div className="post-card__media">{image && <Img src={image.src} alt="" sizes={sizes} />}</div>
      <div className="post-card__body">
        <time dateTime={post.date} className="meta">
          {formatDate(post.date)}
        </time>
        <h3 className="post-card__title">
          <Link to={`/posts/${post.slug}`} className="stretched">
            {pick(post.title)}
          </Link>
        </h3>
        {excerpt && <p className="post-card__excerpt">{excerpt}</p>}
        <ProjectTags post={post} />
        <span className="more" aria-hidden="true">
          {t('post.read')} →
        </span>
      </div>
    </article>
  )
}
