/*
 * CEVA 3D — Catálogo
 * ------------------------------------------------------------
 * Categorías y productos del sitio. Para publicar un producto real:
 * copia un bloque, cambia sus datos y pon demo: false.
 *
 * Campos de producto:
 *   id            identificador único, sin espacios (se usa en la URL)
 *   nombre        nombre visible
 *   categoria     id de una categoría de la lista de abajo
 *   precio        número en USD, o null si es "a cotizar"
 *   precioDesde   true si el precio es "desde"
 *   tipo          "inventario" (listo para entrega) o "pedido" (se fabrica)
 *   stock         unidades disponibles (solo para "inventario")
 *   materiales    lista, p. ej. ["PLA", "PETG"]
 *   colores       lista de colores disponibles
 *   dimensiones   texto libre, p. ej. "8 × 8 × 12 cm"
 *   tiempo        tiempo estimado de fabricación
 *   personalizable true/false
 *   personalizacion texto que explica qué se puede personalizar
 *   etiquetas     ["Nuevo", "Personalizable", ...]
 *   fotos         rutas de imágenes; si está vacío se muestra un marcador
 *   descripcion   texto de la ficha
 *   destacado     true para mostrarlo en la página de inicio
 *   demo          true = producto de ejemplo (se marca como demostración)
 */
window.CEVA_CATEGORIAS = [
  { id: "figuras",     nombre: "Figuras estilo Funko",      icono: "figura",   texto: "Tu versión, la de tu familia o tu mascota en figura." },
  { id: "regalos",     nombre: "Regalos y recuerdos",       icono: "regalo",   texto: "Detalles con nombre, fecha o mensaje." },
  { id: "decoracion",  nombre: "Decoración y hogar",        icono: "hogar",    texto: "Macetas, lámparas, organizadores y más." },
  { id: "accesorios",  nombre: "Accesorios y gadgets",      icono: "gadget",   texto: "Soportes, llaveros y útiles del día a día." },
  { id: "repuestos",   nombre: "Repuestos y piezas",        icono: "pieza",    texto: "Perillas, soportes y componentes funcionales." },
  { id: "maquetas",    nombre: "Maquetas y colegios",       icono: "maqueta",  texto: "Proyectos escolares, maquetas y material didáctico." },
  { id: "temporada",   nombre: "Navidad 2026",              icono: "estrella", texto: "Adornos con nombre, esferas y regalos." },
  { id: "empresas",    nombre: "Productos para empresas",   icono: "empresa",  texto: "Regalos corporativos y pedidos por volumen." }
];

window.CEVA_PRODUCTOS = [
  {
    id: "figura-chibi-personalizada",
    nombre: "Figura personalizada estilo Funko",
    categoria: "figuras",
    precio: 25, precioDesde: true,
    tipo: "pedido",
    materiales: ["PLA"],
    colores: ["Blanco para pintar", "Multicolor"],
    dimensiones: "Aprox. 10 cm de alto",
    tiempo: "5 a 7 días hábiles",
    personalizable: true,
    personalizacion: "Envía fotos de la persona, mascota o personaje original.",
    etiquetas: ["Personalizable", "Bajo pedido"],
    fotos: ["assets/img/figuras-personalizadas.webp"],
    descripcion: "Figura cabezona modelada a partir de tus fotografías: tú, tu familia, tu mascota o tu personaje original. Pintada a mano. Se confirma el diseño antes de imprimir.",
    destacado: true, demo: true
  },
  {
    id: "llavero-con-nombre",
    nombre: "Llavero con nombre",
    categoria: "regalos",
    precio: 3.5, precioDesde: false,
    tipo: "pedido",
    materiales: ["PLA"],
    colores: ["Negro", "Blanco", "Amarillo", "Rojo", "Azul"],
    dimensiones: "Aprox. 6 × 2 cm",
    tiempo: "1 a 2 días hábiles",
    personalizable: true,
    personalizacion: "Nombre o palabra de hasta 10 letras.",
    etiquetas: ["Personalizable", "Nuevo"],
    fotos: [],
    descripcion: "Llavero con relieve de dos colores. Ideal para recuerdos, eventos y regalos de grupo.",
    destacado: true, demo: true
  },
  {
    id: "maceta-geometrica",
    nombre: "Maceta geométrica",
    categoria: "decoracion",
    precio: 12, precioDesde: false,
    tipo: "inventario", stock: 4,
    materiales: ["PETG"],
    colores: ["Blanco", "Negro"],
    dimensiones: "10 × 10 × 9 cm",
    tiempo: "Lista para entrega",
    personalizable: false,
    etiquetas: [],
    fotos: [],
    descripcion: "Maceta de caras facetadas con drenaje y plato. Resistente al agua.",
    destacado: true, demo: true
  },
  {
    id: "soporte-celular",
    nombre: "Soporte para celular",
    categoria: "accesorios",
    precio: 8, precioDesde: false,
    tipo: "inventario", stock: 6,
    materiales: ["PLA", "PETG"],
    colores: ["Negro", "Blanco", "Gris"],
    dimensiones: "9 × 7 × 11 cm",
    tiempo: "Lista para entrega",
    personalizable: true,
    personalizacion: "Grabado de nombre o logotipo en la base (se fabrica bajo pedido).",
    etiquetas: ["Personalizable"],
    fotos: [],
    descripcion: "Soporte de escritorio con ángulo cómodo para videollamadas y lectura.",
    destacado: true, demo: true
  },
  {
    id: "perilla-reemplazo",
    nombre: "Perilla de reemplazo",
    categoria: "repuestos",
    precio: null,
    tipo: "pedido",
    materiales: ["PETG", "PLA"],
    colores: ["Negro", "Blanco", "Gris"],
    dimensiones: "Según la pieza original",
    tiempo: "2 a 4 días hábiles tras validar medidas",
    personalizable: true,
    personalizacion: "Envía fotos de la pieza con una regla o sus medidas.",
    etiquetas: ["Bajo pedido"],
    fotos: [],
    descripcion: "Reproducción de perillas para electrodomésticos, equipos de audio y muebles. Requiere revisión técnica.",
    destacado: false, demo: true
  },
  {
    id: "maqueta-arquitectonica",
    nombre: "Maqueta escolar o arquitectónica",
    categoria: "maquetas",
    precio: null,
    tipo: "pedido",
    materiales: ["PLA"],
    colores: ["Blanco", "Gris"],
    dimensiones: "Según el proyecto",
    tiempo: "Según tamaño y complejidad",
    personalizable: true,
    personalizacion: "A partir de tu archivo 3D o planos.",
    etiquetas: ["Bajo pedido"],
    fotos: [],
    descripcion: "Maquetas para tareas, ferias de ciencias y presentaciones profesionales, impresas a escala.",
    destacado: false, demo: true
  },
  {
    id: "adorno-navidad-nombre",
    nombre: "Adorno navideño con nombre",
    categoria: "temporada",
    precio: 4, precioDesde: false,
    tipo: "pedido",
    materiales: ["PLA"],
    colores: ["Blanco", "Rojo", "Dorado", "Verde"],
    dimensiones: "Aprox. 7 cm",
    tiempo: "2 a 3 días hábiles",
    personalizable: true,
    personalizacion: "Nombre de hasta 12 letras.",
    etiquetas: ["Personalizable", "Nuevo"],
    fotos: ["assets/img/navidad-adornos-nombre.webp"],
    descripcion: "Adorno para el árbol con nombre en relieve. Parte de la colección de temporada.",
    destacado: true, demo: true
  },
  {
    id: "portavelas-led",
    nombre: "Portavelas para luz LED",
    categoria: "temporada",
    precio: 9, precioDesde: false,
    tipo: "inventario", stock: 3,
    materiales: ["PLA"],
    colores: ["Blanco"],
    dimensiones: "8 × 8 × 10 cm",
    tiempo: "Lista para entrega",
    personalizable: false,
    etiquetas: [],
    fotos: [],
    descripcion: "Diseño calado para velas LED. No usar con velas de llama.",
    destacado: false, demo: true
  },
  {
    id: "llaveros-corporativos",
    nombre: "Llaveros corporativos con logotipo",
    categoria: "empresas",
    precio: null,
    tipo: "pedido",
    materiales: ["PLA", "PETG"],
    colores: ["Según la marca"],
    dimensiones: "Según el diseño",
    tiempo: "Según cantidad",
    personalizable: true,
    personalizacion: "Logotipo de tu empresa en uno o dos colores.",
    etiquetas: ["Bajo pedido"],
    fotos: [],
    descripcion: "Llaveros con tu marca para eventos, ferias y regalos corporativos. Pedidos por volumen.",
    destacado: false, demo: true
  },
  {
    id: "organizador-escritorio",
    nombre: "Organizador de escritorio",
    categoria: "decoracion",
    precio: 15, precioDesde: false,
    tipo: "pedido",
    materiales: ["PLA", "PETG"],
    colores: ["Negro", "Blanco", "Amarillo"],
    dimensiones: "18 × 10 × 9 cm",
    tiempo: "2 a 3 días hábiles",
    personalizable: true,
    personalizacion: "Nombre grabado en el frente.",
    etiquetas: ["Personalizable"],
    fotos: [],
    descripcion: "Organizador modular para lápices, tarjetas y accesorios.",
    destacado: false, demo: true
  }
];
