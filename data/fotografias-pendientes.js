/**
 * ============================================================
 * AUREA — Registro de Fotografías Pendientes (Etapa 3)
 * ============================================================
 * Este archivo documenta qué productos del catálogo activo
 * requieren una fotografía profesional nueva o de reemplazo.
 * 
 * ⚠️ IMPORTANTE: No se disponía de herramienta de generación
 * de imágenes al momento de este registro. Por tanto:
 * - No se inventaron rutas de imagen.
 * - No se usaron imágenes aleatorias de Internet.
 * - No se sustituyó ninguna fotografía incorrecta por otra
 *   que tampoco correspondiera.
 * - Los archivos de imagen existentes se conservan tal cual.
 *
 * El propietario debe revisar las imágenes actuales en
 * https://pagina-joyeria-aurea.vercel.app/ y reemplazar
 * aquellas que no cumplan el estándar profesional.
 * ============================================================

export const FOTOGRAFIAS_PENDIENTES = [
  // 1. MANILLAS TEJIDAS (4 activas)
  { id: 1, name: 'Manilla Tejida Negra con Balines de Oro', category: 'manillas-tejidas', image: 'assets/images/products/prod-01-manilla-tejida-negra-balines.jpg', estado: 'pendiente de verificación profesional' },
  { id: 2, name: 'Manilla Tejida Roja con Balines de Oro', category: 'manillas-tejidas', image: 'assets/images/products/prod-02-manilla-tejida-roja-balines.jpg', estado: 'pendiente de verificación profesional' },
  { id: 3, name: 'Manilla Tejida con Medalla San Benito', category: 'manillas-tejidas', image: 'assets/images/products/prod-03-manilla-medalla-san-benito.jpg', estado: 'pendiente de verificación profesional' },
  { id: 4, name: 'Manilla Tejida con Placa Personalizable', category: 'manillas-tejidas', image: 'assets/images/products/prod-04-manilla-placa-personalizable.jpg', estado: 'pendiente de verificación profesional' },

  // 2. PULSERAS (2 activas tras retiro de id 6)
  { id: 5, name: 'Pulsera de Balines en Oro', category: 'pulseras', image: 'assets/images/products/prod-05-pulsera-balines-oro.jpg', estado: 'pendiente de verificación profesional' },
  { id: 7, name: 'Pulsera Lisa Tipo Esclava', category: 'pulseras', image: 'assets/images/products/prod-07-pulsera-lisa-esclava.jpg', estado: 'pendiente de verificación profesional' },

  // 3. PULSOS (3 activos)
  { id: 8, name: 'Pulso de Caña Rígida en Oro', category: 'pulsos', image: 'assets/images/products/prod-08-pulso-cana-rigida.jpg', estado: 'pendiente de verificación profesional' },
  { id: 9, name: 'Pulso Tejido Fígaro', category: 'pulsos', image: 'assets/images/products/prod-09-pulso-tejido-figaro.jpg', estado: 'pendiente de verificación profesional' },
  { id: 10, name: 'Pulso de Eslabones Clásicos', category: 'pulsos', image: 'assets/images/products/prod-10-pulso-eslabones-clasicos.jpg', estado: 'pendiente de verificación profesional' },

  // 4. ARETES TRADICIONALES (2 activos tras retiro de id 13)
  { id: 11, name: 'Candongas Lisas Medianas', category: 'aretes-tradicionales', image: 'assets/images/products/prod-11-candongas-lisas-medianas.jpg', estado: 'pendiente de verificación profesional' },
  { id: 12, name: 'Candongas Texturizadas Diamantadas', category: 'aretes-tradicionales', image: 'assets/images/products/prod-12-candongas-texturizadas-diamantadas.jpg', estado: 'pendiente de verificación profesional' },

  // 5. TOPITOS (3 activos)
  { id: 14, name: 'Topitos de Bolita Clásicos', category: 'topitos', image: 'assets/images/products/prod-14-topitos-bolita-clasicos.jpg', estado: 'pendiente de verificación profesional' },
  { id: 15, name: 'Topitos con Circonia Central', category: 'topitos', image: 'assets/images/products/prod-15-topitos-circonia-central.jpg', estado: 'pendiente de verificación profesional' },
  { id: 16, name: 'Topitos con Diseño Tradicional', category: 'topitos', image: 'assets/images/products/prod-16-topitos-diseno-tradicional.jpg', estado: 'pendiente de verificación profesional' },

  // 6. CADENAS (7 activos)
  { id: 17, name: 'Cadena Tejido Cartier en Oro Nacional', category: 'cadenas', image: 'assets/images/products/prod-17-cadena-tjdio-cartier.jpg', estado: 'pendiente de verificación profesional' },
  { id: 18, name: 'Cadena Tejido Fígaro 3x1 en Oro Nacional', category: 'cadenas', image: 'assets/images/products/prod-18-cadena-figaro-3x1.jpg', estado: 'pendiente de verificación profesional' },
  { id: 19, name: 'Cadena Singapur Diamantada en Oro Nacional', category: 'cadenas', image: 'assets/images/products/prod-19-cadena-singapur-diamantada.jpg', estado: 'pendiente de verificación profesional' },
  { id: 20, name: 'Cadena Barbada Tradicional en Oro Nacional', category: 'cadenas', image: 'assets/images/products/prod-20-cadena-barbada-tradicional.jpg', estado: 'pendiente de verificación profesional' },
  { id: 21, name: 'Cadena Espartillo en Oro Nacional', category: 'cadenas', image: 'assets/images/products/prod-21-cadena-espartillo.jpg', estado: 'pendiente de verificación profesional' },
  { id: 22, name: 'Cadena Chinesca Tradicional en Oro Nacional', category: 'cadenas', image: 'assets/images/products/prod-22-cadena-chinesca-tradicional.jpg', estado: 'pendiente de verificación profesional' },
  { id: 23, name: 'Cadena Espejo en Oro Nacional', category: 'cadenas', image: 'assets/images/products/prod-23-cadena-espejo.jpg', estado: 'pendiente de verificación profesional' },

  // 7. JOYERÍA (2 activos tras retiro de id 25)
  { id: 24, name: 'Rosario Clásico en Oro Nacional', category: 'joyeria', image: 'assets/images/products/prod-24-rosario-clasico.jpg', estado: 'pendiente de verificación profesional' },
  { id: 26, name: 'Gargantilla Artesanal en Oro Nacional', category: 'joyeria', image: 'assets/images/products/prod-26-gargantilla-artesanal.jpg', estado: 'pendiente de verificación profesional' },

  // 8. DIJES (4 activos tras retiro de ids 29, 31, 32)
  { id: 27, name: 'Dije Virgen María en Oro', category: 'dijes', image: 'assets/images/products/prod-27-dije-virgen-maria.jpg', estado: 'pendiente de verificación profesional' },
  { id: 28, name: 'Dije Medalla San Benito', category: 'dijes', image: 'assets/images/products/prod-28-dije-medalla-san-benito.jpg', estado: 'pendiente de verificación profesional' },
  { id: 30, name: 'Dije Medalla Milagrosa', category: 'dijes', image: 'assets/images/products/prod-30-dije-medalla-milagrosa.jpg', estado: 'pendiente de verificación profesional' },

  // 9. ANILLOS (4 activos)
  { id: 33, name: 'Anillo Solitario Clásico', category: 'anillos', image: 'assets/images/products/prod-33-anillo-solitario-clasico.jpg', estado: 'pendiente de verificación profesional' },
  { id: 34, name: 'Anillo Tipo Sello en Oro', category: 'anillos', image: 'assets/images/products/prod-34-anillo-tipo-sello.jpg', estado: 'pendiente de verificación profesional' },
  { id: 35, name: 'Anillo Solitario con Detalle Central', category: 'anillos', image: 'assets/images/products/prod-35-anillo-detalle-oro.jpg', estado: 'pendiente de verificación profesional' },
  { id: 36, name: 'Argolla Clásica de Matrimonio', category: 'anillos', image: 'assets/images/products/prod-36-argolla-matrimonio.jpg', estado: 'pendiente de verificación profesional' },

  // 10. TOBILLERAS (1 activo tras retiro de id 38)
  { id: 37, name: 'Tobillera Cadena Fina con Balines', category: 'tobilleras', image: 'assets/images/products/prod-37-tobillera-cadena-fina-balines.jpg', estado: 'pendiente de verificación profesional' },
];

export const TOTAL_PRODUCTOS_ACTIVOS = 31;
export const TOTAL_FOTOGRAFIAS_PENDIENTES = FOTOGRAFIAS_PENDIENTES.length;

/**
 * Nota sobre generación de imágenes:
 * No se dispuso de herramienta de generación de imágenes.
 * El propietario debe proporcionar o encargar fotografías
 * profesionales para cada producto listado arriba, siguiendo
 * el estilo: fondo marfil/blanco cálido, iluminación profesional,
 * joyas sin deformar, sin marcas de agua, sin collages, color del
 * metal fiel a la fotografía.
 */
