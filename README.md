# ✨ AUREA — Joyería & Accesorios

<div align="center">

![AUREA Banner](https://images.unsplash.com/photo-1515562141589-67f0d569b6b3?w=1200&h=400&fit=crop&q=80)

**Tienda virtual premium de alta joyería y accesorios en Colombia.**  
*Piezas atemporales en oro laminado de 18k, acero quirúrgico 316L y plata fina.*

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B%20Modules-F7DF1E?logo=javascript&logoColor=black)](#tecnologías)
[![HTML5](https://img.shields.io/badge/HTML5-Semántico-E34F26?logo=html5&logoColor=white)](#tecnologías)
[![CSS3](https://img.shields.io/badge/CSS3-Modern%20Grid%20%26%20Flex-1572B6?logo=css3&logoColor=white)](#tecnologías)
[![Responsive](https://img.shields.io/badge/Design-100%25%20Responsive-brightgreen)](#características)
[![Currency](https://img.shields.io/badge/Currency-COP%20(%24)-C6A45C)](#precios-y-moneda)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Order%20Integration-25D366?logo=whatsapp&logoColor=white)](#pedidos-por-whatsapp)

[Características](#-características-principales) •
[Estructura](#-estructura-del-proyecto) •
[Instalación y Uso](#-cómo-ejecutar-el-proyecto) •
[Configuración](#-configuración-del-negocio) •
[Despliegue](#-despliegue-en-producción)

</div>

---

## 💎 Descripción del Proyecto

**AUREA** es una plataforma de comercio electrónico diseñada para brindar una experiencia de compra elegante, lujosa y fluida. Su estética combina tonos negros profundos (`#111111`), dorados satinados (`#C6A45C`) y marfil suave (`#F8F6F0`).

El proyecto está desarrollado completamente en **Vanilla JavaScript** moderno (ES Modules), sin dependencias pesadas de frameworks, garantizando una carga ultrarrápida, compatibilidad universal y facilidad de mantenimiento.

---

## 🌟 Características Principales

### 🛍️ Catálogo y Navegación
- **8 Categorías Especializadas**: Manillas, Cadenas y Collares, Anillos, Aretes, Tobilleras, Dijes, Sets y Accesorios para Regalo.
- **Buscador Reactivo**: Búsqueda en tiempo real por nombre, descripción, material o categoría con sugerencias automáticas.
- **Filtros Funcionales**:
  - Filtrado por categorías y colecciones (*Novedades, Más Vendidos, En Oferta*).
  - Selector de rango de precios en Pesos Colombianos (COP).
  - Ordenamiento dinámico: Popularidad, Menor a Mayor precio, Mayor a Menor precio, Novedades y Alfabético.
  - Chips de filtros activos interactivos para remover criterios en 1 clic.
  - Menú desplegable de filtros adaptado para celulares y tablets.

### 💍 Ficha de Producto y Vista Rápida
- **Modal interactivo**: Permite ver detalles de la pieza sin salir de la página.
- **Selector de variantes**: Tallas (S, M, L, tallas de anillo 6-9) o largos de cadena (45, 50, 60 cm).
- **Detalle de materiales**: Información honesta sobre acabados (acero quirúrgico 316L, recubrimiento PVD, baño de oro 18k).
- **Control de cantidades** y badge de disponibilidad.

### 🛒 Carrito de Compras Deslizable
- Panel lateral *slide-in* accesible desde cualquier sección.
- Cálculo de subtotales, cantidades y total general.
- **Barra de beneficio de envío**: Notifica dinámicamente cuánto falta para obtener envío gratis (umbral de \$200.000 COP).
- **Persistencia local (`localStorage`)**: Los productos añadidos se conservan al recargar o cambiar de página.

### ❤️ Lista de Favoritos (Wishlist)
- Botón interactivo de favoritos en tarjetas, catálogo y modal de detalles.
- Vista dedicada (`#/favoritos`) para revisar las joyas guardadas en cualquier momento.
- Sincronización instantánea con almacenamiento local.

### 📲 Pedidos y Checkout vía WhatsApp
- Formulario de datos de despacho: Nombre completo, teléfono, ciudad/departamento, dirección detallada, método de pago y notas de regalo.
- Validación de campos en tiempo real.
- **Generador de mensaje para WhatsApp**: Crea un pedido estructurado y estético con lista desglosada, subtotales, costo de envío y datos del cliente.
- Manejo de configuración provisional para pruebas inmediatas y botón de copiado de mensaje en 1 clic.

---

## 📁 Estructura del Proyecto

```text
Pagina-Joyeria/
├── index.html                   # Documento HTML principal
├── iniciar_tienda.bat           # Lanzador rápido en 1 clic para Windows
├── server.ps1                   # Servidor HTTP local nativo (PowerShell)
├── README.md                    # Documentación del proyecto
│
├── css/
│   └── styles.css               # Hoja de estilos completa, variables CSS y diseño responsive
│
├── data/
│   ├── config.js                # Configuración de marca, WhatsApp, envío y colores
│   └── products.js              # Catálogo de productos, categorías, precios y fotos
│
└── js/
    ├── app.js                   # Punto de entrada principal y registro de rutas
    ├── router.js                # Enrutador cliente basado en hash (#/tienda, #/checkout, etc.)
    ├── store.js                 # Manejador de estado global reactivo (Pub/Sub) con persistencia
    │
    ├── components/              # Componentes visuales modulares
    │   ├── header.js            # Navegación principal, buscador y contador de carrito
    │   ├── hero.js              # Sección principal de bienvenida con llamados a la acción
    │   ├── categories.js        # Cuadrícula interactiva de colecciones
    │   ├── productCard.js       # Tarjeta reutilizable de producto
    │   ├── productModal.js      # Modal de detalle y vista rápida
    │   ├── productSections.js   # Bloques de productos (Destacados, Nuevos, Ofertas)
    │   ├── cart.js              # Panel lateral de carrito de compras
    │   ├── search.js            # Overlay de búsqueda en vivo
    │   ├── toast.js             # Notificaciones emergentes temporales
    │   └── footer.js            # Pie de página con enlaces y redes sociales
    │
    └── views/                   # Vistas principales de la aplicación
        ├── home.js              # Página de inicio con testimonios, beneficios y FAQ
        ├── shop.js              # Catálogo completo con filtros avanzados
        ├── favorites.js         # Vista de joyas favoritas guardadas
        └── checkout.js          # Proceso de compra y confirmación por WhatsApp
```

---

## 🚀 Cómo Ejecutar el Proyecto

Dado que el proyecto utiliza **JavaScript ES Modules** (`type="module"`), el navegador requiere que los archivos se sirvan a través de un protocolo HTTP/HTTPS local:

### Opción 1: En Windows con el archivo `.bat` (Recomendado)
Simplemente haz doble clic sobre el archivo [**`iniciar_tienda.bat`**](iniciar_tienda.bat).
- Detectará si tienes Python o Node.js; si no tienes ninguno, levantará automáticamente el servidor ligero nativo en PowerShell y abrirá tu navegador en `http://localhost:8080/`.

### Opción 2: Con Visual Studio Code (Live Server)
1. Abre la carpeta del proyecto en VS Code.
2. Instala la extensión **Live Server**.
3. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.

### Opción 3: Con Python
```bash
# En la raíz del proyecto
python -m http.server 8080
```
Luego abre tu navegador en `http://localhost:8080/`.

### Opción 4: Con Node.js / npx
```bash
npx serve . -l 8080
# o
npx http-server -p 8080
```

---

## ⚙️ Configuración del Negocio

Todos los datos clave de tu tienda se gestionan en dos archivos sencillos:

### 1. Datos generales y WhatsApp (`data/config.js`)
Edita este archivo para configurar los datos reales de tu tienda:

```javascript
export const CONFIG = {
  BRAND_NAME: 'AUREA',
  BRAND_TAGLINE: 'Joyería & Accesorios',

  // Configura tu número de WhatsApp con código de país (57 para Colombia) sin espacios ni signos:
  WHATSAPP_NUMBER: '573001234567',

  CURRENCY: 'COP',
  SHIPPING_COST: 12000,              // Costo de envío estándar
  FREE_SHIPPING_THRESHOLD: 200000,   // Envío gratis a partir de este monto

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

### 2. Catálogo de Productos (`data/products.js`)
Para añadir, editar o remover piezas, modifica el arreglo `PRODUCTS`:

```javascript
{
  id: 17,
  name: 'Nombre de la Joya',
  category: 'manillas', // manillas | cadenas | anillos | aretes | tobilleras | dijes | sets | accesorios
  price: 95000,         // Precio en COP (entero sin decimales)
  oldPrice: 120000,     // Precio anterior (o null si no tiene descuento)
  description: 'Descripción elegante de la pieza.',
  material: 'Acero inoxidable con baño de oro de 18k',
  availability: 'En stock',
  tags: ['nuevo', 'mas-vendido'], // nuevo | oferta | mas-vendido
  variants: ['Talla S', 'Talla M'],
  images: ['https://tu-imagen.jpg'],
  popularity: 90,
  dateAdded: '2026-10-27'
}
```

---

## 🌐 Despliegue en Producción

Puedes alojar esta tienda de forma **100% gratuita** en cualquier plataforma estática:

### GitHub Pages
1. Sube el repositorio a GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AUREA Joyería"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```
2. En GitHub, ve a **Settings** > **Pages**.
3. En **Branch**, selecciona `main` y la carpeta `/(root)`.
4. Guarda y en pocos segundos tu tienda estará en línea en `https://TU_USUARIO.github.io/TU_REPOSITORIO/`.

### Vercel / Netlify
1. Conecta tu repositorio de GitHub en [vercel.com](https://vercel.com) o [netlify.com](https://netlify.com).
2. Deja la configuración de compilación vacía (es un proyecto estático sin build step).
3. Haz clic en **Deploy**.

---

## 🛠️ Tecnologías Empleadas

- **HTML5**: Semántica web, accesibilidad (`aria-label`, enlaces de salto) y meta etiquetas OpenGraph.
- **CSS3 Puro**: Variables CSS para paleta dorada/marfil, CSS Grid, Flexbox, animaciones clave (`@keyframes`) y media queries adaptables.
- **JavaScript Moderno (ES6+)**:
  - Módulos nativos (`import` / `export`).
  - Hash Routing sin recargas (`router.js`).
  - Patrón Pub/Sub reactivo para estado global (`store.js`).
  - Web Storage API (`localStorage`) para persistencia.
- **Google Fonts**: Tipografías *Playfair Display* (títulos de lujo) e *Inter* (lectura nítida).

---

## 📄 Licencia

Este proyecto fue desarrollado para la tienda virtual **AUREA — Joyería & Accesorios**. Libre de uso y personalización según las necesidades de tu marca.
