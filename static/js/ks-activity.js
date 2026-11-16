/* Study activity card: a year of days, like a contribution calendar, built from this learner's own study sessions and tests.
   Hover or tap a day for the detail, open the drawer for the top subjects. Plain DOM, text only (never innerHTML).
   Usage: parent.appendChild(KSActivity.card()); it reads KS.study() and KS.attempts(). */
(function () {
  "use strict";
  var DAY = 86400000, CELL = 11, GAP = 3, MAX_WEEKS = 53, MIN_LABEL_WEEKS = 3;
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var DAYNAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined && text !== null) n.textContent = text; return n; }
  function level(p) { return p <= 0 ? 0 : p < 15 ? 1 : p < 40 ? 2 : p < 90 ? 3 : 4; }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }

  // ---- gather one record per day, and per subject ----
  function collect() {
    var days = {}, subjects = {};
    function day(k) { return days[k] || (days[k] = { mins: 0, qs: 0, tests: 0 }); }
    function subj(n) { return subjects[n] || (subjects[n] = { mins: 0, qs: 0 }); }
    KS.study().sessions.forEach(function (s) {
      var m = Math.max(0, Number(s.mins) || 0); day(KS.dayKey(new Date(s.t))).mins += m;
      if (s.subject) subj(String(s.subject)).mins += m;
    });
    KS.attempts().forEach(function (a) {
      var d = day(KS.dayKey(new Date(a.t))); d.tests++;
      (a.rows || []).forEach(function (r) { if (r[3] === "c" || r[3] === "w") { d.qs++; if (r[1]) subj(String(r[1])).qs++; } });
    });
    return { days: days, subjects: subjects };
  }

  // ---- the shared hover chip ----
  var tip = null;
  function showTip(text, cell) {
    if (!tip) { tip = el("div", "ks-act-tip"); tip.setAttribute("role", "status"); document.body.appendChild(tip); }
    tip.textContent = text;
    var r = cell.getBoundingClientRect(), half = tip.offsetWidth / 2, edge = 8 + half;
    tip.style.left = Math.min(Math.max(r.left + r.width / 2, edge), window.innerWidth - edge) + "px";
    tip.style.top = r.top + "px";
    tip.setAttribute("data-on", "true");
  }
  function hideTip() { if (tip) tip.removeAttribute("data-on"); }
  function describe(date, d) {
    var when = DAYNAMES[date.getDay()] + ", " + date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear();
    if (!d || (!d.mins && !d.qs && !d.tests)) return "No activity on " + when;
    var bits = [];
    if (d.mins) bits.push(d.mins + " min studied");
    if (d.tests) bits.push(plural(d.tests, "test"));
    if (d.qs) bits.push(plural(d.qs, "question"));
    return bits.join(", ") + " on " + when;
  }

  function buildGrid(host, data, weeks) {
    host.replaceChildren();
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var lastSun = new Date(today.getTime() - today.getDay() * DAY);
    var first = new Date(lastSun.getTime() - (weeks - 1) * 7 * DAY);
    var cols = el("div", "ks-act-cols"), labels = el("div", "ks-act-months");
    var prevMonth = -1, runStart = 0, monthAt = [];
    for (var w = 0; w < weeks; w++) {
      var colStart = new Date(first.getTime() + w * 7 * DAY);
      monthAt.push(colStart.getMonth());
      var col = el("div", "ks-act-col"); col.style.setProperty("--w", String(w));
      for (var i = 0; i < 7; i++) {
        var date = new Date(colStart.getTime() + i * DAY);
        if (date > today) { col.appendChild(el("span", "ks-act-cell is-future")); continue; }
        var d = data.days[KS.dayKey(date)], p = d ? d.mins + d.qs : 0;
        var c = el("span", "ks-act-cell"); c.setAttribute("data-l", String(level(p)));
        (function (c, date, d) {
          var text = describe(date, d);
          c.addEventListener("pointerenter", function () { showTip(text, c); });
          c.addEventListener("pointerleave", hideTip);
          c.addEventListener("click", function () { showTip(text, c); });
        })(c, date, d);
        col.appendChild(c);
      }
      cols.appendChild(col);
    }
    // month names sit over the first column of a run of at least 3 weeks, so none overlap
    var starts = [];
    for (var k = 0; k <= weeks; k++) {
      if (k === weeks || monthAt[k] !== monthAt[runStart]) { starts.push([runStart, k - runStart, monthAt[runStart]]); runStart = k; }
    }
    for (var j = 0; j < weeks; j++) labels.appendChild(el("span", "ks-act-m"));
    starts.forEach(function (s) { if (s[1] >= MIN_LABEL_WEEKS) labels.children[s[0]].textContent = MONTHS[s[2]]; });
    host.append(labels, cols);
  }

  function card() {
    var data = collect();
    var root = el("section", "ks-actcard");
    root.setAttribute("aria-labelledby", "ks-act-h");

    var totalMins = 0, activeDays = 0, yearAgo = Date.now() - 365 * DAY;
    Object.keys(data.days).forEach(function (k) {
      var d = data.days[k], t = new Date(k + "T00:00:00").getTime();
      if (t >= yearAgo && (d.mins || d.qs || d.tests)) { activeDays++; totalMins += d.mins; }
    });
    var h = el("p", "ks-act-h", plural(activeDays, "active day") + " in the last year"); h.id = "ks-act-h";
    var sub = el("p", "ks-act-sub", totalMins ? totalMins + " minutes of timed study logged. Hover or tap a day." : "Start a study timer or take a test to light up your first day.");

    var scroller = el("div", "ks-act-grid"); scroller.setAttribute("role", "img");
    scroller.setAttribute("aria-label", plural(activeDays, "active day") + " in the last year");
    var legend = el("div", "ks-act-legend"); legend.appendChild(el("span", "", "Less"));
    for (var l = 0; l <= 4; l++) { var lc = el("span", "ks-act-cell"); lc.setAttribute("data-l", String(l)); legend.appendChild(lc); }
    legend.appendChild(el("span", "", "More"));

    // fit as many weeks as the width allows, newest on the right
    var shown = 0;
    function fit() {
      var w = Math.floor((root.clientWidth - 40 + GAP) / (CELL + GAP));
      var weeks = Math.max(8, Math.min(MAX_WEEKS, w));
      if (weeks === shown) return;
      shown = weeks; buildGrid(scroller, data, weeks);
    }

    // drawer: top subjects
    var names = Object.keys(data.subjects).sort(function (a, b) {
      var x = data.subjects[a], y = data.subjects[b]; return (y.mins + y.qs) - (x.mins + x.qs);
    }).slice(0, 3);
    var drawer = null;
    if (names.length) {
      drawer = el("div", "ks-act-drawer"); drawer.setAttribute("data-open", "false");
      var bar = el("div", "ks-act-dbar");
      bar.appendChild(el("span", "ks-act-dt", "Top subjects"));
      var stack = el("span", "ks-act-stack");
      names.forEach(function (n) { stack.appendChild(el("span", "ks-act-dot", n.charAt(0).toUpperCase())); });
      var btn = el("button", "ks-act-toggle"); btn.type = "button"; btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "ks-act-list"); btn.setAttribute("aria-label", "Show top subjects");
      var chev = document.createElementNS("http://www.w3.org/2000/svg", "svg"); chev.setAttribute("viewBox", "0 0 24 24"); chev.setAttribute("aria-hidden", "true");
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path"); path.setAttribute("d", "m6 9 6 6 6-6"); chev.appendChild(path); btn.appendChild(chev);
      bar.append(stack, btn);
      var wrap = el("div", "ks-act-listwrap"), list = el("ul", "ks-act-list"); list.id = "ks-act-list";
      names.forEach(function (n) {
        var s = data.subjects[n], li = el("li", "ks-act-row");
        li.append(el("span", "ks-act-dot", n.charAt(0).toUpperCase()), el("span", "ks-act-name", n),
          el("span", "ks-act-num", [s.mins ? s.mins + " min" : "", s.qs ? plural(s.qs, "question") : ""].filter(Boolean).join(" · ")));
        list.appendChild(li);
      });
      wrap.appendChild(list); drawer.append(bar, wrap);
      btn.addEventListener("click", function () {
        var open = drawer.getAttribute("data-open") !== "true";
        drawer.setAttribute("data-open", String(open)); btn.setAttribute("aria-expanded", String(open));
        btn.setAttribute("aria-label", open ? "Hide top subjects" : "Show top subjects");
      });
    }

    root.append(h, sub, scroller, legend);
    if (drawer) root.appendChild(drawer);
    if (reduce) root.setAttribute("data-still", "true");
    if (window.ResizeObserver) new ResizeObserver(fit).observe(root); else fit();
    window.addEventListener("scroll", hideTip, { passive: true });
    return root;
  }

  // count a number up once, for the stat tiles
  function countUp(node, to, suffix) {
    suffix = suffix || "";
    if (reduce || !isFinite(to) || to <= 0) { node.textContent = to + suffix; return; }
    var t0 = performance.now(), dur = 700;
    (function step(now) {
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(to * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  window.KSActivity = { card: card, countUp: countUp };
})();
