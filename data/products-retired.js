/**
 * ============================================================
 * AUREA — Productos retirados del catálogo activo (Etapa 2)
 * ============================================================
 * RESPALDO DE SEGURIDAD: Estos productos fueron retirados del
 * catálogo activo (data/products.js) por no cumplir los criterios
 * de coherencia fotográfica y comercial definidos para AUREA.
 * 
 * Conservados aquí para poder recuperarlos si es necesario.
 * No se borró definitivamente la información original.
 * ============================================================
 */

export const RETIRED_PRODUCTS = [
  {
    id: 6,
    name: 'Pulsera Singapur Diamantada',
    category: 'pulseras',
    subcategory: 'diamantadas',
    goldType: 'nacional',
    price: 245000,
    oldPrice: null,
    description: 'Tejido helicoidal con facetas diamantadas que capturan la luz en cada movimiento creando destellos brillantes y continuos.',
    material: 'Oro nacional, quilataje por confirmar',
    availability: 'En stock',
    tags: ['nuevo'],
    variants: ['17 cm', '18 cm'],
    images: [
      'assets/images/products/prod-06-pulsera-singapur-diamantada.jpg',
    ],
    popularity: 89,
    dateAdded: '2026-10-05',
    retiredReason: 'Fotografía no disponible / pendiente de verificación de correspondencia con el producto',
    retiredDate: '2026-11-08',
  },
  {
    id: 13,
    name: 'Aretes Colgantes Tipo Gota',
    category: 'aretes-tradicionales',
    subcategory: null,
    goldType: 'nacional',
    price: 240000,
    oldPrice: null,
    description: 'Diseño colgante con silueta de lágrima en oro estilizado y movimiento grácil al andar, perfecto para eventos especiales.',
    material: 'Oro nacional, quilataje por confirmar',
    availability: 'En stock',
    tags: ['elegante'],
    variants: ['Largo 3.5 cm'],
    images: [
      'assets/images/products/prod-13-aretes-colgantes-gota.jpg',
    ],
    popularity: 80,
    dateAdded: '2026-10-15',
    retiredReason: 'Fotografía no disponible / pendiente de verificación de correspondencia con el producto',
    retiredDate: '2026-11-08',
  },
  {
    id: 25,
    name: 'Camándula Tradicional en Oro Nacional',
    category: 'joyeria',
    subcategory: null,
    goldType: 'nacional',
    price: 460000,
    oldPrice: null,
    description: 'Pieza representativa de la devoción y orfebrería colombiana con eslabones finos, cuentas esféricas y caída armoniosa.',
    material: 'Oro nacional, quilataje por confirmar',
    availability: 'En stock',
    tags: ['tradicion'],
    variants: ['Longitud 45 cm', 'Longitud 50 cm'],
    images: [
      'assets/images/products/prod-25-camandula-tradicional.jpg',
    ],
    popularity: 88,
    dateAdded: '2026-10-06',
    retiredReason: 'Fotografía no disponible / pendiente de verificación de correspondencia con el producto',
    retiredDate: '2026-11-08',
  },
  {
    id: 32,
    name: 'Dije Letra Inicial en Oro',
    category: 'dijes',
    subcategory: null,
    goldType: 'nacional',
    price: 135000,
    oldPrice: null,
    description: 'Tipografía cursiva elegante con acabado pulido para llevar la inicial personal o de un ser querido.',
    material: 'Oro nacional, quilataje por confirmar',
    availability: 'En stock',
    tags: ['personalizable'],
    variants: ['Inicial A - Z'],
    images: [
      'assets/images/products/prod-32-dije-letra-inicial.jpg',
    ],
    popularity: 78,
    dateAdded: '2026-10-20',
    retiredReason: 'Fotografía no disponible / pendiente de verificación de correspondencia con el producto',
    retiredDate: '2026-11-08',
  },
  {
    id: 38,
    name: 'Tobillera Doble Cadena con Dijes Sutiles',
    category: 'tobilleras',
    subcategory: null,
    goldType: 'nacional',
    price: 230000,
    oldPrice: null,
    description: 'Diseño en cascada de dos hebras finas de oro nacional con pequeños colgantes de brillo dinámico y broche reasa.',
    material: 'Oro nacional, quilataje por confirmar',
    availability: 'En stock',
    tags: ['nuevo'],
    variants: ['23 cm + 3 cm extensión'],
    images: [
      'assets/images/products/prod-38-tobillera-doble-cadena-dijes.jpg',
    ],
    popularity: 74,
    dateAdded: '2026-10-14',
    retiredReason: 'Fotografía no disponible / pendiente de verificación de correspondencia con el producto',
    retiredDate: '2026-11-08',
  },
];

export const RETIRED_PRODUCT_IDS = RETIRED_PRODUCTS.map(p => p.id);
