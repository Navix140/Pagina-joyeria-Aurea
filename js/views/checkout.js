/**
 * ============================================================
 * AUREA — Checkout View & WhatsApp Order Generator
 * Collects shipping details, validates customer input, and
 * generates an elegant WhatsApp order message in Colombian Pesos.
 * ============================================================
 */

import { CONFIG, formatPrice, getWhatsAppURL } from '../../data/config.js';
import { getCart, getCartTotal, getCartCount, clearCart } from '../store.js';
import { showToast } from '../components/toast.js';

export function renderCheckoutView(container) {
  if (!container) return;

  const cart = getCart();
  const subtotal = getCartTotal();
  const shippingFree = subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD;
  const shipping = cart.length > 0 && !shippingFree ? CONFIG.SHIPPING_COST : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="header-spacer"></div>
      <div class="checkout section section--ivory">
        <div class="container">
          <div class="checkout__empty">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h1 style="font-size: 1.8rem; margin: 16px 0 8px;">Tu carrito está vacío</h1>
            <p>Agrega piezas a tu carrito para proceder con tu orden.</p>
            <a href="#/tienda" class="btn btn--primary" style="margin-top: 12px;">Ir a la tienda</a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="header-spacer"></div>
    <div class="checkout section section--ivory">
      <div class="container">
        <div class="section__header" style="margin-bottom: 32px;">
          <h1>Finalizar Pedido</h1>
          <p class="section__subtitle">Completa tus datos de entrega y coordinaremos tu pedido vía WhatsApp</p>
        </div>

        <div class="checkout__layout">
          <!-- Left: Order Form -->
          <div class="checkout__form-section">
            <h2 class="checkout__form-title">Datos de Entrega</h2>

            <form id="checkout-form" novalidate>
              <div class="checkout__field">
                <label class="checkout__label" for="order-name">
                  Nombre completo <span>*</span>
                </label>
                <input
                  type="text"
                  id="order-name"
                  class="checkout__input"
                  placeholder="Ej: Carolina Martínez"
                  required
                />
                <div class="checkout__error-msg" id="error-order-name" style="display: none;">Por favor ingresa tu nombre</div>
              </div>

              <div class="checkout__field">
                <label class="checkout__label" for="order-phone">
                  Teléfono / Celular WhatsApp <span>*</span>
                </label>
                <input
                  type="tel"
                  id="order-phone"
                  class="checkout__input"
                  placeholder="Ej: 300 123 4567"
                  required
                />
                <div class="checkout__error-msg" id="error-order-phone" style="display: none;">Por favor ingresa un número de teléfono válido</div>
              </div>

              <div class="checkout__field">
                <label class="checkout__label" for="order-city">
                  Ciudad y Departamento <span>*</span>
                </label>
                <input
                  type="text"
                  id="order-city"
                  class="checkout__input"
                  placeholder="Ej: Medellín, Antioquia"
                  required
                />
                <div class="checkout__error-msg" id="error-order-city" style="display: none;">Por favor ingresa la ciudad y departamento</div>
              </div>

              <div class="checkout__field">
                <label class="checkout__label" for="order-address">
                  Dirección de entrega (calle, número, apto/torre) <span>*</span>
                </label>
                <input
                  type="text"
                  id="order-address"
                  class="checkout__input"
                  placeholder="Ej: Calle 10 # 20-30 Apto 402, Edificio Los Rosales"
                  required
                />
                <div class="checkout__error-msg" id="error-order-address" style="display: none;">Por favor ingresa tu dirección de entrega</div>
              </div>

              <div class="checkout__field">
                <label class="checkout__label" for="order-payment">
                  Método de pago preferido <span>*</span>
                </label>
                <select id="order-payment" class="checkout__input" style="cursor: pointer;">
                  <option value="Transferencia Bancolombia">Transferencia Bancolombia / Nequi</option>
                  <option value="Daviplata">Daviplata</option>
                  <option value="Contra Entrega">Contra Entrega (pago al recibir en ciudades principales)</option>
                  <option value="Link de Pago PSE / Tarjeta">Link de pago PSE o Tarjeta de Crédito</option>
                </select>
              </div>

              <div class="checkout__field">
                <label class="checkout__label" for="order-notes">
                  Notas adicionales o mensaje para regalo (opcional)
                </label>
                <textarea
                  id="order-notes"
                  class="checkout__input checkout__textarea"
                  placeholder="Ej: Empacar para regalo de cumpleaños con dedicatoria..."
                ></textarea>
              </div>

              <div style="background: rgba(198,164,92,0.1); border-left: 3px solid var(--gold); padding: 14px 18px; border-radius: var(--radius-sm); margin: 24px 0;">
                <p style="margin: 0; font-size: 0.88rem; color: var(--black);">
                  <strong>✨ Proceso 100% seguro:</strong> Al dar clic en "Enviar pedido por WhatsApp", se generará un mensaje automático con el detalle de tus joyas. Nuestro equipo de AUREA confirmará disponibilidad y te enviará los datos de pago inmediatamente.
                </p>
              </div>

              <button type="submit" class="btn btn--whatsapp btn--full" style="padding: 16px; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 10px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.12-.519-1.572-.65-2.613-2.24-2.693-2.346-.08-.106-.653-.87-.653-1.66 0-.79.412-1.18.558-1.341.144-.162.316-.202.423-.202.106 0 .213.003.305.008.098.005.23-.037.36.275.133.32.455 1.108.495 1.189.04.081.066.175.013.281-.053.106-.08.173-.16.266-.08.093-.169.208-.241.279-.08.08-.163.167-.07.327.093.16 4.14 6.74 3.75 7.15z"/>
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.528 5.327L2 22l4.823-1.503A9.972 9.972 0 0 0 12.012 22c5.506 0 9.988-4.478 9.988-9.984A9.986 9.986 0 0 0 12.012 2zm0 18.232a8.232 8.232 0 0 1-4.2-1.151l-.302-.179-3.125.975.986-3.048-.198-.315A8.204 8.204 0 0 1 3.78 11.984C3.782 7.45 7.478 3.768 12.012 3.768c2.2 0 4.269.857 5.823 2.413a8.188 8.188 0 0 1 2.408 5.803c-.001 4.534-3.697 8.248-8.231 8.248z"/>
                </svg>
                Confirmar Pedido vía WhatsApp
              </button>
            </form>
          </div>

          <!-- Right: Order Summary -->
          <div class="checkout__summary">
            <h2 class="checkout__summary-title">Resumen de tu Compra (${getCartCount()})</h2>
            
            <div class="checkout__summary-items" style="max-height: 280px; overflow-y: auto; margin-bottom: 16px;">
              ${cart.map(item => `
                <div class="checkout__summary-item">
                  <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                    style="width: 44px; height: 44px; object-fit: cover; border-radius: 4px; margin-right: 12px; flex-shrink: 0;"
                  />
                  <div class="checkout__summary-item-name">
                    <div style="font-weight: 500;">${escapeHTML(item.name)}</div>
                    ${item.variant ? `<div style="font-size: 0.75rem; color: var(--gray-text);">${escapeHTML(item.variant)}</div>` : ''}
                  </div>
                  <div class="checkout__summary-item-qty">${item.qty}x</div>
                  <div class="checkout__summary-item-price">${formatPrice(item.price * item.qty)}</div>
                </div>
              `).join('')}
            </div>

            <div class="checkout__summary-totals">
              <div class="checkout__summary-row">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <div class="checkout__summary-row" style="color: var(--gray-text);">
                <span>Envío</span>
                <span>${shippingFree ? '<strong style="color: var(--green);">¡Envío Gratis!</strong>' : formatPrice(shipping)}</span>
              </div>
              ${!shippingFree ? `
                <div style="font-size: 0.78rem; color: var(--gold-dark); margin: 4px 0 8px;">
                  * Envío gratis para compras superiores a ${formatPrice(CONFIG.FREE_SHIPPING_THRESHOLD)}
                </div>
              ` : ''}
              <div class="checkout__summary-row checkout__summary-row--total">
                <span>Total a Pagar</span>
                <span>${formatPrice(total)}</span>
              </div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--beige); font-size: 0.8rem; color: var(--gray-text);">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Garantía de satisfacción y calidad AUREA</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span>Envíos rápidos y asegurados a toda Colombia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- WhatsApp Order Confirmation / Fallback Modal -->
    <div id="whatsapp-modal" class="modal-overlay"></div>
  `;

  bindCheckoutEvents(cart, subtotal, shipping, total);
}

function bindCheckoutEvents(cart, subtotal, shipping, total) {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('order-name');
    const phoneInput = document.getElementById('order-phone');
    const cityInput = document.getElementById('order-city');
    const addressInput = document.getElementById('order-address');
    const paymentInput = document.getElementById('order-payment');
    const notesInput = document.getElementById('order-notes');

    let isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
      nameInput.classList.add('checkout__input--error');
      document.getElementById('error-order-name').style.display = 'block';
      isValid = false;
    } else {
      nameInput.classList.remove('checkout__input--error');
      document.getElementById('error-order-name').style.display = 'none';
    }

    // Validate phone
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
      phoneInput.classList.add('checkout__input--error');
      document.getElementById('error-order-phone').style.display = 'block';
      isValid = false;
    } else {
      phoneInput.classList.remove('checkout__input--error');
      document.getElementById('error-order-phone').style.display = 'none';
    }

    // Validate city
    if (!cityInput.value.trim()) {
      cityInput.classList.add('checkout__input--error');
      document.getElementById('error-order-city').style.display = 'block';
      isValid = false;
    } else {
      cityInput.classList.remove('checkout__input--error');
      document.getElementById('error-order-city').style.display = 'none';
    }

    // Validate address
    if (!addressInput.value.trim()) {
      addressInput.classList.add('checkout__input--error');
      document.getElementById('error-order-address').style.display = 'block';
      isValid = false;
    } else {
      addressInput.classList.remove('checkout__input--error');
      document.getElementById('error-order-address').style.display = 'none';
    }

    if (!isValid) {
      showToast('Por favor completa todos los campos requeridos', 'error');
      return;
    }

    const orderData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      city: cityInput.value.trim(),
      address: addressInput.value.trim(),
      payment: paymentInput.value,
      notes: notesInput.value.trim(),
      items: cart,
      subtotal,
      shipping,
      total,
    };

    handleOrderSubmission(orderData);
  });
}

/**
 * Builds formatted WhatsApp message text
 */
function buildWhatsAppMessage(order) {
  const lineItems = order.items.map(item => {
    const variantStr = item.variant ? ` (${item.variant})` : '';
    return `• ${item.qty}x ${item.name}${variantStr} - ${formatPrice(item.price * item.qty)}`;
  }).join('\n');

  const notesSection = order.notes ? `\n📝 *Notas o Dedicatoria:*\n${order.notes}\n` : '';

  return `✨ *NUEVO PEDIDO — ${CONFIG.BRAND_FULL}* ✨

Hola, deseo confirmar el siguiente pedido de joyería:

🛍️ *PIEZAS SELECCIONADAS:*
${lineItems}

💰 *TOTALES:*
• Subtotal: ${formatPrice(order.subtotal)}
• Envío: ${order.shipping === 0 ? '¡Gratis!' : formatPrice(order.shipping)}
• *TOTAL A PAGAR: ${formatPrice(order.total)}*

📍 *DATOS DE ENTREGA:*
• *Nombre:* ${order.name}
• *Teléfono:* ${order.phone}
• *Ciudad:* ${order.city}
• *Dirección:* ${order.address}
• *Método de pago:* ${order.payment}
${notesSection}
Quedo atento(a) a sus datos para completar el pago y coordinar el despacho. ¡Muchas gracias!`;
}

/**
 * Handles sending WhatsApp message or showing provisional setup modal
 */
function handleOrderSubmission(order) {
  const message = buildWhatsAppMessage(order);
  const waNumber = CONFIG.WHATSAPP_NUMBER;

  // Check if WhatsApp number is provisional
  const isProvisional = !waNumber || waNumber === 'CONFIGURAR_NUMERO_AQUI';

  showOrderModal(order, message, isProvisional);
}

function showOrderModal(order, message, isProvisional) {
  const modal = document.getElementById('whatsapp-modal');
  if (!modal) return;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = isProvisional
    ? `https://wa.me/?text=${encodedMessage}`
    : `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;

  modal.innerHTML = `
    <div class="modal" style="grid-template-columns: 1fr; max-width: 640px;">
      <button class="modal__close" id="btn-close-wa-modal" aria-label="Cerrar">&times;</button>
      <div class="modal__content" style="padding: 32px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(37,211,102,0.1); color: var(--green); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.12-.519-1.572-.65-2.613-2.24-2.693-2.346-.08-.106-.653-.87-.653-1.66 0-.79.412-1.18.558-1.341.144-.162.316-.202.423-.202.106 0 .213.003.305.008.098.005.23-.037.36.275.133.32.455 1.108.495 1.189.04.081.066.175.013.281-.053.106-.08.173-.16.266-.08.093-.169.208-.241.279-.08.08-.163.167-.07.327.093.16 4.14 6.74 3.75 7.15z"/>
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.528 5.327L2 22l4.823-1.503A9.972 9.972 0 0 0 12.012 22c5.506 0 9.988-4.478 9.988-9.984A9.986 9.986 0 0 0 12.012 2zm0 18.232a8.232 8.232 0 0 1-4.2-1.151l-.302-.179-3.125.975.986-3.048-.198-.315A8.204 8.204 0 0 1 3.78 11.984C3.782 7.45 7.478 3.768 12.012 3.768c2.2 0 4.269.857 5.823 2.413a8.188 8.188 0 0 1 2.408 5.803c-.001 4.534-3.697 8.248-8.231 8.248z"/>
            </svg>
          </div>
          <h2 style="font-size: 1.5rem; margin-bottom: 6px;">¡Mensaje de Pedido Listo!</h2>
          <p style="color: var(--gray-text); font-size: 0.9rem;">
            Total del pedido: <strong>${formatPrice(order.total)}</strong> (${order.items.length} ${order.items.length === 1 ? 'joya' : 'joyas'})
          </p>
        </div>

        ${isProvisional ? `
          <div style="background: rgba(212,183,106,0.15); border: 1px solid var(--gold); border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 16px; font-size: 0.85rem;">
            <strong>⚙️ Configuración Provisional Identificada:</strong><br>
            El número oficial de WhatsApp de AUREA aún está marcado como <code>CONFIGURAR_NUMERO_AQUI</code> en <code>data/config.js</code>.
            Puedes abrir WhatsApp para elegir el contacto o copiar el texto generado para enviarlo.
          </div>
        ` : ''}

        <div style="margin-bottom: 16px;">
          <label style="font-size: 0.85rem; font-weight: 600; color: var(--gray-text); display: block; margin-bottom: 6px;">
            Vista previa del mensaje a enviar:
          </label>
          <textarea
            id="wa-preview-text"
            readonly
            style="width: 100%; height: 160px; font-family: monospace; font-size: 0.85rem; padding: 12px; border: 1px solid var(--beige); border-radius: var(--radius-sm); background: var(--ivory); resize: none;"
          >${escapeHTML(message)}</textarea>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a
            href="${whatsappUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--whatsapp btn--full"
            id="btn-open-wa"
            style="flex: 1; min-width: 200px; text-align: center; text-decoration: none;"
          >
            Abrir en WhatsApp
          </a>
          <button
            class="btn btn--outline btn--dark"
            id="btn-copy-msg"
            style="flex: 1; min-width: 160px;"
          >
            Copiar Mensaje
          </button>
        </div>

        <div style="text-align: center; margin-top: 16px;">
          <button id="btn-finish-clear" style="font-size: 0.85rem; color: var(--gray-text); text-decoration: underline; cursor: pointer;">
            Vaciar carrito y volver a la tienda
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('modal-overlay--open');
  document.body.classList.add('no-scroll');

  // Close handlers
  const closeModal = () => {
    modal.classList.remove('modal-overlay--open');
    document.body.classList.remove('no-scroll');
  };

  const closeBtn = document.getElementById('btn-close-wa-modal');
  if (closeBtn) closeBtn.onclick = closeModal;

  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  // Copy button
  const copyBtn = document.getElementById('btn-copy-msg');
  if (copyBtn) {
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(message);
        copyBtn.textContent = '¡Copiado con éxito!';
        showToast('Mensaje copiado al portapapeles', 'success');
        setTimeout(() => { copyBtn.textContent = 'Copiar Mensaje'; }, 3000);
      } catch {
        const textarea = document.getElementById('wa-preview-text');
        if (textarea) {
          textarea.select();
          document.execCommand('copy');
          showToast('Mensaje copiado al portapapeles', 'success');
        }
      }
    };
  }

  // Open WA button
  const openWaBtn = document.getElementById('btn-open-wa');
  if (openWaBtn) {
    openWaBtn.addEventListener('click', () => {
      showToast('Abriendo WhatsApp para completar tu pedido...', 'info');
    });
  }

  // Clear cart and finish
  const finishBtn = document.getElementById('btn-finish-clear');
  if (finishBtn) {
    finishBtn.onclick = () => {
      clearCart();
      closeModal();
      window.location.hash = '#/tienda';
      showToast('¡Gracias por tu compra! Tu carrito ha sido reiniciado', 'success');
    };
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
