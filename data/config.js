/**
 * ============================================================
 * AUREA — Joyería & Accesorios
 * Configuración general de la tienda
 * ============================================================
 * 
 * INSTRUCCIONES:
 * - Cambia BRAND_NAME para actualizar el nombre en todo el sitio.
 * - Configura WHATSAPP_NUMBER con el número real (con código de país).
 * - Ajusta SHIPPING_COST y FREE_SHIPPING_THRESHOLD según tu negocio.
 * - Modifica SOCIAL_LINKS con tus redes sociales reales.
 * ============================================================
 */

export const CONFIG = {
  /** Nombre de la marca — se usa en todo el sitio */
  BRAND_NAME: 'AUREA',
  BRAND_TAGLINE: 'Joyería & Accesorios',
  BRAND_FULL: 'AUREA — Joyería & Accesorios',

  /**
   * Número de WhatsApp para pedidos.
   * ⚠️ REFERENCIA — Aún no hay número real asignado.
   * El propietario debe reemplazar 'CONFIGURAR_NUMERO_AQUI'
   * con el número real de AUREA (formato: 573001234567,
   * sin espacios ni signos).
   * Mientras no se configure, los pedidos se preparan pero
   * no se pueden enviar realmente por WhatsApp.
   */
  WHATSAPP_NUMBER: 'CONFIGURAR_NUMERO_AQUI',

  /** Moneda */
  CURRENCY: 'COP',
  CURRENCY_SYMBOL: '$',
  CURRENCY_LOCALE: 'es-CO',

  /** Envío */
  SHIPPING_COST: 12000,
  FREE_SHIPPING_THRESHOLD: 200000,

  /** Redes sociales — reemplazar con URLs reales */
  SOCIAL_LINKS: {
    instagram: '#configurar-instagram',
    facebook: '#configurar-facebook',
    tiktok: '#configurar-tiktok',
    pinterest: '#configurar-pinterest',
  },

  /** Contacto — reemplazar con datos reales */
  CONTACT: {
    email: 'Configurar email',
    phone: 'Configurar teléfono',
    address: 'Configurar dirección',
    city: 'Colombia',
  },

  /** Colores del tema */
  COLORS: {
    black: '#111111',
    gold: '#C6A45C',
    ivory: '#F8F6F0',
    beige: '#E9E0D1',
    grayText: '#5C5C5C',
  },
};

/**
 * Formatea un precio en pesos colombianos.
 * @param {number} price - Precio como número entero
 * @returns {string} Precio formateado, ej: "$89.900 COP"
 */
export function formatPrice(price) {
  if (price == null) return '';
  return CONFIG.CURRENCY_SYMBOL + price.toLocaleString('es-CO') + ' ' + CONFIG.CURRENCY;
}

/**
 * Genera la URL de WhatsApp con el mensaje del pedido.
 * @param {string} message - Mensaje del pedido
 * @returns {string} URL de WhatsApp
 */
export function getWhatsAppURL(message) {
  const number = CONFIG.WHATSAPP_NUMBER;
  if (!number || number === 'CONFIGURAR_NUMERO_AQUI') {
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
