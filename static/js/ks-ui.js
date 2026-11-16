/* Keystone UI kit: splash hand-off, confirm dialog, toasts, offline notice. Plain DOM, text only. */
(function () {
  "use strict";
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  var NS = "http://www.w3.org/2000/svg";
  function svg(d, stroke) {
    var s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("fill", "none"); p.setAttribute("stroke", stroke);
    p.setAttribute("stroke-width", "2.2"); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round"); s.appendChild(p); return s;
  }

  // ---- splash: ks-boot.js set data-splash before first paint; fade it once the page has loaded ----
  var splash = document.getElementById("ks-splash"), root = document.documentElement;
  if (splash && root.hasAttribute("data-splash")) {
    var t0 = performance.now();
    var hide = function () {
      var wait = Math.max(0, 900 - (performance.now() - t0));
      setTimeout(function () {
        splash.setAttribute("data-done", "");
        setTimeout(function () { root.removeAttribute("data-splash"); }, 500);
      }, wait);
    };
    if (document.readyState === "complete") hide(); else window.addEventListener("load", hide, { once: true });
  }

  // ---- toasts ----
  var host = null;
  function toast(text, kind, ms) {
    if (!host) { host = el("div"); host.id = "ks-toasts"; host.setAttribute("role", "status"); host.setAttribute("aria-live", "polite"); document.body.appendChild(host); }
    var t = el("div", "ks-toast", text); if (kind) t.setAttribute("data-kind", kind);
    host.appendChild(t);
    while (host.children.length > 3) host.firstChild.remove();
    setTimeout(function () { t.setAttribute("data-out", ""); setTimeout(function () { t.remove(); }, 260); }, ms || 3200);
  }

  // ---- confirm dialog: resolves true/false. Focus is trapped, Esc cancels, focus returns to the opener. ----
  function confirmDialog(o) {
    o = o || {};
    return new Promise(function (resolve) {
      var prev = document.activeElement;
      var wrap = el("div", "ks-modal"), box = el("div", "ks-dialog");
      box.setAttribute("role", "alertdialog"); box.setAttribute("aria-modal", "true");
      if (o.danger) box.setAttribute("data-danger", "");
      var ic = el("div", "ks-dialog-ic");
      ic.appendChild(o.danger
        ? svg("M12 9v4m0 4h.01M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z", "#d6246e")
        : svg("M5 12.5l4.5 4.5L19 7.5", "#6b26d9"));
      var h = el("h2", "", o.title || "Are you sure?"); h.id = "ks-dlg-h";
      var p = el("p", "", o.body || ""); p.id = "ks-dlg-p";
      box.setAttribute("aria-labelledby", "ks-dlg-h"); box.setAttribute("aria-describedby", "ks-dlg-p");
      var row = el("div", "ks-dialog-btns");
      var no = el("button", "ks-dbtn ks-dbtn-ghost", o.cancel || "Cancel"); no.type = "button";
      var yes = el("button", "ks-dbtn ks-dbtn-ok", o.ok || "Confirm"); yes.type = "button";
      row.append(no, yes); box.append(ic, h); if (o.body) box.appendChild(p); box.appendChild(row); wrap.appendChild(box);
      var oldOverflow = document.body.style.overflow; document.body.style.overflow = "hidden";
      function close(v) {
        document.removeEventListener("keydown", key, true); wrap.remove(); document.body.style.overflow = oldOverflow;
        if (prev && prev.focus) { try { prev.focus({ preventScroll: true }); } catch (e) { /* element gone */ } }
        resolve(v);
      }
      function key(e) {
        if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(false); }
        else if (e.key === "Tab") { e.preventDefault(); (document.activeElement === no ? yes : no).focus(); }
      }
      no.addEventListener("click", function () { close(false); });
      yes.addEventListener("click", function () { close(true); });
      wrap.addEventListener("mousedown", function (e) { if (e.target === wrap) close(false); });
      document.addEventListener("keydown", key, true);
      document.body.appendChild(wrap);
      (o.danger ? no : yes).focus();
    });
  }

  // ---- connection notices and the error page's retry link ----
  window.addEventListener("offline", function () { toast("You are offline. Your progress stays saved on this device.", "warn", 4500); });
  window.addEventListener("online", function () { toast("Back online.", "ok"); });
  document.addEventListener("htmx:responseError", function () { toast("That did not load. Try again in a moment.", "err"); });
  document.addEventListener("htmx:sendError", function () { toast("No connection. Check your network and try again.", "err"); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-reload]");
    if (a) { e.preventDefault(); location.reload(); }
  });

  window.KSUI = { confirm: confirmDialog, toast: toast };
})();
