/**
 * ============================================================
   AUREA — Product Card (Minimalista)
   Tarjeta limpia: imagen, nombre, precio, favoritos y añadir al carrito.
   ============================================================ */

import { formatPrice } from '../../data/config.js';
import { CATEGORIES } from '../../data/products.js';
import { addToCart, toggleFavorite, isFavorite } from '../store.js';
import { openProductModal } from './productModal.js';
import { showToast } from './toast.js';

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect fill='%23EDE7DA' width='600' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23C6A45C' font-family='serif' font-size='48'%3EAurea%3C/text%3E%3C/svg%3E`;

const TAG_LABELS = {
  'nuevo': 'Nuevo',
  'oferta': 'Oferta',
  'mas-vendido': 'Más vendido',
};

/**
 * Render a minimal product card element.
 * @param {Object} product
 * @returns {HTMLElement}
 */
export function renderProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.productId = product.id;

  const isFav = isFavorite(product.id);
  const mainImage = (product.images && product.images[0]) || '';
  const hasOldPrice = product.oldPrice != null;
  const hasVariants = product.variants && product.variants.length > 0;

  card.innerHTML = `
    <div class="product-card__image-wrap">
      <img
        src="${mainImage}"
        alt="${escapeHTML(product.name)}"
        class="product-card__image"
        loading="lazy"
        onerror="this.src='${PLACEHOLDER_SVG}'"
      />
      ${isFav ? `
        <button class="product-card__fav product-card__fav--active" aria-label="Quitar de favoritos" data-action="toggle-fav">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      ` : `
        <button class="product-card__fav" aria-label="Agregar a favoritos" data-action="toggle-fav">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      `}
    </div>
    <div class="product-card__info">
      <h3 class="product-card__name">${escapeHTML(product.name)}</h3>
      <div class="product-card__prices">
        <span class="product-card__price">${formatPrice(product.price)}</span>
        ${hasOldPrice ? `<span class="product-card__old-price">${formatPrice(product.oldPrice)}</span>` : ''}
      </div>
      ${hasVariants ? `
        <div class="product-card__variants">
          ${product.variants.map((v, i) => `
            <button class="product-card__variant${i === 0 ? ' product-card__variant--selected' : ''}" data-variant="${escapeAttr(v)}">${escapeHTML(v)}</button>
          `).join('')}
        </div>
      ` : ''}
      <button class="product-card__add-btn" data-action="add-to-cart">Añadir al carrito</button>
    </div>
  `;

  // ── Event delegation ──
  card.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');

    if (target) {
      const action = target.dataset.action;

      if (action === 'toggle-fav') {
        e.stopPropagation();
        const added = toggleFavorite(product.id);
        const favBtn = card.querySelector('.product-card__fav');
        favBtn.classList.toggle('product-card__fav--active', added);
        const svg = favBtn.querySelector('svg');
        svg.setAttribute('fill', added ? 'currentColor' : 'none');
        svg.setAttribute('stroke', added ? 'currentColor' : 'currentColor');
        showToast(added ? 'Agregado a favoritos' : 'Eliminado de favoritos', 'info');
        return;
      }

      if (action === 'add-to-cart') {
        e.stopPropagation();
        const activeVariant = card.querySelector('.product-card__variant--selected');
        const variant = activeVariant ? activeVariant.dataset.variant : '';
        addToCart(product, variant, 1);
        showToast(`${product.name} agregado al carrito`, 'success');
        return;
      }

      if (action === 'view-details') {
        e.stopPropagation();
        openProductModal(product.id);
        return;
      }
    }

    const variantBtn = e.target.closest('.product-card__variant');
    if (variantBtn) {
      card.querySelectorAll('.product-card__variant').forEach(b =>
        b.classList.remove('product-card__variant--selected')
      );
      variantBtn.classList.add('product-card__variant--selected');
      return;
    }

    if (e.target.closest('.product-card__image-wrap') && !e.target.closest('[data-action]')) {
      openProductModal(product.id);
    }
  });

  return card;
}

/* ── Helpers ─────────────────────────────────────────────── */

function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
