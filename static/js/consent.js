(function () {
  "use strict";
  var root = document.getElementById("consent");
  if (!root) return;
  var docs = Array.prototype.slice.call(root.querySelectorAll("[data-doc]"));
  var agree = document.getElementById("agree"), accept = document.getElementById("accept"), msg = document.getElementById("consent-msg");
  var next = root.getAttribute("data-next") || "/tests";
  if (next.charAt(0) !== "/" || next.charAt(1) === "/") next = "/tests";
  var done = {};

  function check(doc) {
    var box = doc.querySelector("[data-scroll]"), key = doc.getAttribute("data-doc");
    var max = box.scrollHeight - box.clientHeight;
    var pct = max <= 4 ? 100 : Math.min(100, Math.round((box.scrollTop / max) * 100));
    doc.querySelector("[data-bar]").style.width = pct + "%";
    if (!done[key] && (max <= 4 || box.scrollTop >= max - 6)) {
      done[key] = true;
      doc.setAttribute("data-done", "true");
      doc.querySelector("[data-state]").textContent = "Read";
      var step = root.querySelector('[data-step="' + key + '"]'); if (step) step.setAttribute("data-done", "true");
      update();
    }
  }
  function update() {
    var all = docs.every(function (d) { return done[d.getAttribute("data-doc")]; });
    agree.disabled = !all;
    if (!all) { agree.checked = false; accept.disabled = true; }
    else if (!agree.checked) { msg.textContent = "Thank you. Tick the box to continue."; }
    accept.disabled = !(all && agree.checked);
    if (all && agree.checked) msg.textContent = "";
  }
  docs.forEach(function (d) {
    var box = d.querySelector("[data-scroll]");
    box.addEventListener("scroll", function () { check(d); }, { passive: true });
    check(d);
  });
  window.addEventListener("resize", function () { docs.forEach(check); });
  agree.addEventListener("change", update);
  accept.addEventListener("click", function () {
    accept.disabled = true; msg.textContent = "Saving…";
    fetch("/legal/accept", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ read: Object.keys(done) }) })
      .then(function (r) { if (!r.ok) throw new Error("bad"); location.replace(next); })
      .catch(function () { accept.disabled = false; msg.textContent = "Could not save. Check your connection and try again."; });
  });
})();
