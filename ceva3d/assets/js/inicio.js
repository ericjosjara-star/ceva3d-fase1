/* CEVA 3D — Página de inicio */
(function () {
  "use strict";
  const U = window.CevaUI, C = window.CEVA;
  const $ = (s) => document.querySelector(s);

  /* Categorías */
  $("#grid-cat").innerHTML = window.CEVA_CATEGORIAS.map((c, i) =>
    '<a class="tarjeta-cat revelar' + (i % 4 ? " d" + (i % 4) : "") + '" href="tienda.html?cat=' + c.id + '">' +
    '<span class="ico">' + U.icono(c.icono) + "</span>" + U.icono("diag", "flecha-cat") +
    "<div><h3>" + U.esc(c.nombre) + "</h3><p>" + U.esc(c.texto) + "</p></div></a>"
  ).join("");

  /* Destacados */
  const dest = window.CEVA_PRODUCTOS.filter((p) => p.destacado).slice(0, 4);
  $("#grid-destacados").innerHTML = dest.map(U.tarjetaProducto).join("");
  if (C.catalogoDemo && dest.some((p) => p.demo)) {
    $("#aviso-demo-inicio").innerHTML = '<div class="aviso-demo">' + U.icono("info") + "<p><strong>Catálogo de demostración.</strong> Estos productos, fotos y precios son ejemplos y se reemplazarán por el catálogo real.</p></div>";
  }

  /* Proyectos y testimonios reales: solo si existen */
  if ((C.proyectos || []).length) {
    $("#proyectos").hidden = false;
    $("#grid-proy").innerHTML = C.proyectos.map((p) =>
      '<figure class="proy revelar"><div class="par"><div><img src="' + U.esc(p.antes) + '" alt="Antes: ' + U.esc(p.titulo) + '" loading="lazy"><span>Antes</span></div>' +
      '<div><img src="' + U.esc(p.despues) + '" alt="Después: ' + U.esc(p.titulo) + '" loading="lazy"><span>Después</span></div></div>' +
      "<figcaption><strong>" + U.esc(p.titulo) + "</strong><p>" + U.esc(p.texto || "") + "</p></figcaption></figure>").join("");
  }
  if ((C.testimonios || []).length) {
    $("#testimonios").hidden = false;
    $("#grid-testi").innerHTML = C.testimonios.map((t) =>
      '<figure class="testi revelar"><blockquote>“' + U.esc(t.texto) + '”</blockquote><footer>' + U.esc(t.nombre) + (t.fuente ? " · " + U.esc(t.fuente) : "") + "</footer></figure>").join("");
  }

  /* Etiquetas de imagen referencial y fecha límite de Navidad */
  document.querySelectorAll("[data-ref]").forEach((el) => { el.outerHTML = U.referencial(el.dataset.ref); });
  const nav = C.navidad || {};
  if (nav.fechaLimite) { const s = $("#sello-navidad"); s.hidden = false; s.innerHTML = "Reserva hasta el <strong>" + U.esc(nav.fechaLimite) + "</strong> para asegurar tu entrega."; }

  /* Contacto */
  document.querySelectorAll("[data-wa]").forEach((a) => { a.href = U.waLink("Hola " + C.nombre + ", tengo una consulta."); a.target = "_blank"; a.rel = "noopener"; });
  const datos = [
    '<a href="' + U.waLink() + '" target="_blank" rel="noopener">WhatsApp ' + U.esc(C.whatsappVisible) + "</a>",
    C.correo && '<a href="mailto:' + U.esc(C.correo) + '">' + U.esc(C.correo) + "</a>",
    C.horario && "<span>" + U.esc(C.horario) + "</span>",
    C.ubicacion && "<span>" + U.esc(C.ubicacion) + "</span>"
  ].filter(Boolean);
  $("#datos-contacto").innerHTML = datos.join("");

  /* Hero: impresión animada capa por capa */
  const svg = $("#impresion");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const N = 26, CX = 200, BASE = 330, PASO = 8.2;
  const perfil = (t) => { // radio de cada capa (forma de jarrón)
    const pts = [[0, 66], [0.3, 96], [0.62, 80], [0.84, 50], [1, 62]];
    for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) {
      const a = pts[i - 1], b = pts[i], k = (t - a[0]) / (b[0] - a[0]), s = k * k * (3 - 2 * k);
      return a[1] + (b[1] - a[1]) * s;
    }
    return 62;
  };
  const el = (tag, at) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); return e; };

  // Cama de impresión
  svg.appendChild(el("path", { d: "M58 318 L342 318 L372 362 L28 362 Z", fill: "#161616", stroke: "#2e2e2e", "stroke-width": 1.5 }));
  for (let i = 1; i < 6; i++) {
    const x = 58 + i * (284 / 6), xb = 28 + i * (344 / 6);
    svg.appendChild(el("path", { d: "M" + x + " 318 L" + xb + " 362", stroke: "#242424", "stroke-width": 1 }));
  }
  svg.appendChild(el("path", { d: "M43 340 L357 340", stroke: "#242424", "stroke-width": 1 }));
  // Guías verticales
  svg.appendChild(el("path", { d: "M40 60 V318 M360 60 V318", stroke: "#2e2e2e", "stroke-width": 3, "stroke-linecap": "round" }));

  const capas = [];
  const grupo = el("g", {});
  svg.appendChild(grupo);
  for (let i = 0; i < N; i++) {
    const r = perfil(i / (N - 1)), y = BASE - i * PASO;
    const c = el("ellipse", { cx: CX, cy: y, rx: r, ry: r * 0.3, fill: "#141414", stroke: "rgba(255,255,255,.5)", "stroke-width": 1.2, opacity: 0 });
    grupo.appendChild(c); capas.push({ el: c, r: r, y: y });
  }
  // Pórtico + cabezal
  const portico = el("g", {});
  portico.appendChild(el("rect", { x: 34, y: -4, width: 332, height: 8, rx: 4, fill: "#2a2a2a" }));
  const cabezal = el("g", {});
  cabezal.appendChild(el("rect", { x: -18, y: -16, width: 36, height: 30, rx: 6, fill: "#fff" }));
  cabezal.appendChild(el("rect", { x: -18, y: -16, width: 36, height: 6, rx: 3, fill: "#FFF000" }));
  cabezal.appendChild(el("path", { d: "M-6 14 L6 14 L2 26 L-2 26 Z", fill: "#bdbdbd" }));
  cabezal.appendChild(el("circle", { cx: 0, cy: 28, r: 2.6, fill: "#FFF000" }));
  portico.appendChild(cabezal);
  svg.appendChild(portico);

  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CICLO = 10000;
  function dibujar(p, ang) {
    const cons = 0.82, fin = 0.94;
    let visibles = p < cons ? Math.floor((p / cons) * N) + 1 : N;
    const alfa = p < fin ? 1 : Math.max(0, 1 - (p - fin) / (1 - fin));
    capas.forEach((c, i) => {
      c.el.setAttribute("opacity", i < visibles ? alfa : 0);
      const actual = i === visibles - 1 && p < cons;
      c.el.setAttribute("stroke", actual ? "#FFF000" : "rgba(255,255,255,.5)");
      c.el.setAttribute("stroke-width", actual ? 2.2 : 1.2);
    });
    const cap = capas[Math.min(visibles, N) - 1];
    const x = p < cons ? CX + cap.r * Math.cos(ang) : CX;
    const yCap = p < cons ? cap.y + cap.r * 0.3 * Math.sin(ang) : capas[N - 1].y - 40;
    portico.setAttribute("transform", "translate(0 " + (yCap - 28) + ")");
    cabezal.setAttribute("transform", "translate(" + x + " 0)");
  }
  if (reducido) { dibujar(0.9, 0); return; }
  let t0 = null;
  function cuadro(t) {
    if (t0 == null) t0 = t;
    const e = (t - t0) % CICLO;
    dibujar(e / CICLO, (t - t0) / 1000 * 5.5);
    requestAnimationFrame(cuadro);
  }
  requestAnimationFrame(cuadro);
})();
