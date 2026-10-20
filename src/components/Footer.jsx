import { Link } from 'react-router-dom'
import { nav, site } from '../data/site.js'
import { useLang } from '../lib/i18n.jsx'
import { Img } from './Img.jsx'

export function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" className="brand">
            <Img src={site.logo} alt="" sizes="44px" className="brand__mark" />
            <span className="brand__name">
              Qendra <b>KAZUS</b>
            </span>
          </Link>
        </div>
        <nav aria-label={t('footer.nav')}>
          <h2 className="site-footer__title">{t('footer.nav')}</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{t(item.label)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <address>
          <h2 className="site-footer__title">{t('footer.contact')}</h2>
          <p>{site.contact.address}</p>
          <p>
            <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
        </address>
      </div>
      <div className="container site-footer__legal">
        <span>
          © {year} {site.name}. {t('footer.rights')}
        </span>
        <span className="site-footer__credit">Powered by{' '}
          <a href="https://eraldev.vercel.app/" target="_blank" rel="noopener noreferrer">
            <strong>ErAlDev</strong>
          </a></span>
      </div>
    </footer>
  )
}
