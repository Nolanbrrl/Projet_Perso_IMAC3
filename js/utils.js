export function showClueToast(label) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-label">Indice trouvé</div>
    <div>${label}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

export function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderColor = 'rgba(255,255,255,0.2)';
  toast.innerHTML = `<div>${message}</div>`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration + 200);
}

export function startClock() {
  const el = document.getElementById('status-time');
  if (!el) return;

  const update = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    el.textContent = `${h}:${m}`;
  };

  update();
  setInterval(update, 30_000);
}

export function relativeDate(isoString) {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now - date;
  const diffMn = Math.floor(diffMs / 60_000);
  const diffH  = Math.floor(diffMn / 60);
  const diffD  = Math.floor(diffH / 24);
  const diffW  = Math.floor(diffD / 7);

  if (diffMn < 1)  return 'à l\'instant';
  if (diffMn < 60) return `${diffMn} min`;
  if (diffH < 24)  return `${diffH} h`;
  if (diffD < 7)   return `${diffD} j`;
  return `${diffW} sem.`;
}

export function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function animate(el, className, duration = 400) {
  return new Promise(resolve => {
    el.classList.add(className);
    setTimeout(() => {
      el.classList.remove(className);
      resolve();
    }, duration);
  });
}

export function vibrate(pattern = [50]) {
  if ('vibrate' in navigator) navigator.vibrate(pattern);
}