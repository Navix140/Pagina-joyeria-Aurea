/**
 * ============================================================
 * AUREA — State Management (Pub/Sub Store)
 * Manages cart, favorites, and application state with
 * localStorage persistence.
 * ============================================================
 */

const STORAGE_KEYS = {
  CART: 'aurea_cart',
  FAVORITES: 'aurea_favorites',
};

/** Internal state */
const state = {
  cart: [],
  favorites: [],
  listeners: {},
};

/* ── Persistence helpers ─────────────────────────────────── */

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
  } catch { /* quota exceeded — silently ignore */ }
}

function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
  } catch { /* quota exceeded — silently ignore */ }
}

function loadState() {
  try {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    if (cart) state.cart = JSON.parse(cart);
  } catch { state.cart = []; }
  try {
    const favs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (favs) state.favorites = JSON.parse(favs);
  } catch { state.favorites = []; }
}

/* ── Pub / Sub ───────────────────────────────────────────── */

/**
 * Subscribe to a named event.
 * @param {string} event
 * @param {Function} callback
 * @returns {Function} unsubscribe
 */
export function subscribe(event, callback) {
  if (!state.listeners[event]) state.listeners[event] = [];
  state.listeners[event].push(callback);
  return () => {
    state.listeners[event] = state.listeners[event].filter(cb => cb !== callback);
  };
}

/**
 * Emit a named event with optional data.
 * @param {string} event
 * @param {*} data
 */
export function emit(event, data) {
  (state.listeners[event] || []).forEach(cb => cb(data));
}

/* ── Cart ────────────────────────────────────────────────── */

/**
 * Generate a unique key for a cart item (product + variant).
 */
function cartItemKey(productId, variant) {
  return `${productId}__${variant || 'default'}`;
}

/**
 * Add a product (with optional variant and quantity) to the cart.
 */
export function addToCart(product, variant = '', qty = 1) {
  const key = cartItemKey(product.id, variant);
  const existing = state.cart.find(item => item.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({
      key,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: (product.images && product.images[0]) || '',
      variant,
      qty,
    });
  }
  saveCart();
  emit('cart:updated', state.cart);
}

/**
 * Remove a cart item by its key.
 */
export function removeFromCart(key) {
  state.cart = state.cart.filter(item => item.key !== key);
  saveCart();
  emit('cart:updated', state.cart);
}

/**
 * Update quantity for a cart item.
 */
export function updateQuantity(key, qty) {
  const item = state.cart.find(i => i.key === key);
  if (!item) return;
  if (qty < 1) {
    removeFromCart(key);
    return;
  }
  item.qty = qty;
  saveCart();
  emit('cart:updated', state.cart);
}

/**
 * Get the full cart array.
 */
export function getCart() {
  return [...state.cart];
}

/**
 * Get the cart monetary total.
 */
export function getCartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/**
 * Get total number of items in the cart.
 */
export function getCartCount() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

/**
 * Clear the entire cart.
 */
export function clearCart() {
  state.cart = [];
  saveCart();
  emit('cart:updated', state.cart);
}

/* ── Favorites ───────────────────────────────────────────── */

/**
 * Toggle a product as favorite. Returns true if now favorited.
 */
export function toggleFavorite(productId) {
  const idx = state.favorites.indexOf(productId);
  if (idx === -1) {
    state.favorites.push(productId);
  } else {
    state.favorites.splice(idx, 1);
  }
  saveFavorites();
  emit('favorites:updated', state.favorites);
  return idx === -1; // true = added, false = removed
}

/**
 * Check if a product is favorited.
 */
export function isFavorite(productId) {
  return state.favorites.includes(productId);
}

/**
 * Get all favorite product IDs.
 */
export function getFavorites() {
  return [...state.favorites];
}

/* ── Init ────────────────────────────────────────────────── */

/** Initialize the store – call once on app start. */
export function initStore() {
  loadState();
  emit('cart:updated', state.cart);
  emit('favorites:updated', state.favorites);
}
