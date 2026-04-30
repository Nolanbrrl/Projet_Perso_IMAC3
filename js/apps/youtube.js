import { Router } from '../router.js';

const VIDEOS = [];

export const YouTube = {
  render(params = {}) {
    if (params.tab === 'player') return _renderPlayer(params.videoId);
    return _renderLibrary();
  },

  init(container, params = {}) {
    if (params.tab === 'player') _initPlayer(container);
    else _initLibrary(container);
  },
};

function _renderLibrary() {
  const cards = VIDEOS.length
    ? VIDEOS.map(v => `
        <div class="yt-video-card" data-video="${v.id}">
          <div class="yt-thumb" style="background:${v.bg}">
            <span style="font-size:1.8rem">${v.emoji}</span>
            ${v.duration ? `<span class="yt-duration">${v.duration}</span>` : ''}
          </div>
          <div class="yt-info">
            <div class="yt-title">${v.title}</div>
            <div class="yt-meta">${v.channel} · ${v.meta}</div>
            ${v.unlisted ? '<span class="yt-unlisted-badge">🔒 Non répertorié</span>' : ''}
          </div>
        </div>`).join('')
    : '<div style="color:#666;font-size:.85rem;padding:24px;text-align:center">Aucune vidéo</div>';

  return `
  <div id="youtube-app" class="app-scroll">
    <div class="yt-header">
      <div class="yt-logo">
        <div class="yt-logo-icon">▶</div>
        YouTube
      </div>
      <div style="display:flex;gap:16px;align-items:center">
        <img src="assets/icons/icone cloche.png" alt="Notifications" style="width:24px;height:24px;object-fit:contain;cursor:pointer">
        <img src="assets/icons/icone recherche dans instagram.png" alt="Recherche" style="width:24px;height:24px;object-fit:contain;cursor:pointer">
      </div>
    </div>

    <div class="yt-tabs">
      <div class="yt-tab active">Bibliothèque</div>
    </div>

    <div class="yt-section">
      <div class="yt-section-title">Vidéos</div>
      ${cards}
    </div>
  </div>`;
}

function _initLibrary(container) {
  container.querySelectorAll('.yt-video-card').forEach(card => {
    card.addEventListener('click', () => {
      Router.navigate('youtube', { tab: 'player', videoId: card.dataset.video });
    });
  });
}

function _renderPlayer(videoId) {
  const video = VIDEOS.find(v => v.id === videoId);
  if (!video) return '<div style="color:white;padding:20px">Vidéo introuvable</div>';

  const videoTag = video.src
    ? `<video controls style="width:100%;aspect-ratio:16/9;background:#000" src="${video.src}"></video>`
    : `<div style="width:100%;aspect-ratio:16/9;background:${video.bg};display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative">
        ${video.emoji}
        <div style="position:absolute;inset:0;background:rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center">
          <div style="width:54px;height:54px;border-radius:50%;background:rgba(255,255,255,.2);border:2px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;font-size:1.4rem">▶</div>
        </div>
      </div>`;

  return `
  <div id="youtube-app" style="display:flex;flex-direction:column;height:100%">
    ${videoTag}

    <div style="padding:14px 16px;color:#0f0f0f;background:#fff;flex:1;overflow-y:auto">
      <button id="player-back" style="background:none;border:none;color:#606060;font-size:.85rem;cursor:pointer;margin-bottom:12px">← Retour</button>
      <div style="font-size:1rem;font-weight:600;margin-bottom:8px;line-height:1.4;color:#0f0f0f">${video.title}</div>
      <div style="font-size:.8rem;color:#606060;margin-bottom:12px">${video.channel} · ${video.meta}</div>
      ${video.unlisted ? `<div style="background:#f2f2f2;border:1px solid #e5e5e5;border-radius:10px;padding:12px;margin-bottom:14px;font-size:.82rem;color:#606060">🔒 <strong style="color:#0f0f0f">Vidéo non répertoriée</strong></div>` : ''}
      ${video.description ? `<div style="font-size:.82rem;color:#606060;line-height:1.6">${video.description}</div>` : ''}
    </div>
  </div>`;
}

function _initPlayer(container) {
  container.querySelector('#player-back')?.addEventListener('click', () => Router.back());
}