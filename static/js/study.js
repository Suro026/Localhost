(function () {
  "use strict";
  var root = document.getElementById("study-root");
  if (!root || !window.KS) return;
  var SUBJECTS = [];
  try { SUBJECTS = JSON.parse(root.getAttribute("data-subjects") || "[]"); } catch (e) { SUBJECTS = []; }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }
  function card(title, sub) {
    var c = el("section", "mt-6 rounded-2xl border border-line bg-surface p-5");
    c.appendChild(el("h2", "text-xl font-bold", title));
    if (sub) c.appendChild(el("p", "mt-1 text-sm text-muted", sub));
    return c;
  }
  function field(label, input) {
    var l = el("label", "block text-sm font-semibold", label);
    input.className = (input.className ? input.className + " " : "") + "input mt-1";
    l.appendChild(input);
    return l;
  }
  function mins(m) { return m >= 60 ? Math.floor(m / 60) + " h " + (m % 60) + " min" : m + " min"; }

  // =============== today strip + reminder banner ===============
  var top = el("div", "mt-6");
  function todayMinutes() {
    var k = KS.dayKey(), n = 0;
    KS.study().sessions.forEach(function (s) { if (KS.dayKey(new Date(s.t)) === k) n += s.mins; });
    return n;
  }
  var strip = el("p", "text-sm text-muted");
  var banner = el("p", "mt-3 hidden rounded-xl border border-line bg-brand-50 px-4 py-3 text-sm font-semibold");
  function refreshTop() {
    strip.textContent = "Today: " + mins(todayMinutes()) + " studied · Streak: " + KS.streak() + " day" + (KS.streak() === 1 ? "" : "s");
    banner.textContent = "You have not studied yet today. Start the timer or take a short test.";
    banner.classList.toggle("hidden", !KS.reminderDue());
  }
  top.append(strip, banner);

  // =============== timer ===============
  var T = el("div"), timerCard = card("Study timer", "Pick a subject and a length, start, and the session is logged when it ends.");
  var subjSel = el("select");
  SUBJECTS.concat(["Other"]).forEach(function (s) { var o = el("option", "", s); o.value = s; subjSel.appendChild(o); });
  var lenIn = el("input"); lenIn.type = "number"; lenIn.min = "1"; lenIn.max = "180"; lenIn.value = "25"; lenIn.inputMode = "numeric";
  var presets = el("div", "mt-2 flex flex-wrap gap-2");
  [25, 45, 60, 90].forEach(function (m) {
    var b = el("button", "btn-secondary", m + " min"); b.type = "button";
    b.addEventListener("click", function () { lenIn.value = String(m); });
    presets.appendChild(b);
  });
  var form = el("div", "mt-4 grid gap-3 sm:grid-cols-2");
  form.append(field("Subject", subjSel), field("Minutes (1 to 180)", lenIn));
  var clock = el("p", "mt-4 font-mono text-5xl font-extrabold", "00:00");
  clock.setAttribute("role", "timer");
  var tmsg = el("p", "mt-1 min-h-[1.25rem] text-sm text-muted");
  var startBtn = el("button", "btn-primary mt-3", "Start"); startBtn.type = "button";
  var stopBtn = el("button", "btn-secondary mt-3 hidden", "Stop and save"); stopBtn.type = "button";
  var tbar = el("div", "flex flex-wrap gap-2"); tbar.append(startBtn, stopBtn);
  var week = el("div", "mt-5 flex h-24 items-end gap-2");
  timerCard.append(form, presets, clock, tmsg, tbar, el("h3", "mt-5 text-sm font-bold", "Last 7 days"), week);
  T.appendChild(timerCard);

  function drawWeek() {
    var per = {}, i, d, out = [];
    KS.study().sessions.forEach(function (s) { var k = KS.dayKey(new Date(s.t)); per[k] = (per[k] || 0) + s.mins; });
    for (i = 6; i >= 0; i--) { d = new Date(); d.setDate(d.getDate() - i); out.push([d, per[KS.dayKey(d)] || 0]); }
    var peak = Math.max(60, Math.max.apply(null, out.map(function (x) { return x[1]; })));
    week.replaceChildren();
    out.forEach(function (x) {
      var col = el("div", "flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1");
      col.appendChild(el("span", "text-[11px] font-semibold", x[1] ? String(x[1]) : ""));
      var b = el("div", "w-full rounded-t-md " + (x[1] ? "bg-brand-600" : "bg-canvas"));
      b.style.height = Math.max(3, (100 * x[1]) / peak) * 0.65 + "%";
      b.title = x[0].toLocaleDateString() + ": " + x[1] + " min";
      col.append(b, el("span", "text-[11px] text-muted", x[0].toLocaleDateString(undefined, { weekday: "short" })));
      week.appendChild(col);
    });
  }

  var run = KS.read("ks-timer", null), tickId = null;
  function logSession(subject, m) {
    if (m < 1) return;
    var s = KS.study(); s.sessions.push({ t: Date.now(), subject: subject, mins: m }); KS.saveStudy(s);
  }
  function setIdle() { startBtn.classList.remove("hidden"); stopBtn.classList.add("hidden"); lenIn.disabled = subjSel.disabled = false; }
  function finish(early) {
    if (!run) return;
    var done = early ? Math.min(run.mins, Math.floor((Date.now() - run.start) / 60000)) : run.mins;
    logSession(run.subject, done);
    try { localStorage.removeItem("ks-timer"); } catch (e) { /* ignore */ }
    var subj = run.subject; run = null; clearInterval(tickId); tickId = null;
    clock.textContent = "00:00"; document.title = "Study — Keystone"; setIdle();
    tmsg.textContent = done >= 1 ? "Saved " + done + " min of " + subj + "." : "Stopped before one minute, so nothing was saved.";
    if (!early && window.Notification && Notification.permission === "granted") {
      try { new Notification("Keystone", { body: "Study session done: " + done + " min of " + subj + "." }); } catch (e) { /* ignore */ }
    }
    drawWeek(); refreshTop();
  }
  function tick() {
    if (!run) return;
    var left = Math.max(0, Math.round((run.end - Date.now()) / 1000));
    clock.textContent = String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0");
    document.title = (left ? clock.textContent + " · " : "") + "Study — Keystone";
    if (left === 0) finish(false);
  }
  function begin() {
    startBtn.classList.add("hidden"); stopBtn.classList.remove("hidden"); lenIn.disabled = subjSel.disabled = true;
    tmsg.textContent = "Running for " + run.subject + ". You can leave this page; the timer keeps counting.";
    clearInterval(tickId); tickId = setInterval(tick, 1000); tick();
  }
  startBtn.addEventListener("click", function () {
    var m = Math.round(Number(lenIn.value));
    if (!(m >= 1 && m <= 180)) { tmsg.textContent = "Enter a length between 1 and 180 minutes."; return; }
    run = { subject: subjSel.value, mins: m, start: Date.now(), end: Date.now() + m * 60000 };
    KS.write("ks-timer", run); begin();
  });
  stopBtn.addEventListener("click", function () { finish(true); });
  if (run && typeof run.end === "number" && typeof run.mins === "number") {
    subjSel.value = run.subject; lenIn.value = String(run.mins);
    if (run.end <= Date.now()) { finish(false); } else { begin(); }
  } else { run = null; }

  // =============== planner ===============
  var P = el("div"), planCard = card("7-day plan", "Weak subjects first. Tests you take change the order.");
  var examIn = el("input"); examIn.type = "date";
  var hoursIn = el("input"); hoursIn.type = "number"; hoursIn.min = "1"; hoursIn.max = "12"; hoursIn.step = "0.5"; hoursIn.inputMode = "decimal";
  var saved = KS.study().plan;
  examIn.value = typeof saved.target === "string" ? saved.target : "";
  hoursIn.value = saved.hours >= 1 && saved.hours <= 12 ? String(saved.hours) : "3";
  var pform = el("div", "mt-4 grid gap-3 sm:grid-cols-2");
  pform.append(field("Exam date (optional)", examIn), field("Hours per day (1 to 12)", hoursIn));
  var leftEl = el("p", "mt-3 text-sm font-semibold");
  var days = el("div", "mt-4 space-y-3");
  planCard.append(pform, leftEl, days);
  P.appendChild(planCard);

  function order() {
    var st = KS.stats(KS.attempts(), "subject"), acc = {};
    st.forEach(function (o) { acc[o.subject] = o.correct / o.seen; });
    var list = SUBJECTS.filter(function (s) { return s !== "General Aptitude"; });
    list.sort(function (a, b) { return (a in acc ? acc[a] : 0.5) - (b in acc ? acc[b] : 0.5); });
    return list.length ? list : SUBJECTS.slice();
  }
  function round5(x) { return Math.max(0.5, Math.round(x * 2) / 2); }
  function drawPlan() {
    var plan = KS.study().plan, h = Math.max(1, Math.min(12, Number(hoursIn.value) || 3));
    var ord = order(), weak = KS.weak(KS.attempts(), 3, 3), done = KS.study().done;
    var target = examIn.value ? new Date(examIn.value + "T00:00:00") : null, today = new Date(); today.setHours(0, 0, 0, 0);
    if (target && !isNaN(target)) {
      var dl = Math.round((target - today) / 86400000);
      leftEl.textContent = dl > 0 ? dl + " days to your exam, about " + Math.max(1, Math.floor(dl / 7)) + " full mocks if you take one a week." : "Your exam date has passed. Pick a new one.";
    } else { leftEl.textContent = "Add your exam date to see how many days are left."; }
    days.replaceChildren();
    for (var i = 0; i < 7; i++) {
      var d = new Date(today); d.setDate(d.getDate() + i);
      var key = KS.dayKey(d), tasks = [];
      if (d.getDay() === 0) {
        tasks.push({ id: "mock", text: "Full mock test (3 h), then review every mistake", href: "/tests/start?mode=mock" });
      } else {
        var s = ord[i % ord.length];
        tasks.push({ id: "study|" + s, text: "Study " + s + " (" + round5(h * 0.6) + " h)" });
        tasks.push({ id: "prac|" + s, text: "Practise 20 " + s + " questions (" + round5(h * 0.4) + " h)",
          href: "/tests/start?mode=subject&subject=" + encodeURIComponent(s) + "&count=20" });
        if (i === 0 && weak.length) {
          tasks.push({ id: "weak", text: "Fix your weakest topics: " + weak.map(function (o) { return o.topic; }).join(", "),
            href: "/tests/start?mode=weak&" + weak.map(function (o) { return "t=" + encodeURIComponent(o.key); }).join("&") });
        }
      }
      var box = el("div", "rounded-xl border border-line p-4" + (i === 0 ? " bg-brand-50" : ""));
      box.appendChild(el("p", "text-sm font-bold", (i === 0 ? "Today · " : "") + d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })));
      var ul = el("ul", "mt-2 space-y-2");
      tasks.forEach(function (t) {
        var dk = key + "|" + t.id, li = el("li", "flex items-start gap-3 text-sm");
        var cb = el("input", "mt-1 h-4 w-4 shrink-0"); cb.type = "checkbox"; cb.checked = !!done[dk];
        cb.setAttribute("aria-label", t.text);
        cb.addEventListener("change", function () {
          var s2 = KS.study(); if (cb.checked) s2.done[dk] = true; else delete s2.done[dk]; KS.saveStudy(s2);
        });
        li.appendChild(cb);
        if (t.href) { var a = el("a", "min-w-0 break-words font-medium text-brand-700 underline", t.text); a.href = t.href; li.appendChild(a); }
        else li.appendChild(el("span", "min-w-0 break-words", t.text));
        ul.appendChild(li);
      });
      box.appendChild(ul); days.appendChild(box);
    }
  }
  function savePlan() { var s = KS.study(); s.plan = { target: examIn.value, hours: Number(hoursIn.value) || 3 }; KS.saveStudy(s); drawPlan(); }
  examIn.addEventListener("change", savePlan); hoursIn.addEventListener("change", savePlan);

  // =============== reminder ===============
  var R = el("div"), remCard = card("Daily reminder", "Pick a time. A browser reminder shows only while a Keystone tab is open. The calendar file below also works when the browser is closed.");
  var timeIn = el("input"); timeIn.type = "time"; timeIn.value = KS.study().reminder.time || "08:00";
  var onBtn = el("button", "btn-primary", ""); onBtn.type = "button";
  var icsBtn = el("button", "btn-secondary", "Download calendar reminder (.ics)"); icsBtn.type = "button";
  var rmsg = el("p", "mt-3 text-sm text-muted");
  var rbar = el("div", "mt-4 flex flex-wrap gap-2"); rbar.append(onBtn, icsBtn);
  var rrow = el("div", "mt-4 max-w-xs"); rrow.appendChild(field("Time", timeIn));
  remCard.append(rrow, rbar, rmsg);
  R.appendChild(remCard);
  function drawRem() {
    var r = KS.study().reminder;
    onBtn.textContent = r.on ? "Turn reminder off" : "Turn browser reminder on";
    if (!("Notification" in window)) rmsg.textContent = "This browser cannot show notifications. Use the calendar file instead.";
    else if (Notification.permission === "denied") rmsg.textContent = "Notifications are blocked for this site in your browser settings. Use the calendar file instead.";
    else rmsg.textContent = r.on ? "Reminder is on for " + (r.time || "08:00") + " each day you have not studied." : "";
  }
  onBtn.addEventListener("click", function () {
    var s = KS.study();
    if (s.reminder.on) { s.reminder.on = false; KS.saveStudy(s); drawRem(); refreshTop(); return; }
    s.reminder.on = true; s.reminder.time = timeIn.value || "08:00"; s.reminder.last = ""; KS.saveStudy(s);
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then(function () { drawRem(); refreshTop(); });
    } else { drawRem(); refreshTop(); }
  });
  timeIn.addEventListener("change", function () {
    var s = KS.study(); s.reminder.time = timeIn.value || "08:00"; s.reminder.last = ""; KS.saveStudy(s); drawRem(); refreshTop();
  });
  icsBtn.addEventListener("click", function () {
    var t = (timeIn.value || "08:00").split(":"), now = new Date();
    var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +t[0], +t[1]);
    if (start <= now) start.setDate(start.getDate() + 1);
    function p2(n) { return (n < 10 ? "0" : "") + n; }
    function stamp(d) { return d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()) + "T" + p2(d.getHours()) + p2(d.getMinutes()) + "00"; }
    var utc = new Date();
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Keystone//Study reminder//EN", "BEGIN:VEVENT",
      "UID:keystone-daily-study@" + location.hostname,
      "DTSTAMP:" + utc.getUTCFullYear() + p2(utc.getUTCMonth() + 1) + p2(utc.getUTCDate()) + "T" + p2(utc.getUTCHours()) + p2(utc.getUTCMinutes()) + p2(utc.getUTCSeconds()) + "Z",
      "DTSTART:" + stamp(start), "DURATION:PT30M", "RRULE:FREQ=DAILY", "SUMMARY:Keystone: practise today",
      "DESCRIPTION:Open " + location.origin + "/tests and do a short set.", "BEGIN:VALARM", "ACTION:DISPLAY",
      "DESCRIPTION:Keystone: time to practise", "TRIGGER:PT0M", "END:VALARM", "END:VEVENT", "END:VCALENDAR"];
    var blob = new Blob([lines.join("\r\n") + "\r\n"], { type: "text/calendar" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "keystone-daily-reminder.ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  });

  root.replaceChildren(top, T, P, R);
  drawWeek(); drawPlan(); drawRem(); refreshTop();
})();
