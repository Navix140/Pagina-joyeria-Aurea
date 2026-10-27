/**
 * ============================================================
 * AUREA — Home View
 * Combines Hero, Categories, Featured Products, Promo Banner,
 * Benefits, Testimonials, FAQ accordion, and Newsletter.
 * ============================================================
 */

import { renderHero, bindHeroEvents } from '../components/hero.js';
import { renderCategories } from '../components/categories.js';
import { renderProductSections, hydrateProductSections } from '../components/productSections.js';
import { showToast } from '../components/toast.js';

export function renderHomeView(container) {
  if (!container) return;

  container.innerHTML = `
    <!-- Spacer for fixed header -->
    <div class="header-spacer"></div>

    <!-- Hero Section -->
    ${renderHero()}

    <!-- Categories Grid -->
    ${renderCategories()}

    <!-- Featured Products Sections -->
    ${renderProductSections()}

    <!-- Promo Banner -->
    <section class="promo-banner">
      <div class="container" style="position: relative; z-index: 2;">
        <h2 class="promo-banner__text">La Perfección del Brillo Dorado</h2>
        <p class="promo-banner__subtext">Joyas hipoalergénicas con triple recubrimiento para una durabilidad insuperable</p>
        <a href="#/tienda" class="btn btn--primary" style="margin-top: 8px;">Descubrir Todas las Joyas</a>
      </div>
    </section>

    <!-- Benefits / Guarantees -->
    <section class="section section--ivory" id="section-beneficios">
      <div class="container">
        <div class="section__header">
          <h2>Por Qué Elegir AUREA</h2>
          <p class="section__subtitle">Compromiso inquebrantable con el detalle, la distinción y la confianza</p>
        </div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 class="benefit-card__title">Materiales Hipoalergénicos</h3>
            <p class="benefit-card__text">Acero quirúrgico 316L y baños de oro 18k libres de níquel, aptos para todo tipo de piel.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <h3 class="benefit-card__title">Envíos a Toda Colombia</h3>
            <p class="benefit-card__text">Despachos asegurados a ciudades y municipios. Gratis en compras desde $200.000 COP.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
            </div>
            <h3 class="benefit-card__title">Empaque de Lujo</h3>
            <p class="benefit-card__text">Cada joya se entrega en un estuche premium con paño de microfibra, lista para regalar.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 class="benefit-card__title">Garantía Certificada</h3>
            <p class="benefit-card__text">Respaldamos cada pieza ante cualquier defecto de fabricación o pérdida inusual de brillo.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section section--beige" id="section-testimonios">
      <div class="container">
        <div class="section__header">
          <h2>Experiencias de Nuestras Clientas</h2>
          <p class="section__subtitle">Más de 2.000 amantes de la joyería confían en nuestras creaciones</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-card__stars">★★★★★</div>
            <p class="testimonial-card__text">
              "Compré la Manilla Premium Signature y una cadena con dije. El brillo es espectacular, parece oro macizo y no se ha manchado para nada después de semanas de uso."
            </p>
            <div class="testimonial-card__author">Valentina Restrepo</div>
            <div class="testimonial-card__badge">Compradora verificada • Medellín</div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-card__stars">★★★★★</div>
            <p class="testimonial-card__text">
              "Excelente atención por WhatsApp, el pedido llegó a Bogotá en menos de 48 horas en un estuche divino con una tarjeta personalizada. ¡Súper recomendado para regalos!"
            </p>
            <div class="testimonial-card__author">Camila Osorio</div>
            <div class="testimonial-card__badge">Compradora verificada • Bogotá</div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-card__stars">★★★★★</div>
            <p class="testimonial-card__text">
              "Tengo piel sensible y casi todo me causaba alergia. Con AUREA llevo un set completo sin ninguna irritación. El acabado es impecable y elegante."
            </p>
            <div class="testimonial-card__author">Daniela Gómez</div>
            <div class="testimonial-card__badge">Compradora verificada • Cali</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="section section--ivory" id="section-faq">
      <div class="container">
        <div class="section__header">
          <h2>Preguntas Frecuentes</h2>
          <p class="section__subtitle">Resolvemos todas tus dudas antes de ordenar</p>
        </div>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-item__question" aria-expanded="false">
              <span>¿De qué material están hechas las joyas?</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-item__answer">
              <p>Nuestras piezas están elaboradas en acero inoxidable quirúrgico 316L y aleaciones de bronce de alta gama con baños y laminados de oro de 18 quilates con recubrimiento PVD. Son 100% libres de níquel y plomo, hipoalergénicas y resistentes a la oxidación.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-item__question" aria-expanded="false">
              <span>¿Cuánto tarda el envío y cuál es su costo?</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-item__answer">
              <p>El costo de envío a nivel nacional es de $12.000 COP y es <strong>totalmente GRATIS</strong> para órdenes superiores a $200.000 COP. Las entregas en ciudades principales tardan entre 1 y 3 días hábiles; para el resto del país entre 3 y 5 días hábiles.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-item__question" aria-expanded="false">
              <span>¿Cómo se realiza el pago por WhatsApp?</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-item__answer">
              <p>Una vez completas tus datos de entrega en el carrito, se genera un mensaje detallado para WhatsApp. Al enviarlo, nuestro asesor valida las referencias y te facilita los canales de pago: Transferencia Bancolombia, Nequi, Daviplata, link de pago PSE / Tarjeta o contra entrega según tu ubicación.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-item__question" aria-expanded="false">
              <span>¿Cómo debo cuidar mis joyas doradas?</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-item__answer">
              <p>Para prolongar el brillo óptimo durante años, recomendamos evitar el contacto directo con perfumes o químicos abrasivos, retirarlas antes de piscinas con cloro y limpiarlas suavemente con el paño de microfibra incluido en tu pedido.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="section section--dark" id="section-newsletter">
      <div class="container newsletter">
        <h2 style="color: var(--ivory); margin-bottom: 12px;">Únete al Círculo Exclusivo AUREA</h2>
        <p style="color: var(--beige); max-width: 500px; margin: 0 auto 28px;">
          Suscríbete para recibir un 10% de descuento en tu primer pedido, acceso anticipado a nuevas colecciones y promociones secretas.
        </p>
        <form class="newsletter__form" id="newsletter-form">
          <input
            type="email"
            class="newsletter__input"
            id="newsletter-email"
            placeholder="Ingresa tu correo electrónico..."
            required
            aria-label="Correo electrónico para boletín"
          />
          <button type="submit" class="btn btn--primary">Suscribirme</button>
        </form>
        <div id="newsletter-feedback"></div>
      </div>
    </section>
  `;

  // Bind Hero CTAs
  bindHeroEvents();

  // Populate product grids
  hydrateProductSections();

  // Bind FAQ accordions
  bindFaqEvents();

  // Bind Newsletter
  bindNewsletterEvents();
}

function bindFaqEvents() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-item--open');
        // Close other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('faq-item--open');
            other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
          }
        });
        item.classList.toggle('faq-item--open', !isOpen);
        question.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });
    }
  });
}

function bindNewsletterEvents() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const feedback = document.getElementById('newsletter-feedback');

  if (form && emailInput && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email || !email.includes('@')) {
        feedback.innerHTML = '<p class="newsletter__error">Por favor ingresa un correo electrónico válido</p>';
        return;
      }
      feedback.innerHTML = '<p class="newsletter__success">✨ ¡Gracias por suscribirte! Te hemos enviado un código de 10% de descuento a tu correo.</p>';
      showToast('¡Bienvenida al Círculo AUREA!', 'success');
      form.reset();
    });
  }
}
