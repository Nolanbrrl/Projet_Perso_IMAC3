import { Router }        from '../router.js';
import { relativeDate }  from '../utils.js';

const CONVERSATIONS = [];

const MESSAGES = {};

export const Messages = {
  render(params = {}) {
    if (params.view === 'conversation') return _renderConv(params.convId);
    return _renderList();
  },

  init(container, params = {}) {
    if (params.view === 'conversation') _initConv(container);
    else _initList(container);
  },
};

function _renderList() {
  const items = CONVERSATIONS.length
    ? CONVERSATIONS.map(c => `
        <div class="conv-item" data-conv="${c.id}">
          <div class="conv-avatar" style="background:${c.color}">${c.initials}</div>
          <div class="conv-meta">
            <div class="conv-name-row">
              <span class="conv-name">${c.name}</span>
              <span class="conv-time">${relativeDate(c.time)}</span>
            </div>
            <div class="conv-preview ${c.unread ? 'unread' : ''}">${c.lastMsg}</div>
          </div>
          ${c.unread ? '<div style="width:10px;height:10px;border-radius:50%;background:#007aff;flex-shrink:0"></div>' : ''}
        </div>`).join('')
    : '<div style="color:#aaa;font-size:.85rem;padding:24px;text-align:center">Aucune conversation</div>';

  return `
  <div id="messages-app">
    <div class="msg-app-header">
      <span id="msg-back" style="color:var(--ios-blue);font-size:.9rem;cursor:pointer">‹ Retour</span>
      <span class="msg-app-title">Messages</span>
      <span style="font-size:1.2rem">✏️</span>
    </div>
    <div>${items}</div>
  </div>`;
}

function _initList(container) {
  container.querySelector('#msg-back')?.addEventListener('click', () => Router.back());
  container.querySelectorAll('.conv-item').forEach(item => {
    item.addEventListener('click', () => {
      Router.navigate('messages', { view: 'conversation', convId: item.dataset.conv });
    });
  });
}

function _renderConv(convId) {
  const conv = CONVERSATIONS.find(c => c.id === convId);
  const msgs = (MESSAGES[convId] ?? []).slice().sort((a, b) => new Date(a.time) - new Date(b.time));

  let lastDate = null;
  const bubbles = msgs.map(m => {
    const msgDate = new Date(m.time).toLocaleDateString('fr-FR', { weekday:'short', day:'numeric', month:'short' });
    const showDate = msgDate !== lastDate;
    lastDate = msgDate;
    return `
      ${showDate ? `<div style="text-align:center;font-size:.7rem;color:#aaa;padding:12px 0 6px">${msgDate}</div>` : ''}
      <div class="sms-bubble ${m.from === 'me' ? 'sent' : 'received'}">${m.text}</div>
      <div class="msg-time">${new Date(m.time).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</div>`;
  }).join('');

  return `
  <div id="messages-app" style="display:flex;flex-direction:column;height:100%">
    <div class="msg-app-header">
      <button id="conv-back" style="background:none;border:none;color:var(--ios-blue);font-size:.9rem;cursor:pointer">‹ Messages</button>
      <span class="msg-app-title">${conv?.name ?? ''}</span>
      <span>ℹ️</span>
    </div>
    <div class="messages-list app-scroll" style="flex:1;padding:12px;display:flex;flex-direction:column;gap:4px">
      ${bubbles || '<div style="color:#aaa;font-size:.85rem;padding:24px;text-align:center">Aucun message</div>'}
    </div>
    <div style="padding:10px 12px;border-top:1px solid var(--ios-border);display:flex;gap:8px;align-items:center">
      <div style="flex:1;border:1.5px solid #ccc;border-radius:20px;padding:8px 14px;font-size:.85rem;color:#999">Message SMS</div>
      <button style="background:#34c759;border:none;border-radius:50%;width:34px;height:34px;color:white;font-size:1rem;cursor:pointer">↑</button>
    </div>
  </div>`;
}

function _initConv(container) {
  container.querySelector('#conv-back')?.addEventListener('click', () => Router.back());
  const list = container.querySelector('.messages-list');
  if (list) list.scrollTop = list.scrollHeight;
}