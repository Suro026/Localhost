(function () {
  "use strict";
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(function () { /* optional */ }); });
  }
  // Show an "Install app" button when the browser offers one.
  var deferred = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); deferred = e;
    var host = document.getElementById("install-app");
    if (!host) return;
    host.hidden = false;
    host.addEventListener("click", function () {
      if (!deferred) return;
      deferred.prompt(); deferred.userChoice.finally(function () { deferred = null; host.hidden = true; });
    }, { once: true });
  });
})();
