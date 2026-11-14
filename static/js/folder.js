/* Folder-tab landing page: vanilla JS port of the user-supplied template (drawn type, signature, tabs, filters). */
;(function(){
const GLYPHS = {
  A: { w: 120, d: "M0 100 L60 0 L120 100 M22 64 H98" },
  B: { w: 99, d: "M0 0 V100 M0 0 H68 A25 25 0 0 1 68 50 H0 M0 50 H74 A25 25 0 0 1 74 100 H0" },
  C: { w: 118, d: "M109.5 17.9 A62 50 0 1 0 109.5 82.1" },
  D: { w: 104, d: "M0 0 V100 M0 0 H52 A52 50 0 0 1 52 100 H0" },
  E: { w: 100, d: "M100 0 H0 V100 H100 M0 50 H86" },
  F: { w: 100, d: "M100 0 H0 V100 M0 50 H86" },
  G: { w: 124, d: "M109.5 17.9 A62 50 0 1 0 124 50 H72" },
  H: { w: 110, d: "M0 0 V100 M110 0 V100 M0 50 H110" },
  I: { w: 0, d: "M0 0 V100" },
  J: { w: 90, d: "M90 0 V58 A42 42 0 0 1 6 58" },
  K: { w: 108, d: "M0 0 V100 M104 0 L0 60 M34 40 L108 100" },
  L: { w: 92, d: "M0 0 V100 H92" },
  M: { w: 132, d: "M0 100 V0 L66 70 L132 0 V100" },
  N: { w: 110, d: "M0 100 V0 L110 100 V0" },
  O: { w: 124, d: "M62 0 A62 50 0 1 1 62 100 A62 50 0 1 1 62 0" },
  P: { w: 97, d: "M0 100 V0 H70 A27 27 0 0 1 70 54 H0" },
  Q: { w: 124, d: "M62 0 A62 50 0 1 1 62 100 A62 50 0 1 1 62 0 M84 74 L124 104" },
  R: { w: 104, d: "M0 100 V0 H70 A27 27 0 0 1 70 54 H0 M60 54 L104 100" },
  S: { w: 116, d: "M112 18 C100 4 80 0 60 0 H52 C24 0 4 10 4 27 C4 44 22 50 56 50 H64 C98 50 116 58 116 74 C116 90 96 100 64 100 H54 C32 100 12 94 0 80" },
  T: { w: 116, d: "M0 0 H116 M58 0 V100" },
  U: { w: 110, d: "M0 0 V50 A55 50 0 0 0 110 50 V0" },
  V: { w: 120, d: "M0 0 L60 100 L120 0" },
  W: { w: 160, d: "M0 0 L40 100 L80 20 L120 100 L160 0" },
  X: { w: 112, d: "M0 0 L112 100 M112 0 L0 100" },
  Y: { w: 116, d: "M0 0 L58 52 L116 0 M58 52 V100" },
  Z: { w: 114, d: "M4 0 H112 L0 100 H114" },
  "0": { w: 92, d: "M46 0 A46 50 0 1 1 46 100 A46 50 0 1 1 46 0" },
  "1": { w: 44, d: "M6 22 L44 0 V100" },
  "2": { w: 100, d: "M2 26 C6 8 26 0 50 0 C78 0 98 10 98 28 C98 50 70 56 40 70 C16 81 2 90 0 100 H100" },
  "3": { w: 100, d: "M4 10 C16 3 32 0 50 0 C78 0 96 10 96 26 C96 42 78 48 48 48 M48 48 C82 48 100 58 100 74 C100 92 80 100 50 100 C30 100 12 96 0 88" },
  "4": { w: 108, d: "M78 100 V0 L0 70 H108" },
  "5": { w: 100, d: "M96 0 H12 L6 46 C20 40 34 38 52 38 C82 38 100 50 100 69 C100 88 80 100 52 100 C30 100 12 96 0 88" },
  "6": { w: 102, d: "M88 6 C76 2 64 0 52 0 C20 0 0 22 0 52 C0 80 22 100 52 100 C82 100 102 86 102 66 C102 46 82 34 54 34 C30 34 8 44 0 58" },
  "7": { w: 104, d: "M0 0 H104 L40 100" },
  "8": { w: 100, d: "M50 0 A44 23 0 1 1 50 46 A44 23 0 1 1 50 0 M50 46 A50 27 0 1 1 50 100 A50 27 0 1 1 50 46" },
  "9": { w: 102, d: "M14 94 C26 98 38 100 50 100 C82 100 102 78 102 48 C102 20 80 0 50 0 C20 0 0 14 0 34 C0 54 20 66 48 66 C72 66 94 56 102 42" },
  "#": { w: 96, d: "M34 6 L22 94 M78 6 L66 94 M6 34 H96 M0 66 H90" },
  "-": { w: 48, d: "M0 56 H48" },
  "–": { w: 64, d: "M0 56 H64" },
  ".": { w: 0, d: "M0 99.5 L0 100" },
  ",": { w: 6, d: "M6 96 L0 112" },
  ":": { w: 0, d: "M0 44 L0 44.5 M0 99.5 L0 100" },
  "'": { w: 0, d: "M0 0 V24" },
  "’": { w: 0, d: "M0 0 V24" },
  "/": { w: 70, d: "M70 -4 L0 104" },
  "+": { w: 76, d: "M0 50 H76 M38 12 V88" },
  "(": { w: 32, d: "M32 -8 Q-12 50 32 108" },
  ")": { w: 32, d: "M0 -8 Q44 50 0 108" },
  "!": { w: 0, d: "M0 0 V70 M0 99.5 V100" },
  "?": { w: 92, d: "M0 24 C4 8 22 0 46 0 C74 0 92 10 92 28 C92 48 50 50 50 72 M50 99.5 V100" },
  "&": { w: 104, d: "M100 100 L22 30 C10 18 18 0 42 0 C64 0 72 16 60 28 L14 62 C2 72 4 100 42 100 C66 100 84 88 98 66" },
}
const SPACE = 52
const LIGATURES = {
  OO: { w: 210, d: "M50 0 H160 A50 50 0 0 1 160 100 H50 A50 50 0 0 1 50 0" },
}
function layoutText(text, tracking, ligatures) {
  const chars = [...text.toUpperCase()]
  const items = []
  let x = 0
  for (let i = 0; i < chars.length; i++) {
    const pair = chars[i] + (chars[i + 1] ?? "")
    if (ligatures && LIGATURES[pair]) {
      items.push({ ch: pair, x, d: LIGATURES[pair].d })
      x += LIGATURES[pair].w + tracking
      i++
      continue
    }
    const g = GLYPHS[chars[i]]
    if (!g) {
      x += SPACE
      continue
    }
    items.push({ ch: chars[i], x, d: g.d })
    x += g.w + tracking
  }
  const width = Math.max(0, items.length ? x - tracking : 0)
  return { items, width }
}

// Each "M" starts its own <path>, so the draw-on dash runs per stroke.
function splitSubpaths(d) {
  return d.split(/(?=M)/).map((s) => s.trim()).filter(Boolean)
}
// #endregion type

// #region sign
// A seeded PRNG and a string hash, so generated art is stable per input.
function hashString(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const r1 = (n) => Math.round(n * 10) / 10

// A handwritten-looking signature: one continuous stroke of loops, humps and
// descenders read off the letters of a name, finished with an underline swash.
// It is a scrawl, not lettering, which is what most signatures are anyway.
function signaturePath(text) {
  const letters = [...text.replace(/[^A-Za-z]/g, "")].slice(0, 12)
  const rnd = rng(hashString(text || "signature"))
  const base = 64
  let x = 4
  let d = "M0 " + (base + 6) + " C1 " + (base + 2) + " 2 " + base + " " + x + " " + base
  const loop = (w, h) =>
    " C" + r1(x + w * 0.95) + " " + r1(base - h * 0.5) + " " + r1(x + w * 0.9) + " " + r1(base - h) + " " + r1(x + w * 0.55) + " " + r1(base - h) +
    " C" + r1(x + w * 0.15) + " " + r1(base - h) + " " + r1(x + w * 0.3) + " " + base + " " + r1(x + w) + " " + base
  if (!letters.length) letters.push("s")
  letters.forEach((ch, i) => {
    const lower = ch.toLowerCase()
    const cap = ch !== lower || i === 0
    let w = 16 + rnd() * 10
    if (cap) {
      w += 12
      d += loop(w, 52 + rnd() * 8)
    } else if (/[bdfhklt]/.test(lower)) d += loop(w, 42 + rnd() * 6)
    else if (/[gjpqyz]/.test(lower)) d += loop(w, -(30 + rnd() * 6))
    else if (rnd() < 0.55) {
      const k = 15 + rnd() * 6
      d += " C" + r1(x + w * 0.1) + " " + r1(base - k) + " " + r1(x + w * 0.8) + " " + r1(base - k) + " " + r1(x + w) + " " + base
    } else d += loop(w, 16 + rnd() * 5)
    x += w
  })
  d +=
    " C" + r1(x + 18) + " " + (base - 6) + " " + r1(x + 20) + " " + (base + 16) + " " + r1(x - 6) + " " + (base + 18) +
    " C" + r1(x * 0.55) + " " + (base + 22) + " " + r1(x * 0.25) + " " + (base + 12) + " 4 " + (base + 20)
  return { d, width: r1(x + 24) }
}
function frondPath(seed, size = 400) {
  const rnd = rng(seed)
  const s = size / 400
  const P = (t) => ({
    x: (1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 110 + t * t * 370,
    y: (1 - t) * (1 - t) * 390 + 2 * (1 - t) * t * 110 + t * t * 60,
  })
  let d = ""
  for (let t = 0.08; t < 0.97; t += 0.05) {
    const a = P(t)
    const b = P(t + 0.01)
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1
    const tx = (b.x - a.x) / len
    const ty = (b.y - a.y) / len
    const L = (40 + 120 * Math.pow(Math.sin(Math.PI * t), 0.8)) * (0.9 + rnd() * 0.2)
    for (const side of [1, -1]) {
      const nx = -ty * side
      const ny = tx * side
      const qx = a.x + (nx * 0.72 + tx * 0.7) * L
      const qy = a.y + (ny * 0.72 + ty * 0.7) * L
      const wdt = 7 + 5 * Math.sin(Math.PI * t)
      const mx = (a.x + qx) / 2
      const my = (a.y + qy) / 2
      d +=
        "M" + r1(a.x * s) + " " + r1(a.y * s) +
        " Q" + r1((mx + nx * wdt - tx * wdt) * s) + " " + r1((my + ny * wdt - ty * wdt) * s) + " " + r1(qx * s) + " " + r1(qy * s) +
        " Q" + r1((mx - nx * wdt * 0.4 + tx * wdt) * s) + " " + r1((my - ny * wdt * 0.4 + ty * wdt) * s) + " " + r1(a.x * s) + " " + r1(a.y * s) + "Z"
    }
  }
  return d
}

/* ---------------------------------------------------------------- app ----- */
(function () {
  var root = document.querySelector(".ftp-root");
  if (!root) return;
  var NS = "http://www.w3.org/2000/svg";
  var TONE = { blue: "var(--ftp-blue)", green: "var(--ftp-green)", orange: "var(--ftp-orange)", yellow: "var(--ftp-yellow)" };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pad2 = function (n) { return (n < 10 ? "0" : "") + n; };
  var svgEl = function (tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };

  /* -------- drawn type -------- */
  function mkStroke(h) {
    var d = h.dataset;
    var text = d.st || h.textContent;
    var weight = +(d.weight || 8), outline = +(d.outline || 0);
    var tracking = d.tracking !== undefined ? +d.tracking : 26;
    var color = d.color || "currentColor", inner = d.inner || "var(--ftp-sheet)";
    var delay = +(d.delay || 0), lig = d.lig !== "0";
    var L = layoutText(text, tracking + weight * 0.6, lig);
    var p = weight / 2 + 2, vbW = r1(L.width + p * 2), vbH = r1(124 + p * 2);
    var svg = svgEl("svg", { "class": "ftp-st" + (h.className ? " " + h.className : ""), viewBox: r1(-p) + " " + r1(-12 - p) + " " + vbW + " " + vbH, width: vbW, height: vbH });
    if (d.decorative !== undefined) svg.setAttribute("aria-hidden", "true");
    else { svg.setAttribute("role", "img"); svg.setAttribute("aria-label", d.label || text); }
    svg.style.setProperty("--d", delay + "ms");
    var layers = outline > 0 ? [{ c: color, w: weight }, { c: inner, w: Math.max(0.5, weight - outline * 2) }] : [{ c: color, w: weight }];
    layers.forEach(function (layer) {
      var g = svgEl("g", { fill: "none", stroke: layer.c, "stroke-width": layer.w, "stroke-linecap": "round", "stroke-linejoin": "round" });
      L.items.forEach(function (it, i) {
        var gg = svgEl("g", { transform: "translate(" + r1(it.x) + " 0)" });
        var gl = svgEl("g", { "class": "ftp-gl" });
        gl.style.setProperty("--i", i);
        splitSubpaths(it.d).forEach(function (sp) { gl.appendChild(svgEl("path", { d: sp, pathLength: 1, "class": "ftp-draw" })); });
        gg.appendChild(gl);
        g.appendChild(gg);
      });
      svg.appendChild(g);
    });
    h.replaceWith(svg);
  }

  function mkSig(h) {
    var sig = signaturePath(h.dataset.sig || "signature");
    var w = sig.width + 34;
    var svg = svgEl("svg", { "class": "ftp-sig" + (h.className ? " " + h.className : ""), viewBox: "-30 -2 " + w + " 106", width: w, height: 106, "aria-hidden": "true" });
    svg.style.setProperty("--d", (+(h.dataset.delay || 0)) + "ms");
    svg.appendChild(svgEl("path", { d: sig.d, transform: "skewX(-14)", fill: "none", stroke: "currentColor", "stroke-width": 3.2, "stroke-linecap": "round", "stroke-linejoin": "round", pathLength: 1, "class": "ftp-draw" }));
    h.replaceWith(svg);
  }

  function mkPalm(h) {
    var svg = svgEl("svg", { "class": h.className, viewBox: "0 0 400 400", "aria-hidden": "true" });
    svg.appendChild(svgEl("path", { d: frondPath(7), fill: "currentColor" }));
    h.replaceWith(svg);
  }

  /* generated exam cover: tone colour, soft shapes, the mark drawn in strokes */
  function mkCover(h) {
    var seed = hashString(h.dataset.cover || "x"), rnd = rng(seed);
    var tone = TONE[h.dataset.tone] || TONE.blue;
    var mark = (h.dataset.mark || "").toUpperCase();
    var svg = svgEl("svg", { viewBox: "0 0 320 220", preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true" });
    svg.style.width = "100%"; svg.style.height = "100%";
    svg.appendChild(svgEl("rect", { width: 320, height: 220, fill: tone }));
    for (var i = 0; i < 3; i++) {
      svg.appendChild(svgEl("circle", { cx: r1(rnd() * 320), cy: r1(rnd() * 220), r: r1(46 + rnd() * 70), fill: "#fff", opacity: r1(0.08 + rnd() * 0.14) }));
    }
    svg.appendChild(svgEl("rect", { x: 14, y: 14, width: 292, height: 192, rx: 14, fill: "none", stroke: "#fff", "stroke-opacity": 0.45, "stroke-dasharray": "3 6" }));
    if (mark) {
      var L = layoutText(mark, 26, true);
      var sc = Math.min(0.9, 236 / Math.max(L.width, 1));
      var g = svgEl("g", { transform: "translate(" + r1((320 - L.width * sc) / 2) + " " + r1(110 - 50 * sc) + ") scale(" + r1(sc) + ")", fill: "none", stroke: "#fff", "stroke-width": 11, "stroke-linecap": "round", "stroke-linejoin": "round" });
      L.items.forEach(function (it) {
        g.appendChild(svgEl("path", { d: it.d, transform: "translate(" + r1(it.x) + " 0)" }));
      });
      svg.appendChild(g);
    }
    h.replaceWith(svg);
    return svg;
  }

  var q = function (s, c) { return Array.prototype.slice.call((c || root).querySelectorAll(s)); };
  q("[data-st]").forEach(mkStroke);
  q("[data-sig]").forEach(mkSig);
  q("[data-palm]").forEach(mkPalm);
  q("[data-cover]").forEach(mkCover);

  /* -------- navigation -------- */
  var sheets = q("[data-sheet]");
  var links = q(".ftp-link");
  var ind = q(".ftp-ind")[0];
  var listEl = q(".ftp-links")[0];
  var curEl = q("[data-cur]")[0];
  var current = "cover";

  function goTo(id) {
    var el = root.querySelector('[data-sheet="' + id + '"]');
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  function setCurrent(id) {
    current = id;
    var idx = 0;
    links.forEach(function (l, i) {
      var on = l.dataset.go === id;
      if (on) idx = i;
      if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
    });
    if (curEl) curEl.textContent = pad2(idx + 1);
    var l = links[idx];
    if (l && ind) {
      ind.style.transform = "translateX(" + l.offsetLeft + "px)";
      ind.style.width = l.offsetWidth + "px";
      ind.style.opacity = 1;
      if (listEl && listEl.scrollWidth > listEl.clientWidth) listEl.scrollTo({ left: l.offsetLeft - listEl.clientWidth / 2 + l.offsetWidth / 2, behavior: "smooth" });
    }
  }
  links.forEach(function (l) { l.addEventListener("click", function () { goTo(l.dataset.go); }); });
  q("[data-goto]").forEach(function (b) { b.addEventListener("click", function () { goTo(b.dataset.goto); }); });
  setCurrent("cover");
  window.addEventListener("resize", function () { setCurrent(current); });
  if ("IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) setCurrent(e.target.dataset.sheet); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sheets.forEach(function (s) { navIO.observe(s); });

    var rvIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.dataset["in"] = "true"; rvIO.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    q(".ftp-rv").forEach(function (el) { rvIO.observe(el); });
  } else {
    q(".ftp-rv").forEach(function (el) { el.dataset["in"] = "true"; });
  }

  /* -------- tab bars (arrow keys, Home, End) -------- */
  function tabKeys(bar, select) {
    var tabs = q("[role=tab]", bar);
    tabs.forEach(function (t, i) {
      t.addEventListener("keydown", function (e) {
        var n = -1;
        if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") n = 0;
        else if (e.key === "End") n = tabs.length - 1;
        if (n < 0) return;
        e.preventDefault();
        select(tabs[n]);
        tabs[n].focus();
      });
    });
  }
  function markTabs(bar, active) {
    q("[role=tab]", bar).forEach(function (t) {
      var on = t === active;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      t.dataset.on = on ? "true" : "false";
      t.dataset.tone = on ? (t.dataset.tab || "blue") : "ghost";
    });
  }

  /* -------- exam filter -------- */
  var fbar = q("[data-filterbar]")[0];
  var cards = q("[data-exam]");
  var bar = q(".ftp-bar")[0];
  var empty = q("[data-empty]")[0];
  function setFilter(key) {
    if (!fbar) return;
    var t = q("[role=tab]", fbar).filter(function (x) { return x.dataset.filter === key; })[0];
    if (!t) return;
    markTabs(fbar, t);
    if (bar) bar.style.setProperty("--c", TONE[t.dataset.tab] || TONE.blue);
    var shown = 0;
    cards.forEach(function (c) {
      var ok = key === "all" || c.dataset.cat === key;
      c.hidden = !ok;
      if (ok) { c.style.setProperty("--i", shown); shown++; }
    });
    if (empty) empty.hidden = shown > 0;
  }
  if (fbar) {
    q("[role=tab]", fbar).forEach(function (t) { t.addEventListener("click", function () { setFilter(t.dataset.filter); }); });
    tabKeys(fbar, function (t) { setFilter(t.dataset.filter); });
  }
  q("[data-open-cat]").forEach(function (b) {
    b.addEventListener("click", function () { setFilter(b.dataset.openCat); goTo("work"); });
  });

  /* -------- practice mode bands -------- */
  var bands = q(".ftp-band");
  bands.forEach(function (band) {
    var head = q(".ftp-band-head", band)[0];
    head.addEventListener("click", function () {
      var open = band.dataset.open === "true";
      bands.forEach(function (b) {
        var h = q(".ftp-band-head", b)[0];
        var on = b === band && !open;
        b.dataset.open = on ? "true" : "false";
        h.setAttribute("aria-expanded", on ? "true" : "false");
        b.dataset.tone = on ? "blue" : "sheet";
        var ts = q(".ftp-ftab", b)[0];
        if (ts) ts.dataset.tone = on ? "blue" : "sheet";
        q(".ftp-go", b).forEach(function (g) { g.tabIndex = on ? 0 : -1; });
      });
    });
  });

  /* -------- process steps -------- */
  var pbar = q("[data-stepbar]")[0];
  var panels = q("[data-steppanel]");
  var stepTabs = pbar ? q("[role=tab]", pbar) : [];
  function setStep(i) {
    i = (i + stepTabs.length) % stepTabs.length;
    markTabs(pbar, stepTabs[i]);
    panels.forEach(function (p, j) { p.hidden = j !== i; });
    root.dataset.step = i;
  }
  if (pbar) {
    stepTabs.forEach(function (t, i) { t.addEventListener("click", function () { setStep(i); }); });
    tabKeys(pbar, function (t) { setStep(stepTabs.indexOf(t)); });
    q("[data-step-next]").forEach(function (b) { b.addEventListener("click", function () { setStep(+root.dataset.step + 1); }); });
    q("[data-step-prev]").forEach(function (b) { b.addEventListener("click", function () { setStep(+root.dataset.step - 1); }); });
    setStep(0);
  }

  /* -------- tilting card -------- */
  var photo = q(".ftp-photo")[0];
  if (photo) {
    photo.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var r = photo.getBoundingClientRect();
      photo.style.setProperty("--ry", (((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(2) + "deg");
      photo.style.setProperty("--rx", ((-((e.clientY - r.top) / r.height - 0.5)) * 10).toFixed(2) + "deg");
    });
    photo.addEventListener("pointerleave", function () {
      photo.style.setProperty("--rx", "0deg");
      photo.style.setProperty("--ry", "0deg");
    });
  }

  /* -------- exam details sheet -------- */
  var overlay = q("[data-overlay]")[0];
  if (overlay) {
    var modal = q(".ftp-modal", overlay)[0];
    var tab = q(".ftp-ftab", overlay)[0];
    var f = function (k) { return q("[data-m=" + k + "]", overlay)[0]; };
    var openIdx = -1, lastFocus = null;
    var visible = function () { return cards.filter(function (c) { return !c.hidden; }); };
    var show = function (card) {
      var d = card.dataset;
      modal.dataset.tone = d.tone; tab.dataset.tone = d.tone;
      f("cat").textContent = d.catLabel;
      f("n").textContent = pad2(cards.indexOf(card) + 1);
      f("title").textContent = d.title;
      f("sub").textContent = d.sub || "";
      f("sub").hidden = !d.sub;
      var rows = [["Year", d.year], ["Subject", d.subject], ["Duration", d.dur], ["Questions", d.qs], ["Level", d.level]];
      var dl = f("dl");
      dl.textContent = "";
      rows.forEach(function (r) {
        if (!r[1]) return;
        var dt = document.createElement("dt"); dt.textContent = r[0];
        var dd = document.createElement("dd"); dd.textContent = r[1];
        dl.appendChild(dt); dl.appendChild(dd);
      });
      f("go").setAttribute("href", d.href);
      var art = f("art");
      art.textContent = "";
      var host = document.createElement("span");
      host.dataset.cover = d.title; host.dataset.tone = d.tone; host.dataset.mark = d.mark;
      art.appendChild(host);
      mkCover(host);
    };
    var open = function (card) {
      lastFocus = document.activeElement;
      show(card);
      openIdx = cards.indexOf(card);
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
      f("close").focus();
    };
    var close = function () {
      overlay.hidden = true;
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    var step = function (dir) {
      var v = visible();
      if (!v.length) return;
      var at = v.indexOf(cards[openIdx]);
      var nxt = v[(at + dir + v.length) % v.length];
      openIdx = cards.indexOf(nxt);
      show(nxt);
    };
    cards.forEach(function (c) { c.addEventListener("click", function () { open(c); }); });
    f("close").addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    f("prev").addEventListener("click", function () { step(-1); });
    f("next").addEventListener("click", function () { step(1); });
    window.addEventListener("keydown", function (e) {
      if (overlay.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    });
  }
  if (fbar) setFilter("all");
})();

})();
