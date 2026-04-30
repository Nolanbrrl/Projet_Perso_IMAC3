import { GameState } from '../gameState.js';
import { Router }    from '../router.js';
import { vibrate }   from '../utils.js';
import { Enigmo }    from '../enigmo.js';

const CORRECT_PIN = '5367';

export const LockScreen = {

  render() {
    const now     = new Date();
    const time    = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const date    = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const dateStr = date.charAt(0).toUpperCase() + date.slice(1);

    return `
    <div id="lockscreen">

      <div class="lock-top">
        <div class="lock-date">${dateStr}</div>
        <div class="lock-time">${time}</div>
      </div>

      <div id="lock-notifs"></div>

      <div id="swipe-hint">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
        <span>Balayez vers le haut</span>
      </div>

      <div class="pin-zone" id="pin-zone">
        <div class="lock-sub">Entrez le code</div>
        <div class="pin-display" id="pin-display">
          <div class="pin-dot"></div>
          <div class="pin-dot"></div>
          <div class="pin-dot"></div>
          <div class="pin-dot"></div>
        </div>
        <div class="pin-pad" id="pin-pad">
          ${_buildPinPad()}
        </div>
      </div>

    </div>`;
  },

  init(container) {
    let current  = '';
    const dots   = container.querySelectorAll('.pin-dot');
    const pinZone  = container.querySelector('#pin-zone');
    const hint     = container.querySelector('#swipe-hint');
    const lockscreen = container.querySelector('#lockscreen');
    let revealed   = false;

    function reveal() {
      if (revealed) return;
      revealed = true;
      hint.classList.add('hint-hidden');
      pinZone.classList.add('revealed');
    }

    let touchStartY = 0;

    lockscreen.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    lockscreen.addEventListener('touchend', e => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (dy > 40) reveal();
    }, { passive: true });

    let mouseStartY = 0;

    lockscreen.addEventListener('mousedown', e => {
      mouseStartY = e.clientY;
    });

    lockscreen.addEventListener('mouseup', e => {
      const dy = mouseStartY - e.clientY;
      if (dy > 30) reveal();
    });

    hint.addEventListener('click', reveal);

    container.querySelector('#pin-pad')?.addEventListener('click', e => {
      if (!revealed) return;

      const key = e.target.closest('.pin-key');
      if (!key) return;

      const val = key.dataset.val;

      if (val === 'del') {
        current = current.slice(0, -1);
        _updateDots(dots, current);
        vibrate([10]);
        return;
      }

      if (current.length >= 4) return;
      current += val;
      _updateDots(dots, current);
      vibrate([10]);

      if (current.length === 4) {
        _checkPin(current, dots, () => { current = ''; _updateDots(dots, current); });
      }
    });
  },
};

function _buildPinPad() {
  const keys = [
    { num: '1', letters: ''     },
    { num: '2', letters: 'ABC'  },
    { num: '3', letters: 'DEF'  },
    { num: '4', letters: 'GHI'  },
    { num: '5', letters: 'JKL'  },
    { num: '6', letters: 'MNO'  },
    { num: '7', letters: 'PQRS' },
    { num: '8', letters: 'TUV'  },
    { num: '9', letters: 'WXYZ' },
    { num: null },
    { num: '0', letters: '' },
    { num: 'del' },
  ];

  return keys.map(k => {
    if (k.num === null) return `<div class="pin-key empty"></div>`;

    if (k.num === 'del') return `
      <button class="pin-key delete" data-val="del" aria-label="Supprimer">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 1H20a1 1 0 011 1v12a1 1 0 01-1 1H8L1 8z"/>
          <line x1="12" y1="5" x2="17" y2="11"/><line x1="17" y1="5" x2="12" y2="11"/>
        </svg>
      </button>`;

    return `
      <button class="pin-key" data-val="${k.num}">
        <span class="pin-key-num">${k.num}</span>
        ${k.letters ? `<span class="pin-key-letters">${k.letters}</span>` : ''}
      </button>`;
  }).join('');
}

function _updateDots(dots, current) {
  dots.forEach((dot, i) => dot.classList.toggle('filled', i < current.length));
}

function _checkPin(pin, dots, reset) {
  if (pin === CORRECT_PIN) {
    dots.forEach(d => { d.style.background = '#34c759'; d.style.borderColor = '#34c759'; });
    vibrate([30, 50, 80]);
    Enigmo.onPinCorrect();
    GameState.unlockPhone();
    setTimeout(() => Router.navigate('homescreen'), 600);
  } else {
    dots.forEach(d => d.classList.add('error-flash'));
    vibrate([50, 30, 50, 30, 50]);
    Enigmo.onPinWrong();
    setTimeout(() => {
      dots.forEach(d => { d.classList.remove('error-flash'); d.style.background = ''; d.style.borderColor = ''; });
      reset();
    }, 600);
  }
}