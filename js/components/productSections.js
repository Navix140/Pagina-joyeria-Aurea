/**
 * ============================================================
 * AUREA — Home Page Product Sections
 * Renders featured, new, best-sellers, and offers sections.
 * ============================================================
 */

import { PRODUCTS } from '../../data/products.js';
import { renderProductCard } from './productCard.js';

/**
 * Render all home-page product sections.
 * Returns an HTML string wrapper; product cards are appended via DOM after insertion.
 */
export function renderProductSections() {
  return `
    <section class="section section--ivory" id="section-destacados">
      <div class="container">
        <div class="section__header">
          <h2>Piezas Destacadas</h2>
          <p class="section__subtitle">Nuestra cuidada selección de alta joyería para deslumbrar</p>
        </div>
        <div class="products-grid" id="grid-destacados"></div>
        <div style="text-align: center; margin-top: 36px;">
          <a href="#/tienda" class="btn btn--outline btn--dark">Explorar toda la tienda</a>
        </div>
      </div>
    </section>

    <section class="section section--beige" id="section-nuevos">
      <div class="container">
        <div class="section__header">
          <h2>Nuevos Lanzamientos</h2>
          <p class="section__subtitle">Lo último en tendencias con el sello inconfundible de AUREA</p>
        </div>
        <div class="products-grid" id="grid-nuevos"></div>
        <div style="text-align: center; margin-top: 36px;">
          <a href="#/tienda/nuevos" class="btn btn--outline btn--dark">Ver todas las novedades</a>
        </div>
      </div>
    </section>

    <section class="section section--ivory" id="section-mas-vendidos">
      <div class="container">
        <div class="section__header">
          <h2>Los Más Vendidos</h2>
          <p class="section__subtitle">Las joyas preferidas que marcan tendencia día a día</p>
        </div>
        <div class="products-grid" id="grid-mas-vendidos"></div>
        <div style="text-align: center; margin-top: 36px;">
          <a href="#/tienda/mas-vendidos" class="btn btn--outline btn--dark">Ver más vendidos</a>
        </div>
      </div>
    </section>

    <section class="section section--beige" id="section-ofertas">
      <div class="container">
        <div class="section__header">
          <h2>Ofertas Especiales</h2>
          <p class="section__subtitle">Descuentos exclusivos en referencias seleccionadas por tiempo limitado</p>
        </div>
        <div class="products-grid" id="grid-ofertas"></div>
        <div style="text-align: center; margin-top: 36px;">
          <a href="#/tienda/ofertas" class="btn btn--primary">Ver todas las ofertas</a>
        </div>
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

  // New — tagged 'nuevo'
  const newProducts = PRODUCTS.filter(p => p.tags.includes('nuevo')).slice(0, 4);
  fillGrid('grid-nuevos', newProducts);

  // Best sellers — tagged 'mas-vendido'
  const bestSellers = PRODUCTS.filter(p => p.tags.includes('mas-vendido')).slice(0, 4);
  fillGrid('grid-mas-vendidos', bestSellers);

  // Offers — tagged 'oferta' or has oldPrice discount
  const offers = PRODUCTS.filter(p => p.tags.includes('oferta') || p.oldPrice != null).slice(0, 4);
  fillGrid('grid-ofertas', offers);
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
