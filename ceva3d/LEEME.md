# CEVA 3D — Sitio web (Fase 1)

Sitio estático: no necesita servidor ni instalación. Abre `index.html` en el navegador para verlo.
Para publicarlo, sube la carpeta completa a GitHub Pages, Netlify o cualquier hosting estático.

## Páginas incluidas
- `index.html` — Inicio (hero, categorías, Navidad 2026, figuras estilo Funko, proyectos escolares y maquetas, cotizador, destacados, proceso, servicios, Navidad 2026, nosotros, empresas, preguntas frecuentes, contacto)
- `tienda.html` — Tienda con filtros (categoría, disponibilidad, material, color, precio), búsqueda y orden
- `producto.html?p=ID` — Ficha de producto con opciones, cantidad, carrito y consulta por WhatsApp
- `cotizar.html` — Cotizador por pasos que envía la solicitud por WhatsApp

## Qué editar
- `assets/js/config.js` — WhatsApp, correo, redes, horario, ubicación, barra de anuncios, logotipo, proyectos reales y testimonios.
- `assets/js/catalogo.js` — Categorías y productos. Cada producto trae `demo: true`; cuando cargues productos reales, pon `demo: false` y, al terminar, `catalogoDemo: false` en config.js.
- Fotos: guárdalas en `assets/img/` y añade sus rutas en `fotos: [...]` del producto.
- Logotipo: ya integrado (`assets/img/logo-ceva3d.png`, versión web `logo-ceva3d-160.png`). Está pensado para fondo negro, por eso la cabecera y el pie son negros.
- Fotos referenciales: mientras `fotosReferenciales: true` en config.js, las fotos llevan la etiqueta «Imagen referencial». Cámbialo a `false` cuando todas sean trabajos propios de CEVA 3D.
- Navidad: escribe la fecha límite en `navidad.fechaLimite` de config.js para mostrar el aviso de reserva.

## Cómo funciona sin backend
- Carrito: se guarda en el navegador del cliente y el pedido se envía por WhatsApp con el detalle completo.
- Cotizador: valida los archivos (tipo y tamaño) y arma el mensaje; los archivos se adjuntan manualmente en el chat.
  En teléfonos compatibles aparece «Compartir con archivos», que abre el menú del sistema con los archivos incluidos.
- Protección básica contra spam: campo trampa oculto y tiempo mínimo antes de enviar.

## Pendiente (fases siguientes)
- Páginas individuales de Servicios, Colecciones/Navidad 2026, Nosotros y Contacto.
- Textos legales en borrador: privacidad, términos de compra, personalización, cambios y devoluciones, uso de fotografías.
- Panel de administración, registro de solicitudes y pagos en línea: requieren backend; hoy todo se gestiona por WhatsApp.
- SEO: al tener dominio, añadir URL canónica, imagen para redes (og:image), sitemap.xml y robots.txt.
