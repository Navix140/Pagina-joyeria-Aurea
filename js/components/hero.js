/**
 * ============================================================
 * AUREA — Hero Section
 * Full-viewport hero with background image and CTAs.
 * ============================================================
 */

export function renderHero() {
  return `
    <section class="hero" id="hero">
      <div class="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1515562141589-67f0d569b6b3?w=1600&h=900&fit=crop&q=80"
          alt="Joyería de lujo"
          class="hero__bg-img"
          loading="eager"
          onerror="this.style.display='none'"
        />
        <div class="hero__overlay"></div>
      </div>
      <div class="hero__content container">
        <h1 class="hero__title">La elegancia está en los detalles.</h1>
        <p class="hero__subtitle">Descubre piezas únicas, diseñadas para quienes aprecian la belleza atemporal y la artesanía excepcional.</p>
        <div class="hero__actions">
          <a href="#/tienda" class="btn btn--primary">Explorar colección</a>
          <button class="btn btn--outline" id="btn-bestsellers">Ver más vendidos</button>
        </div>
      </div>
    </section>
  `;
}

/**
 * Bind hero event listeners (call after rendering).
 */
export function bindHeroEvents() {
  const btn = document.getElementById('btn-bestsellers');
  if (btn) {
    btn.addEventListener('click', () => {
      const section = document.getElementById('section-mas-vendidos');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
