// Warns about broken references in src/data (run automatically before `npm run build`).
import { projects } from '../src/data/projects.js'
import { posts } from '../src/data/posts.js'
import { notifications } from '../src/data/notifications.js'
import { existsSync } from 'node:fs'

const ids = new Set(projects.map((p) => p.id))
const problems = []
for (const p of posts) {
  if (!p.projects?.length) problems.push(`Post "${p.slug}" is not linked to any project.`)
  for (const id of p.projects || []) if (!ids.has(id)) problems.push(`Post "${p.slug}" references unknown project id "${id}".`)
  if (p.cover && !existsSync(`public/img/${p.cover}-480.webp`)) problems.push(`Post "${p.slug}": image "${p.cover}" not found.`)
  for (const d of p.downloads || []) if (!existsSync(`public/files/${d.file}`)) problems.push(`Post "${p.slug}": file "${d.file}" not found in public/files.`)
}
for (const pr of projects) if (!existsSync(`public/img/${pr.cover}-480.webp`)) problems.push(`Project "${pr.id}": image "${pr.cover}" not found.`)
const types = ['call-experts', 'call-project', 'postponed', 'cancelled', 'erasmus-partners', 'deadline', 'announcement']
for (const n of notifications) {
  if (!types.includes(n.type)) problems.push(`Notification "${n.id}" has unknown type "${n.type}".`)
  for (const d of n.downloads || []) {
    if (!existsSync(`public/files/${d.file}`)) problems.push(`Notification "${n.id}": file "${d.file}" not found in public/files.`)
  }
}
const sample = notifications.filter((n) => n.sample).length
if (sample) problems.push(`${sample} SAMPLE notification(s) are still in notifications.js (delete them before launch).`)

if (problems.length) {
  console.warn('\n⚠  Data warnings:')
  for (const p of problems) console.warn('   - ' + p)
  console.warn('')
} else console.log('Data check: OK')
