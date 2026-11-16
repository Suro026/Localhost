(function () {
  "use strict";
  var loginRoot = document.getElementById("auth-root"), acctRoot = document.getElementById("profile-root");
  var root = loginRoot || acctRoot;
  if (!root) return;

  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined && text !== null) n.textContent = text; return n; }
  function field(label, input) { var l = el("label", "mt-4 block text-sm font-semibold", label); input.classList.add("input", "mt-1"); l.appendChild(input); return l; }

  var hold = null, releaseHold = null; // keeps the redirect back until the new account's name is saved
  function dest() { // where the gate sent them from; same-site paths only
    var n = new URLSearchParams(location.search).get("next");
    return n && n.charAt(0) === "/" && n.charAt(1) !== "/" && n.indexOf("\\") < 0 ? n : "/tests";
  }
  function go() {
    (hold || Promise.resolve()).then(function () { return window.KSCloud.session(); }).then(function (ok) {
      if (ok) location.replace(dest()); else { var m = el("p", "mt-3 text-center text-sm font-semibold text-red-600", "Signed in, but the site could not confirm it. Check your connection and reload."); m.setAttribute("role", "alert"); root.prepend(m); }
    });
  }

  function start() {
    var C = window.KSCloud;
    if (!C) { root.replaceChildren(el("p", "text-sm text-muted", "Could not load sign-in. Check your connection and reload.")); return; }
    var first = true;
    C.onChange(function (u) {
      if (first) {
        first = false;
        if (loginRoot) { if (u) go(); else drawLogin(C); }
        else if (u) drawProfile(C, u); else location.replace("/login");
        return;
      }
      if (loginRoot && u) go();
    });
  }

  var SVGNS = "http://www.w3.org/2000/svg";
  function svg(cls, paths, vb) {
    var s = document.createElementNS(SVGNS, "svg"); s.setAttribute("viewBox", vb || "0 0 24 24"); s.setAttribute("class", cls); s.setAttribute("aria-hidden", "true");
    paths.forEach(function (d) { var p = document.createElementNS(SVGNS, "path"); p.setAttribute("d", d[0]); if (d[1]) p.setAttribute("fill", d[1]); else { p.setAttribute("fill", "none"); p.setAttribute("stroke", "currentColor"); p.setAttribute("stroke-width", "2"); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round"); } s.appendChild(p); });
    return s;
  }
  var EYE = [["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"], ["M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"]];
  var EYE_OFF = [["M3 3l18 18"], ["M10.6 6.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.5 6.9C3.6 8.8 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4-.9"]];
  var GOOGLE = [["M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.300 3-7.300z", "#4285F4"],
    ["M12 22c2.7 0 5-.9 6.600-2.400l-3.200-2.500c-.9.600-2 1-3.400 1-2.600 0-4.800-1.800-5.600-4.100H3.100v2.600A10 10 0 0 0 12 22z", "#34A853"],
    ["M6.400 14c-.2-.6-.3-1.300-.3-2s.1-1.400.3-2V7.400H3.100a10 10 0 0 0 0 9.200L6.400 14z", "#FBBC05"],
    ["M12 5.900c1.500 0 2.800.5 3.800 1.500l2.900-2.900A10 10 0 0 0 3.100 7.400L6.400 10c.8-2.300 3-4.100 5.600-4.100z", "#EA4335"]];

  function drawLogin(C) {
    var mode = "in", shown = false;
    var card = el("div", "relative rounded-3xl border border-line bg-surface p-6 shadow-xl sm:p-8");
    card.appendChild(el("div", "absolute inset-x-8 -top-2 h-2 rounded-t-xl bg-brand-600"));

    var badge = el("div", "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100");
    badge.appendChild(svg("h-6 w-6", [["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"], ["M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"], ["M19 8v6M22 11h-6"]]));
    var h1 = el("h1", "mt-4 text-center text-2xl font-extrabold tracking-tight");
    var sub = el("p", "mt-1 text-center text-sm text-muted");

    var google = el("button", "btn-secondary mt-6 h-11 w-full gap-2"); google.type = "button";
    google.append(svg("h-5 w-5", GOOGLE), document.createTextNode("Continue with Google"));
    var or = el("div", "relative my-5 text-center text-xs uppercase text-muted before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-line before:content-['']");
    or.appendChild(el("span", "relative bg-surface px-2", "or"));

    var name = el("input"); name.type = "text"; name.autocomplete = "name"; name.maxLength = 40; name.placeholder = "Your name (optional)";
    var email = el("input"); email.type = "email"; email.autocomplete = "email"; email.required = true; email.inputMode = "email"; email.placeholder = "you@example.com";
    var pw = el("input", "input pr-11"); pw.type = "password"; pw.required = true; pw.minLength = 8; pw.placeholder = "At least 8 characters";
    var eye = el("button", "absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:text-ink"); eye.type = "button";
    function paintEye() { var on = pw.type === "text"; eye.setAttribute("aria-label", on ? "Hide password" : "Show password"); eye.replaceChildren(svg("h-5 w-5", on ? EYE_OFF : EYE)); }
    eye.addEventListener("click", function () { pw.type = pw.type === "password" ? "text" : "password"; paintEye(); });
    paintEye();
    var pwWrap = el("div", "relative"); pwWrap.append(pw, eye);
    var pwLabel = field("Password", pwWrap); pwLabel.querySelector(".input").classList.remove("mt-1");
    pwWrap.classList.add("mt-1");
    var nameLabel = field("Full name", name);

    var submit = el("button", "btn-primary mt-5 h-11 w-full"); submit.type = "submit";
    var forgot = el("button", "mt-3 block text-sm font-semibold text-brand-700 underline", "Forgot password?"); forgot.type = "button";
    var msg = el("p", "mt-3 min-h-[1.25rem] text-center text-sm font-semibold"); msg.setAttribute("role", "status");
    var form = el("form"); form.noValidate = false;
    var emailLabel = field("Email", email);
    form.append(nameLabel, emailLabel, pwLabel, submit, forgot, msg);

    var swap = el("div", "mt-5 flex items-center justify-center gap-1 text-sm text-muted");
    var swapText = el("span"), swapBtn = el("button", "font-semibold text-brand-700 underline"); swapBtn.type = "button";
    swap.append(swapText, swapBtn);

    function paint() {
      var up = mode === "up";
      h1.textContent = up ? "Create your account" : "Welcome back";
      sub.textContent = up ? "Save your scores, weak topics and study plan on every device." : "Sign in to pick up where you left off.";
      submit.textContent = up ? "Create account" : "Sign in";
      swapText.textContent = up ? "Already have an account?" : "New to Keystone?";
      swapBtn.textContent = up ? "Sign in" : "Create an account";
      nameLabel.hidden = !up; forgot.hidden = up;
      pw.autocomplete = up ? "new-password" : "current-password";
      if (shown) { msg.textContent = ""; } shown = true;
      msg.className = "mt-3 min-h-[1.25rem] text-center text-sm font-semibold";
    }
    function say(text, ok) { msg.textContent = text; msg.className = "mt-3 min-h-[1.25rem] text-center text-sm font-semibold " + (ok ? "text-ok" : "text-red-600"); }
    function busy(b) { [submit, google, forgot, swapBtn].forEach(function (x) { x.disabled = b; }); }

    swapBtn.addEventListener("click", function () { mode = mode === "in" ? "up" : "in"; paint(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault(); busy(true); say("Please wait…", true);
      var up = mode === "up", nm = name.value.trim();
      if (up && nm) hold = new Promise(function (r) { releaseHold = r; });
      (up ? C.signUp(email.value.trim(), pw.value) : C.signIn(email.value.trim(), pw.value)).then(function (r) {
        if (!r.ok) { busy(false); say(r.error, false); if (releaseHold) releaseHold(); return; }
        say("Signed in.", true);
        if (up && nm) C.updateName(nm).then(function () { releaseHold(); }, function () { releaseHold(); });
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
    card.append(badge, h1, sub, google, or, form, swap);
    root.replaceChildren(card);
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
    var chosen = window.KSAvatars ? KSAvatars.current() : "";
    if (chosen) { var big = KSAvatars.node(chosen); if (big) { big.setAttribute("class", "absolute inset-0 h-full w-full"); av.replaceChildren(big); } }
    else if (p.photo) {
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

    // ---- avatar picker ----
    var pick = el("section", "ks-avpick"); pick.setAttribute("aria-labelledby", "av-h");
    pick.appendChild(el("h2", "text-lg font-bold", "Choose your avatar")); pick.firstChild.id = "av-h";
    pick.appendChild(el("p", "mt-1 text-sm text-muted", "Pick a character to show instead of a photo. You can change it any time."));
    var avGrid = el("div", "ks-avgrid"); avGrid.setAttribute("role", "radiogroup"); avGrid.setAttribute("aria-label", "Avatars");
    var streakNow = KS.streak();
    function paintPick() {
      var cur = KSAvatars.current(); avGrid.replaceChildren();
      var opts = [{ id: "", name: p.photo ? "My photo" : "My initial" }].concat(KSAvatars.list);
      opts.forEach(function (a) {
        var open = !a.id || KSAvatars.unlocked(a.id, streakNow);
        var b = el("button", "ks-avopt"); b.type = "button"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", cur === a.id ? "true" : "false"); b.disabled = !open;
        b.setAttribute("aria-label", a.name + (open ? "" : ", locked: needs a " + a.days + "-day streak"));
        var face = el("span", "ks-avface");
        if (a.id) { var n = KSAvatars.node(a.id); if (n) face.appendChild(n); }
        else if (p.photo) { var im = el("img"); im.src = p.photo; im.alt = ""; im.referrerPolicy = "no-referrer"; face.appendChild(im); }
        else face.textContent = name.trim().charAt(0).toUpperCase();
        b.append(face, el("span", "ks-avname", open ? a.name : a.days + "-day streak"));
        b.addEventListener("click", function () {
          if (!open) return;
          C.setAvatar(a.id).then(function (r) {
            if (!r.ok) say(r.error, false); else say(a.id ? a.name + " selected." : "Using your " + (p.photo ? "photo" : "initial") + ".", true);
            paintPick(); var big2 = KSAvatars.current();
            av.replaceChildren(); if (big2) { var nn = KSAvatars.node(big2); nn.setAttribute("class", "absolute inset-0 h-full w-full"); av.appendChild(nn); } else av.appendChild(el("span", "", name.trim().charAt(0).toUpperCase()));
          });
        });
        avGrid.appendChild(b);
      });
    }
    paintPick(); pick.appendChild(avGrid);

    // ---- your numbers (from this device's saved results) ----
    var at = KS.attempts(), seen = 0, right = 0, wrong = 0;
    at.forEach(function (a) { a.rows.forEach(function (r) { seen++; if (r[3] === "c") right++; else if (r[3] === "w") wrong++; }); });
    var weekAgo = Date.now() - 7 * 86400000, mins = 0;
    KS.study().sessions.forEach(function (s) { if (s.t >= weekAgo) mins += s.mins; });
    var grid = el("div", "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5");
    [["Tests taken", String(at.length)], ["Questions seen", String(seen)], ["Accuracy", KS.pct(right, right + wrong) + "%"],
     ["Day streak", String(KS.streak())], ["Studied this week", mins + " min"]].forEach(function (t) {
      var c = el("div", "rounded-2xl border border-line bg-surface p-4");
      var big = el("p", "text-xl font-extrabold", t[1]), num = parseInt(t[1], 10);
      if (window.KSActivity && isFinite(num)) KSActivity.countUp(big, num, t[1].replace(/^\d+/, ""));
      c.append(big, el("p", "mt-1 text-xs text-muted", t[0]));
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
    var activity = window.KSActivity ? KSActivity.card() : document.createComment("");
    av.classList.add("ks-avclick"); av.title = "Change avatar"; av.setAttribute("role", "button"); av.tabIndex = 0;
    function toPicker() { pick.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" }); var f = pick.querySelector("[aria-checked='true']"); if (f) f.focus({ preventScroll: true }); }
    av.addEventListener("click", toPicker); av.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toPicker(); } });
    root.replaceChildren(head, pick, activity, grid, links, card, danger);
  }

  if (window.KSCloud) start(); else document.addEventListener("kscloud:ready", start, { once: true });
})();
