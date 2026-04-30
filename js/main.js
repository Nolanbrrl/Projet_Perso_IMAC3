import { GameState }  from './gameState.js';
import { Router }     from './router.js';
import { Enigmo }     from './enigmo.js';
import { startClock } from './utils.js';

import { LockScreen } from './apps/lockscreen.js';
import { HomeScreen } from './apps/homescreen.js';
import { Instagram }  from './apps/instagram.js';
import { Messages }   from './apps/messages.js';
import { Gallery }    from './apps/gallery.js';
import { Notes }      from './apps/notes.js';
import { Mail }       from './apps/mail.js';

function init() {
  GameState.load();
  startClock();

  Router.register('lockscreen', LockScreen);
  Router.register('homescreen', HomeScreen);
  Router.register('instagram',  Instagram);
  Router.register('messages',   Messages);
  Router.register('gallery',    Gallery);
  Router.register('notes',      Notes);
  Router.register('mail',       Mail);

  const screen = document.getElementById('screen');
  const navBar = document.getElementById('nav-bar');
  Router.init(screen, navBar);

  const _originalNavigate = Router.navigate.bind(Router);
  Router.navigate = function(appId, params, isBack) {
    _originalNavigate(appId, params, isBack);
    Enigmo.onNavigate(appId);
  };

  document.getElementById('start-btn')?.addEventListener('click', _showPhone);

  _initDebug();
}

function _showPhone() {
  const intro   = document.getElementById('intro-screen');
  const wrapper = document.getElementById('game-wrapper');

  intro.style.transition = 'opacity .6s ease';
  intro.style.opacity = '0';

  setTimeout(() => {
    intro.style.display = 'none';
    wrapper.removeAttribute('hidden');
    wrapper.style.opacity = '0';
    wrapper.style.transition = 'opacity .4s ease';
    requestAnimationFrame(() => { wrapper.style.opacity = '1'; });

    Enigmo.init();
    Router.navigate('lockscreen');
  }, 650);
}

function _initDebug() {
  const toggle  = document.getElementById('debug-toggle');
  const content = document.getElementById('debug-content');
  const stateEl = document.getElementById('debug-state');

  toggle?.addEventListener('click', () => {
    content.hidden = !content.hidden;
    if (!content.hidden) _refreshDebug(stateEl);
  });

  document.getElementById('debug-reset')?.addEventListener('click', () => {
    if (confirm('Remettre la partie à zéro ?')) {
      GameState.reset();
      Enigmo.reset();
      location.reload();
    }
  });
}

function _refreshDebug(el) {
  if (!el) return;
  el.textContent = JSON.stringify({
    apps: Object.fromEntries(
      Object.entries(GameState.data.apps).map(([k, v]) => [k, v.unlocked ? '✅' : '🔒'])
    ),
  }, null, 2);
}

init();