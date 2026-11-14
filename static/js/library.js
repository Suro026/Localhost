(function () {
  var box = document.getElementById("lib-search");
  if (!box) return;
  var rows = Array.prototype.slice.call(document.querySelectorAll("[data-file]"));
  var blocks = Array.prototype.slice.call(document.querySelectorAll("[data-subject]"));
  var none = document.getElementById("lib-nomatch");
  box.addEventListener("input", function () {
    var q = box.value.trim().toLowerCase();
    var shown = 0;
    rows.forEach(function (r) {
      var ok = !q || r.getAttribute("data-title").indexOf(q) !== -1;
      r.hidden = !ok;
      if (ok) shown++;
    });
    blocks.forEach(function (b) {
      b.hidden = !b.querySelector("[data-file]:not([hidden])");
    });
    if (none) none.hidden = shown > 0;
  });
})();
