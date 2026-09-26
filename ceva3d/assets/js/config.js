/*
 * CEVA 3D — Configuración general del sitio
 * ------------------------------------------------------------
 * Edita este archivo para cambiar datos de contacto, anuncios y
 * opciones generales. No hace falta tocar el resto del código.
 * Deja un campo vacío ("") si todavía no existe ese dato: el sitio
 * lo ocultará automáticamente en lugar de inventarlo.
 */
window.CEVA = {
  nombre: "CEVA 3D",
  lema: "De tus ideas a la realidad",

  /* Logotipo: coloca el archivo en assets/img/ y escribe su ruta.
     El logotipo original está pensado para fondo negro, por eso la
     cabecera y el pie del sitio son negros.
     Si se deja vacío, se muestra un logotipo de texto provisional. */
  logo: "assets/img/logo-ceva3d-160.png",
  logoBlanco: "assets/img/logo-ceva3d-160.png",

  /* WhatsApp en formato internacional, sin "+" ni espacios.
     099 978 1431 (Ecuador) -> 593999781431 */
  whatsapp: "593999781431",
  whatsappVisible: "099 978 1431",

  correo: "",
  instagram: "",
  facebook: "",
  tiktok: "",
  horario: "",
  ubicacion: "",

  /* Barra superior de anuncios */
  anuncio: {
    activo: true,
    texto: "Colección Navidad 2026 muy pronto · Reserva tus adornos personalizados",
    enlace: "index.html#navidad",
    boton: "Ver colección"
  },

  moneda: "USD",

  /* Colección de Navidad: escribe la fecha límite para reservar
     (p. ej. "15 de diciembre") o déjala vacía para ocultarla. */
  navidad: { fechaLimite: "" },

  /* true mientras las fotos del sitio sean de referencia y no de
     trabajos propios: se muestran con la etiqueta "Imagen referencial". */
  fotosReferenciales: true,

  /* Mientras sea true, el catálogo muestra la etiqueta "Demostración"
     en cada producto y un aviso visible en la tienda. Cámbialo a false
     cuando reemplaces los productos de ejemplo por los reales. */
  catalogoDemo: true,

  /* Entrega. Los costos quedan "por confirmar" hasta configurarlos. */
  entrega: {
    retiroLocal: true,
    entregaLocal: true,
    envioNacional: true,
    nota: "El costo de entrega o envío se confirma por WhatsApp según la ubicación."
  },

  /* Proyectos reales y testimonios: las secciones solo aparecen
     cuando hay contenido. Ejemplo de proyecto:
     { titulo: "Perilla para licuadora", antes: "assets/img/p1-antes.jpg",
       despues: "assets/img/p1-despues.jpg", texto: "Pieza reproducida en PETG." }
     Ejemplo de testimonio:
     { nombre: "Nombre del cliente", texto: "Comentario real.", fuente: "WhatsApp" } */
  proyectos: [],
  testimonios: [],

  credito: { texto: "Diseño y desarrollo: Wattio", enlace: "https://wattio.space" }
};
