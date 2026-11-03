/**
 * ============================================================
 * AUREA — Category Cards
 * Grid of 8 category cards from CATEGORIES data.
 * ============================================================
 */

import { CATEGORIES } from '../../data/products.js';

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect fill='%23E9E0D1' width='600' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23C6A45C' font-family='serif' font-size='48'%3EAurea%3C/text%3E%3C/svg%3E`;

export function renderCategories() {
  const mainCategories = CATEGORIES.filter(cat => !cat.isComplementary);
  const complementaryCategories = CATEGORIES.filter(cat => cat.isComplementary);

  return `
    <section class="section section--ivory" id="section-categorias">
      <div class="container">
        <div class="section__header">
          <h2>Explora nuestras Colecciones</h2>
          <p class="section__subtitle">Piezas en oro fino colombiano y diseños de distinción</p>
        </div>
        <div class="categories-grid">
          ${mainCategories.map(cat => `
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

        ${complementaryCategories.length > 0 ? `
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--beige);">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: var(--gold-dark); font-weight: 600;">Línea Especial</span>
              <h3 style="font-size: 1.3rem; margin-top: 4px;">Colección Complementaria</h3>
            </div>
            <div style="display: flex; justify-content: center;">
              ${complementaryCategories.map(cat => `
                <a href="#/tienda/${cat.id}" class="category-card" style="max-width: 280px; width: 100%;" aria-label="Ver categoría ${cat.name}">
                  <img
                    src="${cat.image}"
                    alt="${cat.name}"
                    class="category-card__image"
                    loading="lazy"
                    onerror="this.src='${PLACEHOLDER_SVG}'"
                  />
                  <div class="category-card__overlay">
                    <span class="category-card__name">${cat.name}</span>
                    <span style="font-size: 0.72rem; color: var(--gold); display: block; margin-top: 2px;">Complementaria</span>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </section>
  `;
}
