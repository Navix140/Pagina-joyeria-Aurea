/**
 * ============================================================
 * AUREA — Favorites / Wishlist View
 * Displays saved items with quick add-to-cart, remove action,
 * and empty state.
 * ============================================================
 */

import { PRODUCTS } from '../../data/products.js?v=2';
import { getFavorites, subscribe } from '../store.js?v=2';
import { renderProductCard } from '../components/productCard.js?v=2';

let unsubscribeStore = null;

export function renderFavoritesView(container) {
  if (!container) return;

  function update() {
    const favoriteIds = getFavorites();
    const favoriteProducts = PRODUCTS.filter(p => favoriteIds.includes(p.id));

    container.innerHTML = `
      <div class="header-spacer"></div>
      <div class="favorites-page section section--ivory">
        <div class="container">
          <div class="section__header">
            <h1>Tus Piezas Favoritas</h1>
            <p class="section__subtitle">Guarda tus joyas deseadas para comprarlas cuando lo decidas</p>
          </div>

          ${favoriteProducts.length === 0 ? `
            <div class="favorites-empty">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <p>Aún no has agregado ninguna pieza a tus favoritos.</p>
              <a href="#/tienda" class="btn btn--primary">Explorar catálogo</a>
            </div>
          ` : `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
              <span style="font-size: 0.95rem; color: var(--gray-text);">
                Tienes <strong>${favoriteProducts.length}</strong> ${favoriteProducts.length === 1 ? 'joya guardada' : 'joyas guardadas'}
              </span>
              <a href="#/tienda" class="btn btn--outline btn--dark btn--sm">Seguir explorando</a>
            </div>
            <div class="products-grid" id="favorites-grid"></div>
          `}
        </div>
      </div>
    `;

    const grid = document.getElementById('favorites-grid');
    if (grid && favoriteProducts.length > 0) {
      favoriteProducts.forEach(product => {
        grid.appendChild(renderProductCard(product));
      });
    }
  }

  // Initial render
  update();

  // Listen for favorites changes while on this page
  if (unsubscribeStore) unsubscribeStore();
  unsubscribeStore = subscribe('favorites:updated', () => {
    // Only update if still on favorites page
    if (window.location.hash.startsWith('#/favoritos')) {
      update();
    }
  });
}
