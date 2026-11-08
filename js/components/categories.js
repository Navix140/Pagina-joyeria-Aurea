/**
 * ============================================================
   AUREA — Category Cards
   Grid compacto de categorías principales y complementaria.
   ============================================================ */

import { CATEGORIES } from '../../data/products.js';

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect fill='%23EDE7DA' width='600' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23C6A45C' font-family='serif' font-size='48'%3EAurea%3C/text%3E%3C/svg%3E`;

export function renderCategories({ limit } = {}) {
  const mainCategories = CATEGORIES.filter(cat => !cat.isComplementary);
  const complementaryCategories = CATEGORIES.filter(cat => cat.isComplementary);
  const featured = limit ? mainCategories.slice(0, limit) : mainCategories;

  return `
    <section class="section section--ivory" id="section-categorias">
      <div class="container">
        <div class="section__header">
          <h2>Colecciones</h2>
          <p class="section__subtitle">Piezas en oro fino colombiano y diseños de distinción</p>
        </div>
        <div class="categories-grid">
          ${featured.map(cat => `
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

        ${complementaryCategories.length > 0 && !limit ? `
          <div style="margin-top: 24px; text-align: center;">
            ${complementaryCategories.map(cat => `
              <a href="#/tienda/${cat.id}" class="category-card" style="max-width: 320px; margin: 0 auto;" aria-label="Ver categoría ${cat.name}">
                <img
                  src="${cat.image}"
                  alt="${cat.name}"
                  class="category-card__image"
                  loading="lazy"
                  onerror="this.src='${PLACEHOLDER_SVG}'"
                />
                <div class="category-card__overlay">
                  <span class="category-card__name">${cat.name}</span>
                  <span style="font-size: 0.68rem; color: var(--gold-dark); display: block; margin-top: 4px; letter-spacing: 1px;">Complementaria</span>
                </div>
              </a>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </section>
  `;
}
