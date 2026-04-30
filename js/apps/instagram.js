/**
 * instagram.js
 * Faux Instagram — Feed, Stories, DMs, Conversations.
 *
 * 👉 Remplir STORIES, POSTS, DM_LIST et CONVERSATIONS avec le vrai contenu.
 */

import { Router } from '../router.js';
import { relativeDate } from '../utils.js';

// ─── Données ── remplir ici ────────────────────────────────────────────────

const STORIES = [
  // { id: 'user1', name: 'pseudo', emoji: '👤', seen: false },
];

const NOLAN_PHOTOS = [
  'assets/photos/Photo page Nolan 1.JPG',
  'assets/photos/Photo page Nolan 2.PNG',
  'assets/photos/Photo page Nolan 3.JPG',
  'assets/photos/Photo page Nolan 4.JPG',
  'assets/photos/Photo page Nolan 5.PNG',
  'assets/photos/Photo page Nolan 6.JPG',
  'assets/photos/Photo page Nolan 7.JPG',
  'assets/photos/Photo page Nolan 8.JPG',
];

const NOLAN_VIDEOS = [
  {
    id: 'v-recettes',
    src: 'assets/videos/Post vidéo insta Nolan.mov',
    likes: '7 312',
    caption: 'nouvelle vidéo en ligne Les recettes de NO\' épisode 1 : Le gâteau à plusieurs étages',
    description: 'Les recettes de NO\' — Épisode 1 : Le gâteau à plusieurs étages 🎂\n\nParce que cuisiner ça fait du bien 🙂\n\nRecette complète en commentaire 👇',
    date: '2024-11-08T18:00:00',
  },
];

const POSTS = [
  {
    id: 'p1',
    author: 'lkmrd_', authorBg: '#2e86c1', authorInitials: 'LM',
    location: null,
    src: 'assets/photos/Post insta 10.JPG',
    likes: '234',
    caption: 'réveillon de folie chez moi 🥂 on était presque au complet…',
    date: '2025-01-01T00:45:00',
  },
  {
    id: 'p2',
    author: 'nolanbourrel', authorBg: '#8e44ad', authorInitials: 'NB',
    location: 'Panthéon, Paris',
    src: 'assets/photos/Post insta 21.JPG',
    likes: '4 821',
    caption: 'Paris vu d\'en dessous 🤍',
    date: '2024-12-28T15:20:00',
  },
  {
    id: 'p3',
    author: 'victor.lmrt', authorBg: '#1a6b3a', authorInitials: 'VL',
    location: 'Porto, Portugal',
    src: 'assets/photos/Post insta 8.JPG',
    likes: '312',
    caption: 'Porto was wild 🌊',
    date: '2024-12-15T11:04:00',
  },
  {
    id: 'p4',
    author: 'victor.lmrt', authorBg: '#1a6b3a', authorInitials: 'VL',
    location: 'Ribeira, Porto',
    src: 'assets/photos/Post insta 4.JPG',
    likes: '287',
    caption: 'Ribeira 🌧️',
    date: '2024-12-14T16:33:00',
  },
  {
    id: 'p5',
    author: 'emiliecrt', authorBg: '#c0392b', authorInitials: 'EC',
    location: null,
    src: 'assets/photos/Post insta 9.JPG',
    likes: '891',
    caption: 'liberté 🦅',
    date: '2024-12-10T13:17:00',
  },
  {
    id: 'p6',
    author: 'pxl.drifter', authorBg: '#212121', authorInitials: 'PD',
    location: null,
    src: 'assets/photos/Post insta 1.JPG',
    likes: '1 204',
    caption: 'angles ✦',
    date: '2024-12-05T09:50:00',
  },
  {
    id: 'p7',
    author: 'mathieu.bnd', authorBg: '#117a65', authorInitials: 'MB',
    location: null,
    src: 'assets/photos/Post insta 5.JPG',
    likes: '556',
    caption: 'été t\'as intérêt à revenir',
    date: '2024-11-30T18:02:00',
  },
  {
    id: 'p8',
    author: 'nolanbourrel', authorBg: '#8e44ad', authorInitials: 'NB',
    location: 'Opéra Garnier, Paris',
    src: 'assets/photos/Post insta 2.JPG',
    likes: '6 234',
    caption: 'blue hour 💙',
    date: '2024-11-25T20:14:00',
  },
  {
    id: 'p9',
    author: 'natspreads_', authorBg: '#196f3d', authorInitials: 'NS',
    location: 'Alpes',
    src: 'assets/photos/Post insta 18.JPG',
    likes: '2 341',
    caption: 'quelque part dans les alpes ☁️',
    date: '2024-11-20T10:30:00',
  },
  {
    id: 'p10',
    author: 'nolanbourrel', authorBg: '#8e44ad', authorInitials: 'NB',
    location: 'Musée du Louvre, Paris',
    src: 'assets/photos/Post insta 3.JPG',
    likes: '5 102',
    caption: 'détail 🖼️',
    date: '2024-11-15T14:45:00',
  },
  {
    id: 'p11',
    author: 'soline.vga', authorBg: '#d35400', authorInitials: 'SV',
    location: null,
    src: 'assets/photos/Post insta 23.JPG',
    likes: '1 567',
    caption: 'quand tu vas au marché et que tu trouves ça 🦆',
    date: '2024-11-10T12:00:00',
  },
  {
    id: 'p12',
    author: 'emiliecrt', authorBg: '#c0392b', authorInitials: 'EC',
    location: null,
    src: 'assets/photos/Post insta 19.JPG',
    likes: '743',
    caption: 'petites fleurs de montagne 🌸',
    date: '2024-11-05T08:22:00',
  },
  {
    id: 'p13',
    author: 'natspreads_', authorBg: '#196f3d', authorInitials: 'NS',
    location: null,
    src: 'assets/photos/Post insta 17.JPG',
    likes: '3 120',
    caption: 'respire.',
    date: '2024-10-28T16:10:00',
  },
  {
    id: 'p14',
    author: 'jakobstils', authorBg: '#5d3a8e', authorInitials: 'JK',
    location: 'Ponte Luís I, Porto',
    src: 'assets/photos/Post insta 7.JPG',
    likes: '2 890',
    caption: 'infrastructure as art',
    date: '2024-10-20T11:05:00',
  },
  {
    id: 'p15',
    author: 'mathieu.bnd', authorBg: '#117a65', authorInitials: 'MB',
    location: null,
    src: 'assets/photos/Post insta 20.JPG',
    likes: '445',
    caption: 'quelque part 🌧️',
    date: '2024-10-15T09:30:00',
  },
  {
    id: 'p16',
    author: 'soline.vga', authorBg: '#d35400', authorInitials: 'SV',
    location: null,
    src: 'assets/photos/Post-insta-11.png',
    likes: '1 102',
    caption: 'petites douceurs du matin ☕🍰',
    date: '2024-10-10T10:15:00',
  },
  {
    id: 'p17',
    author: 'emiliecrt', authorBg: '#c0392b', authorInitials: 'EC',
    location: 'Marché de Provence',
    src: 'assets/photos/Post-insta-12.png',
    likes: '674',
    caption: 'marché dominical 🌿 l\'artisanat ça a pas son pareil',
    date: '2024-09-28T11:40:00',
  },
  {
    id: 'p18',
    author: 'nolanbourrel', authorBg: '#8e44ad', authorInitials: 'NB',
    location: 'Jardin des Plantes, Paris',
    src: 'assets/photos/Post-insta-13.jpg',
    likes: '3 870',
    caption: 'la serre tropicale 🌴',
    date: '2024-09-15T14:22:00',
  },
  {
    id: 'p19',
    author: 'jakobstils', authorBg: '#5d3a8e', authorInitials: 'JK',
    location: null,
    src: 'assets/photos/Post-insta-14.jpg',
    likes: '4 231',
    caption: 'up.',
    date: '2024-08-30T16:05:00',
  },
  {
    id: 'p20',
    author: 'pxl.drifter', authorBg: '#212121', authorInitials: 'PD',
    location: null,
    src: 'assets/photos/Post-insta-15.jpg',
    likes: '2 988',
    caption: 'walls talk',
    date: '2024-08-20T12:30:00',
  },
  {
    id: 'p21',
    author: 'soline.vga', authorBg: '#d35400', authorInitials: 'SV',
    location: null,
    src: 'assets/photos/Post-insta-16.png',
    likes: '1 876',
    caption: 'mes petits amis du jour 🌱 + matcha évidemment',
    date: '2024-08-15T15:00:00',
  },
  {
    id: 'p22',
    author: 'natspreads_', authorBg: '#196f3d', authorInitials: 'NS',
    location: 'Norvège',
    src: 'assets/photos/Post-insta-22.png',
    likes: '5 340',
    caption: 'toit en herbe, ciel gris, 14°C. parfait. 🌲',
    date: '2024-07-28T09:10:00',
  },
];

const DM_LIST = [
  {
    id: 'dm-capucine',
    name: 'Raphaël',
    handle: '@raph.crt',
    avatarSrc: 'assets/photos/Photo-profil-raphael.jpg',
    preview: 'nolan.',
    time: '2025-01-28T23:51:00',
    unread: true,
  },
  {
    id: 'dm-victor',
    name: 'Victor',
    handle: '@victor.lmrt',
    emoji: '',
    avatarSrc: 'assets/photos/Photo profil victor.JPG',
    preview: 'Vous : On se retrouve en bas.',
    time: '2025-01-28T21:47:00',
    unread: false,
  },
];

const CONVERSATIONS = {
  'dm-capucine': [
    // ── Phase 1 : DMs obsessionnels pré-kidnapping ─────────────────────
    { from: 'them', text: 'tu as répondu à mon commentaire il y a 3 semaines et depuis je pense à rien d\'autre', time: '2024-09-01T14:22:00' },
    { from: 'them', text: 'j\'ai vu ton live hier soir. tu as regardé droit dans la caméra au moment précis où je regardais. c\'était pour moi, j\'en suis sûr 🥺', time: '2024-09-05T23:08:00' },
    { from: 'them', text: 'je sais que tu me lis même si tu réponds pas', time: '2024-09-12T01:34:00' },
    { from: 'them', text: 't\'as posté à 2h47 du mat. moi aussi j\'étais réveillé à cette heure là. c\'est pas un hasard nolan.', time: '2024-09-18T02:51:00' },
    { from: 'them', text: '47 messages depuis le mois de juillet et tu réponds à aucun. ça fait vraiment mal.', time: '2024-10-02T18:03:00' },
    { from: 'them', text: 'je suis passé devant ton immeuble aujourd\'hui. je suis pas monté. je voulais juste être proche de toi.', time: '2024-10-08T20:17:00' },
    { from: 'them', text: 'on se ressemble tellement. les gens autour de nous le voient pas mais moi je le vois.', time: '2024-10-15T22:40:00' },
    { from: 'them', text: 'j\'ai regardé toutes tes vidéos depuis le début. toutes. je te connais mieux que quiconque.', time: '2024-10-25T00:12:00' },
    { from: 'them', text: 'je t\'aime nolan. je sais que c\'est réciproque même si tu le dis pas encore.', time: '2024-10-29T03:28:00' },
    { from: 'them', text: 'quand est-ce qu\'on se retrouve ?', time: '2024-10-31T23:59:00' },
    // ── Phase 2 : après le kidnapping — Nolan froid, laconique ────────
    { from: 'them', text: 'tu es sorti où mon amour ? 🥺', time: '2024-11-05T11:14:00' },
    { from: 'me',   text: 'faire les courses. je reviens.', time: '2024-11-05T11:16:00' },
    { from: 'them', text: 'tu me manques déjà 😘 ramène des fraises ?', time: '2024-11-12T14:02:00' },
    { from: 'me',   text: 'ok', time: '2024-11-12T14:04:00' },
    { from: 'them', text: 'je t\'aime ❤️', time: '2024-11-12T14:05:00' },
    { from: 'them', text: 'nolan ?', time: '2024-11-12T14:18:00' },
    { from: 'me',   text: 'je suis en caisse', time: '2024-11-12T14:20:00' },
    { from: 'them', text: 't\'as l\'air fatigué ce soir. tu veux que je te fasse un massage ?', time: '2024-11-18T21:33:00' },
    { from: 'me',   text: 'non ça va merci', time: '2024-11-18T21:35:00' },
    { from: 'them', text: 'tu m\'en veux pour quelque chose ?', time: '2024-11-18T21:36:00' },
    { from: 'me',   text: 'non', time: '2024-11-18T21:37:00' },
    { from: 'them', text: 'j\'ai réservé une table pour ce soir, on sort ! ça fait du bien de changer d\'air 🥂', time: '2024-11-25T17:04:00' },
    { from: 'me',   text: 'j\'ai pas envie de sortir', time: '2024-11-25T17:09:00' },
    { from: 'them', text: 'allez ! pour moi ? 🥺', time: '2024-11-25T17:10:00' },
    { from: 'them', text: 'j\'ai préparé ton plat préféré 🍝', time: '2024-12-03T19:22:00' },
    { from: 'me',   text: 'merci', time: '2024-12-03T19:40:00' },
    { from: 'them', text: 'tu regardes quoi comme série ce soir ?', time: '2024-12-10T21:01:00' },
    { from: 'me',   text: 'j\'ai du travail', time: '2024-12-10T21:03:00' },
    { from: 'them', text: 'j\'ai vu que t\'avais essayé d\'appeler quelqu\'un ce soir. c\'était qui ?', time: '2024-12-15T22:48:00' },
    { from: 'me',   text: 'un ami', time: '2024-12-15T22:50:00' },
    { from: 'them', text: 'quel ami ?', time: '2024-12-15T22:50:00' },
    { from: 'me',   text: 'personne que tu connais', time: '2024-12-15T22:52:00' },
    { from: 'them', text: 't\'as pas à me cacher des choses nolan. on est ensemble.', time: '2024-12-15T22:54:00' },
    { from: 'them', text: 'JOYEUX NOËL mon coeur je t\'aime tellement 🎄❤️', time: '2024-12-25T07:01:00' },
    { from: 'me',   text: 'joyeux noël', time: '2024-12-25T09:14:00' },
    { from: 'them', text: 'bonne année nolan 🥂 la meilleure à venir, rien que nous deux 💕', time: '2025-01-01T00:01:00' },
    { from: 'me',   text: 'bonne année', time: '2025-01-01T00:08:00' },
    // ── Phase 3 : 2 janvier — Nolan part à l'hôtel, panique totale ────
    { from: 'them', text: 'nolan t\'es où ?', time: '2025-01-28T18:23:00' },
    { from: 'them', text: 'nolan', time: '2025-01-28T18:31:00' },
    { from: 'them', text: 'réponds s\'il te plaît', time: '2025-01-28T18:35:00' },
    { from: 'them', text: 'ça fait 3h que je t\'ai pas vu', time: '2025-01-28T18:45:00' },
    { from: 'them', text: 'je t\'appelle et tu décroches pas', time: '2025-01-28T18:52:00' },
    { from: 'them', text: 'tes affaires sont plus là nolan', time: '2025-01-28T19:04:00' },
    { from: 'them', text: 'où t\'es parti ? pourquoi tu m\'as rien dit ?', time: '2025-01-28T19:08:00' },
    { from: 'them', text: 'nolan s\'il te plaît réponds moi', time: '2025-01-28T19:15:00' },
    { from: 'them', text: 't\'es avec quelqu\'un c\'est ça', time: '2025-01-28T19:22:00' },
    { from: 'them', text: 'je t\'en supplie nolan', time: '2025-01-28T19:30:00' },
    { from: 'them', text: 'je comprends pas ce qui se passe', time: '2025-01-28T19:41:00' },
    { from: 'them', text: 'reviens à la maison', time: '2025-01-28T19:55:00' },
    { from: 'them', text: 'je vais te retrouver', time: '2025-01-28T20:13:00' },
    { from: 'them', text: 'on va bien tous les deux tu le sais', time: '2025-01-28T20:28:00' },
    { from: 'them', text: 'tu m\'appartiens nolan', time: '2025-01-28T20:47:00' },
    { from: 'them', text: 'je t\'aime', time: '2025-01-28T21:03:00' },
    { from: 'them', text: 'nolan je t\'en supplie réponds', time: '2025-01-28T21:34:00' },
    { from: 'them', text: 'dis moi juste que tu vas bien', time: '2025-01-28T22:01:00' },
    { from: 'them', text: 'je suis allé voir tous tes amis. personne sait où tu es.', time: '2025-01-28T22:45:00' },
    { from: 'them', text: 'je sais que tu me lis', time: '2025-01-28T23:12:00' },
    { from: 'them', text: 'nolan.', time: '2025-01-28T23:51:00' },
  ],

  'dm-victor': [
    { from: 'me', text: 'Salut, désolé de t\'avoir bloqué sans prévenir depuis 1 mois... J\'ai vraiment besoin de ton aide, je t\'en parlerai plus en détails en personne, c\'est plus safe.', time: '2025-01-28T21:44:00' },
    { from: 'me', text: 'Je suis à l\'hôtel Franchi en périphérie de la ville. On se retrouve en bas.', time: '2025-01-28T21:47:00' },
  ],
};

// ─── Module ───────────────────────────────────────────────────────────────

export const Instagram = {
  render(params = {}) {
    if (params.view === 'dms')          return _renderDMList();
    if (params.view === 'conversation') return _renderConversation(params.dmId);
    if (params.view === 'profile')      return _renderProfile();
    if (params.view === 'video')        return _renderVideoPlayer(params.videoId);
    return _renderFeed();
  },

  init(container, params = {}) {
    if (params.view === 'dms')               _initDMList(container);
    else if (params.view === 'conversation') _initConversation(container);
    else if (params.view === 'profile')      _initProfile(container);
    else if (params.view === 'video')        _initVideoPlayer(container);
    else _initFeed(container);
  },
};

// ─── Feed ─────────────────────────────────────────────────────────────────

function _renderFeed() {
  const storiesHtml = STORIES.length
    ? STORIES.map(s => `
        <div class="story-item" data-story="${s.id}">
          <div class="story-avatar ${s.seen ? 'seen' : ''}">
            <div class="story-avatar-inner">${s.emoji}</div>
          </div>
          <span class="story-name">${s.name}</span>
        </div>`).join('')
    : '<div style="color:#aaa;font-size:.8rem;padding:8px 4px">Aucune story</div>';

  const postsHtml = POSTS.length
    ? POSTS.map(p => `
        <article class="ig-post" data-post="${p.id}">
          <div class="post-header">
            <div class="post-avatar" style="background:${p.authorBg || '#555'};color:white;font-size:.72rem;font-weight:700;letter-spacing:.02em">
              ${p.authorInitials || '?'}
            </div>
            <div>
              <div class="post-author">${p.author}</div>
              ${p.location ? `<div class="post-location">${p.location}</div>` : ''}
            </div>
            <span class="post-more">···</span>
          </div>
          <div class="post-image" style="background:#111;position:relative">
            ${p.videoSrc
              ? `<video src="${p.videoSrc}" controls playsinline style="width:100%;height:100%;object-fit:cover;display:block"></video>`
              : p.src
                ? `<img src="${p.src}" alt="" style="width:100%;height:100%;object-fit:cover">`
                : `<div class="post-image-placeholder">${p.imageEmoji || ''}</div>`}
            ${p.video && !p.videoSrc ? `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none"><div style="width:52px;height:52px;background:rgba(0,0,0,.55);border-radius:50%;display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>` : ''}
          </div>
          <div class="post-actions">
            <span><img src="assets/icons/icone fav insta.png" alt="J'aime" style="width:26px;height:26px;object-fit:contain"></span>
            <span><img src="assets/icons/icone commentaire insta.png" alt="Commenter" style="width:26px;height:26px;object-fit:contain"></span>
            <span><img src="assets/icons/icone partage insta.png" alt="Partager" style="width:26px;height:26px;object-fit:contain"></span>
            <span class="save"><img src="assets/icons/icone signet insta.png" alt="Enregistrer" style="width:26px;height:26px;object-fit:contain"></span>
          </div>
          <div class="post-likes">${p.likes} J'aime</div>
          <div class="post-caption"><strong>${p.author}</strong> ${p.caption}</div>
          <div class="post-date">${relativeDate(p.date)}</div>
        </article>`).join('')
    : '<div style="color:#aaa;font-size:.85rem;padding:24px;text-align:center">Aucun post</div>';

  return `
  <div id="instagram-app" class="app-scroll">
    <div class="ig-header">
      <div class="ig-logo">Instagram</div>
      <div class="ig-header-icons">
        <span><img src="assets/icons/icone notifications dans instagram.png" alt="Notifications" style="width:24px;height:24px;object-fit:contain"></span>
        <span id="ig-dm-btn"><img src="assets/icons/icone message dans instagram.png" alt="Messages" style="width:24px;height:24px;object-fit:contain"></span>
      </div>
    </div>
    <div class="ig-stories">${storiesHtml}</div>
    <div>${postsHtml}</div>
    <div class="ig-tabbar">
      <span class="active"><img src="assets/icons/icone home dans instagram.png" alt="Accueil"></span>
      <span><img src="assets/icons/icone recherche dans instagram.png" alt="Recherche"></span>
      <span><img src="assets/icons/icone ajouter dans instagram.png" alt="Ajouter"></span>
      <span><img src="assets/icons/icone notifications dans instagram.png" alt="Notifications"></span>
      <span id="ig-profile"><img src="assets/icons/icone profil dans instagram.png" alt="Profil"></span>
    </div>
  </div>`;
}

function _initFeed(container) {
  container.querySelector('#ig-dm-btn')?.addEventListener('click', () => {
    Router.navigate('instagram', { view: 'dms' });
  });
  container.querySelector('#ig-profile')?.addEventListener('click', () => {
    Router.navigate('instagram', { view: 'profile' });
  });
}

function _renderProfile() {
  const photosGrid = NOLAN_PHOTOS.map(src => `
    <div class="profile-thumb" style="background:#111">
      <img src="${src}" alt="" style="width:100%;height:100%;object-fit:cover">
    </div>`).join('');

  const videosGrid = NOLAN_VIDEOS.map(v => `
    <div class="profile-thumb profile-thumb--video" data-video="${v.id}" style="background:#111;position:relative;cursor:pointer">
      <video src="${v.src}" style="width:100%;height:100%;object-fit:cover" muted preload="metadata"></video>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
        <div style="width:36px;height:36px;background:rgba(0,0,0,.55);border-radius:50%;display:flex;align-items:center;justify-content:center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
    </div>`).join('');

  return `
  <div id="instagram-app" class="app-scroll">
    <div class="ig-header">
      <button id="profile-back" style="background:none;border:none;color:#000;font-size:1.1rem;cursor:pointer;padding:0">‹</button>
      <div class="ig-logo" style="font-size:1rem">nolanbourrel</div>
      <span></span>
    </div>

    <div style="padding:16px;display:flex;gap:20px;align-items:center">
      <div style="width:72px;height:72px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid #ddd">
        <img src="assets/icons/icone profil dans instagram.png" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div style="flex:1">
        <div style="display:flex;gap:24px;margin-bottom:12px;text-align:center">
          <div><div style="font-weight:700;font-size:.95rem">${NOLAN_PHOTOS.length + NOLAN_VIDEOS.length}</div><div style="font-size:.75rem;color:#666">publications</div></div>
          <div><div style="font-weight:700;font-size:.95rem">42,1k</div><div style="font-size:.75rem;color:#666">abonnés</div></div>
          <div><div style="font-weight:700;font-size:.95rem">312</div><div style="font-size:.75rem;color:#666">abonnements</div></div>
        </div>
        <div style="font-size:.82rem;font-weight:600">Nolan Bourrel</div>
        <div style="font-size:.78rem;color:#555;line-height:1.4">📷 Photographe & créateur · Paris<br>✉️ contact@nolanbourrel.fr</div>
      </div>
    </div>

    <div style="padding:0 16px 12px;display:flex;gap:8px">
      <div style="flex:1;border:1px solid #ddd;border-radius:8px;padding:6px 0;text-align:center;font-size:.82rem;font-weight:600">Modifier le profil</div>
      <div style="flex:1;border:1px solid #ddd;border-radius:8px;padding:6px 0;text-align:center;font-size:.82rem;font-weight:600">Partager le profil</div>
    </div>

    <div style="border-top:1px solid #efefef;padding:12px 16px 6px;font-size:.82rem;font-weight:600;color:#555">Vidéos</div>
    <div class="profile-grid">${videosGrid}</div>

    <div style="border-top:1px solid #efefef;padding:12px 16px 6px;font-size:.82rem;font-weight:600;color:#555">Photos</div>
    <div class="profile-grid">${photosGrid}</div>
  </div>`;
}

function _initProfile(container) {
  container.querySelector('#profile-back')?.addEventListener('click', () => Router.back());
  container.querySelectorAll('.profile-thumb--video').forEach(thumb => {
    thumb.addEventListener('click', () => {
      Router.navigate('instagram', { view: 'video', videoId: thumb.dataset.video });
    });
  });
}

function _renderVideoPlayer(videoId) {
  const video = NOLAN_VIDEOS.find(v => v.id === videoId);
  if (!video) return '<div style="padding:20px;color:#000">Vidéo introuvable</div>';

  const descHtml = video.description.replace(/\n/g, '<br>');

  return `
  <div id="instagram-app" style="display:flex;flex-direction:column;height:100%;background:#fff">
    <div class="ig-header" style="border-bottom:1px solid #efefef">
      <button id="video-back" style="background:none;border:none;color:#000;font-size:1.1rem;cursor:pointer;padding:0">‹</button>
      <div class="ig-logo" style="font-size:1rem">nolanbourrel</div>
      <span></span>
    </div>
    <video src="${video.src}" controls playsinline style="width:100%;background:#000;max-height:55%"></video>
    <div style="padding:14px 16px;flex:1;overflow-y:auto">
      <div style="font-size:.88rem;font-weight:600;margin-bottom:4px">nolanbourrel</div>
      <div style="font-size:.84rem;margin-bottom:10px">${video.caption}</div>
      <div style="font-size:.8rem;color:#555;line-height:1.6;white-space:pre-line">${descHtml}</div>
      <div style="margin-top:10px;font-size:.78rem;color:#aaa">${relativeDate(video.date)}</div>
    </div>
  </div>`;
}

function _initVideoPlayer(container) {
  container.querySelector('#video-back')?.addEventListener('click', () => Router.back());
}

// ─── DMs ──────────────────────────────────────────────────────────────────

function _renderDMList() {
  const items = DM_LIST.length
    ? DM_LIST.map(dm => `
        <div class="dm-item" data-dm="${dm.id}">
          <div class="dm-avatar" style="overflow:hidden;padding:0">
            ${dm.avatarSrc
              ? `<img src="${dm.avatarSrc}" alt="" style="width:100%;height:100%;object-fit:cover">`
              : dm.emoji}
          </div>
          <div class="dm-info">
            <div class="dm-name">${dm.name}</div>
            <div class="dm-preview">${dm.preview}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
            <div class="dm-time">${relativeDate(dm.time)}</div>
            ${dm.unread ? '<div class="dm-unread"></div>' : ''}
          </div>
        </div>`).join('')
    : '<div style="color:#aaa;font-size:.85rem;padding:24px;text-align:center">Aucun message</div>';

  return `
  <div id="instagram-app">
    <div class="conversation-header">
      <button class="back-btn" id="ig-back">‹</button>
      <div>
        <div class="conv-name">Messages</div>
      </div>
    </div>
    <div class="ig-dm-list">${items}</div>
  </div>`;
}

function _initDMList(container) {
  container.querySelector('#ig-back')?.addEventListener('click', () => Router.back());
  container.querySelectorAll('.dm-item').forEach(item => {
    item.addEventListener('click', () => {
      Router.navigate('instagram', { view: 'conversation', dmId: item.dataset.dm });
    });
  });
}

// ─── Conversation ─────────────────────────────────────────────────────────

function _renderConversation(dmId) {
  const dm   = DM_LIST.find(d => d.id === dmId);
  const msgs = CONVERSATIONS[dmId] ?? [];

  const bubbles = msgs.map(m => `
    <div class="msg-time">${new Date(m.time).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</div>
    <div class="msg-bubble ${m.from === 'me' ? 'sent' : 'received'}">${m.text}</div>
  `).join('');

  return `
  <div id="instagram-app" style="display:flex;flex-direction:column;height:100%">
    <div class="conversation-header">
      <button class="back-btn" id="conv-back">‹</button>
      <div>
        <div style="display:flex;align-items:center;gap:10px">
          ${dm?.avatarSrc
            ? `<div style="width:34px;height:34px;border-radius:50%;overflow:hidden;flex-shrink:0"><img src="${dm.avatarSrc}" style="width:100%;height:100%;object-fit:cover"></div>`
            : ''}
          <div>
            <div class="conv-name">${dm?.name ?? ''}</div>
            <div class="conv-sub">${dm?.handle ?? ''}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="messages-list app-scroll" style="flex:1">
      ${bubbles || '<div style="color:#aaa;font-size:.85rem;padding:24px;text-align:center">Aucun message</div>'}
    </div>
    <div style="padding:12px;border-top:1px solid #efefef;display:flex;gap:10px;align-items:center">
      <div style="flex:1;background:#f0f0f0;border-radius:20px;padding:10px 16px;font-size:.84rem;color:#999">Message…</div>
      <span style="font-size:1.4rem">😊</span>
    </div>
  </div>`;
}

function _initConversation(container) {
  container.querySelector('#conv-back')?.addEventListener('click', () => Router.back());
  const list = container.querySelector('.messages-list');
  if (list) list.scrollTop = list.scrollHeight;
}
