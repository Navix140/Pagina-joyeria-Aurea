/**
 * ============================================================
 * AUREA — Product Detail Modal
 * Full overlay modal with product info, variant selector,
 * quantity controls, and add-to-cart.
 * ============================================================
 */

import { PRODUCTS } from '../../data/products.js';
import { formatPrice } from '../../data/config.js';
import { addToCart, toggleFavorite, isFavorite } from '../store.js';
import { showToast } from './toast.js';

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect fill='%23E9E0D1' width='600' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23C6A45C' font-family='serif' font-size='48'%3EAurea%3C/text%3E%3C/svg%3E`;

let modalEl = null;
let currentProduct = null;
let selectedVariant = '';
let quantity = 1;

function ensureModal() {
  const root = document.getElementById('modal-root') || document.body;
  if (modalEl && document.body.contains(modalEl)) return;
  modalEl = document.createElement('div');
  modalEl.className = 'modal-overlay';
  modalEl.id = 'product-modal-overlay';
  root.appendChild(modalEl);
}

function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/**
 * Open the product modal for a given product ID.
 */
export function openProductModal(productId) {
  currentProduct = PRODUCTS.find(p => p.id === productId);
  if (!currentProduct) return;

  quantity = 1;
  selectedVariant = currentProduct.variants && currentProduct.variants.length > 0
    ? currentProduct.variants[0]
    : '';

  ensureModal();
  renderModal();
  requestAnimationFrame(() => {
    modalEl.classList.add('modal-overlay--open');
    document.body.classList.add('no-scroll');
  });

  // ESC to close
  document.addEventListener('keydown', handleEsc);
}

/**
 * Close the product modal.
 */
export function closeProductModal() {
  if (!modalEl) return;
  modalEl.classList.remove('modal-overlay--open');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', handleEsc);
  currentProduct = null;
}

function handleEsc(e) {
  if (e.key === 'Escape') closeProductModal();
}

function renderModal() {
  if (!modalEl || !currentProduct) return;
  const p = currentProduct;
  const isFav = isFavorite(p.id);
  const mainImage = (p.images && p.images[0]) || '';
  const hasOldPrice = p.oldPrice != null;
  const hasVariants = p.variants && p.variants.length > 0;
  const isLowStock = p.availability && p.availability.toLowerCase().includes('últim');

  modalEl.innerHTML = `
    <div class="modal">
      <button class="modal__close" data-close aria-label="Cerrar detalles">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      
      <!-- Image wrap -->
      <div class="modal__image-wrap">
        <img
          src="${mainImage}"
          alt="${escapeHTML(p.name)}"
          class="modal__image"
          onerror="this.src='${PLACEHOLDER_SVG}'"
        />
      </div>

      <!-- Info content -->
      <div class="modal__content">
        <h2 class="modal__name">${escapeHTML(p.name)}</h2>
        
        <div class="modal__prices">
          <span class="modal__price">${formatPrice(p.price)}</span>
          ${hasOldPrice ? `<span class="modal__old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>

        <p class="modal__desc">${escapeHTML(p.description)}</p>

        <div class="modal__material">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          <span>${escapeHTML(p.material)}</span>
        </div>

        <div class="modal__availability${isLowStock ? ' modal__availability--low' : ''}">
          ✓ ${escapeHTML(p.availability)}
        </div>

        ${hasVariants ? `
          <div class="modal__variants">
            ${p.variants.map((v, i) => `
              <button class="modal__variant${i === 0 ? ' modal__variant--selected' : ''}" data-variant="${v.replace(/"/g, '&quot;')}">${escapeHTML(v)}</button>
            `).join('')}
          </div>
        ` : ''}

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-size: 0.85rem; color: var(--gray-text); font-weight: 500;">Cantidad:</span>
          <div class="modal__quantity">
            <button class="modal__qty-btn" data-qty="dec" aria-label="Disminuir cantidad">−</button>
            <span class="modal__qty-value" id="modal-qty" style="display:flex;align-items:center;justify-content:center;">${quantity}</span>
            <button class="modal__qty-btn" data-qty="inc" aria-label="Aumentar cantidad">+</button>
          </div>
        </div>

        <div class="modal__actions">
          <button class="btn btn--primary btn--full" data-action="modal-add-cart">Añadir al carrito</button>
          <button class="modal__fav-btn${isFav ? ' modal__fav-btn--active' : ''}" data-action="modal-toggle-fav" aria-label="Agregar a favoritos">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>

        <p style="font-size: 0.78rem; color: #777; margin-top: 14px; text-align: center; font-style: italic; line-height: 1.4;">
          * Catálogo de referencia. Precios, materiales y disponibilidad sujetos a confirmación por WhatsApp.
        </p>
      </div>
    </div>
  `;

  bindModalEvents();
}

function bindModalEvents() {
  if (!modalEl) return;

  // Backdrop click (click on overlay but outside .modal)
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeProductModal();
  });

  // Close buttons
  modalEl.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeProductModal);
  });

  // Variant buttons
  modalEl.querySelectorAll('.modal__variant').forEach(btn => {
    btn.addEventListener('click', () => {
      modalEl.querySelectorAll('.modal__variant').forEach(b => b.classList.remove('modal__variant--selected'));
      btn.classList.add('modal__variant--selected');
      selectedVariant = btn.dataset.variant;
    });
  });

  // Quantity
  modalEl.querySelectorAll('[data-qty]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.qty === 'inc') quantity++;
      if (btn.dataset.qty === 'dec' && quantity > 1) quantity--;
      const display = document.getElementById('modal-qty');
      if (display) display.textContent = quantity;
    });
  });

  // Add to cart
  const cartBtn = modalEl.querySelector('[data-action="modal-add-cart"]');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      addToCart(currentProduct, selectedVariant, quantity);
      showToast(`${currentProduct.name} agregado al carrito`, 'success');
      closeProductModal();
    });
  }

  // Toggle favorite
  const favBtn = modalEl.querySelector('[data-action="modal-toggle-fav"]');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      const added = toggleFavorite(currentProduct.id);
      const svg = favBtn.querySelector('svg');
      svg.setAttribute('fill', added ? 'currentColor' : 'none');
      favBtn.classList.toggle('modal__fav-btn--active', added);
      showToast(added ? 'Agregado a favoritos' : 'Eliminado de favoritos', 'info');
    });
  }
}
