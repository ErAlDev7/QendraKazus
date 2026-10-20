# Qendra KAZUS website

Static React site (Vite + React Router + plain CSS). No backend, no database, no API, no CMS.
All content is plain text in `src/data/`. Albanian is the default, English is one click away.

## Commands

```bash
npm install        # once
npm run dev        # local preview at http://localhost:5173 (warns about broken data in the console)
npm run build      # builds the site into dist/ (checks data first, then adds per-page meta tags + old-URL redirects)
npm run preview    # serve dist/ locally
npm run images     # re-make web images from the originals (see "Images")
```

Upload the contents of `dist/` to any static host (Netlify, Cloudflare Pages, Vercel, GitHub Pages, cPanel…).

## Project structure

```
src/data/            ALL CONTENT (edit these)
  projects.js        projects
  posts.js           posts (each linked to one or more projects)
  notifications.js   notifications / calls / deadlines
  translations.js    every button, menu and label in sq + en
  site.js            contact details, menu order, carousel/cards settings
  team.js            team members (About page block stays hidden while empty)
  redirects.js       old WordPress URLs -> new routes
src/pages/           one file per page
src/components/      header, footer, carousel, cards, gallery…
src/styles/          tokens.css (colours, type, spacing) + base/layout/components/pages
public/img/          web-ready images (generated)
public/files/        downloadable files (PDF)
scripts/             build helpers
```

## How to add things

### A post (`src/data/posts.js`)
Copy an existing block and edit: `id`, `slug` (the URL, `/posts/<slug>`), `date`, `title`, `excerpt`, `body`
(sq and en, one string per paragraph; links as `[text](https://…)`), `cover`, `projects: ['ecoaction', 'cultural']`
(**one or more project ids**; the post then shows under every project listed), optional `gallery`, `videos`, `downloads`.
A wrong project id prints a warning in `npm run dev` and `npm run build`.

### A project (`src/data/projects.js`)
Copy a block: `id`, `slug`, `title`, `description` (sq/en), `tag` (filter group), `cover`, `images`.
The project page lists all posts that reference its `id`.

### A notification (`src/data/notifications.js`)
Add an entry at the top: `id`, `date`, `type` (`call-experts`, `call-project`, `postponed`, `cancelled`,
`erasmus-partners`, `deadline`, `announcement`), `title`, `body`, optional `deadline` ('YYYY-MM-DD'; after that day it is marked
"Deadline passed" automatically, evaluated in the visitor's browser), optional `link`, `status`.
**The 7 demo entries are marked `sample: true`: delete them before launch.**

### An image
1. Put the original in a local `crawl/assets/` folder (originals are not stored in the repo).
2. Add one line to the `photos` list in `scripts/make-images.mjs`: `['my-name', 'original-file.jpg']`.
3. `npm run images`, then use `'my-name'` as `cover` / in `images`.

### Text in another language field
Every `{ sq, en }` field falls back to Albanian when `en` is empty.

## Old URL → new route

| Old URL | New route |
|---|---|
| `/` | `/` |
| `/about/` | `/about` |
| `/contact/` | `/contact` |
| `/projects/` | `/projects` |
| `/blogs/` (old "Media" page, list of posts) | `/media` |
| `/media/` (old photo-album page) | `/media` (the album itself is the post `/posts/fotoalbumi-minoriteti-maqedonas-ne-pustec-trashegimi-brez-pas-brezi`) |
| `/minoriteti-maqendonas-ne-pustec/` | `/projects/minoriteti-maqedonas-ne-pustec` |
| `/heritage-voices-digital-storytelling-for-korcas-monuments/` | `/posts/heritage-voices-digital-storytelling-for-korcas-monuments` |
| `/peticion-online-per-mbrojtjen-e-lumit-devoll/` | `/posts/peticion-online-per-mbrojtjen-e-lumit-devoll` |
| `/ecoaction-picnic/` | `/posts/ecoaction-picnic` |
| `/dokumentari-minoriteti-maqedonas-ne-pustec-trashegimi-brez-pas-brezi/` | `/posts/dokumentari-minoriteti-maqedonas-ne-pustec-trashegimi-brez-pas-brezi` |
| `/fotoalbumi-minoriteti-maqedonas-ne-pustec-trashegimi-brez-pas-brezi/` | `/posts/fotoalbumi-minoriteti-maqedonas-ne-pustec-trashegimi-brez-pas-brezi` |
| `/minoriteti-maqedonas-ne-pustec-trashegimi-brez-pas-brezi/` | `/posts/minoriteti-maqedonas-ne-pustec-trashegimi-brez-pas-brezi` |
| `/category/pustec/` | `/projects/minoriteti-maqedonas-ne-pustec` |
| `/category/ecoaction-picnic/` | `/projects/ecoaction-picnic` |
| `/category/heritage-voices/` | `/projects/heritage-voices` |
| `/category/erasmus/` | `/projects/erasmus-plus` |
| `/category/media/`, `/author/ela/` | `/media` |
| (new) | `/notifications` (Njoftime) |

`npm run build` writes a small redirect page for every old URL, so old links keep working on any static host.
They are redirects in the browser (not server 301s). If your host supports 301 redirects, copy this table into its settings.

## Fixes made to the original text (every one)

| Where | Was | Now |
|---|---|---|
| Mission statement | akdvokimit | advokimit |
| Devoll petition title | PETICION ONLINE PER MBROJTJEN E LUMIT DEVOLL | PETICION ONLINE PËR MBROJTJEN E LUMIT DEVOLL |
| Pustec exhibition text (post + project page; the live site shows broken characters) | thellēsi tē zemrēs, njē pasuri që dēshmon, vazhdimēsi | thellësi të zemrës, një pasuri që dëshmon, vazhdimësi |
| Old page title "Minoriteti maqendonas në Pustec" | maqendonas | maqedonas (page is merged into the project page) |

Noticed but **not changed** (your call): "ruatjen" in "Angazhim, Reagim, Veprim" (probably "ruajtjen"); "qëndrore" in the mission statement (probably "qendrore").

## Things to review or decide

1. **English translations.** Everything in English was translated by us. Spots are tagged `REVIEW` in `src/data/*.js` and `translations.js`.
2. **About page** is English only on the old site; the Albanian text is our translation (`REVIEW`). The old "meet the team" heading had no content, so the block is hidden until `team.js` has entries.
3. **Posts ↔ projects.** The old site only had categories. Mapping used: the three Pustec posts → *Minoriteti maqedonas në Pustec*; Devoll petition and EcoAction post → *EcoAction Picnic*; Heritage Voices post → *Heritage Voices* **and** *Rrjeti CULTURAL* (it is funded through CULTUR-AL). *Erasmus +* has no posts and no text on the old site (the page says "information coming soon").
4. **Project filter groups** (Culture / Environment / Erasmus+) are ours, to make the filter chips work; change `tag` in `projects.js`.
5. **Broken file on the old site.** The photo-album post linked to `Katalogu-mail-6.pdf` (404). The working `Katalogu-mail-1.pdf` (from the old `/media/` page) is used.
6. **Documentary post** has no text and no image on the old site; its card uses the Pustec project picture.
7. **Logo.** The only logo files are a blue globe with red KAZUS on dark blue. They are used as is in the header; the red does not belong to the sky-blue palette. Send a new logo if you want it matched.
8. **Alt texts** for photos are written by us from what the pictures show; please check names and places.
9. **Notifications** ship with 7 clearly marked SAMPLE entries (as requested). Delete before launch.
10. Per-page titles and meta tags are written into the built HTML. Social previews use the Albanian text.

## Design notes
Light mode only. Brand colours are CSS variables in `src/styles/tokens.css`. Because `#0EA5E9`/`#0284C7` are too light for small text on white, small text and hover fills use `#0369A1` (a darker step of the same blue); `#0EA5E9` fills carry dark text.
Fonts (Bricolage Grotesque for headings, Figtree for text) are bundled with the site; nothing is loaded from Google.
