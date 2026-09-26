/* CEVA 3D — Cotizador por pasos */
(function () {
  "use strict";
  const U = window.CevaUI, C = window.CEVA;
  const $ = (s) => document.querySelector(s);
  const form = $("#cotizador");
  const params = new URLSearchParams(location.search);
  const inicio = Date.now();

  const TIPOS = [
    ["archivo",   "Imprimir mi archivo 3D",  "Tengo un STL, OBJ o 3MF listo.", "archivo"],
    ["repuesto",  "Repuesto o pieza",        "Perillas, soportes, piezas rotas.", "pieza"],
    ["figura",    "Figura estilo Funko",     "Tú, tu familia, tu mascota o un personaje original.", "figura"],
    ["navidad",   "Navidad 2026",            "Adornos con nombre, esferas y regalos.", "estrella"],
    ["regalo",    "Regalo o recuerdo",       "Con nombre, fecha o mensaje.", "regalo"],
    ["escolar",   "Proyecto escolar o maqueta", "Tareas, ferias de ciencias, material didáctico.", "maqueta"],
    ["prototipo", "Prototipo",               "Para emprendimientos, profesionales o empresas.", "gadget"],
    ["lote",      "Producción por lotes",    "Varias unidades de la misma pieza.", "lote"],
    ["diseno",    "Diseño 3D desde cero",    "Tengo la idea, necesito el modelo.", "lapiz"],
    ["otro",      "Otro proyecto",           "Cuéntanos qué tienes en mente.", "chat"]
  ];
  $("#tipos").innerHTML = TIPOS.map((t) =>
    '<div class="tipo"><input type="radio" name="tipo" id="t-' + t[0] + '" value="' + t[0] + '"><label for="t-' + t[0] + '"><span class="ico">' + U.icono(t[3]) + "</span><span><strong>" + t[1] + "</strong><small>" + t[2] + "</small></span></label></div>").join("");

  /* Datos precargados desde la URL o un borrador anterior */
  const borrador = U.leer("ceva3d-cotizacion", {});
  Object.keys(borrador).forEach((k) => {
    const el = form.elements[k];
    if (!el || k === "sitio") return;
    if (el instanceof RadioNodeList) { [...el].forEach((r) => (r.checked = r.value === borrador[k])); }
    else if (el.type === "checkbox") el.checked = !!borrador[k];
    else el.value = borrador[k];
  });
  const tipoURL = params.get("tipo");
  if (TIPOS.some((t) => t[0] === tipoURL)) form.elements.tipo.value = tipoURL;
  const prodURL = U.prodPorId(params.get("producto") || "");
  if (prodURL && !form.elements.descripcion.value) form.elements.descripcion.value = "Me interesa: " + prodURL.nombre + ". ";
  const hoy = new Date(); hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  form.elements.fecha.min = hoy.toISOString().slice(0, 10);

  function guardarBorrador() {
    const d = {};
    ["tipo", "alto", "ancho", "largo", "cantidad", "fecha", "material", "color", "acabado", "descripcion", "nombre", "telefono", "correo"].forEach((k) => (d[k] = form.elements[k].value));
    d.sinMedidas = form.elements.sinMedidas.checked;
    U.guardar("ceva3d-cotizacion", d);
  }
  form.addEventListener("input", guardarBorrador);
  form.addEventListener("change", () => { guardarBorrador(); consentimientoFotos(); });

  /* ---------- Archivos ---------- */
  const EXT_IMG = ["jpg", "jpeg", "png", "webp", "heic", "heif"], EXT_3D = ["stl", "obj", "3mf"];
  const MAX_ARCH = 10, MAX_MB = 50;
  let archivos = [];
  const ext = (n) => (n.split(".").pop() || "").toLowerCase();
  const tam = (b) => (b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");

  function sumar(lista) {
    const errores = [];
    [...lista].forEach((f) => {
      const e = ext(f.name);
      if (!EXT_IMG.includes(e) && !EXT_3D.includes(e)) return errores.push(f.name + ": formato no admitido");
      if (f.size > MAX_MB * 1048576) return errores.push(f.name + ": supera " + MAX_MB + " MB");
      if (archivos.length >= MAX_ARCH) return errores.push("Máximo " + MAX_ARCH + " archivos");
      if (archivos.some((a) => a.name === f.name && a.size === f.size)) return;
      archivos.push(f);
    });
    error("archivos", [...new Set(errores)].join(" · "));
    pintarArchivos(); consentimientoFotos();
  }
  function pintarArchivos() {
    $("#lista-archivos").innerHTML = archivos.map((f, i) => {
      const e = ext(f.name), img = EXT_IMG.includes(e) && !["heic", "heif"].includes(e);
      const tn = img ? '<img src="' + URL.createObjectURL(f) + '" alt="">' : e.toUpperCase();
      return '<li><span class="tn">' + tn + '</span><span class="nom">' + U.esc(f.name) + "<small>" + tam(f.size) + "</small></span>" +
        '<button type="button" data-quitar-arch="' + i + '" aria-label="Quitar ' + U.esc(f.name) + '">' + U.icono("cerrar") + "</button></li>";
    }).join("");
  }
  $("#archivos").addEventListener("change", (e) => { sumar(e.target.files); e.target.value = ""; });
  $("#lista-archivos").addEventListener("click", (e) => {
    const b = e.target.closest("[data-quitar-arch]"); if (!b) return;
    archivos.splice(Number(b.dataset.quitarArch), 1); pintarArchivos(); consentimientoFotos();
  });
  const zona = $("#zona");
  ["dragenter", "dragover"].forEach((ev) => zona.addEventListener(ev, (e) => { e.preventDefault(); zona.classList.add("encima"); }));
  ["dragleave", "drop"].forEach((ev) => zona.addEventListener(ev, (e) => { e.preventDefault(); zona.classList.remove("encima"); }));
  zona.addEventListener("drop", (e) => sumar(e.dataTransfer.files));

  function consentimientoFotos() {
    const requiere = form.elements.tipo.value === "figura";
    $("#consent-fotos-wrap").hidden = !requiere;
    if (!requiere) error("consentFotos", "");
  }

  /* ---------- Validación ---------- */
  function error(campo, msg) {
    const el = form.querySelector('[data-error="' + campo + '"]');
    if (el) el.textContent = msg || "";
    const ctl = form.elements[campo];
    if (ctl && ctl.classList) ctl.classList.toggle("invalido", !!msg);
    return !msg;
  }
  function validar(paso) {
    const f = form.elements;
    let ok = true;
    if (paso === 1) ok = error("tipo", f.tipo.value ? "" : "Elige un tipo de proyecto para continuar.");
    if (paso === 3) {
      const cant = Number(f.cantidad.value);
      ok = error("cantidad", cant >= 1 && cant <= 10000 && Number.isInteger(cant) ? "" : "Indica una cantidad válida.") & ok;
      ok = error("fecha", !f.fecha.value || f.fecha.value >= f.fecha.min ? "" : "La fecha debe ser posterior a hoy.") & ok;
      ok = error("descripcion", f.descripcion.value.trim().length >= 10 ? "" : "Describe tu proyecto en al menos una frase.") & ok;
    }
    if (paso === 4) {
      ok = error("nombre", f.nombre.value.trim().length >= 2 ? "" : "Escribe tu nombre.") & ok;
      const tel = f.telefono.value.replace(/[\s()-]/g, "");
      ok = error("telefono", /^\+?\d{9,13}$/.test(tel) ? "" : "Escribe un número válido, por ejemplo 0991234567.") & ok;
      ok = error("correo", !f.correo.value || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.correo.value.trim()) ? "" : "Revisa el correo electrónico.") & ok;
      if (f.tipo.value === "figura") ok = error("consentFotos", f.consentFotos.checked ? "" : "Necesitamos tu confirmación para trabajar con fotografías de personas.") & ok;
      ok = error("consentDatos", f.consentDatos.checked ? "" : "Acepta el uso de tus datos para poder responderte.") & ok;
    }
    if (!ok) { const inv = form.querySelector(".panel-paso.activo .invalido, .panel-paso.activo [data-error]:not(:empty)"); if (inv) inv.scrollIntoView({ behavior: "smooth", block: "center" }); }
    return !!ok;
  }

  /* ---------- Navegación ---------- */
  const TOTAL = 5;
  const NOMBRES = ["Proyecto", "Referencias", "Detalles", "Tus datos", "Enviar"];
  let paso = 1;
  function ir(n, foco) {
    paso = n;
    form.querySelectorAll(".panel-paso").forEach((p) => p.classList.toggle("activo", Number(p.dataset.paso) === n));
    document.querySelectorAll("#progreso li").forEach((li, i) => {
      li.classList.toggle("actual", i + 1 === n); li.classList.toggle("hecho", i + 1 < n);
      if (i + 1 === n) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
    });
    $("#barra").style.width = (n / TOTAL) * 100 + "%";
    $("#paso-movil").textContent = "Paso " + n + " de " + TOTAL + " · " + NOMBRES[n - 1];
    $("#atras").style.visibility = n === 1 ? "hidden" : "visible";
    $("#siguiente").hidden = n === TOTAL;
    $("#siguiente").firstChild.textContent = n === TOTAL - 1 ? "Revisar solicitud " : "Continuar ";
    if (n === TOTAL) resumen();
    if (foco !== false) {
      const top = form.getBoundingClientRect().top + window.scrollY - 110;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: "smooth" });
      const h = form.querySelector(".panel-paso.activo h2"); h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true });
    }
  }
  $("#siguiente").addEventListener("click", () => { if (validar(paso)) ir(paso + 1); });
  $("#atras").addEventListener("click", () => ir(Math.max(1, paso - 1)));
  form.addEventListener("submit", (e) => e.preventDefault());
  $("#tipos").addEventListener("change", () => { error("tipo", ""); });

  /* ---------- Resumen y mensaje ---------- */
  let referencia = sessionRef();
  function sessionRef() {
    let r; try { r = sessionStorage.getItem("ceva3d-ref"); } catch (e) {}
    if (!r) {
      const d = new Date(), abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      r = "CEVA-" + String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0") + "-" +
        Array.from({ length: 4 }, () => abc[Math.floor(Math.random() * abc.length)]).join("");
      try { sessionStorage.setItem("ceva3d-ref", r); } catch (e) {}
    }
    return r;
  }
  function datos() {
    const f = form.elements;
    const tipo = TIPOS.find((t) => t[0] === f.tipo.value);
    const dims = [["Alto", f.alto.value], ["Ancho", f.ancho.value], ["Largo", f.largo.value]].filter((d) => d[1]).map((d) => d[0] + " " + d[1] + " cm").join(" × ");
    const fecha = f.fecha.value ? new Date(f.fecha.value + "T12:00").toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" }) : "";
    return [
      ["Proyecto", tipo ? tipo[1] : "", 1],
      ["Referencias", archivos.length ? archivos.map((a) => a.name).join("\n") : "Sin archivos", 2],
      ["Dimensiones", f.sinMedidas.checked ? "Medidas por confirmar" : dims || "No indicadas", 3],
      ["Cantidad", f.cantidad.value, 3],
      ["Material", f.material.value, 3],
      ["Color", f.color.value.trim() || "Por definir", 3],
      ["Acabado", f.acabado.value, 3],
      ["Fecha requerida", fecha || "Sin fecha específica", 3],
      ["Descripción", f.descripcion.value.trim(), 3],
      ["Nombre", f.nombre.value.trim(), 4],
      ["Teléfono", f.telefono.value.trim(), 4],
      ["Correo", f.correo.value.trim() || "No indicado", 4]
    ];
  }
  function mensaje() {
    const l = ["Hola " + C.nombre + ", quiero cotizar un proyecto.", "Referencia: " + referencia, ""];
    datos().forEach((d) => {
      if (d[0] === "Referencias") { l.push("Archivos (" + archivos.length + "):" + (archivos.length ? "" : " ninguno")); archivos.forEach((a) => l.push("  - " + a.name)); }
      else l.push(d[0] + ": " + d[1]);
    });
    if (archivos.length) l.push("", "Adjunto los archivos a continuación en este chat.");
    return l.join("\n");
  }
  function resumen() {
    $("#resumen").innerHTML =
      '<div class="ref"><div><small>Referencia de tu solicitud</small><strong>' + referencia + "</strong></div>" +
      '<span class="tag nuevo">Pendiente de envío</span></div><dl>' +
      datos().map((d) => "<div><dt>" + d[0] + ' <button type="button" class="editar" data-ir="' + d[2] + '">Editar</button></dt><dd>' + U.esc(d[1]) + "</dd></div>").join("") + "</dl>";
    const n = archivos.length;
    $("#instrucciones").innerHTML = U.icono("info") + "<div><p><strong>Cómo enviar tu solicitud</strong></p>" +
      '<ol class="pasos-envio" style="margin-top:12px">' +
      "<li><span>Pulsa «Enviar por WhatsApp». Se abrirá el chat con tu solicitud ya escrita.</span></li>" +
      "<li><span>Envía el mensaje sin borrar la referencia <strong>" + referencia + "</strong>.</span></li>" +
      (n ? "<li><span>En el mismo chat, adjunta tus " + n + " archivo" + (n > 1 ? "s" : "") + " con el botón de adjuntar. WhatsApp no permite adjuntarlos automáticamente desde una página web" + (navigator.canShare ? "; en el teléfono puedes usar «Compartir con archivos»" : "") + ".</span></li>" : "") +
      "<li><span>Revisamos la viabilidad técnica y te respondemos con precio, material y plazo.</span></li></ol></div>";
    $("#enviar-wa").href = U.waLink(mensaje());
    const compartir = $("#compartir");
    compartir.hidden = !(n && navigator.canShare && navigator.canShare({ files: archivos }));
  }
  $("#resumen").addEventListener("click", (e) => { const b = e.target.closest("[data-ir]"); if (b) ir(Number(b.dataset.ir)); });

  $("#enviar-wa").addEventListener("click", (e) => {
    if (form.elements.sitio.value || Date.now() - inicio < 4000) { e.preventDefault(); return; } // protección básica contra bots
    U.toast("Abriendo WhatsApp…");
  });
  $("#copiar").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(mensaje()); U.toast("Mensaje copiado"); }
    catch (e) { U.toast("No se pudo copiar. Usa el botón de WhatsApp."); }
  });
  $("#compartir").addEventListener("click", async () => {
    try { await navigator.share({ files: archivos, title: "Solicitud " + referencia, text: mensaje() }); }
    catch (e) { /* el usuario canceló */ }
  });

  consentimientoFotos();
  ir(tipoURL && form.elements.tipo.value ? 2 : 1, false);
})();
