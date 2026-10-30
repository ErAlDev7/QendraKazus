import { useMemo, useState } from 'react'
import { Chips } from '../components/Chips.jsx'
import { isExpired, notifications } from '../lib/content.js'
import { useLang } from '../lib/i18n.jsx'
import { Paragraphs } from '../lib/RichText.jsx'
import { useMeta } from '../lib/useMeta.js'

const TYPES = ['call-experts', 'call-project', 'erasmus-partners', 'deadline', 'postponed', 'cancelled', 'announcement']

export default function Notifications() {
  const { t, pick, formatDate } = useLang()
  useMeta({ title: t('meta.notif'), description: t('meta.notifDesc') })
  const [type, setType] = useState('all')

  const present = useMemo(() => TYPES.filter((ty) => notifications.some((n) => n.type === ty)), [])
  const items = [
    { value: 'all', label: t('notif.all') },
    ...present.map((ty) => ({ value: ty, label: t(`notif.type.${ty}`) })),
  ]
  const shown = type === 'all' ? notifications : notifications.filter((n) => n.type === type)

  return (
    <>
      <section className="page-head">
        <div className="container page-head__inner">
          <h1 className="page-head__title">{t('notif.title')}</h1>
          <p className="lead">{t('notif.intro')}</p>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          {notifications.length > 0 && (
            <Chips items={items} value={type} onChange={setType} label={t('notif.filterLabel')} />
          )}

          <ol className="notif-list" aria-live="polite">
            {shown.map((n) => {
              const expired = isExpired(n)
              return (
                <li key={n.id} className={`notif ${expired ? 'is-expired' : ''}`} data-type={n.type}>
                  <div className="notif__side">
                    <time dateTime={n.date} className="meta">
                      {formatDate(n.date)}
                    </time>
                    <span className={`badge badge--${n.type}`}>{t(`notif.type.${n.type}`)}</span>
                    {n.sample && <span className="badge badge--sample">{t('notif.sample')}</span>}
                  </div>
                  <div className="notif__main">
                    <h2 className="notif__title">{pick(n.title)}</h2>
                    <div className="prose prose--tight">
                      <Paragraphs text={pick(n.body)} />
                    </div>
                    {n.deadline && (
                      <p className="notif__deadline">
                        <strong>{t('notif.deadline')}:</strong>{' '}
                        <time dateTime={n.deadline}>{formatDate(n.deadline)}</time>
                        {expired && <span className="badge badge--expired">{t('notif.expired')}</span>}
                      </p>
                    )}
                    {n.link && (
                      <p>
                        <a
                          className="btn"
                          href={n.link.url}
                          {...(/^https?:/.test(n.link.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {pick(n.link.label) || t('notif.open')}
                        </a>
                      </p>
                    )}
                    {n.downloads?.map((d) => (
                      <p key={d.file}>
                        <a className="btn" href={`/files/${d.file}`} download>
                          {t('post.download')}: {pick(d.label)}
                        </a>
                      </p>
                    ))}
                  </div>
                </li>
              )
            })}
          </ol>

          {shown.length === 0 && (
            <p className="empty">{notifications.length ? t('notif.empty') : t('notif.emptyAll')}</p>
          )}
        </div>
      </section>
    </>
  )
}
