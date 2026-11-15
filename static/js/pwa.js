(function () {
  "use strict";
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(function () { /* optional */ }); });
  }

  var KEY = "ks-install-dismissed";
  function dismissedRecently(days) {
    try { var t = Number(localStorage.getItem(KEY)); return t && Date.now() - t < days * 86400000; } catch (e) { return false; }
  }
  function remember() { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) { /* ignore */ } }
  function standalone() { return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }

  function popup(body, actionLabel, onAction) {
    if (document.getElementById("install-popup")) return;
    var box = el("div", "fixed inset-x-3 bottom-3 z-50 mx-auto max-w-sm rounded-2xl border border-line bg-surface p-4 shadow-xl sm:inset-x-auto sm:right-4 sm:bottom-4");
    box.id = "install-popup"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Install Keystone");
    var row = el("div", "flex items-start gap-3");
    var img = el("img", "h-11 w-11 shrink-0 rounded-xl"); img.src = "/static/img/icon-192.png"; img.alt = ""; img.width = 44; img.height = 44;
    var txt = el("div", "min-w-0");
    txt.append(el("p", "font-bold", "Install Keystone"), el("p", "mt-0.5 text-sm text-muted", body));
    row.append(img, txt);
    var bar = el("div", "mt-3 flex justify-end gap-2");
    var no = el("button", "btn-secondary", "Not now"); no.type = "button";
    no.addEventListener("click", function () { remember(); box.remove(); });
    bar.appendChild(no);
    if (actionLabel) {
      var go = el("button", "btn-primary", actionLabel); go.type = "button";
      go.addEventListener("click", function () { box.remove(); onAction(); });
      bar.appendChild(go);
    }
    box.append(row, bar);
    document.body.appendChild(box);
  }

  var deferred = null;
  function install() {
    if (!deferred) return;
    var d = deferred; deferred = null;
    d.prompt(); d.userChoice.finally(function () { remember(); var f = document.getElementById("install-app"); if (f) f.hidden = true; });
  }
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); deferred = e;
    var foot = document.getElementById("install-app");
    if (foot) { foot.hidden = false; foot.addEventListener("click", install); }
    if (!dismissedRecently(7)) setTimeout(function () {
      popup("Open it from your home screen like an app. Your tests and progress stay on this device.", "Install", install);
    }, 4000);
  });
  window.addEventListener("appinstalled", function () {
    var p = document.getElementById("install-popup"); if (p) p.remove();
    var f = document.getElementById("install-app"); if (f) f.hidden = true;
  });

  // iPhone and iPad Safari never fire beforeinstallprompt, so explain the manual steps once a month.
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios|fxios|edgios/i.test(navigator.userAgent);
  if (ios && !standalone() && !dismissedRecently(30)) {
    setTimeout(function () { popup("Tap the Share button in Safari, then choose Add to Home Screen.", "", null); }, 4000);
  }
})();
