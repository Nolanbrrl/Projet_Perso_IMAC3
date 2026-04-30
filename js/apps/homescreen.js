/**
 * homescreen.js
 * Écran d'accueil — grille d'apps.
 */

import { Router }    from '../router.js';
import { showToast } from '../utils.js';

const APPS = [
  { id: 'instagram', label: 'Instagram', icon: 'assets/icons/icone instagram.png' },
  { id: 'messages',  label: 'Messages',  icon: 'assets/icons/icone message.png'   },
  { id: 'mail',      label: 'Mail',      icon: 'assets/icons/icone mail apple.png'      },
  { id: 'gallery',   label: 'Photos',    icon: 'assets/icons/Icone galleire.png'   },
  { id: null,        label: 'YouTube',   icon: 'assets/icons/icone youtube.png'    },
  { id: 'notes',     label: 'Notes',     icon: 'assets/icons/icone notes.png'      },
  { id: null, label: 'Météo',      icon: 'assets/icons/icone meteo.png'        },
  { id: null, label: 'Dictaphone', icon: 'assets/icons/icone dictaphone.png'   },
  { id: null, label: 'Horloge',    icon: 'assets/icons/icone horloge.png'      },
  { id: null, label: 'Paramètres', icon: 'assets/icons/icone réglages.png'     },
  { id: null, label: 'Calculette', icon: 'assets/icons/icone calculatrice.png' },
  { id: null, label: 'Calendrier', icon: 'assets/icons/icone calendrier.png'   },
];

const DOCK_APPS = ['instagram', 'messages', 'mail', 'gallery'];

export const HomeScreen = {

  render() {
    const grid = APPS.map(app => `
      <div class="app-icon-wrap" data-app="${app.id ?? ''}">
        <div class="app-icon">
          <img src="${app.icon}" alt="${app.label}" draggable="false">
        </div>
        <span class="app-label">${app.label}</span>
      </div>`).join('');

    const dock = DOCK_APPS.map(id => {
      const app = APPS.find(a => a.id === id);
      return app ? `
        <div class="app-icon-wrap" data-app="${id}">
          <div class="app-icon" style="width:56px;height:56px">
            <img src="${app.icon}" alt="${app.label}" draggable="false">
          </div>
        </div>` : '';
    }).join('');

    return `
    <div id="homescreen">
      <div class="home-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2.5" stroke-linecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span>Rechercher</span>
      </div>
      <div class="app-grid">${grid}</div>
      <div class="home-dock">${dock}</div>
    </div>`;
  },

  init(container) {
    container.querySelectorAll('.app-icon-wrap').forEach(wrap => {
      wrap.addEventListener('click', () => {
        const appId = wrap.dataset.app;
        if (!appId) {
          showToast('Cette app n\'a rien d\'intéressant…', 1800);
          return;
        }
        Router.navigate(appId);
      });
    });
  },
};
