// NOTIFICATIONS. Plain entries, edited by hand. The page is built from this file.
// There is no database and no admin: edit, save, rebuild.
//
// Fields:
//   id        unique
//   date      'YYYY-MM-DD'  (publication date; newest shown first)
//   type      one of: 'call-experts' | 'call-project' | 'postponed' | 'cancelled'
//                     | 'erasmus-partners' | 'deadline' | 'announcement'
//   title     { sq, en }
//   body      { sq, en }  paragraphs separated by a blank line (\n\n)
//   deadline  optional 'YYYY-MM-DD'. When this day has passed the item is marked "Deadline passed".
//   link      optional { url, label: { sq, en } }  shows a button
//   downloads optional [{ file, label: { sq, en } }]  downloadable files in public/files
//   status    'open' | 'closed' | 'postponed' | 'cancelled'

export const notifications = [
  {
    id: 'heritage-voices-mojo-expert',
    date: '2026-08-02',
    type: 'call-experts',
    status: 'open',
    title: {
      sq: 'Thirrje: Ekspert i Medias dhe Rrëfimit Digjital',
      en: 'Call: Media and Digital Storytelling Expert',
    },
    body: {
      sq: 'Qendra KAZUS fton ekspertë të interesuar për shërbimin e Ekspertit të Medias dhe Rrëfimit Digjital në kuadër të projektit “HeritageVoices: Digital Storytelling for Korça’s Monuments”.\n\nAplikimi duhet të përfshijë CV-në profesionale dhe ofertën financiare të plotësuar e të nënshkruar. Dokumentet mund të dërgohen me email në qendrakazus@gmail.com ose të dorëzohen fizikisht pranë zyrës së Qendrës KAZUS, Rr. Niko Kovaçi, Lgj. 10, P. 7/1. Afati i dorëzimit është 9 gusht 2026, ora 16:00. Dokumentet e thirrjes dhe formulari i ofertës financiare gjenden më poshtë.',
      en: 'Qendra KAZUS invites interested experts to provide Media and Digital Storytelling Expert services under the “HeritageVoices: Digital Storytelling for Korça’s Monuments” project.\n\nApplications must include a professional CV and a completed, signed financial offer. Documents may be submitted by email to qendrakazus@gmail.com or delivered in person to the Qendra KAZUS office at Rr. Niko Kovaçi, Lgj. 10, P. 7/1. The submission deadline is 9 August 2026 at 16:00. The invitation to bid and financial offer form are available below.',
    },
    downloads: [
      {
        file: 'bid-media-digital-storytelling-expert.docx',
        label: { sq: 'Dokumenti i thirrjes për ofertë', en: 'Invitation to bid' },
      },
      {
        file: 'financial-offer-form-mojo-expert.docx',
        label: { sq: 'Formulari i ofertës financiare', en: 'Financial offer form' },
      },
    ],
  },
]
