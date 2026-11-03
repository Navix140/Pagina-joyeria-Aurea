/**
 * ============================================================
 * AUREA — Search Overlay
 * Full-width overlay with real-time product search.
 * ============================================================
 */

import { PRODUCTS, CATEGORIES } from '../../data/products.js';
import { formatPrice } from '../../data/config.js';
import { openProductModal } from './productModal.js';

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect fill='%23E9E0D1' width='80' height='80'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23C6A45C' font-family='serif' font-size='14'%3EA%3C/text%3E%3C/svg%3E`;

let overlayEl = null;

function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/** Normalize accented text for comparison */
function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function getCategoryName(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (cat) return cat.name;
  // Compatibilidad con nombres legados para productos demo
  if (catId === 'manillas') return 'Manillas Tejidas';
  if (catId === 'aretes') return 'Aretes Tradicionales';
  if (catId === 'sets') return 'Joyería';
  if (catId === 'accesorios') return 'Joyería';
  return catId;
}

function ensureOverlay() {
  const root = document.getElementById('search-root') || document.body;
  if (overlayEl && document.body.contains(overlayEl)) return;
  overlayEl = document.createElement('div');
  overlayEl.className = 'search-overlay';
  overlayEl.id = 'search-overlay';
  overlayEl.innerHTML = `
    <div class="search-overlay__inner">
      <div class="search-overlay__input-wrap">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          class="search-overlay__input"
          id="search-input"
          placeholder="Buscar manillas tejidas, pulseras, cadenas, topitos, dijes..."
          autocomplete="off"
          aria-label="Buscar en la tienda"
        />
        <button class="search-overlay__clear" id="search-clear" aria-label="Limpiar búsqueda">&times;</button>
        <button class="search-overlay__close" id="search-close" aria-label="Cerrar búsqueda">&times;</button>
      </div>
      <div class="search-results" id="search-results"></div>
    </div>
  `;
  root.appendChild(overlayEl);
  bindSearchEvents();
}

function bindSearchEvents() {
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');
  const closeBtn = document.getElementById('search-close');

  if (input) {
    input.addEventListener('input', () => {
      updateResults(input.value.trim());
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (input) { input.value = ''; input.focus(); }
      updateResults('');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearch);
  }

  // ESC
  document.addEventListener('keydown', handleSearchEsc);
}

function handleSearchEsc(e) {
  if (e.key === 'Escape' && overlayEl && overlayEl.classList.contains('search-overlay--open')) {
    closeSearch();
  }
}

function updateResults(query) {
  const resultsEl = document.getElementById('search-results');
  if (!resultsEl) return;

  if (query.length < 2) {
    resultsEl.innerHTML = query.length > 0
      ? '<p class="search-hint">Escribe al menos 2 caracteres para buscar piezas</p>'
      : '';
    return;
  }

  const normalizedQuery = normalize(query);

  const matches = PRODUCTS.filter(p => {
    return normalize(p.name).includes(normalizedQuery)
      || normalize(getCategoryName(p.category)).includes(normalizedQuery)
      || normalize(p.description).includes(normalizedQuery)
      || normalize(p.material || '').includes(normalizedQuery)
      || (p.subcategory && normalize(p.subcategory).includes(normalizedQuery))
      || (p.goldType && normalize(p.goldType).includes(normalizedQuery));
  });

  if (matches.length === 0) {
    resultsEl.innerHTML = `
      <div class="search-no-results">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        <p>No se encontraron piezas para "<strong>${escapeHTML(query)}</strong>"</p>
        <p style="font-size: 0.85rem; color: var(--gray-text);">Prueba buscando: manillas tejidas, pulseras, pulsos, cadenas, topitos, dijes, anillos o tobilleras</p>
      </div>
    `;
    return;
  }

  resultsEl.innerHTML = matches.map(p => `
    <div class="search-result" data-product-id="${p.id}" tabindex="0" role="button" aria-label="Ver ${escapeHTML(p.name)}">
      <img
        src="${(p.images && p.images[0]) || ''}"
        alt="${escapeHTML(p.name)}"
        class="search-result__image"
        loading="lazy"
        onerror="this.src='${PLACEHOLDER_SVG}'"
      />
      <div class="search-result__info">
        <div class="search-result__name">${escapeHTML(p.name)}</div>
        <div class="search-result__category">${escapeHTML(getCategoryName(p.category))} • ${escapeHTML(p.material || '')}</div>
      </div>
      <span class="search-result__price">${formatPrice(p.price)}</span>
    </div>
  `).join('');

  // Bind click & Enter key to each result
  resultsEl.querySelectorAll('.search-result').forEach(btn => {
    const handleSelect = () => {
      const id = parseInt(btn.dataset.productId, 10);
      closeSearch();
      openProductModal(id);
    };
    btn.addEventListener('click', handleSelect);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect();
      }
    });
  });
}

/**
 * Open the search overlay.
 */
export function openSearch() {
  ensureOverlay();
  requestAnimationFrame(() => {
    overlayEl.classList.add('search-overlay--open');
    document.body.classList.add('no-scroll');
    const input = document.getElementById('search-input');
    if (input) { input.value = ''; input.focus(); }
    const resultsEl = document.getElementById('search-results');
    if (resultsEl) resultsEl.innerHTML = '';
  });
}

/**
 * Close the search overlay.
 */
export function closeSearch() {
  if (!overlayEl) return;
  overlayEl.classList.remove('search-overlay--open');
  document.body.classList.remove('no-scroll');
}
