/* CEVA 3D — Tienda con filtros */
(function () {
  "use strict";
  const U = window.CevaUI, C = window.CEVA;
  const PRODS = window.CEVA_PRODUCTOS, CATS = window.CEVA_CATEGORIAS;
  const $ = (s) => document.querySelector(s);
  const params = new URLSearchParams(location.search);

  const estado = {
    cat: CATS.some((c) => c.id === params.get("cat")) ? params.get("cat") : "",
    q: (params.get("q") || "").trim(),
    disp: [], material: [], color: [],
    min: "", max: "", cotizar: true, orden: "rel"
  };

  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const unicos = (campo) => [...new Set(PRODS.flatMap((p) => p[campo] || []))].sort((a, b) => a.localeCompare(b, "es"));

  if (C.catalogoDemo && PRODS.some((p) => p.demo)) {
    $("#aviso-demo").innerHTML = '<div class="aviso-demo">' + U.icono("info") + "<p><strong>Catálogo de demostración.</strong> Los productos marcados como «Demostración» son ejemplos para mostrar cómo funcionará la tienda. Sus fotos, precios y existencias no son reales todavía.</p></div>";
  }

  /* Chips de categoría */
  function chips() {
    $("#chips-cat").innerHTML = [["", "Todo"]].concat(CATS.map((c) => [c.id, c.nombre])).map((c) =>
      '<button type="button" class="chip' + (estado.cat === c[0] ? " activo" : "") + '" data-cat="' + c[0] + '" aria-pressed="' + (estado.cat === c[0]) + '">' + U.esc(c[1]) + "</button>").join("");
  }
  $("#chips-cat").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    estado.cat = b.dataset.cat; chips(); pintar(); actualizarURL();
  });

  /* Filtros */
  function grupo(id, campo, opciones) {
    $(id).innerHTML = opciones.map((o) =>
      '<label class="op"><input type="checkbox" data-f="' + campo + '" value="' + U.esc(o[0]) + '"> ' + U.esc(o[1]) + '<span class="n" data-n="' + campo + "|" + U.esc(o[0]) + '"></span></label>').join("");
  }
  grupo("#f-disp", "disp", [["inventario", "En inventario"], ["pedido", "Bajo pedido"]]);
  grupo("#f-material", "material", unicos("materiales").map((m) => [m, m]));
  grupo("#f-color", "color", unicos("colores").map((m) => [m, m]));

  $("#filtros").addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.f) {
      const lista = estado[t.dataset.f];
      if (t.checked) lista.push(t.value); else lista.splice(lista.indexOf(t.value), 1);
    }
    if (t.id === "f-cotizar") estado.cotizar = t.checked;
    pintar();
  });
  ["#f-min", "#f-max"].forEach((s) => $(s).addEventListener("input", () => { estado.min = $("#f-min").value; estado.max = $("#f-max").value; pintar(); }));
  $("#orden").addEventListener("change", (e) => { estado.orden = e.target.value; pintar(); });
  $("#limpiar").addEventListener("click", () => {
    Object.assign(estado, { disp: [], material: [], color: [], min: "", max: "", cotizar: true, q: "" });
    document.querySelectorAll("#filtros input[type=checkbox]").forEach((c) => (c.checked = c.id === "f-cotizar"));
    $("#f-min").value = $("#f-max").value = "";
    pintar(); actualizarURL();
  });

  /* Filtros en móvil */
  $("#abrir-filtros").addEventListener("click", () => {
    $("#filtros").classList.add("abierto");
    document.getElementById("velo").classList.add("visible");
    document.body.style.overflow = "hidden";
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-cerrar-filtros]")) {
      $("#filtros").classList.remove("abierto");
      document.getElementById("velo").classList.remove("visible");
      document.body.style.overflow = "";
    }
  });

  function coincide(p, ignorar) {
    if (estado.cat && p.categoria !== estado.cat) return false;
    if (estado.q) {
      const texto = norm([p.nombre, p.descripcion, U.catPorId(p.categoria).nombre, (p.etiquetas || []).join(" ")].join(" "));
      if (!norm(estado.q).split(/\s+/).every((w) => texto.includes(w))) return false;
    }
    if (ignorar !== "disp" && estado.disp.length && !estado.disp.includes(p.tipo)) return false;
    if (ignorar !== "material" && estado.material.length && !(p.materiales || []).some((m) => estado.material.includes(m))) return false;
    if (ignorar !== "color" && estado.color.length && !(p.colores || []).some((m) => estado.color.includes(m))) return false;
    if (p.precio == null) return estado.cotizar;
    if (estado.min !== "" && p.precio < Number(estado.min)) return false;
    if (estado.max !== "" && p.precio > Number(estado.max)) return false;
    return true;
  }

  function pintar() {
    let lista = PRODS.filter((p) => coincide(p));
    const precio = (p) => (p.precio == null ? Infinity : p.precio);
    if (estado.orden === "asc") lista.sort((a, b) => precio(a) - precio(b));
    if (estado.orden === "desc") lista.sort((a, b) => (b.precio == null ? -1 : b.precio) - (a.precio == null ? -1 : a.precio));
    if (estado.orden === "nom") lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    if (estado.orden === "rel") lista.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));

    // Conteos por opción
    document.querySelectorAll("[data-n]").forEach((el) => {
      const [campo, valor] = el.dataset.n.split("|");
      el.textContent = PRODS.filter((p) => coincide(p, campo) && (campo === "disp" ? p.tipo === valor : (campo === "material" ? p.materiales : p.colores || []).includes(valor))).length;
    });

    const cat = CATS.find((c) => c.id === estado.cat);
    $("#titulo-tienda").innerHTML = cat ? U.esc(cat.nombre) : "Tienda <em>CEVA 3D</em>";
    $("#desc-tienda").textContent = cat ? cat.texto : "Productos listos para entrega y piezas fabricadas bajo pedido. Todo se puede consultar por WhatsApp.";
    $("#miga-actual").textContent = cat ? cat.nombre : "Tienda";
    document.title = (cat ? cat.nombre + " · " : "Tienda · ") + "CEVA 3D";

    $("#resultados").textContent = lista.length + (lista.length === 1 ? " producto" : " productos") + (estado.q ? " para «" + estado.q + "»" : "");
    $("#grid-tienda").innerHTML = lista.length
      ? lista.map(U.tarjetaProducto).join("")
      : '<div class="sin-resultados"><h3>Sin resultados</h3><p>Prueba con otros filtros o cuéntanos qué necesitas: lo podemos fabricar.</p><a class="btn btn-negro" href="cotizar.html" style="margin-top:20px">Cotizar mi idea</a></div>';
  }

  function actualizarURL() {
    const u = new URLSearchParams();
    if (estado.cat) u.set("cat", estado.cat);
    if (estado.q) u.set("q", estado.q);
    history.replaceState(null, "", location.pathname + (u.toString() ? "?" + u : ""));
  }

  const buscador = document.querySelector("#buscador input");
  if (buscador) buscador.value = estado.q;
  chips(); pintar();
})();
