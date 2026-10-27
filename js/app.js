/**
 * ============================================================
 * AUREA — Main Application Entry Point
 * Initializes state store, routing, global components, and views.
 * ============================================================
 */

import { initStore } from './store.js';
import { addRoute, setNotFound, startRouter, navigateTo } from './router.js';
import { renderHeader, updateActiveLink } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHomeView } from './views/home.js';
import { renderShopView } from './views/shop.js';
import { renderFavoritesView } from './views/favorites.js';
import { renderCheckoutView } from './views/checkout.js';

/**
 * Main application initialization
 */
function initApp() {
  const appContent = document.getElementById('app-content');

  // 1. Initialize persistent state (cart & favorites from localStorage)
  initStore();

  // 2. Render global layout chrome
  renderHeader();
  renderFooter();

  // 3. Register application routes
  addRoute('#/', () => {
    renderHomeView(appContent);
    onRouteResolved();
  });

  addRoute('#/tienda', () => {
    renderShopView({}, appContent);
    onRouteResolved();
  });

  addRoute('#/tienda/:category', (params) => {
    renderShopView(params, appContent);
    onRouteResolved();
  });

  addRoute('#/favoritos', () => {
    renderFavoritesView(appContent);
    onRouteResolved();
  });

  addRoute('#/checkout', () => {
    renderCheckoutView(appContent);
    onRouteResolved();
  });

  // Catch-all: redirect unknown hashes to Home or Shop
  setNotFound(() => {
    renderHomeView(appContent);
    onRouteResolved();
  });

  // 4. Start listening to hash changes & render initial view
  startRouter();
}

/**
 * Housekeeping tasks run on every route transition
 */
function onRouteResolved() {
  // Update nav active link state in header
  updateActiveLink();

  // Smooth scroll to top of page
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Kick off when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
