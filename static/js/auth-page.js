(function () {
  "use strict";
  var loginRoot = document.getElementById("auth-root"), acctRoot = document.getElementById("profile-root");
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
        else if (u) drawProfile(C, u); else location.replace("/login");
        return;
      }
      if (loginRoot && u) location.replace("/progress");
    });
  }

  function drawLogin(C) {
    var mode = "in";
    var msg = el("p", "mt-4 min-h-[1.25rem] text-sm font-semibold"); msg.setAttribute("role", "status");
    var email = el("input"); email.type = "email"; email.autocomplete = "email"; email.required = true; email.inputMode = "email";
    var pw = el("input"); pw.type = "password"; pw.required = true; pw.minLength = 8;
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

  function drawProfile(C, u) {
    var p = C.profile() || {};
    var name = p.name || (p.email ? p.email.split("@")[0] : "Learner");
    var msg = el("p", "mt-3 min-h-[1.25rem] text-sm font-semibold"); msg.setAttribute("role", "status");
    function say(t, ok) { msg.textContent = t; msg.className = "mt-3 min-h-[1.25rem] text-sm font-semibold " + (ok ? "text-ok" : "text-red-600"); }

    // ---- identity ----
    var head = el("div", "rounded-2xl border border-line bg-surface p-5 sm:flex sm:items-center sm:gap-5");
    var av = el("div", "relative mb-4 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-600 text-3xl font-extrabold text-white sm:mb-0");
    av.appendChild(el("span", "", name.trim().charAt(0).toUpperCase()));
    if (p.photo) {
      var img = el("img", "absolute inset-0 h-full w-full object-cover"); img.alt = ""; img.width = 80; img.height = 80;
      img.referrerPolicy = "no-referrer"; img.hidden = true; img.onload = function () { img.hidden = false; }; img.src = p.photo; av.appendChild(img);
    }
    var who = el("div", "min-w-0 flex-1");
    var nameRow = el("div", "flex flex-wrap items-center gap-2");
    var nameEl = el("h2", "break-words text-2xl font-extrabold", name);
    var editBtn = el("button", "text-sm font-semibold text-brand-700 underline", "Edit name"); editBtn.type = "button";
    nameRow.append(nameEl, editBtn);
    var mail = el("p", "mt-1 break-all text-sm text-muted", p.email);
    var chips = el("div", "mt-3 flex flex-wrap gap-2 text-xs font-bold");
    function chip(t, tone) { chips.appendChild(el("span", "rounded-full px-3 py-1 " + tone, t)); }
    var google = (p.providers || []).indexOf("google.com") >= 0;
    chip(google ? "Google account" : "Email account", "bg-brand-50 text-brand-700");
    chip(p.verified ? "Email verified" : "Email not verified", p.verified ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800");
    if (p.created) chip("Member since " + new Date(p.created).toLocaleDateString(undefined, { month: "short", year: "numeric" }), "bg-canvas text-muted");
    who.append(nameRow, mail, chips);
    head.append(av, who);

    editBtn.addEventListener("click", function () {
      var input = el("input", "input max-w-xs"); input.type = "text"; input.maxLength = 40; input.value = p.name || ""; input.placeholder = "Your name";
      input.setAttribute("aria-label", "Display name");
      var save = el("button", "btn-primary", "Save"); save.type = "button";
      var cancel = el("button", "btn-secondary", "Cancel"); cancel.type = "button";
      var row = el("div", "flex flex-wrap items-center gap-2"); row.append(input, save, cancel);
      nameRow.replaceChildren(row); input.focus();
      cancel.addEventListener("click", function () { nameRow.replaceChildren(nameEl, editBtn); });
      save.addEventListener("click", function () {
        save.disabled = true;
        C.updateName(input.value).then(function (r) {
          if (r.ok) { location.reload(); } else { save.disabled = false; say(r.error, false); }
        });
      });
    });

    // ---- your numbers (from this device's saved results) ----
    var at = KS.attempts(), seen = 0, right = 0, wrong = 0;
    at.forEach(function (a) { a.rows.forEach(function (r) { seen++; if (r[3] === "c") right++; else if (r[3] === "w") wrong++; }); });
    var weekAgo = Date.now() - 7 * 86400000, mins = 0;
    KS.study().sessions.forEach(function (s) { if (s.t >= weekAgo) mins += s.mins; });
    var grid = el("div", "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5");
    [["Tests taken", String(at.length)], ["Questions seen", String(seen)], ["Accuracy", KS.pct(right, right + wrong) + "%"],
     ["Day streak", String(KS.streak())], ["Studied this week", mins + " min"]].forEach(function (t) {
      var c = el("div", "rounded-2xl border border-line bg-surface p-4");
      c.append(el("p", "text-xl font-extrabold", t[1]), el("p", "mt-1 text-xs text-muted", t[0]));
      grid.appendChild(c);
    });
    var links = el("p", "mt-3 text-sm");
    [["/progress", "See full progress"], ["/study", "Open study planner"]].forEach(function (l, i) {
      var a = el("a", "font-semibold text-brand-700 underline" + (i ? " ml-4" : ""), l[1]); a.href = l[0]; links.appendChild(a);
    });

    // ---- sync + session ----
    var card = el("div", "mt-4 rounded-2xl border border-line bg-surface p-5");
    var sync = el("p", "text-sm text-muted");
    function paintSync() { var t = C.lastSync(); sync.textContent = t ? "Your results are saved to your account. Last synced " + new Date(t).toLocaleString() + "." : "Not synced yet."; }
    paintSync();
    card.appendChild(sync);
    if (!p.verified && (p.providers || []).indexOf("password") >= 0) {
      var vb = el("button", "mt-3 block text-sm font-semibold text-brand-700 underline", "Send the verification email again"); vb.type = "button";
      vb.addEventListener("click", function () { C.resendVerification().then(function (r) { say(r.ok ? "Verification email sent. Check your inbox and spam." : r.error, r.ok); }); });
      card.appendChild(vb);
    }
    var syncBtn = el("button", "btn-secondary mt-4", "Sync now"); syncBtn.type = "button";
    var out = el("button", "btn-primary mt-4 ml-2", "Sign out"); out.type = "button";
    syncBtn.addEventListener("click", function () {
      syncBtn.disabled = true; say("Syncing…", true);
      C.syncNow().then(function (r) { syncBtn.disabled = false; paintSync(); say(r.ok ? "Up to date." : r.error, r.ok); });
    });
    out.addEventListener("click", function () {
      if (!window.confirm("Sign out? Your data stays in your account, and is removed from this device.")) return;
      C.signOut().then(function (r) { if (r.ok) location.replace("/"); else say(r.error, false); });
    });
    card.append(syncBtn, out, msg);

    var danger = el("div", "mt-6 rounded-2xl border border-red-200 bg-surface p-5");
    danger.append(el("h2", "font-bold", "Delete my account"), el("p", "mt-1 text-sm text-muted", "Removes your email, test results, study log and plan from our cloud, and deletes the account. This cannot be undone."));
    var del = el("button", "btn-secondary mt-3 border-red-300 text-red-700", "Delete account and data"); del.type = "button";
    del.addEventListener("click", function () {
      if (!window.confirm("Delete your account and all synced data permanently?")) return;
      del.disabled = true; say("Deleting…", true);
      C.deleteAccount().then(function (r) { if (r.ok) location.replace("/"); else { del.disabled = false; say(r.error, false); } });
    });
    danger.appendChild(del);
    root.replaceChildren(head, grid, links, card, danger);
  }

  if (window.KSCloud) start(); else document.addEventListener("kscloud:ready", start, { once: true });
})();
