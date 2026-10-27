/**
 * ============================================================
 * AUREA — Cart Sidebar
 * Slide-in cart panel with item management and order summary.
 * ============================================================
 */

import { CONFIG, formatPrice } from '../../data/config.js';
import {
  getCart, getCartTotal, getCartCount,
  removeFromCart, updateQuantity, subscribe, clearCart
} from '../store.js';
import { navigateTo } from '../router.js';
import { showToast } from './toast.js';

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect fill='%23E9E0D1' width='80' height='80'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23C6A45C' font-family='serif' font-size='14'%3EA%3C/text%3E%3C/svg%3E`;

let backdropEl = null;
let sidebarEl = null;

function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function ensureSidebar() {
  const root = document.getElementById('cart-root') || document.body;
  if (backdropEl && sidebarEl && document.body.contains(sidebarEl)) return;

  if (!backdropEl || !document.body.contains(backdropEl)) {
    backdropEl = document.createElement('div');
    backdropEl.className = 'cart-backdrop';
    backdropEl.id = 'cart-backdrop';
    root.appendChild(backdropEl);
  }

  if (!sidebarEl || !document.body.contains(sidebarEl)) {
    sidebarEl = document.createElement('div');
    sidebarEl.className = 'cart-sidebar';
    sidebarEl.id = 'cart-sidebar';
    root.appendChild(sidebarEl);
  }
}

function render() {
  if (!sidebarEl) return;
  const cart = getCart();
  const subtotal = getCartTotal();
  const shippingFree = subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : CONFIG.SHIPPING_COST;
  const total = subtotal + (cart.length > 0 ? shipping : 0);
  const isEmpty = cart.length === 0;

  sidebarEl.innerHTML = `
    <div class="cart-sidebar__header">
      <h2 class="cart-sidebar__title">Tu Carrito (${getCartCount()})</h2>
      <button class="cart-sidebar__close" data-close aria-label="Cerrar carrito">&times;</button>
    </div>

    ${isEmpty ? `
      <div class="cart-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p class="cart-empty__text">Tu carrito está vacío</p>
        <button class="btn btn--primary" data-action="go-shop">Explorar tienda</button>
      </div>
    ` : `
      <div class="cart-sidebar__items">
        ${cart.map(item => `
          <div class="cart-item" data-key="${escapeHTML(item.key)}">
            <img
              src="${item.image}"
              alt="${escapeHTML(item.name)}"
              class="cart-item__image"
              onerror="this.src='${PLACEHOLDER_SVG}'"
            />
            <div class="cart-item__info">
              <div class="cart-item__name">${escapeHTML(item.name)}</div>
              ${item.variant ? `<div class="cart-item__variant">Variante: ${escapeHTML(item.variant)}</div>` : ''}
              <div class="cart-item__price">${formatPrice(item.price)}</div>
              <div class="cart-item__controls">
                <button class="cart-item__qty-btn" data-qty-action="dec" data-key="${escapeHTML(item.key)}" aria-label="Disminuir">−</button>
                <span class="cart-item__qty">${item.qty}</span>
                <button class="cart-item__qty-btn" data-qty-action="inc" data-key="${escapeHTML(item.key)}" aria-label="Aumentar">+</button>
                <button class="cart-item__remove" data-remove="${escapeHTML(item.key)}" aria-label="Eliminar producto">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="cart-sidebar__footer">
        <div class="cart-sidebar__summary">
          <div class="cart-sidebar__row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
          </div>
          <div class="cart-sidebar__row cart-sidebar__row--shipping">
            <span>Envío nacional</span>
            <span>${shippingFree ? '<strong class="cart-sidebar__free-shipping">¡Gratis!</strong>' : formatPrice(shipping)}</span>
          </div>
          ${!shippingFree ? `
            <div style="font-size: 0.78rem; color: var(--gold-dark); margin-bottom: 8px;">
              ¡Agrega ${formatPrice(CONFIG.FREE_SHIPPING_THRESHOLD - subtotal)} más para obtener envío gratis!
            </div>
          ` : ''}
          <div class="cart-sidebar__row cart-sidebar__row--total">
            <span>Total estimado</span>
            <span>${formatPrice(total)}</span>
          </div>
        </div>

        <div class="cart-sidebar__actions">
          <button class="btn btn--primary btn--full" data-action="checkout">Completar Pedido</button>
          <button class="btn btn--outline btn--dark btn--full" data-close>Seguir comprando</button>
        </div>
      </div>
    `}
  `;

  bindSidebarEvents();
}

function bindSidebarEvents() {
  if (!sidebarEl) return;

  // Close buttons
  sidebarEl.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeCart);
  });

  if (backdropEl) {
    backdropEl.onclick = closeCart;
  }

  // Quantity buttons
  sidebarEl.querySelectorAll('[data-qty-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const cart = getCart();
      const item = cart.find(i => i.key === key);
      if (!item) return;
      const newQty = btn.dataset.qtyAction === 'inc' ? item.qty + 1 : item.qty - 1;
      updateQuantity(key, newQty);
    });
  });

  // Remove
  sidebarEl.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.remove);
      showToast('Producto eliminado del carrito', 'info');
    });
  });

  // Checkout
  const checkoutBtn = sidebarEl.querySelector('[data-action="checkout"]');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeCart();
      navigateTo('#/checkout');
    });
  }

  // Go to shop
  const shopBtn = sidebarEl.querySelector('[data-action="go-shop"]');
  if (shopBtn) {
    shopBtn.addEventListener('click', () => {
      closeCart();
      navigateTo('#/tienda');
    });
  }
}

/**
 * Open the cart sidebar.
 */
export function openCart() {
  ensureSidebar();
  render();
  requestAnimationFrame(() => {
    sidebarEl.classList.add('cart-sidebar--open');
    if (backdropEl) backdropEl.classList.add('cart-backdrop--open');
    document.body.classList.add('no-scroll');
  });
  document.addEventListener('keydown', handleCartEsc);
}

/**
 * Close the cart sidebar.
 */
export function closeCart() {
  if (!sidebarEl) return;
  sidebarEl.classList.remove('cart-sidebar--open');
  if (backdropEl) backdropEl.classList.remove('cart-backdrop--open');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', handleCartEsc);
}

function handleCartEsc(e) {
  if (e.key === 'Escape') closeCart();
}

/**
 * Re-render sidebar contents (for external updates).
 */
export function renderCartSidebar() {
  ensureSidebar();
  render();
}

// Re-render when cart changes (while open)
subscribe('cart:updated', () => {
  if (sidebarEl && sidebarEl.classList.contains('cart-sidebar--open')) {
    render();
  }
});
