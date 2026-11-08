/**
 * ============================================================
   AUREA — Shop / Catalog View (Minimalista)
   Catálogo filtrable con diseño limpio y moderno.
   ============================================================ */

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

const LEGACY_CATEGORY_MAP = {
  'manillas': 'manillas-tejidas',
  'aretes': 'aretes-tradicionales',
  'sets': 'joyeria',
  'accesorios': 'joyeria',
};

function matchCategory(productCategory, targetCategoryId) {
  if (targetCategoryId === 'todas') return true;
  if (productCategory === targetCategoryId) return true;
  if (targetCategoryId === 'manillas-tejidas' && productCategory === 'manillas') return true;
  if (targetCategoryId === 'aretes-tradicionales' && productCategory === 'aretes') return true;
  if (targetCategoryId === 'joyeria' && (productCategory === 'sets' || productCategory === 'accesorios')) return true;
  return false;
}

/**
 * Detecta qué tipos de oro tienen productos asociados para no mostrar opciones vacías.
 */
function getAvailableGoldTypes() {
  const types = new Set();
  PRODUCTS.forEach(p => { if (p.goldType) types.add(p.goldType); });
  return types;
}

export function renderShopView(params = {}, container) {
  if (!container) return;

  if (params && params.category) {
    let catParam = params.category.toLowerCase();
    if (LEGACY_CATEGORY_MAP[catParam]) {
      catParam = LEGACY_CATEGORY_MAP[catParam];
    }
    if (catParam === 'ofertas' || catParam === 'nuevos' || catParam === 'mas-vendidos') {
      activeCategory = 'todas';
      activeTag = catParam === 'nuevos' ? 'nuevo' : (catParam === 'mas-vendidos' ? 'mas-vendido' : 'oferta');
    } else {
      const exists = CATEGORIES.some(c => c.id === catParam);
      if (exists) {
        activeCategory = catParam;
      } else {
        activeCategory = 'todas';
      }
      activeTag = '';
    }
  } else {
    if (params && Object.keys(params).length === 0) {
      activeCategory = 'todas';
      activeTag = '';
    }
  }

  const mainCategories = CATEGORIES.filter(c => !c.isComplementary);
  const complementaryCategories = CATEGORIES.filter(c => c.isComplementary);

  const catName = CATEGORIES.find(c => c.id === activeCategory);
  const pageTitle = activeCategory === 'todas' ? 'Catálogo de Joyería' : (catName ? catName.name : 'Catálogo');

  container.innerHTML = `
    <div class="header-spacer"></div>
    <div class="shop section section--ivory">
      <div class="container">
        <div class="shop__header" style="margin-bottom: 40px;">
          <h1 style="font-size: clamp(1.8rem, 4vw, 2.6rem); letter-spacing: -0.02em;">${pageTitle}</h1>
          <p class="section__subtitle" style="text-align: center; max-width: 600px; margin: 12px auto 0;">
            Descubre piezas finamente elaboradas en orfebrería y tradición nacional
          </p>
        </div>

        <div class="shop__layout">
          <!-- Sidebar Filters -->
          <aside class="shop__sidebar">
            <div class="shop__filters" id="shop-filters-panel">
              <div class="shop__filter-group">
                <div class="shop__filter-title">
                  <span>Buscar en catálogo</span>
                </div>
                <input
                  type="text"
                  id="shop-search-input"
                  class="shop__price-input"
                  placeholder="Ej: cadena, topitos, balines..."
                  value="${escapeHTML(searchQuery)}"
                  style="width: 100%; padding: 10px 12px; margin-top: 6px;"
                />
              </div>

              <div class="shop__filter-group collapsible" id="filter-group-categories">
                <div class="shop__filter-title collapsible__title">
                  <span>Categorías</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="shop__filter-options collapsible__content">
                  <label class="shop__filter-option">
                    <input
                      type="radio" name="shop-category" value="todas"
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
                          type="radio" name="shop-category" value="${cat.id}"
                          class="shop__filter-checkbox"
                          ${activeCategory === cat.id ? 'checked' : ''}
                        />
                        <span>${cat.name} (${count})</span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>

              <div class="shop__filter-group collapsible" id="filter-group-goldtype">
                <div class="shop__filter-title collapsible__title">
                  <span>Tipo de Oro</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="shop__filter-options collapsible__content">
                  <label class="shop__filter-option">
                    <input
                      type="radio" name="shop-goldtype" value=""
                      class="shop__filter-checkbox"
                      ${activeGoldType === '' ? 'checked' : ''}
                    />
                    <span>Todo tipo de oro</span>
                  </label>
                  ${getAvailableGoldTypes().map(type => {
                    const label = type === 'nacional' ? 'Oro Nacional' : type === 'italiano' ? 'Oro Italiano' : type;
                    return `
                      <label class="shop__filter-option">
                        <input
                          type="radio" name="shop-goldtype" value="${type}"
                          class="shop__filter-checkbox"
                          ${activeGoldType === type ? 'checked' : ''}
                        />
                        <span>${label}</span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>

              <div class="shop__filter-group collapsible" id="filter-group-collections">
                <div class="shop__filter-title collapsible__title">
                  <span>Colecciones</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="shop__filter-options collapsible__content">
                  <label class="shop__filter-option">
                    <input
                      type="radio" name="shop-tag" value=""
                      class="shop__filter-checkbox"
                      ${activeTag === '' ? 'checked' : ''}
                    />
                    <span>Todas las colecciones</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio" name="shop-tag" value="nuevo"
                      class="shop__filter-checkbox"
                      ${activeTag === 'nuevo' ? 'checked' : ''}
                    />
                    <span>Novedades</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio" name="shop-tag" value="mas-vendido"
                      class="shop__filter-checkbox"
                      ${activeTag === 'mas-vendido' ? 'checked' : ''}
                    />
                    <span>Más Vendidos</span>
                  </label>
                  <label class="shop__filter-option">
                    <input
                      type="radio" name="shop-tag" value="oferta"
                      class="shop__filter-checkbox"
                      ${activeTag === 'oferta' ? 'checked' : ''}
                    />
                    <span>En Oferta</span>
                  </label>
                </div>
              </div>

              <div class="shop__filter-group collapsible" id="filter-group-price">
                <div class="shop__filter-title collapsible__title">
                  <span>Precio (COP)</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="shop__filter-options collapsible__content">
                  <div class="shop__price-range">
                  <div class="shop__price-inputs">
                    <input
                      type="number" id="shop-price-min"
                      class="shop__price-input" placeholder="Mín"
                      value="${minPrice != null ? minPrice : ''}"
                      step="5000" min="0"
                    />
                    <span class="shop__price-separator">–</span>
                    <input
                      type="number" id="shop-price-max"
                      class="shop__price-input" placeholder="Máx"
                      value="${maxPrice != null ? maxPrice : ''}"
                      step="5000" min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

              <button class="shop__clear-filters" id="shop-clear-filters-btn">
                Limpiar filtros
              </button>
            </div>
          </aside>

          <!-- Main catalog content -->
          <main class="shop__main">
            <div class="shop__topbar">
              <span class="shop__results-count" id="shop-results-count">Cargando productos...</span>
              <div style="display: flex; align-items: center; gap: 8px;">
                <label for="shop-sort-select" style="font-size: 0.8rem; color: var(--gray-text); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Ordenar:</label>
                <select id="shop-sort-select" class="shop__sort" aria-label="Ordenar productos">
                  <option value="popularidad" ${sortBy === 'popularidad' ? 'selected' : ''}>Más populares</option>
                  <option value="precio-asc" ${sortBy === 'precio-asc' ? 'selected' : ''}>Precio: Menor a Mayor</option>
                  <option value="precio-desc" ${sortBy === 'precio-desc' ? 'selected' : ''}>Precio: Mayor a Menor</option>
                  <option value="novedades" ${sortBy === 'novedades' ? 'selected' : ''}>Novedades primero</option>
                  <option value="nombre" ${sortBy === 'nombre' ? 'selected' : ''}>Nombre (A - Z)</option>
                </select>
              </div>
            </div>

            <div class="shop__active-filters" id="shop-active-chips"></div>

            <div class="products-grid" id="shop-products-grid"></div>
          </main>
        </div>
      </div>
    </div>
  `;

  bindShopEvents(container);
  applyFiltersAndRender();
}

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    if (!matchCategory(p.category, activeCategory)) return false;
    if (activeSubcategory && p.subcategory !== activeSubcategory) return false;
    if (activeGoldType && p.goldType !== activeGoldType) return false;
    if (activeTag) {
      if (activeTag === 'oferta') {
        if ((!p.tags || !p.tags.includes('oferta')) && p.oldPrice == null) return false;
      } else if (!p.tags || !p.tags.includes(activeTag)) {
        return false;
      }
    }
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
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'novedades') return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (sortBy === 'nombre') return a.name.localeCompare(b.name);
    return (b.popularity || 0) - (a.popularity || 0);
  });
}

function applyFiltersAndRender() {
  const grid = document.getElementById('shop-products-grid');
  const countEl = document.getElementById('shop-results-count');
  const chipsEl = document.getElementById('shop-active-chips');
  if (!grid) return;

  const filtered = getFilteredProducts();

  if (countEl) {
    countEl.textContent = `Mostrando ${filtered.length} de ${PRODUCTS.length} piezas`;
  }

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

  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="shop__no-results" style="grid-column: 1 / -1;">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <p>No se encontraron joyas que coincidan con los filtros aplicados.</p>
        <button class="btn btn--primary" id="btn-reset-filters">Limpiar filtros</button>
      </div>
    `;
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', clearAllFilters);
    }
    return;
  }

  filtered.forEach(product => {
    grid.appendChild(renderProductCard(product));
  });
}

function syncCategoryRadio() {
  const radios = document.querySelectorAll('input[name="shop-category"]');
  radios.forEach(r => { r.checked = r.value === activeCategory; });
}
function syncSubcategoryRadio() {
  const radios = document.querySelectorAll('input[name="shop-subcategory"]');
  radios.forEach(r => { r.checked = r.value === activeSubcategory; });
}
function syncGoldTypeRadio() {
  const radios = document.querySelectorAll('input[name="shop-goldtype"]');
  radios.forEach(r => { r.checked = r.value === activeGoldType; });
}
function syncTagRadio() {
  const radios = document.querySelectorAll('input[name="shop-tag"]');
  radios.forEach(r => { r.checked = r.value === activeTag; });
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
  const mobileFilterBtn = document.getElementById('shop-mobile-filter-btn');
  const filtersPanel = document.getElementById('shop-filters-panel');
  if (mobileFilterBtn && filtersPanel) {
    mobileFilterBtn.addEventListener('click', () => {
      filtersPanel.classList.toggle('shop__filters--open');
      const isOpen = filtersPanel.classList.contains('shop__filters--open');
      mobileFilterBtn.querySelector('span').textContent = isOpen ? 'Ocultar filtros' : 'Filtros';
    });
  }

  // Collapsible filter groups
  const collapsibleTitles = document.querySelectorAll('.collapsible__title');
  collapsibleTitles.forEach(title => {
    title.addEventListener('click', () => {
      const group = title.closest('.collapsible');
      const content = group.querySelector('.collapsible__content');
      const icon = title.querySelector('svg');
      const isOpen = content.classList.contains('collapsible__content--open');
      if (isOpen) {
        content.classList.remove('collapsible__content--open');
        icon.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('collapsible__content--open');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  const catRadios = document.querySelectorAll('input[name="shop-category"]');
  catRadios.forEach(radio => {
    radio.addEventListener('change', () => { activeCategory = radio.value; applyFiltersAndRender(); });
  });

  const subcatRadios = document.querySelectorAll('input[name="shop-subcategory"]');
  subcatRadios.forEach(radio => {
    radio.addEventListener('change', () => { activeSubcategory = radio.value; applyFiltersAndRender(); });
  });

  const goldRadios = document.querySelectorAll('input[name="shop-goldtype"]');
  goldRadios.forEach(radio => {
    radio.addEventListener('change', () => { activeGoldType = radio.value; applyFiltersAndRender(); });
  });

  const tagRadios = document.querySelectorAll('input[name="shop-tag"]');
  tagRadios.forEach(radio => {
    radio.addEventListener('change', () => { activeTag = radio.value; applyFiltersAndRender(); });
  });

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

  const minInput = document.getElementById('shop-price-min');
  const maxInput = document.getElementById('shop-price-max');
  const handlePriceChange = () => {
    minPrice = minInput && minInput.value ? parseFloat(minInput.value) : null;
    maxPrice = maxInput && maxInput.value ? parseFloat(maxInput.value) : null;
    applyFiltersAndRender();
  };
  if (minInput) minInput.addEventListener('input', handlePriceChange);
  if (maxInput) maxInput.addEventListener('input', handlePriceChange);

  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => { sortBy = sortSelect.value; applyFiltersAndRender(); });
  }

  const clearBtn = document.getElementById('shop-clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllFilters);
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
