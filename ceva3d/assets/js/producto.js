/* CEVA 3D — Ficha de producto */
(function () {
  "use strict";
  const U = window.CevaUI, C = window.CEVA;
  const PRODS = window.CEVA_PRODUCTOS;
  const $ = (s) => document.querySelector(s);
  const id = new URLSearchParams(location.search).get("p");
  const p = PRODS.find((x) => x.id === id);

  if (!p) {
    $("#ficha").innerHTML = '<div class="sin-resultados"><h3>Producto no encontrado</h3><p>Puede que ya no esté disponible.</p><a class="btn btn-negro" href="tienda.html" style="margin-top:20px">Volver a la tienda</a></div>';
    $("#relacionados-sec").hidden = true;
    return;
  }

  const cat = U.catPorId(p.categoria);
  document.title = p.nombre + " · CEVA 3D";
  const meta = (sel, attr, val) => { let m = document.head.querySelector(sel); if (!m) { m = document.createElement("meta"); m.setAttribute(attr[0], attr[1]); document.head.appendChild(m); } m.setAttribute("content", val); };
  meta('meta[name="description"]', ["name", "description"], p.descripcion);
  meta('meta[property="og:title"]', ["property", "og:title"], p.nombre + " · CEVA 3D");
  meta('meta[property="og:description"]', ["property", "og:description"], p.descripcion);

  const COLORES = { negro: "#101010", blanco: "#ffffff", amarillo: "#FFF000", rojo: "#d32f2f", azul: "#1e5bd8", gris: "#9e9e9e", verde: "#2e7d32", dorado: "#c9a227" };
  const muestra = (c) => { const k = c.toLowerCase(); return COLORES[k] ? '<i class="muestra" style="background:' + COLORES[k] + '"></i>' : ""; };
  const pastillas = (nombre, lista) => '<div class="pastillas" role="radiogroup">' + lista.map((v, i) =>
    '<label class="pastilla"><input type="radio" name="' + nombre + '" value="' + U.esc(v) + '"' + (i === 0 ? " checked" : "") + "><span>" + muestra(v) + U.esc(v) + "</span></label>").join("") + "</div>";

  const fotos = p.fotos && p.fotos.length ? p.fotos : [null];
  const esInv = p.tipo === "inventario";
  const conPrecio = p.precio != null;
  const demo = C.catalogoDemo && p.demo;

  $("#ficha").innerHTML =
    '<nav class="migas" aria-label="Ruta" style="margin-bottom:28px"><a href="index.html">Inicio</a><span>/</span><a href="tienda.html">Tienda</a><span>/</span><a href="tienda.html?cat=' + cat.id + '">' + U.esc(cat.nombre) + "</a></nav>" +
    '<div class="ficha">' +
      '<div class="galeria"><div class="principal" id="foto-principal">' + U.foto(p, 0) + U.referencial(p.fotos && p.fotos[0]) + "</div>" +
      (fotos.length > 1 ? '<div class="miniaturas">' + fotos.map((f, i) => '<button type="button" data-foto="' + i + '" aria-current="' + (i === 0) + '" aria-label="Foto ' + (i + 1) + '"><img src="' + U.esc(f) + '" alt=""></button>').join("") + "</div>" : "") +
      "</div>" +
      "<div>" +
        '<div class="etiquetas">' + U.etiquetas(p) + "</div>" +
        "<h1>" + U.esc(p.nombre) + "</h1>" +
        '<div class="precio-grande">' + (conPrecio ? (p.precioDesde ? "<small>desde </small>" : "") + U.dinero(p.precio) : "A cotizar") + "</div>" +
        '<p class="desc">' + U.esc(p.descripcion) + "</p>" +
        '<div class="bloque-tipo">' + U.icono(esInv ? "caja" : "impresora") + "<div><strong>" + (esInv ? "En inventario" : "Fabricado bajo pedido") + "</strong>" +
          (esInv ? (p.stock ? p.stock + " unidad(es) disponibles. " : "") + "Listo para retiro o envío." : "Se fabrica al confirmar tu pedido. Tiempo estimado: " + U.esc(p.tiempo) + ".") + "</div></div>" +
        (demo ? '<div class="aviso-demo" style="margin:16px 0 0">' + U.icono("info") + "<p>Producto de <strong>demostración</strong>: foto, precio y existencias son de ejemplo.</p></div>" : "") +
        '<form class="opciones-ficha" id="form-ficha" novalidate>' +
          ((p.colores || []).length ? '<div class="campo"><span class="etq">Color</span>' + pastillas("Color", p.colores) + "</div>" : "") +
          ((p.materiales || []).length > 1 ? '<div class="campo"><span class="etq">Material</span>' + pastillas("Material", p.materiales) + "</div>" : "") +
          (p.personalizable ? '<div class="campo"><label for="pers">Personalización <span class="ayuda">(opcional)</span></label><input class="control" id="pers" name="Personalización" maxlength="80" placeholder="Nombre, texto o detalle"><span class="ayuda">' + U.esc(p.personalizacion || "") + "</span></div>" : "") +
        "</form>" +
        '<div class="acciones-ficha">' +
          '<div class="cantidad grande"><button type="button" data-q="-1" aria-label="Restar">−</button><input id="cant" type="number" min="1" max="99" value="1" aria-label="Cantidad"><button type="button" data-q="1" aria-label="Sumar">+</button></div>' +
          (conPrecio
            ? '<button class="btn btn-negro" type="button" id="agregar">' + U.icono("bolsa") + "Agregar al carrito</button>"
            : '<a class="btn btn-negro" href="cotizar.html?tipo=' + tipoCot() + "&producto=" + encodeURIComponent(p.id) + '">Solicitar cotización</a>') +
          '<a class="btn btn-contorno btn-wa-ficha" id="wa-ficha" target="_blank" rel="noopener" href="#">' + U.icono("wa") + "Consultar por WhatsApp</a>" +
        "</div>" +
        '<dl class="specs">' +
          fila("Dimensiones", p.dimensiones) + fila("Materiales", (p.materiales || []).join(", ")) + fila("Colores", (p.colores || []).join(", ")) +
          fila("Tiempo estimado", p.tiempo) + fila("Categoría", cat.nombre) +
          fila("Condiciones", esInv ? "Producto terminado. Los colores pueden variar ligeramente respecto a la foto." : "El plazo empieza al confirmar el pedido y los detalles de personalización. Las piezas impresas en 3D pueden mostrar líneas de capa propias del proceso.") +
        "</dl>" +
      "</div>" +
    "</div>";

  function fila(t, v) { return v ? "<div><dt>" + t + "</dt><dd>" + U.esc(v) + "</dd></div>" : ""; }
  function tipoCot() { return { figuras: "figura", regalos: "regalo", temporada: "navidad", repuestos: "repuesto", maquetas: "escolar", empresas: "lote" }[p.categoria] || "otro"; }

  function opciones() {
    const f = $("#form-ficha"), o = {};
    f.querySelectorAll("input:checked").forEach((i) => (o[i.name] = i.value));
    const pers = f.querySelector("#pers"); if (pers && pers.value.trim()) o["Personalización"] = pers.value.trim();
    return o;
  }
  const cant = $("#cant");
  document.querySelectorAll("[data-q]").forEach((b) => b.addEventListener("click", () => {
    cant.value = Math.max(1, Math.min(99, (Number(cant.value) || 1) + Number(b.dataset.q))); actualizarWA();
  }));
  cant.addEventListener("change", () => { cant.value = Math.max(1, Math.min(99, Number(cant.value) || 1)); actualizarWA(); });
  const ag = $("#agregar");
  if (ag) ag.addEventListener("click", () => U.agregar(p.id, Number(cant.value) || 1, opciones()));

  function actualizarWA() {
    const o = opciones();
    const l = ["Hola " + C.nombre + ", me interesa este producto:", "", p.nombre + " × " + cant.value];
    Object.keys(o).forEach((k) => l.push(k + ": " + o[k]));
    if (demo) l.push("", "(Consulta desde el catálogo de demostración)");
    $("#wa-ficha").href = U.waLink(l.join("\n"));
  }
  $("#form-ficha").addEventListener("input", actualizarWA);
  $("#form-ficha").addEventListener("change", actualizarWA);
  actualizarWA();

  document.querySelectorAll("[data-foto]").forEach((b) => b.addEventListener("click", () => {
    $("#foto-principal").innerHTML = U.foto(p, Number(b.dataset.foto)) + U.referencial(p.fotos[Number(b.dataset.foto)]);
    document.querySelectorAll("[data-foto]").forEach((x) => x.setAttribute("aria-current", x === b));
  }));

  /* Relacionados */
  const rel = PRODS.filter((x) => x.id !== p.id).sort((a, b) => (b.categoria === p.categoria) - (a.categoria === p.categoria)).slice(0, 4);
  $("#relacionados").innerHTML = rel.map(U.tarjetaProducto).join("");

  /* Datos estructurados para buscadores */
  const ld = { "@context": "https://schema.org", "@type": "Product", name: p.nombre, description: p.descripcion, category: cat.nombre, brand: { "@type": "Brand", name: C.nombre } };
  if (conPrecio && !demo) ld.offers = { "@type": "Offer", priceCurrency: "USD", price: p.precio, availability: esInv ? "https://schema.org/InStock" : "https://schema.org/PreOrder" };
  const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
})();
