/*
 * CEVA 3D — Componentes compartidos
 * Cabecera, pie, carrito, buscador, WhatsApp flotante y utilidades.
 */
(function () {
  "use strict";
  const C = window.CEVA;
  const CATS = window.CEVA_CATEGORIAS || [];
  const PRODS = window.CEVA_PRODUCTOS || [];

  /* ---------- Iconos (trazo minimalista) ---------- */
  const P = {
    buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bolsa: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    menu: '<path d="M4 8h16M4 16h16"/>',
    cerrar: '<path d="M6 6l12 12M18 6 6 18"/>',
    wa: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.4-1.8-.9-.8.8a4 4 0 0 1-2.4-2.4l.8-.8-.9-1.8L9 9.5Z"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    diag: '<path d="M7 17 17 7M8 7h9v9"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    subir: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
    basura: '<path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/>',
    figura: '<circle cx="12" cy="8" r="4.5"/><path d="M6 21v-1.5A5.5 5.5 0 0 1 11.5 14h1a5.5 5.5 0 0 1 5.5 5.5V21"/><path d="M9.5 8h.01M14.5 8h.01"/>',
    regalo: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M3 9h18M12 9v11"/><path d="M12 9c-2-4-6-4-6-1.5S10 9 12 9Zm0 0c2-4 6-4 6-1.5S14 9 12 9Z"/>',
    hogar: '<path d="M8 21h8M10 21l-1-8h6l-1 8"/><path d="M12 13V9"/><path d="M12 9c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0C12 6.5 10.5 5 8 5c0 2.5 1.5 4 4 4Z"/>',
    gadget: '<rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 18h2"/>',
    pieza: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    maqueta: '<path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    estrella: '<path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z"/>',
    empresa: '<rect x="4" y="7" width="16" height="13" rx="1.5"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 13h16"/>',
    capas: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5" opacity=".5"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    caja: '<path d="M4 8 12 4l8 4v8l-8 4-8-4V8Z"/><path d="m4 8 8 4 8-4M12 12v8"/>',
    lapiz: '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    lote: '<rect x="3" y="4" width="7" height="7" rx="1"/><rect x="14" y="4" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    archivo: '<path d="M14 3H6v18h12V7l-4-4Z"/><path d="M14 3v4h4"/>',
    escudo: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 10h8M8 13h5"/>',
    paleta: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.5-4-8-9-8Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
    filtro: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    impresora: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M4 7h16M9 7v4l1.5 2 1.5-2V7"/><path d="M8 18h8"/>'
  };
  function icono(nombre, clase) {
    return '<svg class="' + (clase || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[nombre] || "") + "</svg>";
  }

  /* ---------- Utilidades ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const dinero = (n) => "$" + Number(n).toFixed(2);
  const catPorId = (id) => CATS.find((c) => c.id === id) || { nombre: "", icono: "caja" };
  const prodPorId = (id) => PRODS.find((p) => p.id === id);
  const waLink = (texto) => "https://wa.me/" + C.whatsapp + (texto ? "?text=" + encodeURIComponent(texto) : "");
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const leer = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };

  function textoPrecio(p) {
    if (p.precio == null) return '<span class="precio">A cotizar</span>';
    return '<span class="precio">' + (p.precioDesde ? "<small>desde</small>" : "") + dinero(p.precio) + "</span>";
  }
  function marcador(p, conTexto) {
    const cat = catPorId(p.categoria);
    return '<div class="marcador">' + icono(cat.icono) + (conTexto === false ? "" : "<span>Foto pendiente</span>") + "</div>";
  }
  function foto(p, i) {
    const src = p.fotos && p.fotos[i || 0];
    return src ? '<img src="' + esc(src) + '" alt="' + esc(p.nombre) + '" loading="lazy" decoding="async">' : marcador(p);
  }
  function etiquetas(p, enTarjeta) {
    let h = "";
    if (C.catalogoDemo && p.demo) h += '<span class="tag demo">Demostración</span>';
    let lista = p.etiquetas || [];
    if (enTarjeta) lista = lista.filter((t) => t !== "Bajo pedido").slice(0, C.catalogoDemo && p.demo ? 1 : 2);
    lista.forEach((t) => {
      const cls = t === "Nuevo" ? "nuevo" : t === "Bajo pedido" ? "pedido" : "";
      h += '<span class="tag ' + cls + '">' + esc(t) + "</span>";
    });
    return h;
  }
  function tarjetaProducto(p) {
    const cat = catPorId(p.categoria);
    const url = "producto.html?p=" + encodeURIComponent(p.id);
    const disp = p.tipo === "inventario" ? '<span class="disp inventario">En inventario</span>' : '<span class="disp pedido">Bajo pedido</span>';
    const rapido = p.precio != null && !p.personalizable
      ? '<button class="agregar-rapido" data-agregar="' + esc(p.id) + '" aria-label="Agregar ' + esc(p.nombre) + ' al carrito">' + icono("mas") + "</button>"
      : '<a class="agregar-rapido" href="' + url + '" aria-label="Ver opciones de ' + esc(p.nombre) + '">' + icono("flecha") + "</a>";
    return '<article class="prod">' +
      '<div class="foto"><a href="' + url + '" tabindex="-1" aria-hidden="true">' + foto(p) + "</a>" + referencial(p.fotos && p.fotos[0]) + '<div class="etiquetas">' + etiquetas(p, true) + "</div>" + rapido + "</div>" +
      '<div class="info"><div class="cat">' + esc(cat.nombre) + '</div><h3><a href="' + url + '">' + esc(p.nombre) + "</a></h3>" +
      '<div class="fila-precio">' + textoPrecio(p) + disp + "</div></div></article>";
  }

  /* ---------- Carrito ---------- */
  const CLAVE = "ceva3d-carrito";
  let carrito = leer(CLAVE, []).filter((i) => prodPorId(i.id));

  const claveItem = (id, ops) => id + "|" + JSON.stringify(ops || {});
  function agregar(id, cantidad, ops) {
    const p = prodPorId(id);
    if (!p) return;
    const k = claveItem(id, ops);
    const ex = carrito.find((i) => i.k === k);
    if (ex) ex.cantidad = Math.min(99, ex.cantidad + (cantidad || 1));
    else carrito.push({ k: k, id: id, cantidad: cantidad || 1, ops: ops || {} });
    sincronizar(true);
    toast("Agregado: " + p.nombre, "Ver carrito", abrirCarrito);
  }
  function cambiar(k, cantidad) {
    const it = carrito.find((i) => i.k === k);
    if (!it) return;
    it.cantidad = Math.max(1, Math.min(99, cantidad));
    sincronizar();
  }
  function quitar(k) { carrito = carrito.filter((i) => i.k !== k); sincronizar(); }
  function totales() {
    let subtotal = 0, aCotizar = 0, unidades = 0;
    carrito.forEach((i) => {
      const p = prodPorId(i.id);
      unidades += i.cantidad;
      if (p.precio == null) aCotizar++; else subtotal += p.precio * i.cantidad;
    });
    return { subtotal: subtotal, aCotizar: aCotizar, unidades: unidades };
  }
  function sincronizar(pulso) {
    guardar(CLAVE, carrito);
    const t = totales();
    document.querySelectorAll("[data-contador]").forEach((el) => {
      el.textContent = t.unidades;
      el.classList.toggle("visible", t.unidades > 0);
      if (pulso) { el.classList.remove("pulso"); void el.offsetWidth; el.classList.add("pulso"); }
    });
    pintarCarrito();
  }
  function describirOps(ops) {
    return Object.keys(ops || {}).filter((k) => ops[k]).map((k) => k + ": " + ops[k]);
  }

  let vistaCarrito = "lista";
  function pintarCarrito() {
    const cuerpo = document.getElementById("carrito-cuerpo");
    const pie = document.getElementById("carrito-pie");
    if (!cuerpo) return;
    if (!carrito.length) {
      vistaCarrito = "lista";
      cuerpo.innerHTML = '<div class="vacio">' + icono("bolsa") + '<p>Tu carrito está vacío.</p><a class="btn btn-negro btn-chico" href="tienda.html">Explorar tienda</a></div>';
      pie.innerHTML = "";
      return;
    }
    const t = totales();
    if (vistaCarrito === "lista") {
      cuerpo.innerHTML = carrito.map((i) => {
        const p = prodPorId(i.id);
        const ops = describirOps(i.ops);
        return '<div class="item-car"><div class="mini">' + foto(p) + "</div><div><h4>" + esc(p.nombre) + "</h4>" +
          '<div class="ops">' + (p.tipo === "pedido" ? "Bajo pedido" : "En inventario") + (ops.length ? " · " + ops.map(esc).join(" · ") : "") + "</div>" +
          '<div class="cantidad" data-k="' + esc(i.k) + '"><button type="button" data-menos aria-label="Restar">−</button><input type="number" min="1" max="99" value="' + i.cantidad + '" aria-label="Cantidad"><button type="button" data-mas aria-label="Sumar">+</button></div>' +
          '</div><div class="precio">' + (p.precio == null ? "A cotizar" : dinero(p.precio * i.cantidad)) +
          '<br><button class="quitar" type="button" data-quitar="' + esc(i.k) + '">Quitar</button></div></div>';
      }).join("");
      pie.innerHTML =
        '<div class="resumen-fila"><span>Subtotal</span><strong>' + dinero(t.subtotal) + "</strong></div>" +
        (t.aCotizar ? '<div class="resumen-fila"><span>Productos a cotizar</span><span>' + t.aCotizar + "</span></div>" : "") +
        '<div class="resumen-fila"><span>Entrega</span><span>Por confirmar</span></div>' +
        '<button class="btn btn-negro btn-bloque" type="button" data-continuar style="margin-top:16px">Continuar ' + icono("flecha", "flecha") + "</button>" +
        '<p class="nota">El pedido se confirma por WhatsApp. Todavía no hay pagos en línea: la forma de pago se coordina directamente con CEVA 3D.</p>';
    } else {
      const ent = C.entrega || {};
      const opcionesEnt = [
        ent.retiroLocal && ["Retiro en taller", "Retiro en taller"],
        ent.entregaLocal && ["Entrega local", "Entrega local"],
        ent.envioNacional && ["Envío nacional", "Envío nacional"]
      ].filter(Boolean);
      const d = leer("ceva3d-datos", {});
      cuerpo.innerHTML =
        '<form id="form-pedido" novalidate style="display:grid;gap:18px;padding:16px 0">' +
        '<button type="button" class="quitar" data-volver style="justify-self:start;text-decoration:none">← Volver al carrito</button>' +
        '<div class="campo"><label for="pd-nombre">Nombre completo</label><input class="control" id="pd-nombre" name="nombre" autocomplete="name" required value="' + esc(d.nombre || "") + '"><span class="msg-error"></span></div>' +
        '<div class="campo"><span class="etq">Entrega</span><div class="pastillas">' + opcionesEnt.map((o, n) =>
          '<label class="pastilla"><input type="radio" name="entrega" value="' + o[0] + '"' + ((d.entrega ? d.entrega === o[0] : n === 0) ? " checked" : "") + "><span>" + o[1] + "</span></label>").join("") + "</div></div>" +
        '<div class="campo"><label for="pd-ciudad">Ciudad y dirección <span class="ayuda">(para entrega o envío)</span></label><input class="control" id="pd-ciudad" name="direccion" autocomplete="street-address" value="' + esc(d.direccion || "") + '"></div>' +
        '<div class="campo"><label for="pd-notas">Notas <span class="ayuda">(opcional)</span></label><textarea class="control" id="pd-notas" name="notas" rows="3"></textarea></div>' +
        '<input class="trampa" type="text" name="sitio" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        "</form>";
      pie.innerHTML =
        '<div class="resumen-fila total"><span>Subtotal</span><span>' + dinero(t.subtotal) + "</span></div>" +
        '<p class="nota">' + esc(ent.nota || "") + (t.aCotizar ? " Los productos a cotizar se confirman después de revisar tus datos." : "") + "</p>" +
        '<button class="btn btn-amarillo btn-bloque" type="button" data-enviar-pedido style="margin-top:16px">' + icono("wa") + "Enviar pedido por WhatsApp</button>";
    }
  }
  function mensajePedido(datos) {
    const t = totales();
    const l = ["Hola " + C.nombre + ", quiero hacer este pedido:", ""];
    carrito.forEach((i, n) => {
      const p = prodPorId(i.id);
      l.push((n + 1) + ". " + p.nombre + " × " + i.cantidad + (p.precio == null ? " — a cotizar" : " — " + dinero(p.precio * i.cantidad)));
      l.push("   " + (p.tipo === "pedido" ? "Bajo pedido" : "En inventario"));
      describirOps(i.ops).forEach((o) => l.push("   " + o));
    });
    l.push("", "Subtotal: " + dinero(t.subtotal) + (t.aCotizar ? " (+ " + t.aCotizar + " producto(s) a cotizar)" : ""));
    l.push("Entrega: " + datos.entrega + " (costo por confirmar)");
    if (datos.direccion) l.push("Dirección: " + datos.direccion);
    l.push("Nombre: " + datos.nombre);
    if (datos.notas) l.push("Notas: " + datos.notas);
    if (C.catalogoDemo && carrito.some((i) => prodPorId(i.id).demo)) l.push("", "(Pedido de prueba desde el catálogo de demostración)");
    return l.join("\n");
  }

  /* ---------- Cabecera, pie y capas globales ---------- */
  const PAGINA = document.body.dataset.pagina || "";
  const MENU = [
    ["inicio", "Inicio", "index.html"],
    ["tienda", "Tienda", "tienda.html"],
    ["servicios", "Servicios", "index.html#servicios"],
    ["cotizar", "Personaliza tu idea", "cotizar.html"],
    ["colecciones", "Colecciones", "index.html#navidad"],
    ["nosotros", "Nosotros", "index.html#nosotros"],
    ["contacto", "Contacto", "index.html#contacto"]
  ];
  function logo(oscuro) {
    const src = oscuro ? (C.logoBlanco || C.logo) : C.logo;
    if (src) return '<img src="' + esc(src) + '" alt="' + esc(C.nombre) + '">';
    return '<span class="logo-texto">CEVA<b>3D</b></span>';
  }
  function referencial(src) {
    return C.fotosReferenciales && src && src.indexOf("assets/img/") === 0 ? '<span class="tag ref">Imagen referencial</span>' : "";
  }

  function montar() {
    const a = C.anuncio || {};
    const anuncio = a.activo && a.texto
      ? '<div class="anuncio" role="region" aria-label="Anuncio"><div class="contenedor"><span>' + esc(a.texto) + "</span>" + (a.enlace ? '<a href="' + esc(a.enlace) + '">' + esc(a.boton || "Ver más") + "</a>" : "") + "</div></div>"
      : "";
    const enlaces = MENU.map((m) => '<a href="' + m[2] + '"' + (m[0] === PAGINA ? ' aria-current="page"' : "") + ">" + m[1] + "</a>").join("");

    document.body.insertAdjacentHTML("afterbegin",
      '<a class="saltar" href="#contenido">Saltar al contenido</a>' + anuncio +
      '<header class="cabecera" id="cabecera"><div class="contenedor">' +
      '<a class="marca" href="index.html" aria-label="' + esc(C.nombre) + ', inicio">' + logo(false) + "</a>" +
      '<nav class="menu" aria-label="Principal">' + enlaces + "</nav>" +
      '<div class="acciones">' +
      '<button class="icono-btn" type="button" data-abrir-buscador aria-label="Buscar">' + icono("buscar") + "</button>" +
      '<button class="icono-btn" type="button" data-abrir-carrito aria-label="Carrito">' + icono("bolsa") + '<span class="contador" data-contador>0</span></button>' +
      '<a class="btn btn-amarillo btn-chico btn-wa-cab" href="' + waLink("Hola " + C.nombre + ", tengo una consulta.") + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + icono("wa") + "<span>WhatsApp</span></a>" +
      '<button class="icono-btn btn-menu" type="button" data-abrir-menu aria-label="Abrir menú" aria-expanded="false">' + icono("menu") + "</button>" +
      "</div></div></header>" +
      '<div class="menu-movil" id="menu-movil" aria-hidden="true"><div class="fila">' + logo(true) +
      '<button class="icono-btn" type="button" data-cerrar-menu aria-label="Cerrar menú">' + icono("cerrar") + "</button></div>" +
      '<nav aria-label="Principal móvil">' + enlaces + "</nav>" +
      '<a class="btn btn-amarillo btn-bloque" href="' + waLink("Hola " + C.nombre + ", tengo una consulta.") + '" target="_blank" rel="noopener">' + icono("wa") + "Escríbenos por WhatsApp</a></div>"
    );

    const redes = [["Instagram", C.instagram], ["Facebook", C.facebook], ["TikTok", C.tiktok]].filter((r) => r[1]);
    const pie =
      '<footer class="pie"><div class="contenedor"><div class="grid">' +
      "<div>" + logo(true) + '<p class="lema-pie">' + esc(C.lema) + ".</p></div>" +
      "<div><h4>Tienda</h4><ul>" + CATS.slice(0, 5).map((c) => '<li><a href="tienda.html?cat=' + c.id + '">' + esc(c.nombre) + "</a></li>").join("") + "</ul></div>" +
      '<div><h4>CEVA 3D</h4><ul><li><a href="cotizar.html">Cotiza tu proyecto</a></li><li><a href="index.html#servicios">Servicios</a></li><li><a href="index.html#empresas">Empresas y volumen</a></li><li><a href="index.html#faq">Preguntas frecuentes</a></li></ul></div>' +
      "<div><h4>Contacto</h4><ul>" +
      '<li><a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp ' + esc(C.whatsappVisible) + "</a></li>" +
      (C.correo ? '<li><a href="mailto:' + esc(C.correo) + '">' + esc(C.correo) + "</a></li>" : "") +
      redes.map((r) => '<li><a href="' + esc(r[1]) + '" target="_blank" rel="noopener">' + r[0] + "</a></li>").join("") +
      (C.horario ? "<li>" + esc(C.horario) + "</li>" : "") +
      (C.ubicacion ? "<li>" + esc(C.ubicacion) + "</li>" : "") +
      "</ul></div></div>" +
      '<div class="base"><span>© ' + new Date().getFullYear() + " " + esc(C.nombre) + '. Todos los derechos reservados.</span><span class="pendiente">Aviso de privacidad y términos de compra: en preparación</span>' +
      (C.credito ? '<a href="' + esc(C.credito.enlace) + '" target="_blank" rel="noopener">' + esc(C.credito.texto) + "</a>" : "") +
      "</div></div></footer>";
    document.body.insertAdjacentHTML("beforeend", pie +
      '<a class="wa-flotante" href="' + waLink("Hola " + C.nombre + ", tengo una consulta.") + '" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">' + icono("wa") + '<i class="punto"></i><span>WhatsApp</span></a>' +
      '<div class="velo" id="velo"></div>' +
      '<aside class="cajon" id="carrito" aria-label="Carrito" aria-hidden="true"><div class="cab"><h2>Tu pedido</h2><button class="icono-btn" type="button" data-cerrar-carrito aria-label="Cerrar carrito">' + icono("cerrar") + '</button></div><div class="cuerpo" id="carrito-cuerpo"></div><div class="pie-cajon" id="carrito-pie"></div></aside>' +
      '<div class="buscador" id="buscador" role="dialog" aria-label="Buscar productos"><form action="tienda.html" role="search">' + icono("buscar") +
      '<input type="search" name="q" placeholder="Buscar figuras, repuestos, regalos…" aria-label="Buscar" autocomplete="off"><button class="btn btn-negro btn-chico" type="submit">Buscar</button></form></div>' +
      '<div class="toast" id="toast" role="status" aria-live="polite"></div>'
    );
  }

  /* ---------- Capas: abrir / cerrar ---------- */
  let ultimoFoco = null;
  function abrirCarrito() {
    ultimoFoco = document.activeElement;
    vistaCarrito = "lista"; pintarCarrito();
    document.getElementById("carrito").classList.add("abierto");
    document.getElementById("carrito").setAttribute("aria-hidden", "false");
    document.getElementById("velo").classList.add("visible");
    document.body.style.overflow = "hidden";
    setTimeout(() => document.querySelector("[data-cerrar-carrito]").focus(), 50);
  }
  function cerrarTodo() {
    ["carrito", "menu-movil"].forEach((id) => { const el = document.getElementById(id); el.classList.remove("abierto"); el.setAttribute("aria-hidden", "true"); });
    document.getElementById("buscador").classList.remove("abierto");
    document.getElementById("velo").classList.remove("visible");
    const f = document.querySelector(".filtros"); if (f) f.classList.remove("abierto");
    const bm = document.querySelector("[data-abrir-menu]"); if (bm) bm.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }

  let tToast;
  function toast(texto, accion, fn) {
    const t = document.getElementById("toast");
    t.innerHTML = '<span class="ok">' + icono("check") + "</span><span>" + esc(texto) + "</span>" + (accion ? '<button type="button">' + esc(accion) + "</button>" : "");
    if (accion) t.querySelector("button").onclick = () => { t.classList.remove("visible"); fn(); };
    t.classList.add("visible");
    clearTimeout(tToast); tToast = setTimeout(() => t.classList.remove("visible"), 3200);
  }

  function eventos() {
    document.addEventListener("click", (e) => {
      const el = (s) => e.target.closest(s);
      let b;
      if (el("[data-abrir-carrito]")) return abrirCarrito();
      if (el("[data-cerrar-carrito]") || el("#velo")) return cerrarTodo();
      if (el("[data-abrir-menu]")) {
        ultimoFoco = el("[data-abrir-menu]");
        const m = document.getElementById("menu-movil"); m.classList.add("abierto"); m.setAttribute("aria-hidden", "false");
        ultimoFoco.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
        return setTimeout(() => m.querySelector("[data-cerrar-menu]").focus(), 50);
      }
      if (el("[data-cerrar-menu]") || el(".menu-movil nav a")) return cerrarTodo();
      if (el("[data-abrir-buscador]")) {
        ultimoFoco = el("[data-abrir-buscador]");
        const bz = document.getElementById("buscador"); bz.classList.add("abierto");
        return setTimeout(() => bz.querySelector("input").focus(), 30);
      }
      if (e.target.id === "buscador") return cerrarTodo();
      if ((b = el("[data-agregar]"))) { e.preventDefault(); return agregar(b.dataset.agregar, 1, {}); }
      if ((b = el("[data-quitar]"))) return quitar(b.dataset.quitar);
      if ((b = el(".cajon .cantidad button"))) {
        const box = b.closest(".cantidad"); const inp = box.querySelector("input");
        return cambiar(box.dataset.k, Number(inp.value) + (b.hasAttribute("data-mas") ? 1 : -1));
      }
      if (el("[data-continuar]")) { vistaCarrito = "datos"; pintarCarrito(); return document.getElementById("pd-nombre").focus(); }
      if (el("[data-volver]")) { vistaCarrito = "lista"; return pintarCarrito(); }
      if (el("[data-enviar-pedido]")) {
        const f = document.getElementById("form-pedido");
        if (f.sitio.value) return; // protección básica contra bots
        const nombre = f.nombre.value.trim();
        const err = f.nombre.parentElement.querySelector(".msg-error");
        if (nombre.length < 2) { f.nombre.classList.add("invalido"); err.textContent = "Escribe tu nombre para identificar el pedido."; return f.nombre.focus(); }
        f.nombre.classList.remove("invalido"); err.textContent = "";
        const ent = f.querySelector('input[name="entrega"]:checked');
        const datos = { nombre: nombre, entrega: ent ? ent.value : "Por definir", direccion: f.direccion.value.trim(), notas: f.notas.value.trim() };
        guardar("ceva3d-datos", { nombre: datos.nombre, entrega: datos.entrega, direccion: datos.direccion });
        window.open(waLink(mensajePedido(datos)), "_blank", "noopener");
      }
    });
    document.addEventListener("change", (e) => {
      const box = e.target.closest(".cajon .cantidad");
      if (box) cambiar(box.dataset.k, Number(e.target.value) || 1);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarTodo(); });

    const cab = document.getElementById("cabecera");
    const alScroll = () => cab.classList.toggle("con-borde", window.scrollY > 8);
    window.addEventListener("scroll", alScroll, { passive: true }); alScroll();
  }

  function revelar() {
    const els = document.querySelectorAll(".revelar");
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("visto"));
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visto"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* API pública para las páginas */
  window.CevaUI = { referencial, icono, esc, dinero, catPorId, prodPorId, tarjetaProducto, foto, marcador, etiquetas, textoPrecio, waLink, agregar, abrirCarrito, toast, revelar, guardar, leer };

  montar();
  eventos();
  sincronizar();
  document.querySelectorAll("[data-icono]").forEach((el) => { el.innerHTML = icono(el.dataset.icono); });
  document.addEventListener("DOMContentLoaded", revelar);
  if (document.readyState !== "loading") revelar();
})();
