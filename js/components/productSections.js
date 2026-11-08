/**
 * ============================================================
   AUREA — Home Page Product Sections (Minimalista)
   Solo productos destacados con tarjetas limpias.
   ============================================================ */

import { PRODUCTS } from '../../data/products.js';
import { renderProductCard } from './productCard.js';

/**
 * Render minimal product sections for home page.
 * Returns HTML wrapper; cards are appended via DOM after insertion.
 */
export function renderProductSections() {
  return `
    <section class="section section--ivory" id="section-destacados">
      <div class="container">
        <div class="section__header">
          <h2>Piezas Destacadas</h2>
          <p class="section__subtitle">Nuestra cuidada selección de joyería de oro para deslumbrar</p>
        </div>
        <div class="products-grid" id="grid-destacados"></div>
      </div>
    </section>
  `;
}

/**
 * Populate product grids with actual card elements (call after innerHTML).
 */
export function hydrateProductSections() {
  // Featured — top 4 by popularity
  const featured = [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  fillGrid('grid-destacados', featured);
}

function fillGrid(gridId, products) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  if (products.length === 0) {
    grid.innerHTML = '<p class="product-grid__empty">No hay productos en esta sección</p>';
    return;
  }
  products.forEach(p => grid.appendChild(renderProductCard(p)));
}
