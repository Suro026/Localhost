(function () {
  "use strict";
  var root = document.getElementById("runner");
  var dataEl = document.getElementById("test-data");
  if (!root || !dataEl) return;

  var data;
  try { data = JSON.parse(dataEl.textContent); } catch (e) { root.textContent = "This test could not be loaded."; return; }
  var qs = data.questions;
  var LETTERS = ["A", "B", "C", "D"];

  // ---- saved state (localStorage is optional) ----
  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) | 0; } return (h >>> 0).toString(36); }
  var KEY = "ks-test-" + hash(data.mode + "|" + qs.map(function (q) { return q.id; }).join(","));
  function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* private mode */ } }
  function clear() { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } }

  var st = load();
  if (!st || typeof st.end !== "number" || typeof st.answers !== "object" || !st.answers) {
    st = { end: Date.now() + data.minutes * 60000, answers: {}, marked: {}, visited: {}, cur: 0 };
  }
  st.marked = st.marked || {}; st.visited = st.visited || {}; st.time = st.time && typeof st.time === "object" ? st.time : {};
  if (typeof st.cur !== "number" || st.cur < 0 || st.cur >= qs.length) st.cur = 0;
  st.visited[qs[st.cur].id] = true;
  save();

  // ---- tiny DOM helper (text only, never innerHTML) ----
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  // ---- layout ----
  var timerEl = el("span", "font-mono text-lg font-semibold", "--:--");
  timerEl.setAttribute("role", "timer");
  var submitBtn = el("button", "btn-primary", "Submit test");
  submitBtn.type = "button";
  var warnEl = el("span", "hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700", "");
  var calcBtn = el("button", "btn-secondary", "Calculator");
  calcBtn.type = "button";
  var paletteToggle = el("button", "btn-secondary lg:hidden", "Palette");
  paletteToggle.type = "button";
  paletteToggle.setAttribute("aria-expanded", "false");

  var head = el("div", "sticky top-[57px] z-20 -mx-4 flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface/95 px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-xl sm:border");
  var title = el("h1", "min-w-0 flex-1 break-words text-base font-bold sm:text-lg", data.title);
  var right = el("div", "flex items-center gap-2");
  right.append(warnEl, timerEl, calcBtn, paletteToggle, submitBtn);
  head.append(title, right);

  var body = el("div", "mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]");
  var card = el("div", "min-w-0 rounded-2xl border border-line bg-surface p-4 sm:p-6");
  var side = el("aside", "hidden rounded-2xl border border-line bg-surface p-4 lg:block");
  side.setAttribute("aria-label", "Question palette");
  var grid = el("div", "grid grid-cols-5 gap-2");
  var legend = el("p", "mt-3 text-xs text-muted", "Green: answered. Purple: marked for review. Red: seen, not answered. White: not visited.");
  side.append(grid, legend);
  body.append(card, side);
  var msg = el("p", "mt-3 hidden rounded-xl border border-line bg-brand-50 px-4 py-3 text-sm font-semibold");
  msg.setAttribute("role", "alert");
  root.replaceChildren(head, msg, body);

  paletteToggle.addEventListener("click", function () {
    var open = side.classList.toggle("hidden");
    paletteToggle.setAttribute("aria-expanded", open ? "false" : "true");
  });

  // ---- calculator (GATE gives every candidate an on-screen scientific calculator) ----
  function calcEval(s, deg) {
    var i = 0;
    function ws() { while (s.charAt(i) === " ") i++; }
    function fail() { throw new Error("syntax"); }
    function expr() {
      var v = term(); ws();
      while (s.charAt(i) === "+" || s.charAt(i) === "-") { var op = s.charAt(i++); var r = term(); v = op === "+" ? v + r : v - r; ws(); }
      return v;
    }
    function term() {
      var v = pow(); ws();
      while (s.charAt(i) === "*" || s.charAt(i) === "/") { var op = s.charAt(i++); var r = pow(); v = op === "*" ? v * r : v / r; ws(); }
      return v;
    }
    function pow() { var b = unary(); ws(); if (s.charAt(i) === "^") { i++; return Math.pow(b, pow()); } return b; }
    function unary() { ws(); if (s.charAt(i) === "-") { i++; return -unary(); } if (s.charAt(i) === "+") { i++; return unary(); } return primary(); }
    function primary() {
      ws();
      var rest = s.slice(i), m;
      if ((m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(rest))) { i += m[0].length; return parseFloat(m[0]); }
      if (s.charAt(i) === "(") { i++; var v = expr(); ws(); if (s.charAt(i) !== ")") fail(); i++; return v; }
      if ((m = /^(pi|e)(?![a-z])/i.exec(rest))) { i += m[0].length; return m[1].toLowerCase() === "pi" ? Math.PI : Math.E; }
      if ((m = /^(sin|cos|tan|log|ln|sqrt|exp|abs)\(/.exec(rest))) {
        i += m[0].length; var a = expr(); ws(); if (s.charAt(i) !== ")") fail(); i++;
        var t = deg ? a * Math.PI / 180 : a;
        switch (m[1]) {
          case "sin": return Math.sin(t); case "cos": return Math.cos(t); case "tan": return Math.tan(t);
          case "log": return Math.log10(a); case "ln": return Math.log(a); case "sqrt": return Math.sqrt(a);
          case "exp": return Math.exp(a); default: return Math.abs(a);
        }
      }
      return fail();
    }
    var out = expr(); ws();
    if (i < s.length) fail();
    return out;
  }
  var calc = null, calcDeg = true;
  function toggleCalc() {
    if (calc) { calc.remove(); calc = null; return; }
    calc = el("div", "ks-calc"); calc.setAttribute("role", "dialog"); calc.setAttribute("aria-label", "Calculator");
    var top = el("div", "ks-calc-top");
    var degBtn = el("button", "ks-calc-mode", "Deg"); degBtn.type = "button";
    var closeBtn = el("button", "ks-calc-mode", "Close"); closeBtn.type = "button";
    top.append(el("b", "", "Calculator"), degBtn, closeBtn);
    var screen = el("input", "ks-calc-screen"); screen.type = "text"; screen.readOnly = true; screen.setAttribute("aria-label", "Calculator display"); screen.value = "";
    var keys = el("div", "ks-calc-keys");
    var layout = [
      ["sin", "sin("], ["cos", "cos("], ["tan", "tan("], ["(", "("], [")", ")"],
      ["log", "log("], ["ln", "ln("], ["√", "sqrt("], ["x^y", "^"], ["⌫", "BS"],
      ["7", "7"], ["8", "8"], ["9", "9"], ["÷", "/"], ["C", "CLR"],
      ["4", "4"], ["5", "5"], ["6", "6"], ["×", "*"], ["π", "pi"],
      ["1", "1"], ["2", "2"], ["3", "3"], ["−", "-"], ["e", "e"],
      ["0", "0"], [".", "."], ["exp", "exp("], ["+", "+"], ["=", "EQ"]
    ];
    layout.forEach(function (k) {
      var b = el("button", "ks-calc-key" + (k[1] === "EQ" ? " is-eq" : ""), k[0]); b.type = "button";
      b.addEventListener("click", function () {
        if (k[1] === "CLR") screen.value = "";
        else if (k[1] === "BS") screen.value = screen.value.slice(0, -1);
        else if (k[1] === "EQ") {
          try { var v = calcEval(screen.value, calcDeg); screen.value = isFinite(v) ? String(parseFloat(v.toPrecision(12))) : "Error"; } catch (e) { screen.value = "Error"; }
        } else { if (screen.value === "Error") screen.value = ""; screen.value += k[1]; }
      });
      keys.appendChild(b);
    });
    degBtn.addEventListener("click", function () { calcDeg = !calcDeg; degBtn.textContent = calcDeg ? "Deg" : "Rad"; });
    degBtn.textContent = calcDeg ? "Deg" : "Rad";
    closeBtn.addEventListener("click", toggleCalc);
    calc.append(top, screen, keys);
    document.body.appendChild(calc);
  }
  calcBtn.addEventListener("click", toggleCalc);

  // ---- proctored full mock: full screen is required; leaving it twice submits the test ----
  var proctorOn = data.mode === "mock" && !!document.documentElement.requestFullscreen && document.fullscreenEnabled !== false;
  var allowExit = false, autoReason = "", gateEl = null;
  if (proctorOn) { st.viol = typeof st.viol === "number" ? st.viol : 0; if (typeof st.started !== "boolean") st.started = false; }
  function fsActive() { return !!document.fullscreenElement; }
  function warnText() { return "Warnings: " + (st.viol || 0) + " / 2"; }
  function hideGate() { if (gateEl) { gateEl.remove(); gateEl = null; } }
  function enterFs() { return document.documentElement.requestFullscreen(); }
  function showGate(kind) {
    hideGate();
    gateEl = el("div", "ks-gate"); gateEl.setAttribute("role", "dialog"); gateEl.setAttribute("aria-modal", "true");
    var c = el("div", "ks-gate-card");
    var first = kind === "start";
    c.appendChild(el("h2", "ks-gate-h", first ? "Full mock test: proctored" : "You left full screen"));
    var ul = el("ul", "ks-gate-list");
    if (first) {
      ["The test runs in full screen. You have " + data.minutes + " minutes and the clock starts when you press the button.",
       "If you leave full screen you get one warning. Leaving a second time submits your test automatically.",
       "Copying and the right-click menu are turned off. A calculator is available on the test screen."].forEach(function (t) { ul.appendChild(el("li", "", t)); });
    } else {
      ul.appendChild(el("li", "", "This is warning " + st.viol + " of 2. Leave full screen once more and your test is submitted automatically."));
      ul.appendChild(el("li", "", "The timer is still running."));
    }
    var go = el("button", "btn-primary", first ? "Enter full screen and start" : "Return to full screen"); go.type = "button";
    var note = el("p", "ks-gate-note", "");
    go.addEventListener("click", function () {
      enterFs().then(function () {
        if (first) { st.started = true; st.end = Date.now() + data.minutes * 60000; lastAcc = Date.now(); save(); }
        hideGate(); renderPalette();
      }).catch(function () { note.textContent = "Your browser did not allow full screen. Press the button again, or use a desktop browser."; });
    });
    c.append(ul, go, note);
    gateEl.appendChild(c);
    document.body.appendChild(gateEl);
    go.focus();
  }
  function onFsChange() {
    if (!proctorOn || !st.started || done || allowExit) return;
    if (fsActive()) { hideGate(); return; }
    st.viol = (st.viol || 0) + 1; save(); warnEl.textContent = warnText();
    if (st.viol >= 2) { autoReason = "Your test was submitted automatically because you left full screen twice."; hideGate(); submit(true); }
    else showGate("return");
  }
  function leaveProctor() { allowExit = true; hideGate(); if (calc) toggleCalc(); if (fsActive() && document.exitFullscreen) document.exitFullscreen().catch(function () {}); }
  function initProctor() {
    if (!proctorOn) return;
    warnEl.classList.remove("hidden"); warnEl.textContent = warnText();
    document.addEventListener("fullscreenchange", onFsChange);
    ["contextmenu", "copy", "cut"].forEach(function (ev) { document.addEventListener(ev, function (e) { if (st.started && !done) e.preventDefault(); }); });
    if (!st.started) { showGate("start"); return; }
    if (!fsActive()) onFsChange(); // a reload or closed tab counts as leaving full screen
  }

  // ---- answers ----
  function answered(q) {
    var a = st.answers[q.id];
    if (a === undefined || a === null) return false;
    if (Array.isArray(a)) return a.length > 0;
    return String(a).trim() !== "";
  }
  function setAnswer(q, v) {
    if (v === null || v === "" || (Array.isArray(v) && !v.length)) delete st.answers[q.id];
    else st.answers[q.id] = v;
    save(); renderPalette();
  }

  function renderPalette() {
    grid.replaceChildren();
    qs.forEach(function (q, i) {
      var b = el("button", "h-11 rounded-lg border text-sm font-bold ", String(i + 1));
      b.type = "button";
      var marked = !!st.marked[q.id], ans = answered(q), seen = !!st.visited[q.id];
      var c = "border-line bg-canvas text-ink";
      if (marked) c = "border-purple-700 bg-purple-600 text-white";
      else if (ans) c = "border-green-700 bg-green-600 text-white";
      else if (seen) c = "border-red-300 bg-red-100 text-red-800";
      b.className += c + (i === st.cur ? " ring-2 ring-brand-600 ring-offset-1" : "");
      var label = "Question " + (i + 1) + (marked ? ", marked" : "") + (ans ? ", answered" : seen ? ", not answered" : ", not visited");
      b.setAttribute("aria-label", label);
      if (i === st.cur) b.setAttribute("aria-current", "true");
      b.addEventListener("click", function () { go(i); });
      grid.appendChild(b);
    });
  }

  function renderQuestion() {
    var q = qs[st.cur];
    var parts = [];
    parts.push(el("p", "text-sm text-muted", "Question " + (st.cur + 1) + " of " + qs.length + " · " + q.subject + " · " + q.type + " · " + q.marks + " mark" + (q.marks === 1 ? "" : "s")));
    if (!q.image_only) parts.push(el("p", "mt-3 whitespace-pre-line break-words text-base leading-relaxed", q.text));
    if (q.figure) {
      var img = el("img", "mt-3 max-w-full rounded-lg border border-line bg-white");
      img.style.height = "auto"; img.style.maxWidth = "100%"; img.src = q.figure; img.alt = q.image_only ? "Question " + (st.cur + 1) + " as printed in the paper" : "Figure for question " + (st.cur + 1); img.loading = "lazy";
      parts.push(img);
    }
    var cur = st.answers[q.id];
    if (q.type === "NAT") {
      var lab = el("label", "mt-4 block text-sm font-semibold", "Your answer (a number)");
      var inp = el("input", "input mt-1 max-w-xs");
      inp.type = "text"; inp.inputMode = "decimal"; inp.autocomplete = "off"; inp.maxLength = 32;
      inp.value = typeof cur === "string" ? cur : "";
      inp.addEventListener("input", function () { setAnswer(q, inp.value.trim()); });
      lab.appendChild(inp);
      parts.push(lab);
      var pad = el("div", "ks-keypad"); pad.setAttribute("aria-label", "Number keypad");
      ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "-", "BS", "CLR"].forEach(function (k) {
        var kb = el("button", "ks-key", k === "BS" ? "\u232b" : k === "CLR" ? "Clear" : k); kb.type = "button";
        kb.addEventListener("click", function () {
          if (k === "BS") inp.value = inp.value.slice(0, -1); else if (k === "CLR") inp.value = ""; else if (inp.value.length < 31) inp.value += k;
          setAnswer(q, inp.value.trim());
        });
        pad.appendChild(kb);
      });
      parts.push(pad);
    } else {
      var multi = q.type === "MSQ";
      var list = el("div", "mt-4 space-y-2");
      list.setAttribute("role", multi ? "group" : "radiogroup");
      q.options.forEach(function (opt, i) {
        var letter = LETTERS[i];
        var row = el("label", "flex min-h-[48px] cursor-pointer items-start gap-3 rounded-xl border border-line px-3 py-3 hover:border-brand-600");
        var box = el("input", "mt-1 h-4 w-4 shrink-0");
        box.type = multi ? "checkbox" : "radio"; box.name = "opt";
        box.checked = multi ? (Array.isArray(cur) && cur.indexOf(letter) >= 0) : cur === letter;
        box.addEventListener("change", function () {
          if (multi) {
            var set = Array.isArray(st.answers[q.id]) ? st.answers[q.id].slice() : [];
            var at = set.indexOf(letter);
            if (box.checked && at < 0) set.push(letter);
            if (!box.checked && at >= 0) set.splice(at, 1);
            set.sort();
            setAnswer(q, set);
          } else { setAnswer(q, letter); }
        });
        row.append(box, el("span", "min-w-0 break-words", q.image_only ? "Option " + letter : letter + ". " + opt));
        list.appendChild(row);
      });
      parts.push(list);
      if (multi) parts.push(el("p", "mt-2 text-xs text-muted", "More than one option can be correct. No negative marking."));
    }

    var bar = el("div", "mt-6 flex flex-wrap gap-2");
    var prev = el("button", "btn-secondary", "Previous"); prev.type = "button"; prev.disabled = st.cur === 0;
    var next = el("button", "btn-secondary", "Next"); next.type = "button"; next.disabled = st.cur === qs.length - 1;
    var mark = el("button", "btn-secondary", st.marked[q.id] ? "Unmark review" : "Mark for review"); mark.type = "button";
    var clr = el("button", "btn-secondary", "Clear response"); clr.type = "button";
    prev.addEventListener("click", function () { go(st.cur - 1); });
    next.addEventListener("click", function () { go(st.cur + 1); });
    mark.addEventListener("click", function () {
      if (st.marked[q.id]) delete st.marked[q.id]; else st.marked[q.id] = true;
      save(); renderQuestion(); renderPalette();
    });
    clr.addEventListener("click", function () { setAnswer(q, null); renderQuestion(); });
    bar.append(prev, next, mark, clr);
    parts.push(bar);
    card.replaceChildren.apply(card, parts);
  }

  function go(i) {
    if (i < 0 || i >= qs.length) return;
    accrue();
    st.cur = i; st.visited[qs[i].id] = true; save();
    renderQuestion(); renderPalette();
    card.scrollIntoView({ block: "nearest" });
  }

  // ---- time spent per question (only while the tab is visible) ----
  var lastAcc = Date.now(), ticks = 0;
  function accrue() {
    var now = Date.now(), d = (now - lastAcc) / 1000; lastAcc = now;
    if (document.visibilityState === "visible" && d > 0 && d < 5) {
      var id = qs[st.cur].id; st.time[id] = (st.time[id] || 0) + d;
    }
  }

  // ---- timer ----
  var done = false;
  function tick() {
    if (done) return;
    if (proctorOn && !st.started) { lastAcc = Date.now(); timerEl.textContent = Math.floor(data.minutes / 60) + ":" + String(data.minutes % 60).padStart(2, "0") + ":00"; return; }
    accrue();
    if (++ticks % 5 === 0) save();
    var left = Math.max(0, Math.round((st.end - Date.now()) / 1000));
    var h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
    timerEl.textContent = (h ? h + ":" : "") + String(m).padStart(h ? 2 : 1, "0") + ":" + String(s).padStart(2, "0");
    timerEl.className = "font-mono text-lg font-semibold" + (left <= 300 ? " text-red-700" : "");
    if (left === 0) submit(true);
  }

  // ---- history + analysis (kept on this device only) ----
  function saveAttempt(doc) {
    var node = doc.getElementById("result-data"), rd;
    try { rd = JSON.parse(node.textContent); } catch (e) { return null; }
    if (!rd || !Array.isArray(rd.rows) || !window.KS) return null;
    var used = Math.round(data.minutes * 60 - Math.max(0, (st.end - Date.now()) / 1000));
    var a = {
      t: Date.now(), title: data.title, mode: data.mode, total: rd.total, max: rd.max,
      correct: rd.correct, wrong: rd.wrong, skipped: rd.skipped, secs: Math.max(0, used),
      rows: rd.rows.map(function (r) { return r.concat([Math.round(st.time[r[0]] || 0)]); })
    };
    KS.addAttempt(a);
    return a;
  }

  function showAnalysis(a) {
    var host = document.getElementById("analysis");
    if (!host) return;
    var rows = a.rows;
    var totalSecs = rows.reduce(function (n, r) { return n + r[6]; }, 0);
    var box = el("div", "mt-8");
    box.appendChild(el("h2", "text-xl font-bold", "Time and weak spots"));
    box.appendChild(el("p", "mt-2 text-sm text-muted",
      "You spent " + KS.fmtTime(totalSecs) + " on questions, " + KS.fmtTime(totalSecs / Math.max(1, rows.length)) + " on average per question."));

    var slow = rows.map(function (r, i) { return { n: i + 1, r: r }; })
      .sort(function (x, y) { return y.r[6] - x.r[6]; }).slice(0, 5).filter(function (x) { return x.r[6] > 0; });
    if (slow.length) {
      box.appendChild(el("h3", "mt-4 text-sm font-bold", "Slowest questions"));
      var ul = el("ul", "mt-1 space-y-1 text-sm");
      slow.forEach(function (x) {
        var word = x.r[3] === "c" ? "correct" : x.r[3] === "w" ? "wrong" : "skipped";
        ul.appendChild(el("li", "", "Q" + x.n + " · " + x.r[1] + (x.r[2] ? " · " + x.r[2] : "") + " · " + KS.fmtTime(x.r[6]) + " · " + word));
      });
      box.appendChild(ul);
    }

    var miss = {};
    rows.forEach(function (r) { if (r[3] === "w" && r[2]) { var k = r[1] + "|" + r[2]; miss[k] = (miss[k] || 0) + 1; } });
    var keys = Object.keys(miss).sort(function (x, y) { return miss[y] - miss[x]; }).slice(0, 4);
    if (keys.length) {
      box.appendChild(el("h3", "mt-4 text-sm font-bold", "Topics you got wrong here"));
      var ul2 = el("ul", "mt-1 space-y-1 text-sm");
      keys.forEach(function (k) { ul2.appendChild(el("li", "", k.replace("|", " · ") + " (" + miss[k] + " wrong)")); });
      box.appendChild(ul2);
      var practise = el("a", "btn-primary mt-3 inline-flex", "Practise these topics");
      practise.href = "/tests/start?mode=weak&" + keys.map(function (k) { return "t=" + encodeURIComponent(k); }).join("&");
      box.appendChild(practise);
    }
    var prog = el("a", "btn-secondary mt-3 inline-flex sm:ml-2", "See your progress");
    prog.href = "/progress";
    box.appendChild(prog);
    host.replaceChildren(box);
  }

  // ---- submit ----
  var busy = false;
  function showMsg(t) { msg.textContent = t; msg.classList.remove("hidden"); }
  var asking = false;
  function submit(auto) {
    if (busy || done || asking) return;
    if (auto) return send();
    var n = qs.filter(answered).length, left = qs.length - n;
    var body = "You answered " + n + " of " + qs.length + " questions." + (left ? " " + left + " " + (left === 1 ? "is" : "are") + " still blank." : "");
    asking = true;
    (window.KSUI ? KSUI.confirm({ title: "Submit this test?", body: body, ok: "Submit now", cancel: "Keep going" }) : Promise.resolve(window.confirm("Submit now? " + body)))
      .then(function (yes) { asking = false; if (yes) send(); });
  }
  function send() {
    if (busy || done) return;
    busy = true; submitBtn.disabled = true;
    var ids = qs.map(function (q) { return q.id; });
    var answers = {};
    ids.forEach(function (id) { if (st.answers[id] !== undefined) answers[id] = st.answers[id]; });
    fetch("/tests/result", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: ids, answers: answers }), credentials: "same-origin"
    }).then(function (r) {
      if (!r.ok) throw new Error("bad");
      return r.text();
    }).then(function (html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var res = doc.getElementById("result");
      if (!res) throw new Error("bad");
      accrue(); done = true;
      var attempt = saveAttempt(doc);
      clear();
      document.title = doc.title;
      var main = document.querySelector("main");
      leaveProctor();
      main.replaceChildren(document.importNode(res, true));
      if (autoReason) { var why = el("p", "ks-alert", autoReason); why.setAttribute("role", "alert"); var host0 = main.querySelector(".ks-skin"); if (host0) host0.prepend(why); }
      if (attempt) showAnalysis(attempt);
      window.scrollTo(0, 0);
    }).catch(function () {
      busy = false; submitBtn.disabled = false;
      showMsg("Could not submit. Check your connection and press Submit again. Your answers are saved.");
    });
  }
  submitBtn.addEventListener("click", function () { submit(false); });

  document.addEventListener("keydown", function (e) {
    var t = e.target && e.target.tagName;
    if (t === "INPUT" && e.target.type === "text") return;
    if (e.key === "ArrowRight") go(st.cur + 1);
    if (e.key === "ArrowLeft") go(st.cur - 1);
  });
  document.addEventListener("visibilitychange", tick);

  renderQuestion(); renderPalette(); tick();
  setInterval(tick, 1000);
  initProctor();
})();
