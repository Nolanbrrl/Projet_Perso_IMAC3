const registry = {};
let navStack = [];
let screenEl = null;
let navBarEl = null;

export const Router = {

  init(screenElement, navBarElement) {
    screenEl = screenElement;
    navBarEl = navBarElement;

    document.getElementById('nav-back')?.addEventListener('click', () => {
      this.back();
    });

    document.getElementById('nav-home')?.addEventListener('click', () => {
      this.goHome();
    });
  },

  register(appId, module) {
    registry[appId] = module;
  },

  navigate(appId, params = {}, isBack = false) {
    if (!registry[appId]) {
      console.error(`[Router] App non enregistrée : "${appId}"`);
      return;
    }

    if (!isBack) {
      navStack.push({ appId, params });
    }

    this._updateNavBar(appId);
    this._render(appId, params, isBack);
  },

  back() {
    if (navStack.length <= 1) return;

    navStack.pop();
    const prev = navStack[navStack.length - 1];
    this.navigate(prev.appId, prev.params, true);
  },

  goHome() {
    navStack = [];
    this.navigate('homescreen', {}, true);
  },

  _render(appId, params, isBack) {
    const module = registry[appId];

    const html = module.render(params);

    screenEl.innerHTML = html;
    screenEl.firstElementChild?.classList.add(isBack ? 'screen-back' : 'screen-enter');

    module.init?.(screenEl, params);

    this._updateStatusBar(appId);
  },

  _updateStatusBar(appId) {
    const statusBar = document.getElementById('status-bar');
    if (!statusBar) return;

    const darkApps = ['lockscreen', 'homescreen', 'gallery', 'youtube'];
    if (darkApps.includes(appId)) {
      statusBar.classList.remove('dark-mode');
    } else {
      statusBar.classList.add('dark-mode');
    }
  },

  _updateNavBar(appId) {
    if (!navBarEl) return;

    const lightApps = ['instagram', 'messages', 'notes', 'mail'];

    if (appId === 'lockscreen') {
      navBarEl.hidden = true;
      return;
    }

    navBarEl.hidden = false;

    if (lightApps.includes(appId)) {
      navBarEl.classList.add('light');
    } else {
      navBarEl.classList.remove('light');
    }
  },

  currentApp() {
    return navStack[navStack.length - 1]?.appId ?? null;
  },

  canGoBack() {
    return navStack.length > 1;
  },
};