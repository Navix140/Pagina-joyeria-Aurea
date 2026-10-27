/**
 * ============================================================
 * AUREA — Category Cards
 * Grid of 8 category cards from CATEGORIES data.
 * ============================================================
 */

import { CATEGORIES } from '../../data/products.js';

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect fill='%23E9E0D1' width='600' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23C6A45C' font-family='serif' font-size='48'%3EAurea%3C/text%3E%3C/svg%3E`;

export function renderCategories() {
  return `
    <section class="section section--ivory" id="section-categorias">
      <div class="container">
        <div class="section__header">
          <h2>Explora nuestras Colecciones</h2>
          <p class="section__subtitle">Encuentra la pieza perfecta para cada ocasión</p>
        </div>
        <div class="categories-grid">
          ${CATEGORIES.map(cat => `
            <a href="#/tienda/${cat.id}" class="category-card" aria-label="Ver categoría ${cat.name}">
              <img
                src="${cat.image}"
                alt="${cat.name}"
                class="category-card__image"
                loading="lazy"
                onerror="this.src='${PLACEHOLDER_SVG}'"
              />
              <div class="category-card__overlay">
                <span class="category-card__name">${cat.name}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
