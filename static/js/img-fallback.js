// Remove broken <img data-fallback> so the initials behind it show (replaces inline onerror, which the CSP forbids).
(function () {
  function drop(img) { img.remove(); }
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) { drop(img); return; }
    img.addEventListener("error", function () { drop(img); }, { once: true });
  });
})();
