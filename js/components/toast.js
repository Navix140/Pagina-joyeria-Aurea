/**
 * ============================================================
 * AUREA — Toast Notification System
 * Stacking toasts with auto-dismiss and progress bar.
 * ============================================================
 */

let container = null;

function ensureContainer() {
  if (container && document.body.contains(container)) return;
  container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
}

/**
 * Display a toast notification.
 * @param {string} message - Text to display (HTML is escaped)
 * @param {'success'|'error'|'info'} type - Visual style
 * @param {number} duration - Auto-dismiss in ms (default 3000)
 */
export function showToast(message, type = 'success', duration = 3000) {
  ensureContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;

  // Icon per type
  const icons = {
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  };

  // Escape HTML entities in the message
  const safe = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  toast.innerHTML = `
    <div class="toast__icon">${icons[type] || icons.info}</div>
    <span class="toast__message">${safe}</span>
    <button class="toast__close" aria-label="Cerrar">&times;</button>
    <div class="toast__progress" style="animation-duration:${duration}ms"></div>
  `;

  // Close on button click
  toast.querySelector('.toast__close').addEventListener('click', () => dismiss(toast));

  container.appendChild(toast);

  // Trigger enter animation on next frame
  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  // Auto-dismiss
  const timer = setTimeout(() => dismiss(toast), duration);
  toast._timer = timer;
}

function dismiss(toast) {
  clearTimeout(toast._timer);
  toast.classList.remove('toast--visible');
  toast.classList.add('toast--exit');
  toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  // Fallback removal
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 500);
}
