/**
 * ============================================================
   AUREA — Home View (Minimalista)
   Hero + Categorías + Productos Destacados.
   ============================================================ */

import { renderHero, bindHeroEvents } from '../components/hero.js';
import { renderCategories } from '../components/categories.js';
import { renderProductSections, hydrateProductSections } from '../components/productSections.js';

export function renderHomeView(container) {
  if (!container) return;

  container.innerHTML = `
    <!-- Spacer for fixed header -->
    <div class="header-spacer"></div>

    <!-- Hero Section -->
    ${renderHero()}

    <!-- Categorías -->
    ${renderCategories()}

    <!-- Productos Destacados -->
    ${renderProductSections()}
  `;

  // Bind Hero CTAs
  bindHeroEvents();

  // Populate product grids
  hydrateProductSections();
}
