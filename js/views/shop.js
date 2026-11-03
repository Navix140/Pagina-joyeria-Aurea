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
let activeSubcategory = '';
let activeGoldType = '';
let activeTag = '';
let minPrice = null;
let maxPrice = null;
let searchQuery = '';
let sortBy = 'popularidad';

/**
 * Mapeo de compatibilidad para URLs o categorías legadas
 */
const LEGACY_CATEGORY_MAP = {
  'manillas': 'manillas-tejidas',
  'aretes': 'aretes-tradicionales',
  'sets': 'joyeria',
  'accesorios': 'joyeria',
};

/**
 * Comprueba coincidencia de categoría soportando compatibilidad temporal con productos demo
 */
function matchCategory(productCategory, targetCategoryId) {
  if (targetCategoryId === 'todas') return true;
  if (productCategory === targetCategoryId) return true;
  
  // Compatibilidad temporal para productos demo actuales
  if (targetCategoryId === 'manillas-tejidas' && productCategory === 'manillas') return true;
  if (targetCategoryId === 'aretes-tradicionales' && productCategory === 'aretes') return true;
  if (targetCategoryId === 'joyeria' && (productCategory === 'sets' || productCategory === 'accesorios')) return true;
  
  return false;
}

/**
 * Render the Shop view into a container or main element.
 * @param {Object} params - Route params, e.g. { category: 'pulseras' }
 * @param {HTMLElement} container
 */
export function renderShopView(params = {}, container) {
  if (!container) return;

  // Handle category param from URL or default
  if (params && params.category) {
    let catParam = params.category.toLowerCase();
    
    // Mapeo de rutas legadas si aplican
    if (LEGACY_CATEGORY_MAP[catParam]) {
      catParam = LEGACY_CATEGORY_MAP[catParam];
    }

    if (catParam === 'ofertas' || catParam === 'nuevos' || catParam === 'mas-vendidos') {
      activeCategory = 'todas';
      activeTag = catParam === 'nuevos' ? 'nuevo' : (catParam === 'mas-vendidos' ? 'mas-vendido' : 'oferta');
    } else {
      // Verificar si la categoría existe en CATEGORIES
      const exists = CATEGORIES.some(c => c.id === catParam);
      if (exists) {
        activeCategory = catParam;
      } else {
        // Ruta inválida o no reconocida: caer suavemente a 'todas' sin dejar la tienda en blanco
        activeCategory = 'todas';
      }
      activeTag = '';
    }
  } else {
    // Only reset if activeCategory was a specific category from another route
    if (params && Object.keys(params).length === 0) {
      activeCategory = 'todas';
      activeTag = '';
    }
  }

  const mainCategories = CATEGORIES.filter(c => !c.isComplementary);
  const complementaryCategories = CATEGORIES.filter(c => c.isComplementary);

  container.innerHTML = `
    <div class="header-spacer"></div>
    <div class="shop section section--ivory">
      <div class="container">
        <!-- Top banner / header -->
        <div class="section__header" style="margin-bottom: 24px;">
          <h1 style="font-size: clamp(1.8rem, 4vw, 2.8rem);">Catálogo de Joyería</h1>
          <p class="section__subtitle">Descubre piezas finamente elaboradas en orfebrería y tradición nacional</p>
          <div class="shop__notice" style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #c5a059; padding: 10px 18px; margin: 18px auto 0 auto; max-width: 760px; border-radius: 4px; text-align: center; font-size: 0.9rem; color: #444; line-height: 1.5;">
            <strong style="color: #111;">Aviso:</strong> Catálogo de referencia. Precios, materiales y disponibilidad sujetos a confirmación por WhatsApp.
          </div>
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
                  placeholder="Ej: eslabón, topitos, balines..."
                  value="${escapeHTML(searchQuery)}"
                  style="width: 100%; padding: 10px 12px; margin-top: 6px;"
                />
              </div>

              <!-- Categorías Principales (9) -->
              <div class="shop__filter-group">
                <div class="shop__filter-title" id="filter-title-categories">
                  <span>Categorías Principales</span>
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
                  ${mainCategories.map(cat => {
                    const count = PRODUCTS.filter(p => matchCategory(p.category, cat.id)).length;
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

                <!-- Sección Complementaria (Tobilleras) -->
                ${complementaryCategories.length > 0 ? `
                  <div class="shop__filter-title" style="margin-top: 14px; border-top: 1px dashed var(--beige); padding-top: 10px;">
                    <span style="color: var(--gold-dark); font-size: 0.85rem;">Sección Complementaria</span>
                  </div>
                  <div class="shop__filter-options">
                    ${complementaryCategories.map(cat => {
                      const count = PRODUCTS.filter(p => matchCategory(p.category, cat.id)).length;
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
                ` : ''}
              </div>

              <!-- Filtro Secundario: Subcategorías de Pulseras -->
              <div class="shop__filter-group">
                <div class="shop__filter-title">
                  <span>Subcategoría (Pulseras)</span>
                </div>
                <div class="shop__filter-options">
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-subcategory"
                      value=""
                      class="shop__filter-checkbox"
                      ${activeSubcategory === '' ? 'checked' : ''}
                    />
                    <span>Todas las pulseras</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-subcategory"
                      value="balines"
                      class="shop__filter-checkbox"
                      ${activeSubcategory === 'balines' ? 'checked' : ''}
                    />
                    <span>Balines</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-subcategory"
                      value="diamantadas"
                      class="shop__filter-checkbox"
                      ${activeSubcategory === 'diamantadas' ? 'checked' : ''}
                    />
                    <span>Diamantadas</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-subcategory"
                      value="lisas"
                      class="shop__filter-checkbox"
                      ${activeSubcategory === 'lisas' ? 'checked' : ''}
                    />
                    <span>Lisas</span>
                  </label>
                </div>
              </div>

              <!-- Filtro Secundario: Tipo de Oro -->
              <div class="shop__filter-group">
                <div class="shop__filter-title">
                  <span>Tipo de Oro (Cadenas & Joyería)</span>
                </div>
                <div class="shop__filter-options">
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-goldtype"
                      value=""
                      class="shop__filter-checkbox"
                      ${activeGoldType === '' ? 'checked' : ''}
                    />
                    <span>Todo tipo de oro</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-goldtype"
                      value="nacional"
                      class="shop__filter-checkbox"
                      ${activeGoldType === 'nacional' ? 'checked' : ''}
                    />
                    <span>Oro Nacional</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio"
                      name="shop-goldtype"
                      value="italiano"
                      class="shop__filter-checkbox"
                      ${activeGoldType === 'italiano' ? 'checked' : ''}
                    />
                    <span>Oro Italiano</span>
                  </label>
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
    // Category (con compatibilidad temporal para productos demo)
    if (!matchCategory(p.category, activeCategory)) {
      return false;
    }

    // Subcategory (pulseras)
    if (activeSubcategory && p.subcategory !== activeSubcategory) {
      return false;
    }

    // Gold type (nacional / italiano)
    if (activeGoldType && p.goldType !== activeGoldType) {
      return false;
    }

    // Tag
    if (activeTag) {
      if (activeTag === 'oferta') {
        if ((!p.tags || !p.tags.includes('oferta')) && p.oldPrice == null) return false;
      } else if (!p.tags || !p.tags.includes(activeTag)) {
        return false;
      }
    }

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const name = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const desc = p.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const mat = (p.material || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const sub = (p.subcategory || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const gold = (p.goldType || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (!name.includes(q) && !desc.includes(q) && !mat.includes(q) && !sub.includes(q) && !gold.includes(q)) {
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
    if (activeSubcategory) {
      const subLabels = { 'balines': 'Balines', 'diamantadas': 'Diamantadas', 'lisas': 'Lisas' };
      chips.push({ label: `Subcategoría: ${subLabels[activeSubcategory] || activeSubcategory}`, clear: () => { activeSubcategory = ''; syncSubcategoryRadio(); } });
    }
    if (activeGoldType) {
      const goldLabels = { 'nacional': 'Oro Nacional', 'italiano': 'Oro Italiano' };
      chips.push({ label: `Tipo: ${goldLabels[activeGoldType] || activeGoldType}`, clear: () => { activeGoldType = ''; syncGoldTypeRadio(); } });
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

function syncSubcategoryRadio() {
  const radios = document.querySelectorAll('input[name="shop-subcategory"]');
  radios.forEach(r => {
    r.checked = r.value === activeSubcategory;
  });
}

function syncGoldTypeRadio() {
  const radios = document.querySelectorAll('input[name="shop-goldtype"]');
  radios.forEach(r => {
    r.checked = r.value === activeGoldType;
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
  activeSubcategory = '';
  activeGoldType = '';
  activeTag = '';
  minPrice = null;
  maxPrice = null;
  searchQuery = '';
  sortBy = 'popularidad';

  syncCategoryRadio();
  syncSubcategoryRadio();
  syncGoldTypeRadio();
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

  // Subcategory radios
  const subcatRadios = document.querySelectorAll('input[name="shop-subcategory"]');
  subcatRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      activeSubcategory = radio.value;
      applyFiltersAndRender();
    });
  });

  // Gold type radios
  const goldRadios = document.querySelectorAll('input[name="shop-goldtype"]');
  goldRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      activeGoldType = radio.value;
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
