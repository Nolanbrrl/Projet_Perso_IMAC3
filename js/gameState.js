const SAVE_KEY = 'lastpost_save';

const DEFAULT_STATE = {
  phoneUnlocked: false,

  apps: {
    instagram: { unlocked: true  },
    messages:  { unlocked: true  },
    gallery:   { unlocked: true  },
    youtube:   { unlocked: true  },
    notes:     { unlocked: true  },
    mail:      { unlocked: true  },
  },
};

export const GameState = {
  data: structuredClone(DEFAULT_STATE),

  save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
  },

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        this.data = this._deepMerge(structuredClone(DEFAULT_STATE), saved);
      }
    } catch (e) {
      console.warn('[GameState] Impossible de charger la sauvegarde:', e);
    }
  },

  reset() {
    localStorage.removeItem(SAVE_KEY);
    this.data = structuredClone(DEFAULT_STATE);
  },

  unlockPhone() {
    this.data.phoneUnlocked = true;
    this.save();
  },

  unlockApp(appId) {
    if (this.data.apps[appId]) {
      this.data.apps[appId].unlocked = true;
      this.save();
    }
  },

  lockApp(appId) {
    if (this.data.apps[appId]) {
      this.data.apps[appId].unlocked = false;
      this.save();
    }
  },

  isAppUnlocked(appId) {
    return this.data.apps[appId]?.unlocked ?? false;
  },

  _deepMerge(target, source) {
    for (const key of Object.keys(source)) {
      if (
        source[key] !== null &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key]) &&
        key in target
      ) {
        this._deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  },
};