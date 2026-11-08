/**
 * ============================================================
   AUREA — Header Component
   Compacto, elegante y funcional.
   ============================================================ */

import { CONFIG } from '../../data/config.js';
import { CATEGORIES } from '../../data/products.js';
import { subscribe, getCartCount } from '../store.js';
import { getCurrentRoute, navigateTo } from '../router.js';
import { openSearch } from './search.js';
import { openCart } from './cart.js';

/* ── SVG Icons ───────────────────────────────────────────── */

const ICONS = {
  search: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  cart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  menu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  close: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
};

/* ── Navigation links — solo los esenciales en desktop ── */

const NAV_LINKS = [
  { label: 'Inicio', href: '#/' },
  { label: 'Tienda', href: '#/tienda' },
  { label: 'Cadenas', href: '#/tienda/cadenas' },
  { label: 'Pulseras', href: '#/tienda/pulseras' },
  { label: 'Anillos', href: '#/tienda/anillos' },
  { label: 'Ofertas', href: '#/tienda/ofertas' },
];

/* ── Render ──────────────────────────────────────────────── */

export function renderHeader() {
  const el = document.getElementById('header-root') || document.getElementById('site-header');
  if (!el) return;

  const currentHash = getCurrentRoute();
  const cartCount = getCartCount();

  el.innerHTML = `
    <header class="header">
      <div class="header__inner">
        <!-- Logo -->
        <a href="#/" class="header__logo" aria-label="AUREA Joyería">
          ${CONFIG.BRAND_NAME}
          <span>${CONFIG.BRAND_TAGLINE}</span>
        </a>

        <!-- Desktop navigation — esenciales -->
        <nav class="header__nav" aria-label="Navegación principal">
          ${NAV_LINKS.map(link => `
            <a href="${link.href}"
               class="header__nav-link${currentHash === link.href ? ' header__nav-link--active' : ''}"
            >${link.label}</a>
          `).join('')}
        </nav>

        <!-- Action buttons -->
        <div class="header__actions">
          <button class="header__action-btn" id="btn-search" aria-label="Buscar productos">
            ${ICONS.search}
          </button>
          <a href="#/favoritos" class="header__action-btn" aria-label="Ver favoritos">
            ${ICONS.heart}
          </a>
          <button class="header__action-btn" id="btn-cart" aria-label="Ver carrito">
            ${ICONS.cart}
            <span class="header__cart-count" id="cart-badge">${cartCount > 0 ? cartCount : ''}</span>
          </button>
          <button class="header__hamburger" id="btn-mobile-menu" aria-label="Menú de navegación">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- Mobile navigation sidebar -->
      <div class="mobile-nav__backdrop" id="mobile-nav-backdrop"></div>
      <div class="mobile-nav" id="mobile-nav">
        <nav aria-label="Navegación móvil">
          ${CATEGORIES.map(cat => `
            <a href="#/tienda/${cat.id}"
               class="mobile-nav__link${currentHash === `#/tienda/${cat.id}` ? ' mobile-nav__link--active' : ''}"
            >${cat.name}</a>
          `).join('')}
        </nav>
      </div>
    </header>
  `;

  bindHeaderEvents();
}

/* ── Events ──────────────────────────────────────────────── */

function bindHeaderEvents() {
  const btnSearch = document.getElementById('btn-search');
  if (btnSearch) btnSearch.addEventListener('click', openSearch);

  const btnCart = document.getElementById('btn-cart');
  if (btnCart) btnCart.addEventListener('click', openCart);

  const btnMenu = document.getElementById('btn-mobile-menu');
  const mobileNav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('mobile-nav-backdrop');

  const closeMenu = () => {
    if (mobileNav) mobileNav.classList.remove('mobile-nav--open');
    if (backdrop) backdrop.classList.remove('mobile-nav__backdrop--visible');
    if (btnMenu) btnMenu.classList.remove('header__hamburger--open');
    document.body.classList.remove('no-scroll');
  };

  const openMenu = () => {
    if (mobileNav) mobileNav.classList.add('mobile-nav--open');
    if (backdrop) backdrop.classList.add('mobile-nav__backdrop--visible');
    if (btnMenu) btnMenu.classList.add('header__hamburger--open');
    document.body.classList.add('no-scroll');
  };

  if (btnMenu) {
    btnMenu.addEventListener('click', () => {
      const isOpen = mobileNav && mobileNav.classList.contains('mobile-nav--open');
      if (isOpen) closeMenu(); else openMenu();
    });
  }

  if (backdrop) backdrop.addEventListener('click', closeMenu);

  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* ── Cart badge live update ──────────────────────────────── */

export function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count > 0 ? count : '';
}

/* ── Update active link on route change ──────────────────── */

export function updateActiveLink() {
  const currentHash = getCurrentRoute();
  document.querySelectorAll('.header__nav-link').forEach(link => {
    link.classList.toggle('header__nav-link--active', link.getAttribute('href') === currentHash);
  });
  document.querySelectorAll('.mobile-nav__link').forEach(link => {
    const catHref = link.getAttribute('href');
    link.classList.toggle('mobile-nav__link--active', currentHash === catHref);
  });
}

// Subscribe to cart updates to keep badge in sync
subscribe('cart:updated', updateCartBadge);
