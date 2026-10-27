/**
 * ============================================================
 * AUREA — Shop / Catalog View
 * Filterable and sortable jewelry catalog with responsive filters,
 * category selector, price range, search query, and tags.
 * ============================================================
 */

import { PRODUCTS, CATEGORIES } from '../../data/products.js';
import { CONFIG, formatPrice } from '../../data/config.js';
import { renderProductCard } from '../components/productCard.js';

let activeCategory = 'todas';
let activeTag = '';
let minPrice = null;
let maxPrice = null;
let searchQuery = '';
let sortBy = 'popularidad';

/**
 * Render the Shop view into a container or main element.
 * @param {Object} params - Route params, e.g. { category: 'manillas' }
 * @param {HTMLElement} container
 */
export function renderShopView(params = {}, container) {
  if (!container) return;

  // Handle category param from URL or default
  if (params && params.category) {
    const catParam = params.category.toLowerCase();
    if (catParam === 'ofertas' || catParam === 'nuevos' || catParam === 'mas-vendidos') {
      activeCategory = 'todas';
      activeTag = catParam === 'nuevos' ? 'nuevo' : (catParam === 'mas-vendidos' ? 'mas-vendido' : 'oferta');
    } else {
      activeCategory = catParam;
      activeTag = '';
    }
  } else {
    // Only reset if activeCategory was a specific category from another route
    if (params && Object.keys(params).length === 0) {
      activeCategory = 'todas';
      activeTag = '';
    }
  }

  container.innerHTML = `
    <div class="header-spacer"></div>
    <div class="shop section section--ivory">
      <div class="container">
        <!-- Top banner / header -->
        <div class="section__header" style="margin-bottom: 24px;">
          <h1 style="font-size: clamp(1.8rem, 4vw, 2.8rem);">Catálogo de Joyería</h1>
          <p class="section__subtitle">Descubre piezas finamente elaboradas en oro laminado y acero inoxidable premium</p>
        </div>

        <!-- Mobile filter toggle button -->
        <button class="shop__mobile-filter-btn" id="shop-mobile-filter-btn">
          <span>Filtros y Categorías</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block; vertical-align:middle; margin-left:8px;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        </button>

        <div class="shop__layout">
          <!-- Sidebar Filters -->
          <aside class="shop__sidebar">
            <div class="shop__filters" id="shop-filters-panel">
              <!-- Search within catalog -->
              <div class="shop__filter-group">
                <div class="shop__filter-title">
                  <span>Buscar en catálogo</span>
                </div>
                <input
                  type="text"
                  id="shop-search-input"
                  class="shop__price-input"
                  placeholder="Ej: eslabón, aretes, circón..."
                  value="${escapeHTML(searchQuery)}"
                  style="width: 100%; padding: 10px 12px; margin-top: 6px;"
                />
              </div>

              <!-- Categories -->
              <div class="shop__filter-group">
                <div class="shop__filter-title" id="filter-title-categories">
                  <span>Categorías</span>
                </div>
                <div class="shop__filter-options">
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-category"
                      value="todas"
                      class="shop__filter-checkbox"
                      ${activeCategory === 'todas' ? 'checked' : ''}
                    />
                    <span>Todas las joyas (${PRODUCTS.length})</span>
                  </label>
                  ${CATEGORIES.map(cat => {
                    const count = PRODUCTS.filter(p => p.category === cat.id).length;
                    return `
                      <label class="shop__filter-option">
                        <input
                          type="radio"
                          name="shop-category"
                          value="${cat.id}"
                          class="shop__filter-checkbox"
                          ${activeCategory === cat.id ? 'checked' : ''}
                        />
                        <span>${cat.name} (${count})</span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Tags / Colecciones -->
              <div class="shop__filter-group">
                <div class="shop__filter-title">
                  <span>Colecciones especiales</span>
                </div>
                <div class="shop__filter-options">
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-tag"
                      value=""
                      class="shop__filter-checkbox"
                      ${activeTag === '' ? 'checked' : ''}
                    />
                    <span>Todas las colecciones</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-tag"
                      value="nuevo"
                      class="shop__filter-checkbox"
                      ${activeTag === 'nuevo' ? 'checked' : ''}
                    />
                    <span>Novedades</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-tag"
                      value="mas-vendido"
                      class="shop__filter-checkbox"
                      ${activeTag === 'mas-vendido' ? 'checked' : ''}
                    />
                    <span>Más Vendidos</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-tag"
                      value="oferta"
                      class="shop__filter-checkbox"
                      ${activeTag === 'oferta' ? 'checked' : ''}
                    />
                    <span>En Oferta</span>
                  </label>
                </div>
              </div>

              <!-- Price Filter -->
              <div class="shop__filter-group">
                <div class="shop__filter-title">
                  <span>Precio (COP)</span>
                </div>
                <div class="shop__price-range">
                  <div class="shop__price-inputs">
                    <input
                      type="number"
                      id="shop-price-min"
                      class="shop__price-input"
                      placeholder="Mín"
                      value="${minPrice != null ? minPrice : ''}"
                      step="5000"
                      min="0"
                    />
                    <span class="shop__price-separator">–</span>
                    <input
                      type="number"
                      id="shop-price-max"
                      class="shop__price-input"
                      placeholder="Máx"
                      value="${maxPrice != null ? maxPrice : ''}"
                      step="5000"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <!-- Clear button -->
              <button class="shop__clear-filters" id="shop-clear-filters-btn">
                Limpiar todos los filtros
              </button>
            </div>
          </aside>

          <!-- Main catalog content -->
          <main class="shop__main">
            <!-- Top bar: results count, active filters, sorting -->
            <div class="shop__topbar">
              <span class="shop__results-count" id="shop-results-count">Cargando productos...</span>
              <div style="display: flex; align-items: center; gap: 8px;">
                <label for="shop-sort-select" style="font-size: 0.85rem; color: var(--gray-text);">Ordenar:</label>
                <select id="shop-sort-select" class="shop__sort" aria-label="Ordenar productos">
                  <option value="popularidad" ${sortBy === 'popularidad' ? 'selected' : ''}>Más populares</option>
                  <option value="precio-asc" ${sortBy === 'precio-asc' ? 'selected' : ''}>Precio: Menor a Mayor</option>
                  <option value="precio-desc" ${sortBy === 'precio-desc' ? 'selected' : ''}>Precio: Mayor a Menor</option>
                  <option value="novedades" ${sortBy === 'novedades' ? 'selected' : ''}>Novedades primero</option>
                  <option value="nombre" ${sortBy === 'nombre' ? 'selected' : ''}>Nombre (A - Z)</option>
                </select>
              </div>
            </div>

            <!-- Active filter chips -->
            <div class="shop__active-filters" id="shop-active-chips"></div>

            <!-- Products Grid -->
            <div class="products-grid" id="shop-products-grid"></div>
          </main>
        </div>
      </div>
    </div>
  `;

  bindShopEvents(container);
  applyFiltersAndRender();
}

/**
 * Filter and sort logic
 */
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    // Category
    if (activeCategory !== 'todas' && p.category !== activeCategory) {
      return false;
    }

    // Tag
    if (activeTag && (!p.tags || !p.tags.includes(activeTag))) {
      return false;
    }

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const name = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const desc = p.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const mat = (p.material || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (!name.includes(q) && !desc.includes(q) && !mat.includes(q)) {
        return false;
      }
    }

    // Min price
    if (minPrice != null && p.price < minPrice) {
      return false;
    }

    // Max price
    if (maxPrice != null && p.price > maxPrice) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'novedades') return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (sortBy === 'nombre') return a.name.localeCompare(b.name);
    // default: popularidad
    return (b.popularity || 0) - (a.popularity || 0);
  });
}

/**
 * Update the products grid, results count and active chips
 */
function applyFiltersAndRender() {
  const grid = document.getElementById('shop-products-grid');
  const countEl = document.getElementById('shop-results-count');
  const chipsEl = document.getElementById('shop-active-chips');
  if (!grid) return;

  const filtered = getFilteredProducts();

  // Results count
  if (countEl) {
    countEl.textContent = `Mostrando ${filtered.length} de ${PRODUCTS.length} piezas`;
  }

  // Active filter chips
  if (chipsEl) {
    const chips = [];
    if (activeCategory !== 'todas') {
      const catObj = CATEGORIES.find(c => c.id === activeCategory);
      chips.push({ label: `Categoría: ${catObj ? catObj.name : activeCategory}`, clear: () => { activeCategory = 'todas'; syncCategoryRadio(); } });
    }
    if (activeTag) {
      const tagLabels = { 'nuevo': 'Novedades', 'mas-vendido': 'Más Vendidos', 'oferta': 'En Oferta' };
      chips.push({ label: tagLabels[activeTag] || activeTag, clear: () => { activeTag = ''; syncTagRadio(); } });
    }
    if (searchQuery) {
      chips.push({ label: `"${searchQuery}"`, clear: () => { searchQuery = ''; const inp = document.getElementById('shop-search-input'); if (inp) inp.value = ''; } });
    }
    if (minPrice != null) {
      chips.push({ label: `Min: ${formatPrice(minPrice)}`, clear: () => { minPrice = null; const inp = document.getElementById('shop-price-min'); if (inp) inp.value = ''; } });
    }
    if (maxPrice != null) {
      chips.push({ label: `Max: ${formatPrice(maxPrice)}`, clear: () => { maxPrice = null; const inp = document.getElementById('shop-price-max'); if (inp) inp.value = ''; } });
    }

    if (chips.length > 0) {
      chipsEl.innerHTML = chips.map((c, i) => `
        <button class="shop__active-filter" data-chip-idx="${i}" aria-label="Remover filtro ${c.label}">
          <span>${c.label}</span>
          <span style="font-weight: bold; margin-left: 4px;">&times;</span>
        </button>
      `).join('');

      chipsEl.querySelectorAll('.shop__active-filter').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.chipIdx, 10);
          if (chips[idx] && chips[idx].clear) {
            chips[idx].clear();
            applyFiltersAndRender();
          }
        });
      });
    } else {
      chipsEl.innerHTML = '';
    }
  }

  // Grid
  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="shop__no-results" style="grid-column: 1 / -1;">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <p>No se encontraron joyas que coincidan con los filtros aplicados.</p>
        <button class="btn btn--primary" id="btn-reset-filters">Limpiar filtros</button>
      </div>
    `;
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        clearAllFilters();
      });
    }
    return;
  }

  filtered.forEach(product => {
    grid.appendChild(renderProductCard(product));
  });
}

function syncCategoryRadio() {
  const radios = document.querySelectorAll('input[name="shop-category"]');
  radios.forEach(r => {
    r.checked = r.value === activeCategory;
  });
}

function syncTagRadio() {
  const radios = document.querySelectorAll('input[name="shop-tag"]');
  radios.forEach(r => {
    r.checked = r.value === activeTag;
  });
}

function clearAllFilters() {
  activeCategory = 'todas';
  activeTag = '';
  minPrice = null;
  maxPrice = null;
  searchQuery = '';
  sortBy = 'popularidad';

  syncCategoryRadio();
  syncTagRadio();

  const searchInp = document.getElementById('shop-search-input');
  if (searchInp) searchInp.value = '';
  const minInp = document.getElementById('shop-price-min');
  if (minInp) minInp.value = '';
  const maxInp = document.getElementById('shop-price-max');
  if (maxInp) maxInp.value = '';
  const sortSel = document.getElementById('shop-sort-select');
  if (sortSel) sortSel.value = 'popularidad';

  applyFiltersAndRender();
}

function bindShopEvents(container) {
  // Mobile filter drawer toggle
  const mobileFilterBtn = document.getElementById('shop-mobile-filter-btn');
  const filtersPanel = document.getElementById('shop-filters-panel');
  if (mobileFilterBtn && filtersPanel) {
    mobileFilterBtn.addEventListener('click', () => {
      filtersPanel.classList.toggle('shop__filters--open');
      const isOpen = filtersPanel.classList.contains('shop__filters--open');
      mobileFilterBtn.querySelector('span').textContent = isOpen ? 'Ocultar filtros' : 'Filtros y Categorías';
    });
  }

  // Category radios
  const catRadios = document.querySelectorAll('input[name="shop-category"]');
  catRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      activeCategory = radio.value;
      applyFiltersAndRender();
    });
  });

  // Tag radios
  const tagRadios = document.querySelectorAll('input[name="shop-tag"]');
  tagRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      activeTag = radio.value;
      applyFiltersAndRender();
    });
  });

  // Search input with debounce
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = searchInput.value.trim();
        applyFiltersAndRender();
      }, 300);
    });
  }

  // Price inputs with debounce
  const minInput = document.getElementById('shop-price-min');
  const maxInput = document.getElementById('shop-price-max');
  const handlePriceChange = () => {
    minPrice = minInput && minInput.value ? parseFloat(minInput.value) : null;
    maxPrice = maxInput && maxInput.value ? parseFloat(maxInput.value) : null;
    applyFiltersAndRender();
  };

  if (minInput) minInput.addEventListener('input', handlePriceChange);
  if (maxInput) maxInput.addEventListener('input', handlePriceChange);

  // Sort dropdown
  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortBy = sortSelect.value;
      applyFiltersAndRender();
    });
  }

  // Clear filters button
  const clearBtn = document.getElementById('shop-clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllFilters);
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
