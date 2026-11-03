# AUREA — Joyería & Accesorios

<div align="center">

![AUREA Banner](https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=400&fit=crop&q=80)

**Tienda virtual de joyería y orfebrería colombiana.**  
*Piezas tradicionales y contemporáneas en oro nacional y accesorios finos.*

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B%20Modules-F7DF1E?logo=javascript&logoColor=black)](#tecnolog%C3%ADas-empleadas)
[![HTML5](https://img.shields.io/badge/HTML5-Sem%C3%A1ntico-E34F26?logo=html5&logoColor=white)](#tecnolog%C3%ADas-empleadas)
[![CSS3](https://img.shields.io/badge/CSS3-Modern%20Grid%20%26%20Flex-1572B6?logo=css3&logoColor=white)](#tecnolog%C3%ADas-empleadas)
[![Responsive](https://img.shields.io/badge/Dise%C3%B1o-100%25%20Responsive-brightgreen)](#caracter%C3%ADsticas-principales)
[![Currency](https://img.shields.io/badge/Moneda-COP%20(%24)-C6A45C)](#configuraci%C3%B3n-del-negocio)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Integraci%C3%B3n%20de%20Pedidos-25D366?logo=whatsapp&logoColor=white)](#pedidos-y-checkout-v%C3%ADa-whatsapp)

[Descripción](#descripción-del-proyecto) •
[Características](#características-principales) •
[Estructura](#estructura-del-catálogo) •
[Arquitectura](#estructura-del-proyecto) •
[Instalación](#cómo-ejecutar-el-proyecto) •
[Configuración](#configuración-del-negocio) •
[Despliegue](#despliegue-en-producción)

</div>

---

## Descripción del Proyecto

AUREA es una plataforma de comercio electrónico diseñada para brindar una experiencia de compra distinguida, sobria y fluida, inspirada en la joyería y orfebrería tradicional colombiana. Su identidad visual combina tonalidades negro profundo (`#111111`), dorados cálidos (`#C6A45C`) y marfil (`#F8F6F0`).

El sistema está desarrollado íntegramente en Vanilla JavaScript moderno (ES Modules), sin dependencias externas ni frameworks pesados, garantizando una carga rápida, compatibilidad universal en dispositivos móviles y de escritorio, y facilidad de mantenimiento.

---

## Características Principales

### Catálogo y Navegación
- **10 Categorías Especializadas**: 9 colecciones principales y 1 línea complementaria.
- **Buscador en Tiempo Real**: Búsqueda interactiva indexando nombre, descripción, material, subcategoría y tipo de oro.
- **Filtros Funcionales**:
  - Filtro por categoría y colecciones (*Novedades, Más Vendidos, En Oferta*).
  - Subfiltros contextuales por subcategoría (*balines, diamantadas, lisas* en pulseras) y por tipo de oro (*nacional*).
  - Selector de rango de precios en Pesos Colombianos (COP).
  - Ordenamiento dinámico: Popularidad, Menor precio, Mayor precio, Novedades y Alfabético.
  - Indicadores visuales de filtros activos con eliminación en un clic.
  - Panel lateral de filtros optimizado para dispositivos móviles.

### Ficha de Producto y Vista Rápida
- **Modal Interactivo**: Permite consultar especificaciones, variantes e imágenes sin abandonar la navegación.
- **Selector de Variantes**: Medidas, tallas y longitudes disponibles.
- **Detalle de Materiales**: Especificación clara orientada a orfebrería nacional.
- **Aviso de Referencia**: Leyenda informativa sobre confirmación de disponibilidad, materiales y precios finales vía WhatsApp.

### Carrito de Compras Lateral
- Panel deslizable accesible desde cualquier vista de la tienda.
- Control de cantidades, cálculo dinámico de subtotales y total general.
- Indicador de beneficio para envío gratuito nacional (umbral configurable de $200.000 COP).
- Persistencia local mediante `localStorage` para conservar la selección del cliente al recargar la página.

### Lista de Favoritos (Wishlist)
- Marcado de piezas favoritas desde tarjetas de producto, catálogo o modal de detalles.
- Vista independiente (`#/favoritos`) para gestionar los artículos guardados.
- Sincronización automática con almacenamiento local.

### Pedidos y Checkout vía WhatsApp
- Formulario de datos de entrega: nombre completo, teléfono de contacto, ciudad/departamento, dirección, método de pago sugerido y dedicatoria para regalo.
- Validación de campos obligatorios en el cliente.
- Generación automática de mensaje estructurado para WhatsApp con el resumen de piezas, subtotales, costo de envío y datos del cliente.
- Opción de copiado de mensaje en un clic para mayor facilidad de uso.

---

## Estructura del Catálogo

El catálogo de AUREA se organiza en 10 categorías temáticas con 38 referencias comerciales de orfebrería nacional:

| Categoría | Slug | Tipo / Subcategorías | Descripción |
| :--- | :--- | :--- | :--- |
| **Manillas tejidas** | `manillas-tejidas` | Macramé artesanal | Diseños en hilo trenzado con balines, medallas y placas en oro |
| **Pulseras** | `pulseras` | `balines`, `diamantadas`, `lisas` | Modelos de esferas doradas, tejidos helicoidales y cañas esclavas |
| **Pulsos** | `pulsos` | Estructuras rígidas y eslabones | Piezas de media caña, tejido Fígaro y eslabones tradicionales |
| **Aretes tradicionales** | `aretes-tradicionales` | Candongas y colgantes | Aros circulares lisos, grabados diamantados y gotas elegantes |
| **Topitos** | `topitos` | Broche mariposa a presión | Bolitas clásicas, circonia suiza y filigrana tradicional |
| **Cadenas** | `cadenas` | Oro nacional (`goldType: 'nacional'`) | Tejidos Cartier, Fígaro 3x1, Singapur, barbada, espartillo, chinesca y espejo |
| **Joyería** | `joyeria` | Oro nacional (`goldType: 'nacional'`) | Rosarios clásicos, camándulas devocionales y gargantillas de gala |
| **Dijes** | `dijes` | Medallas y figuras | Virgen María, San Benito, cruz clásica, milagrosa, corazón e iniciales |
| **Anillos** | `anillos` | Solitarios y argollas | Solitario clásico, anillo sello, gema verde estilo esmeralda y alianzas |
| **Tobilleras** *(Complementaria)* | `tobilleras` | Cadenas finas de tobillo | Modelos sutiles con balines y dijes colgantes |

---

## Estructura del Proyecto

```text
Pagina-Joyeria/
├── index.html                   # Estructura HTML principal y metaetiquetas SEO
├── iniciar_tienda.bat           # Script de inicio en local para entorno Windows
├── server.ps1                   # Servidor HTTP ligero nativo en PowerShell
├── README.md                    # Documentación del proyecto
│
├── css/
│   └── styles.css               # Estilos globales, variables CSS y diseño responsive
│
├── data/
│   ├── config.js                # Configuración de marca, contacto, envíos y WhatsApp
│   └── products.js              # Colección de categorías y catálogo de productos
│
└── js/
    ├── app.js                   # Inicialización y registro de rutas de la aplicación
    ├── router.js                # Enrutador cliente SPA basado en hash (#/tienda, #/checkout)
    ├── store.js                 # Gestor de estado reactivo (Pub/Sub) con persistencia en localStorage
    │
    ├── components/              # Componentes de interfaz de usuario
    │   ├── header.js            # Barra de navegación, enlaces de colecciones y buscador
    │   ├── hero.js              # Sección principal con banner panorámico
    │   ├── categories.js        # Cuadrícula de colecciones principales y complementarias
    │   ├── productCard.js       # Tarjeta modular de producto con precio y acciones
    │   ├── productModal.js      # Ventana modal de detalle del producto
    │   ├── productSections.js   # Secciones de inicio (Destacados, Nuevos, Más Vendidos, Ofertas)
    │   ├── cart.js              # Panel lateral de carrito de compras
    │   ├── search.js            # Buscador predictivo en vivo
    │   ├── toast.js             # Notificaciones de acción en pantalla
    │   └── footer.js            # Pie de página con información y enlaces
    │
    └── views/                   # Vistas principales de la tienda
        ├── home.js              # Página de inicio con beneficios, testimonios y preguntas frecuentes
        ├── shop.js              # Catálogo general con filtros dinámicos y aviso comercial
        ├── favorites.js         # Vista de productos guardados en favoritos
        └── checkout.js          # Formulario de despacho y enlace de pedido a WhatsApp
```

---

## Cómo Ejecutar el Proyecto

Al utilizar JavaScript ES Modules (`type="module"`), el navegador requiere que los archivos se sirvan mediante un servidor local bajo protocolo HTTP:

### Opción 1: En Windows mediante `iniciar_tienda.bat` (Recomendado)
Haz doble clic sobre el archivo `iniciar_tienda.bat`. Si no detecta Python ni Node.js, utilizará automáticamente el servidor nativo de PowerShell en el puerto `8080` y abrirá la tienda en tu navegador por defecto.

### Opción 2: Con Visual Studio Code (Live Server)
1. Abre la carpeta del proyecto en Visual Studio Code.
2. Instala la extensión **Live Server**.
3. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.

### Opción 3: Con Python
```bash
python -m http.server 8080
```
Luego abre en tu navegador: `http://localhost:8080/`.

### Opción 4: Con Node.js / npx
```bash
npx serve . -l 8080
```

---

## Configuración del Negocio

Los parámetros comerciales y de catálogo se administran en dos archivos ubicados en la carpeta `data/`:

### 1. Parámetros de Marca y WhatsApp (`data/config.js`)
Configura el número oficial de atención de tu joyería:

```javascript
export const CONFIG = {
  BRAND_NAME: 'AUREA',
  BRAND_TAGLINE: 'Joyería & Accesorios',

  // Número de WhatsApp con indicativo de país (57 para Colombia), sin espacios ni signos:
  WHATSAPP_NUMBER: '573001234567',

  CURRENCY: 'COP',
  SHIPPING_COST: 12000,              // Costo de despacho estándar
  FREE_SHIPPING_THRESHOLD: 200000,   // Monto mínimo para despacho gratuito

  SOCIAL_LINKS: {
    instagram: 'https://instagram.com/tu_cuenta',
    facebook: 'https://facebook.com/tu_cuenta',
    tiktok: 'https://tiktok.com/@tu_cuenta'
  },

  CONTACT: {
    email: 'contacto@aurea-joyeria.com'
  }
};
```

### 2. Catálogo de Referencias (`data/products.js`)
Cada producto contiene la estructura de datos compatible con los filtros de la tienda:

```javascript
{
  id: 1,
  name: 'Manilla Tejida Negra con Balines de Oro',
  category: 'manillas-tejidas',
  subcategory: null,               // 'balines' | 'diamantadas' | 'lisas' | null
  goldType: 'nacional',            // 'nacional' | 'italiano'
  price: 95000,                    // Precio en pesos colombianos (entero)
  oldPrice: 115000,                // Precio anterior o null
  description: 'Descripción orfebre de la pieza.',
  material: 'Oro nacional, quilataje por confirmar',
  availability: 'En stock',
  tags: ['nuevo', 'mas-vendido'],   // 'nuevo' | 'mas-vendido' | 'oferta'
  variants: ['Ajustable standard', 'Ajustable juvenil'],
  images: ['https://url-de-imagen.jpg'],
  popularity: 96,
  dateAdded: '2026-10-01'
}
```

---

## Despliegue en Producción

El proyecto es totalmente estático, por lo que puede alojarse de forma directa y gratuita en plataformas como:

### GitHub Pages
1. Sube tu repositorio a GitHub en la rama `main`.
2. En GitHub, navega a **Settings** > **Pages**.
3. En **Source**, selecciona **Deploy from a branch**, elige la rama `main` y la carpeta `/(root)`.
4. La tienda estará publicada en la URL proporcionada por GitHub Pages.

### Vercel / Netlify
1. Conecta el repositorio de GitHub en el panel de Vercel o Netlify.
2. No requiere comando de compilación (Build Command) ni carpeta de salida (Output Directory).
3. Selecciona **Deploy**.

---

## Tecnologías Empleadas

- **HTML5**: Marcado semántico, accesibilidad (`aria-label`, atributos de navegación) y etiquetas meta para SEO.
- **CSS3 Puro**: Arquitectura con variables CSS (paleta dorada, negro y marfil), CSS Grid, Flexbox y media queries fluidas.
- **JavaScript (ES6+)**:
  - Módulos nativos (`import` / `export`).
  - Enrutamiento cliente basado en hash sin recarga de página.
  - Patrón Pub/Sub para reactividad del estado global.
  - Web Storage API (`localStorage`) para persistencia de carrito y favoritos.
- **Tipografía**: Fuentes *Playfair Display* e *Inter* mediante Google Fonts.

---

## Licencia

Proyecto desarrollado para la tienda virtual **AUREA — Joyería & Accesorios**. Libre para uso, adaptación y despliegue comercial.
