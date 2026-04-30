import { Router } from '../router.js';

const PHOTOS = [
  {
    id: 'photo-fenetre',
    img: 'assets/photos/photo fenetre hotel.jpg',
    emoji: null,
    bg: '#1a1a1a',
    caption: "Vue depuis la fenêtre de la chambre n°12... La personne en bas n'est pas Victor. C'est Raphaël.",
  },
];

export const Gallery = {
  render(params = {}) {
    if (params.view === 'viewer') return _renderViewer(params.photoId);
    return _renderGrid();
  },

  init(container, params = {}) {
    if (params.view === 'viewer') _initViewer(container);
    else _initGrid(container);
  },
};

function _renderGrid() {
  const thumbs = PHOTOS.length
    ? PHOTOS.map(p => `
        <div class="gallery-thumb" data-photo="${p.id}" style="background:${p.bg}">
          ${p.img
            ? `<img src="${p.img}" alt="" loading="lazy">`
            : `<div class="gallery-thumb-placeholder">${p.emoji}</div>`}
        </div>`).join('')
    : '<div style="color:#666;font-size:.85rem;padding:40px;text-align:center;grid-column:1/-1">Aucune photo</div>';

  return `
  <div id="gallery-app">
    <div class="gallery-header">
      <span class="gallery-title">Pellicule</span>
      <span class="gallery-count">${PHOTOS.length} photo${PHOTOS.length !== 1 ? 's' : ''}</span>
    </div>
    <div class="gallery-grid">${thumbs}</div>
  </div>`;
}

function _initGrid(container) {
  container.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      Router.navigate('gallery', { view: 'viewer', photoId: thumb.dataset.photo });
    });
  });
}

function _renderViewer(photoId) {
  const photo = PHOTOS.find(p => p.id === photoId);
  if (!photo) return '<div style="color:white;padding:20px">Photo introuvable</div>';

  return `
  <div id="gallery-app" style="display:flex;flex-direction:column;height:100%">
    <div class="photo-viewer-header">
      <button id="viewer-back" style="background:none;border:none;color:white;font-size:.9rem;cursor:pointer">‹ Retour</button>
      <span style="font-size:.85rem;color:rgba(255,255,255,.6)">Photos</span>
      <span></span>
    </div>

    <div class="photo-viewer-img">
      ${photo.img
        ? `<img src="${photo.img}" alt="" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:8px">`
        : `<div style="background:${photo.bg};width:100%;aspect-ratio:.9;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:5rem">${photo.emoji}</div>`}
    </div>

    ${photo.caption ? `<div class="photo-caption">${photo.caption}</div>` : ''}
  </div>`;
}

function _initViewer(container) {
  container.querySelector('#viewer-back')?.addEventListener('click', () => Router.back());
}