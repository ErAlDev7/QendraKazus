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
      sq: 'Thirrje për ofertë: Ekspert i Medias dhe Tregimit Digjital',
      en: 'Invitation to Bid: Media and Digital Storytelling Expert',
    },
    body: {
      sq: 'Qendra KAZUS fton ekspertë të interesuar të paraqesin ofertë për shërbimin e Ekspertit të Medias dhe Tregimit Digjital në kuadër të projektit “HeritageVoices: Digital Storytelling for Korça’s Monuments”. Eksperti do të zhvillojë modulin e gazetarisë mobile (MoJo) gjatë kampit rinor njëditor, do të trajnojë ambasadorët e rinj në filmim me smartphone, intervistim dhe montazh, si dhe do të ofrojë mentorim teknik për 15 video-histori.\n\nKandidatët duhet të kenë diplomë universitare në komunikim, gazetari, marrëdhënie me publikun, marketing ose fusha të ngjashme, si dhe përvojë në MoJo, prodhim videosh ose media digjitale. Aplikimi duhet të përfshijë CV-në profesionale dhe ofertën financiare të plotësuar e të nënshkruar. Dokumentet mund të dërgohen me email në qendrakazus@gmail.com ose me postë në adresën e Qendrës KAZUS, Korçë, Shqipëri. Afati i dorëzimit është 9 gusht 2026, ora 16:00. Dokumentet e thirrjes dhe formulari i ofertës financiare gjenden më poshtë.',
      en: 'Qendra KAZUS invites interested experts to submit a bid for the Media and Digital Storytelling Expert service under the “HeritageVoices: Digital Storytelling for Korça’s Monuments” project. The expert will deliver the Mobile Journalism (MoJo) training module during a one-day youth bootcamp, train youth ambassadors in smartphone filming, interviewing and editing, and provide technical mentoring for 15 video stories.\n\nApplicants should have a university degree in communication, journalism, public relations, marketing or a related field, and experience in MoJo, video production or digital media. Applications must include a professional CV and a completed, signed financial offer. Documents may be submitted by email to qendrakazus@gmail.com or by post to Qendra KAZUS, Korçë, Albania. The submission deadline is 9 August 2026 at 16:00. The invitation to bid and financial offer form are available below.',
    },
    link: { url: 'mailto:qendrakazus@gmail.com', label: { sq: 'Apliko me email', en: 'Apply by email' } },
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
