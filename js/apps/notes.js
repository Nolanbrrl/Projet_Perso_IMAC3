import { Router } from '../router.js';

const NOTES = [];

export const Notes = {
  render(params = {}) {
    if (params.view === 'note') return _renderNote(params.noteId, params.unlocked);
    return _renderList();
  },

  init(container, params = {}) {
    if (params.view === 'note') _initNote(container, params.noteId, params.unlocked);
    else _initList(container);
  },
};

function _renderList() {
  const items = NOTES.length
    ? NOTES.map(n => `
        <div class="note-item ${n.locked ? 'locked' : ''}" data-note="${n.id}">
          <div class="note-title">${n.title}</div>
          <div style="display:flex;gap:8px;align-items:baseline">
            <span class="note-date">${n.date}</span>
            <span class="note-preview">${n.locked ? '— verrouillée —' : n.preview}</span>
          </div>
        </div>`).join('')
    : '<div style="color:#aaa;font-size:.85rem;padding:24px;text-align:center">Aucune note</div>';

  return `
  <div id="notes-app">
    <div class="notes-header">
      <button id="notes-back" style="background:none;border:none;color:var(--ios-blue);font-size:.9rem;cursor:pointer">‹ Retour</button>
      <h2>Notes</h2>
      <span style="font-size:1.2rem">✏️</span>
    </div>
    <div>${items}</div>
  </div>`;
}

function _initList(container) {
  container.querySelector('#notes-back')?.addEventListener('click', () => Router.back());
  container.querySelectorAll('.note-item').forEach(item => {
    item.addEventListener('click', () => {
      Router.navigate('notes', { view: 'note', noteId: item.dataset.note });
    });
  });
}

function _renderNote(noteId, unlocked = false) {
  const note = NOTES.find(n => n.id === noteId);
  if (!note) return '<div style="padding:20px">Note introuvable</div>';

  if (note.locked && !unlocked) {
    return `
    <div id="notes-app" style="display:flex;flex-direction:column;height:100%">
      <div class="notes-header">
        <button id="note-back" style="background:none;border:none;color:var(--ios-blue);font-size:.9rem;cursor:pointer">‹ Notes</button>
        <h2>${note.title}</h2>
        <span></span>
      </div>
      <div class="app-locked-overlay" style="background:#fffbe8">
        <div class="lock-icon">🔒</div>
        <p>Note protégée par un code.${note.lockHint ? `<br><em style="font-size:.8rem;color:#aaa">${note.lockHint}</em>` : ''}</p>
        <div class="unlock-input-row">
          <input type="text" class="unlock-input" id="note-code-input" placeholder="Code…" maxlength="30" autocomplete="off"/>
          <button class="unlock-btn" id="note-unlock-btn">OK</button>
        </div>
        <div id="note-code-error" style="font-size:.78rem;color:#ff3b30;min-height:18px"></div>
      </div>
    </div>`;
  }

  return `
  <div id="notes-app" style="display:flex;flex-direction:column;height:100%">
    <div class="notes-header">
      <button id="note-back" style="background:none;border:none;color:var(--ios-blue);font-size:.9rem;cursor:pointer">‹ Notes</button>
      <h2>Note</h2>
      <span style="font-size:.75rem;color:#aaa">${note.date}</span>
    </div>
    <div class="note-view app-scroll">
      <div class="note-view-title">${note.title.replace('🔒 ', '')}</div>
      <div class="note-view-body">${note.body}</div>
    </div>
  </div>`;
}

function _initNote(container, noteId) {
  const note = NOTES.find(n => n.id === noteId);
  container.querySelector('#note-back')?.addEventListener('click', () => Router.back());

  const input = container.querySelector('#note-code-input');
  const btn   = container.querySelector('#note-unlock-btn');
  const errEl = container.querySelector('#note-code-error');
  if (!input || !btn || !note) return;

  const tryUnlock = () => {
    if (input.value.trim().toLowerCase() === note.lockCode.toLowerCase()) {
      Router.navigate('notes', { view: 'note', noteId, unlocked: true }, true);
    } else {
      errEl.textContent = 'Code incorrect';
      input.classList.add('error');
      setTimeout(() => { input.classList.remove('error'); errEl.textContent = ''; }, 800);
    }
  };

  btn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });
}