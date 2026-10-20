// HOME PAGE VIDEOS: three slots shown in a row under "Misioni ynë".
// A slot with no video shows a "coming soon" placeholder. To fill one, set ONE of:
//   youtube: 'VIDEO_ID'          the part after v= in a YouTube link (https://www.youtube.com/watch?v=VIDEO_ID)
//   file:    'my-video.mp4'      an mp4 you put in public/videos/
// Optional on each slot:
//   title:   { sq: '...', en: '...' }   caption under the video
//   poster:  'image-name'               cover picture (a name from public/img, see scripts/make-images.mjs)
//
// Example:
//   { youtube: 'jYY6J_P6uUA', title: { sq: 'Dokumentari', en: 'The documentary' }, poster: 'pustec-cover' },
//   { file: 'activity.mp4', title: { sq: 'Aktiviteti ynë', en: 'Our activity' }, poster: 'group-flags' },

export const videos = [
  { youtube: '', file: 'Video1.mp4', title: { sq: '', en: '' }, poster: '' },
  { youtube: '', file: 'Video2.mp4', title: { sq: '', en: '' }, poster: '' },
  { youtube: '', file: 'Video3.mp4', title: { sq: '', en: '' }, poster: '' },
]
