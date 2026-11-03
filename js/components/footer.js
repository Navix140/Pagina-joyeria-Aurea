/**
 * ============================================================
 * AUREA — Footer Component
 * Brand information, category links, guarantees, social links,
 * and copyright notice in COP currency.
 * ============================================================
 */

import { CONFIG } from '../../data/config.js';
import { CATEGORIES } from '../../data/products.js';

export function renderFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;

  root.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <!-- Col 1: Brand Info -->
          <div>
            <div class="footer__brand-name">${CONFIG.BRAND_NAME}</div>
            <p class="footer__brand-desc">
              Piezas atemporales y exclusivas inspiradas en la tradición orfebre colombiana. Joyería fina y accesorios elaborados con altos estándares de calidad y detalle artesanal.
            </p>
            <div class="footer__socials">
              <a href="${CONFIG.SOCIAL_LINKS.instagram}" class="footer__social" aria-label="Instagram de Aurea" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="${CONFIG.SOCIAL_LINKS.facebook}" class="footer__social" aria-label="Facebook de Aurea" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="${CONFIG.SOCIAL_LINKS.tiktok}" class="footer__social" aria-label="TikTok de Aurea" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          <!-- Col 2: Colecciones -->
          <div>
            <h3 class="footer__col-title">Colecciones</h3>
            <ul style="list-style: none; padding: 0;">
              <li><a href="#/tienda/manillas-tejidas" class="footer__link">Manillas Tejidas</a></li>
              <li><a href="#/tienda/pulseras" class="footer__link">Pulseras (Balines, Diamantadas, Lisas)</a></li>
              <li><a href="#/tienda/pulsos" class="footer__link">Pulsos de Oro</a></li>
              <li><a href="#/tienda/aretes-tradicionales" class="footer__link">Aretes Tradicionales</a></li>
              <li><a href="#/tienda/topitos" class="footer__link">Topitos de Oro</a></li>
              <li><a href="#/tienda/cadenas" class="footer__link">Cadenas (Nacional e Italiano)</a></li>
              <li><a href="#/tienda/joyeria" class="footer__link">Joyería Fina</a></li>
              <li><a href="#/tienda/dijes" class="footer__link">Dijes y Medallas</a></li>
              <li><a href="#/tienda/anillos" class="footer__link">Anillos</a></li>
              <li><a href="#/tienda/tobilleras" class="footer__link">Tobilleras (Complementaria)</a></li>
              <li><a href="#/tienda/ofertas" class="footer__link">Ofertas Especiales</a></li>
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
            <h3 class="footer__col-title">Envíos & Seguridad</h3>
            <p class="footer__brand-desc" style="margin-bottom: 8px;">
              📦 <strong>Envíos a toda Colombia:</strong> Bogotá, Medellín, Cali, Barranquilla, Bucaramanga y municipios.
            </p>
            <p class="footer__brand-desc" style="margin-bottom: 8px;">
              💎 <strong>Garantía:</strong> Materiales hipoalergénicos y resistentes al agua.
            </p>
            <p class="footer__brand-desc">
              ✉️ ${CONFIG.CONTACT.email}
            </p>
          </div>
        </div>

        <div class="footer__bottom">
          <p class="footer__copy">
            &copy; 2026 ${CONFIG.BRAND_NAME} — Joyería & Accesorios. Todos los derechos reservados. Precios en Pesos Colombianos (COP).
          </p>
          <p class="footer__copy" style="margin-top: 4px; font-size: 0.78rem; opacity: 0.85;">
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
