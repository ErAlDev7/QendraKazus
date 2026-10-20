import { Link } from 'react-router-dom'
import { postsOfProject } from '../lib/content.js'
import { useLang } from '../lib/i18n.jsx'
import { Img } from './Img.jsx'

export function ProjectCard({ project }) {
  const { pick, t } = useLang()
  const n = postsOfProject(project.id).length
  const description = pick(project.description).split(/\n\n+/)[0]
  return (
    <article className="project-card">
      <div className="project-card__media">
        <Img src={project.cover} alt="" sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">
          <Link to={`/projects/${project.slug}`} className="stretched">
            {pick(project.title)}
          </Link>
        </h3>
        <p className="project-card__text">{description || t('projects.noDescription')}</p>
        {project.tag && <span className="chip-static">{t(`projects.tag.${project.tag}`)}</span>}
        <p className="meta">
          {n === 1 ? t('projects.count1') : t('projects.count', { n })}
          <span className="more" aria-hidden="true">
            {' '}
            · {t('projects.readMore')} →
          </span>
        </p>
      </div>
    </article>
  )
}
