/**
 * ============================================================
   AUREA — Hero Section
   Minimalista: una gran imagen de joyería, mensaje corto, un solo CTA.
   ============================================================ */

export function renderHero() {
  return `
    <section class="hero" id="hero">
      <div class="hero__bg">
        <img
          src="assets/images/products/prod-17-cadena-tjdio-cartier.jpg"
          alt="Cadena de oro nacional eslabón Cartier"
          class="hero__bg-img"
          loading="eager"
          onerror="this.src='assets/images/categories/cat-cadenas.jpg'"
        />
        <div class="hero__overlay"></div>
      </div>
      <div class="hero__content container">
        <span class="hero__kicker">Joyería de Oro Colombiana</span>
        <h1 class="hero__title">La elegancia está en los detalles.</h1>
        <p class="hero__subtitle">
          Piezas atemporales diseñadas para quienes aprecian la belleza atemporal y la artesanía excepcional.
        </p>
        <div class="hero__actions">
          <a href="#/tienda" class="btn btn--primary">Explorar colección</a>
        </div>
      </div>
    </section>
  `;
}

/**
 * Bind hero event listeners (call after rendering).
 */
export function bindHeroEvents() {
  // No hay botones secundarios en el hero minimalista
}
