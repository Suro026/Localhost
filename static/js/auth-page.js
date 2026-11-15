(function () {
  "use strict";
  var loginRoot = document.getElementById("auth-root"), acctRoot = document.getElementById("account-root");
  var root = loginRoot || acctRoot;
  if (!root) return;

  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined && text !== null) n.textContent = text; return n; }
  function field(label, input) { var l = el("label", "mt-4 block text-sm font-semibold", label); input.classList.add("input", "mt-1"); l.appendChild(input); return l; }

  function start() {
    var C = window.KSCloud;
    if (!C) { root.replaceChildren(el("p", "text-sm text-muted", "Could not load sign-in. Check your connection and reload.")); return; }
    var first = true;
    C.onChange(function (u) {
      if (first) {
        first = false;
        if (loginRoot) { if (u) location.replace("/progress"); else drawLogin(C); }
        else if (u) drawAccount(C, u); else location.replace("/login");
        return;
      }
      if (loginRoot && u) location.replace("/progress");
    });
  }

  function drawLogin(C) {
    var mode = "in";
    var msg = el("p", "mt-4 min-h-[1.25rem] text-sm font-semibold"); msg.setAttribute("role", "status");
    var email = el("input"); email.type = "email"; email.autocomplete = "email"; email.required = true; email.inputMode = "email";
    var pw = el("input"); pw.type = "password"; pw.required = true; pw.minLength = 6;
    var submit = el("button", "btn-primary mt-5 w-full", ""); submit.type = "submit";
    var tabs = el("div", "grid grid-cols-2 gap-2 rounded-xl bg-canvas p-1");
    var tIn = el("button", "", "Sign in"), tUp = el("button", "", "Create account"); tIn.type = tUp.type = "button";
    tabs.append(tIn, tUp);
    var forgot = el("button", "mt-3 text-sm font-semibold text-brand-700 underline", "Forgot password?"); forgot.type = "button";
    var form = el("form");
    form.append(field("Email", email), field("Password", pw), submit, forgot);

    var google = el("button", "btn-secondary mt-5 w-full gap-2", "Continue with Google"); google.type = "button";
    var or = el("p", "mt-5 text-center text-xs text-muted", "or use your email");

    function paint() {
      [[tIn, "in"], [tUp, "up"]].forEach(function (p) {
        p[0].className = "rounded-lg px-3 py-2 text-sm font-bold " + (mode === p[1] ? "bg-surface shadow-sm text-ink" : "text-muted");
        p[0].setAttribute("aria-pressed", mode === p[1] ? "true" : "false");
      });
      submit.textContent = mode === "in" ? "Sign in" : "Create account";
      pw.autocomplete = mode === "in" ? "current-password" : "new-password";
      forgot.hidden = mode !== "in"; msg.textContent = ""; msg.className = "mt-4 min-h-[1.25rem] text-sm font-semibold";
    }
    function say(text, ok) { msg.textContent = text; msg.className = "mt-4 min-h-[1.25rem] text-sm font-semibold " + (ok ? "text-ok" : "text-red-600"); }
    function busy(b) { [submit, google, forgot, tIn, tUp].forEach(function (x) { x.disabled = b; }); }

    tIn.addEventListener("click", function () { mode = "in"; paint(); });
    tUp.addEventListener("click", function () { mode = "up"; paint(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault(); busy(true); say("Please wait…", true);
      (mode === "in" ? C.signIn(email.value.trim(), pw.value) : C.signUp(email.value.trim(), pw.value)).then(function (r) {
        busy(false); if (!r.ok) say(r.error, false); else say("Signed in.", true);
      });
    });
    google.addEventListener("click", function () {
      busy(true); say("Opening Google…", true);
      C.google().then(function (r) { busy(false); if (!r.ok) say(r.error, false); else say("Signed in.", true); });
    });
    forgot.addEventListener("click", function () {
      if (!email.value.trim()) { say("Type your email above first, then tap Forgot password.", false); return; }
      busy(true);
      C.reset(email.value.trim()).then(function (r) { busy(false); say(r.ok ? "If that email has an account, a reset link is on its way. Check spam too." : r.error, r.ok); });
    });
    paint();
    root.replaceChildren(tabs, google, or, form, msg);
  }

  function drawAccount(C, u) {
    var name = u.email || u.displayName || "Signed in";
    var card = el("div", "rounded-2xl border border-line bg-surface p-5");
    card.append(el("p", "text-sm text-muted", "Signed in as"), el("p", "break-all text-lg font-bold", name));
    var sync = el("p", "mt-3 text-sm text-muted");
    function paintSync() { var t = C.lastSync(); sync.textContent = t ? "Last synced " + new Date(t).toLocaleString() : "Not synced yet."; }
    paintSync();
    var msg = el("p", "mt-3 min-h-[1.25rem] text-sm font-semibold"); msg.setAttribute("role", "status");
    var syncBtn = el("button", "btn-secondary mt-4", "Sync now"); syncBtn.type = "button";
    var out = el("button", "btn-primary mt-4 ml-2", "Sign out"); out.type = "button";
    function say(t, ok) { msg.textContent = t; msg.className = "mt-3 min-h-[1.25rem] text-sm font-semibold " + (ok ? "text-ok" : "text-red-600"); }
    syncBtn.addEventListener("click", function () {
      syncBtn.disabled = true; say("Syncing…", true);
      C.syncNow().then(function (r) { syncBtn.disabled = false; paintSync(); say(r.ok ? "Up to date." : r.error, r.ok); });
    });
    out.addEventListener("click", function () {
      if (!window.confirm("Sign out? Your data stays in your account, and is removed from this device.")) return;
      C.signOut().then(function (r) { if (r.ok) location.replace("/"); else say(r.error, false); });
    });
    card.append(sync, syncBtn, out, msg);

    var danger = el("div", "mt-6 rounded-2xl border border-red-200 bg-surface p-5");
    danger.append(el("h2", "font-bold", "Delete my account"), el("p", "mt-1 text-sm text-muted", "Removes your email, test results, study log and plan from our cloud, and deletes the account. This cannot be undone."));
    var del = el("button", "btn-secondary mt-3 border-red-300 text-red-700", "Delete account and data"); del.type = "button";
    del.addEventListener("click", function () {
      if (!window.confirm("Delete your account and all synced data permanently?")) return;
      del.disabled = true; say("Deleting…", true);
      C.deleteAccount().then(function (r) { if (r.ok) location.replace("/"); else { del.disabled = false; say(r.error, false); } });
    });
    danger.appendChild(del);
    root.replaceChildren(card, danger);
  }

  if (window.KSCloud) start(); else document.addEventListener("kscloud:ready", start, { once: true });
})();
