/* Keystone: the learner's data lives in this browser (localStorage). If they sign in, static/js/ks-cloud.js (Firebase) syncs it to their account via KS.hook.
   Attempts:  ks-attempts = [{t, title, mode, total, max, correct, wrong, skipped, secs, rows:[[id, subject, topic, status c|w|s, marks, max, seconds]]}]
   Study:     ks-study    = {sessions:[{t, subject, mins}], done:{key:true}, reminder:{on, time, last}, plan:{target, hours}} */
(function () {
  "use strict";
  var KS = (window.KS = {});

  function read(key, def) { try { var v = JSON.parse(localStorage.getItem(key)); return v === null || v === undefined ? def : v; } catch (e) { return def; } }
  function write(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  KS.read = read; KS.write = write;

  KS.dayKey = function (d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
  KS.fmtTime = function (sec) { sec = Math.max(0, Math.round(sec || 0)); return Math.floor(sec / 60) + ":" + pad(sec % 60); };
  KS.pct = function (a, b) { return b > 0 ? Math.round((100 * a) / b) : 0; };

  // ---- attempts ----
  KS.attempts = function () { var a = read("ks-attempts", []); return Array.isArray(a) ? a.filter(function (x) { return x && Array.isArray(x.rows); }) : []; };
  KS.addAttempt = function (a) { var all = KS.attempts(); all.push(a); if (all.length > 200) all = all.slice(-200); var ok = write("ks-attempts", all); if (KS.hook) KS.hook("attempt", a); return ok; };
  KS.clearAttempts = function () { try { localStorage.removeItem("ks-attempts"); } catch (e) { /* ignore */ } if (KS.hook) KS.hook("clear"); };

  // by = "subject" | "topic"; returns rows sorted by name
  KS.stats = function (attempts, by) {
    var map = {};
    attempts.forEach(function (a) {
      a.rows.forEach(function (r) {
        var key = by === "topic" ? r[1] + "|" + r[2] : r[1];
        var o = map[key] || (map[key] = { key: key, subject: r[1], topic: r[2], seen: 0, correct: 0, wrong: 0, skipped: 0, marks: 0, max: 0, secs: 0 });
        o.seen++; o.marks += r[4]; o.max += r[5]; o.secs += r[6] || 0;
        if (r[3] === "c") o.correct++; else if (r[3] === "w") o.wrong++; else o.skipped++;
      });
    });
    return Object.keys(map).sort().map(function (k) { return map[k]; });
  };
  // weakest topics first: lowest share of correct answers among questions seen (at least `min` seen)
  KS.weak = function (attempts, n, min) {
    return KS.stats(attempts, "topic").filter(function (o) { return o.seen >= (min || 3) && o.topic; })
      .sort(function (a, b) { return (a.correct / a.seen) - (b.correct / b.seen) || b.seen - a.seen; }).slice(0, n || 5);
  };

  // ---- study log ----
  KS.study = function () {
    var s = read("ks-study", null);
    if (!s || typeof s !== "object" || Array.isArray(s)) s = {};
    s.sessions = Array.isArray(s.sessions) ? s.sessions : [];
    s.done = s.done && typeof s.done === "object" ? s.done : {};
    s.reminder = s.reminder && typeof s.reminder === "object" ? s.reminder : { on: false, time: "08:00", last: "" };
    s.plan = s.plan && typeof s.plan === "object" ? s.plan : {};
    return s;
  };
  KS.saveStudy = function (s) { if (s.sessions.length > 1000) s.sessions = s.sessions.slice(-1000); s.updated = Date.now(); var ok = write("ks-study", s); if (KS.hook) KS.hook("study"); return ok; };
  KS.studiedToday = function () {
    var k = KS.dayKey();
    return KS.attempts().some(function (a) { return KS.dayKey(new Date(a.t)) === k; }) ||
      KS.study().sessions.some(function (x) { return KS.dayKey(new Date(x.t)) === k; });
  };
  // consecutive days (ending today, or yesterday if today is still empty) with a test or a study session
  KS.streak = function () {
    var days = {};
    KS.attempts().forEach(function (a) { days[KS.dayKey(new Date(a.t))] = 1; });
    KS.study().sessions.forEach(function (x) { days[KS.dayKey(new Date(x.t))] = 1; });
    var d = new Date(); if (!days[KS.dayKey(d)]) d.setDate(d.getDate() - 1);
    var n = 0; while (days[KS.dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };

  // ---- daily reminder (fires only while a Keystone tab is open; the calendar file on /study works in the background) ----
  KS.reminderDue = function () {
    var r = KS.study().reminder;
    if (!r.on) return false;
    var p = String(r.time || "08:00").split(":"), now = new Date();
    var due = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +p[0] || 0, +p[1] || 0);
    return now >= due && !KS.studiedToday();
  };
  KS.checkReminder = function () {
    var s = KS.study();
    if (!KS.reminderDue() || s.reminder.last === KS.dayKey()) return;
    if (window.Notification && Notification.permission === "granted") {
      try { new Notification("Keystone", { body: "Time to practise. Ten questions today keeps the streak going.", tag: "ks-daily" }); } catch (e) { /* needs a service worker on some phones */ }
    }
    s.reminder.last = KS.dayKey(); KS.saveStudy(s);
  };
  // ---- account: instant nav label from the saved hint; the cloud bundle loads only for signed-in visitors and the account pages ----
  KS.renderAccount = function () {
    var h = read("ks-auth", null);
    document.querySelectorAll("[data-account]").forEach(function (a) {
      var who = h && (h.n || h.e) ? (h.n || h.e) : "";
      a.textContent = a.getAttribute("data-account") === "text" ? (who ? "Account" : "Sign in") : (who ? who.trim().charAt(0).toUpperCase() : "Sign in");
      a.href = who ? "/account" : "/login";
      a.setAttribute("aria-label", who ? "Account: " + who : "Sign in");
      a.classList.toggle("ks-signed", !!who);
    });
  };
  KS.loadCloud = function () {
    if (window.KSCloud || document.getElementById("ks-cloud-js")) return;
    var s = document.createElement("script"); s.id = "ks-cloud-js"; s.src = "/static/js/ks-cloud.js"; s.defer = true; document.head.appendChild(s);
  };
  document.addEventListener("DOMContentLoaded", function () {
    KS.renderAccount();
    if (read("ks-auth", null)) KS.loadCloud();
    KS.checkReminder(); setInterval(KS.checkReminder, 60000);
    var chip = document.querySelector("[data-streak]"), n = KS.streak();
    if (chip && n > 0) { chip.textContent = n + "-day streak"; chip.hidden = false; }
  });
})();
