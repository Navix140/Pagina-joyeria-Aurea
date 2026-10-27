/**
 * ============================================================
 * AUREA — Simple Hash Router
 * Maps URL hashes to view-rendering callbacks.
 * ============================================================
 */

let routes = {};
let notFoundHandler = null;

/**
 * Register a route.
 * @param {string} hash  – e.g. '#/' or '#/tienda'
 * @param {Function} handler – called when route matches, receives params object
 */
export function addRoute(hash, handler) {
  routes[hash] = handler;
}

/**
 * Register a catch-all for unmatched routes.
 */
export function setNotFound(handler) {
  notFoundHandler = handler;
}

/**
 * Navigate to a hash path programmatically.
 * @param {string} hash
 */
export function navigateTo(hash) {
  window.location.hash = hash;
}

/**
 * Return the current hash path.
 */
export function getCurrentRoute() {
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') return '#/';
  // Strip trailing slashes unless root
  return hash.replace(/\/+$/, '');
}

/**
 * Resolve the current hash against registered routes.
 */
function resolve() {
  const hash = getCurrentRoute();

  // Exact match first
  if (routes[hash]) {
    routes[hash]({});
    return;
  }

  // Pattern match: #/tienda/:category
  for (const pattern of Object.keys(routes)) {
    const regex = new RegExp(
      '^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$'
    );
    const match = hash.match(regex);
    if (match) {
      // Extract param names
      const paramNames = (pattern.match(/:[^/]+/g) || []).map(p => p.slice(1));
      const params = {};
      paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });
      routes[pattern](params);
      return;
    }
  }

  // Not found
  if (notFoundHandler) notFoundHandler();
  else if (routes['#/']) routes['#/']({});
}

/**
 * Start listening for hash changes.
 */
export function startRouter() {
  window.addEventListener('hashchange', () => resolve());
  // Initial route
  resolve();
}
