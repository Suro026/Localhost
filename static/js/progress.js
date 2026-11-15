(function () {
  "use strict";
  var root = document.getElementById("progress-root");
  if (!root || !window.KS) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }
  function section(title, sub) {
    var s = el("section", "mt-8");
    s.appendChild(el("h2", "text-xl font-bold", title));
    if (sub) s.appendChild(el("p", "mt-1 text-sm text-muted", sub));
    return s;
  }
  function bar(p, tone) {
    var wrap = el("div", "h-2 w-full overflow-hidden rounded-full bg-canvas");
    var fill = el("div", "h-2 rounded-full " + tone);
    fill.style.width = Math.max(0, Math.min(100, p)) + "%";
    wrap.appendChild(fill);
    return wrap;
  }
  function tone(p) { return p >= 70 ? "bg-green-600" : p >= 40 ? "bg-amber-500" : "bg-red-500"; }

  var at = KS.attempts();
  if (!at.length) {
    var empty = el("div", "mt-6 rounded-2xl border border-dashed border-line bg-surface p-6");
    empty.appendChild(el("p", "font-semibold", "No tests yet."));
    empty.appendChild(el("p", "mt-1 text-sm text-muted", "Finish one test and your scores, weak topics and time per question show up here. Everything stays on this device."));
    var go = el("a", "btn-primary mt-4 inline-flex", "Take a test"); go.href = "/tests";
    empty.appendChild(go);
    root.replaceChildren(empty);
    return;
  }

  // ---- summary ----
  var correct = 0, wrong = 0, seen = 0, scoreSum = 0;
  at.forEach(function (a) {
    a.rows.forEach(function (r) { seen++; if (r[3] === "c") correct++; else if (r[3] === "w") wrong++; });
    scoreSum += a.max > 0 ? (100 * a.total) / a.max : 0;
  });
  var tiles = el("div", "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5");
  [["Tests taken", String(at.length)], ["Questions seen", String(seen)],
   ["Accuracy on attempted", KS.pct(correct, correct + wrong) + "%"], ["Average score", Math.round(scoreSum / at.length) + "%"],
   ["Day streak", String(KS.streak())]].forEach(function (t) {
    var c = el("div", "rounded-2xl border border-line bg-surface p-4");
    c.appendChild(el("p", "text-2xl font-extrabold", t[1]));
    c.appendChild(el("p", "mt-1 text-xs text-muted", t[0]));
    tiles.appendChild(c);
  });

  // ---- trend: last 12 tests ----
  var trend = section("Score trend", "Score as a share of the maximum, oldest on the left.");
  var last = at.slice(-12);
  var chart = el("div", "mt-3 flex h-40 items-end gap-2 rounded-2xl border border-line bg-surface p-4");
  last.forEach(function (a) {
    var p = a.max > 0 ? Math.round((100 * a.total) / a.max) : 0;
    var col = el("div", "flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1");
    col.appendChild(el("span", "text-[11px] font-semibold", p + "%"));
    var b = el("div", "w-full rounded-t-md " + tone(p));
    b.style.height = Math.max(2, Math.min(100, p)) * 0.8 + "%";
    b.title = a.title + ": " + a.total + " / " + a.max;
    col.appendChild(b);
    chart.appendChild(col);
  });
  trend.appendChild(chart);

  // ---- subjects ----
  var subj = section("By subject", "Share of questions you got right, across every test.");
  var table = el("div", "mt-3 overflow-hidden rounded-2xl border border-line bg-surface");
  KS.stats(at, "subject").sort(function (a, b) { return a.correct / a.seen - b.correct / b.seen; }).forEach(function (o) {
    var p = KS.pct(o.correct, o.seen);
    var row = el("div", "grid items-center gap-3 border-b border-line px-4 py-3 last:border-0 sm:grid-cols-[1fr_160px_90px]");
    row.appendChild(el("p", "min-w-0 break-words text-sm font-semibold", o.subject));
    row.appendChild(bar(p, tone(p)));
    row.appendChild(el("p", "text-sm text-muted sm:text-right", p + "% of " + o.seen));
    table.appendChild(row);
  });
  subj.appendChild(table);

  // ---- weak topics ----
  var weakSec = section("Revise these first", "Topics with the lowest share of correct answers (at least 3 questions seen).");
  var weak = KS.weak(at, 6, 3);
  if (weak.length) {
    var ul = el("ul", "mt-3 space-y-2");
    weak.forEach(function (o) {
      var p = KS.pct(o.correct, o.seen);
      var li = el("li", "flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-surface px-4 py-3");
      li.appendChild(el("span", "min-w-0 break-words text-sm font-semibold", o.subject + " · " + o.topic));
      li.appendChild(el("span", "text-sm text-muted", p + "% right · " + o.seen + " seen · " + KS.fmtTime(o.secs / o.seen) + " each"));
      ul.appendChild(li);
    });
    weakSec.appendChild(ul);
    var pr = el("a", "btn-primary mt-4 inline-flex", "Practise these topics");
    pr.href = "/tests/start?mode=weak&" + weak.map(function (o) { return "t=" + encodeURIComponent(o.key); }).join("&");
    weakSec.appendChild(pr);
  } else {
    weakSec.appendChild(el("p", "mt-3 text-sm text-muted", "Not enough data yet. Take a few more tests and topics will show up here."));
  }

  // ---- history ----
  var hist = section("Past tests");
  var hl = el("ul", "mt-3 space-y-2");
  at.slice(-15).reverse().forEach(function (a) {
    var d = new Date(a.t);
    var li = el("li", "flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm");
    li.appendChild(el("span", "min-w-0 break-words font-semibold", a.title));
    li.appendChild(el("span", "text-muted",
      d.toLocaleDateString() + " · " + a.total + " / " + a.max + " · " + a.correct + " right, " + a.wrong + " wrong · " + Math.round((a.secs || 0) / 60) + " min"));
    hl.appendChild(li);
  });
  hist.appendChild(hl);
  var clear = el("button", "btn-secondary mt-4", "Clear history on this device");
  clear.type = "button";
  clear.addEventListener("click", function () {
    if (window.confirm("Delete all saved test history from this device? This cannot be undone.")) { KS.clearAttempts(); window.location.reload(); }
  });
  hist.appendChild(clear);

  root.replaceChildren(tiles, trend, subj, weakSec, hist);
})();
