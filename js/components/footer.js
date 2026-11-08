/**
 * ============================================================
   AUREA — Footer Component
   Limpio, elegante y organizado.
   ============================================================ */

import { CONFIG } from '../../data/config.js';
import { CATEGORIES } from '../../data/products.js';

export function renderFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;

  const mainCategories = CATEGORIES.filter(c => !c.isComplementary);
  const complementary = CATEGORIES.find(c => c.isComplementary);

  root.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <!-- Col 1: Brand -->
          <div>
            <div class="footer__brand-name">${CONFIG.BRAND_NAME}</div>
            <p class="footer__brand-desc">
              Joyería fina y accesorios inspirados en la tradición orfebre colombiana. Piezas atemporales elaboradas con altos estándares de calidad y detalle artesanal.
            </p>
            <div class="footer__socials">
              <a href="${CONFIG.SOCIAL_LINKS.instagram}" class="footer__social" aria-label="Instagram de Aurea" target="_blank" rel="noopener">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="${CONFIG.SOCIAL_LINKS.facebook}" class="footer__social" aria-label="Facebook de Aurea" target="_blank" rel="noopener">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="${CONFIG.SOCIAL_LINKS.tiktok}" class="footer__social" aria-label="TikTok de Aurea" target="_blank" rel="noopener">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          <!-- Col 2: Colecciones -->
          <div>
            <h3 class="footer__col-title">Colecciones</h3>
            <ul style="list-style: none; padding: 0;">
              ${mainCategories.map(cat => `
                <li><a href="#/tienda/${cat.id}" class="footer__link">${cat.name}</a></li>
              `).join('')}
              ${complementary ? `<li><a href="#/tienda/${complementary.id}" class="footer__link">${complementary.name}</a></li>` : ''}
              <li><a href="#/tienda/ofertas" class="footer__link">Ofertas</a></li>
            </ul>
          </div>

          <!-- Col 3: Servicio al Cliente -->
          <div>
            <h3 class="footer__col-title">Atención al Cliente</h3>
            <ul style="list-style: none; padding: 0;">
              <li><a href="#/tienda" class="footer__link">Guía de Tallas y Medidas</a></li>
              <li><a href="#/tienda" class="footer__link">Cuidado de tus Joyas</a></li>
              <li><a href="#/tienda" class="footer__link">Políticas de Envío y Devolución</a></li>
              <li><a href="#/checkout" class="footer__link">Cómo comprar por WhatsApp</a></li>
              <li><a href="#/favoritos" class="footer__link">Mis Favoritos</a></li>
            </ul>
          </div>

          <!-- Col 4: Contacto & Envíos -->
          <div>
            <h3 class="footer__col-title">Contacto & Envíos</h3>
            <p class="footer__brand-desc" style="margin-bottom: 8px;">
              <strong>Envíos a toda Colombia:</strong> Bogotá, Medellín, Cali, Barranquilla, Bucaramanga y municipios.
            </p>
            <p class="footer__brand-desc" style="margin-bottom: 8px;">
              <strong>Garantía:</strong> Materiales hipoalergénicos y acabados de alta calidad.
            </p>
            <p class="footer__brand-desc">
              <strong>Email:</strong> ${CONFIG.CONTACT.email}
            </p>
          </div>
        </div>

        <div class="footer__bottom">
          <p class="footer__copy">
            &copy; 2026 ${CONFIG.BRAND_NAME} — Joyería & Accesorios. Todos los derechos reservados.
          </p>
          <p class="footer__copy" style="margin-top: 4px; font-size: 0.72rem;">
            * Catálogo de referencia. Precios, materiales y disponibilidad sujetos a confirmación por WhatsApp.
          </p>
          <span class="footer__demo-notice">
            Envío gratis nacional en compras superiores a $200.000 COP
          </span>
        </div>
      </div>
    </footer>
  `;
}
