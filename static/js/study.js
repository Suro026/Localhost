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

  // =============== planner (the learner decides every task) ===============
  var P = el("div"), planCard = card("Your plan", "You decide what to do and when. Add a task for any day; tick it off when done.");
  var examIn = el("input"); examIn.type = "date";
  var savedPlan = KS.study().plan;
  examIn.value = typeof savedPlan.target === "string" ? savedPlan.target : "";
  var leftEl = el("p", "mt-2 text-sm font-semibold");
  var tDate = el("input"); tDate.type = "date"; tDate.value = KS.dayKey();
  var tText = el("input"); tText.type = "text"; tText.maxLength = 120; tText.placeholder = "e.g. Finish Graph algorithms notes";
  var tSubj = el("select");
  [["", "No practice link"]].concat(SUBJECTS.map(function (s) { return [s, "Practice: " + s]; })).forEach(function (o) {
    var op = el("option", "", o[1]); op.value = o[0]; tSubj.appendChild(op);
  });
  var addBtn = el("button", "btn-primary", "Add task"); addBtn.type = "button";
  var pmsg = el("p", "mt-2 min-h-[1.25rem] text-sm text-muted");
  var addRow = el("div", "mt-4 grid gap-3 sm:grid-cols-2");
  addRow.append(field("Day", tDate), field("Practice link (optional)", tSubj));
  var textRow = el("div", "mt-3"); textRow.appendChild(field("Task", tText));
  var days = el("div", "mt-5 space-y-3");
  var examRow = el("div", "mt-4 max-w-xs"); examRow.appendChild(field("Exam date (optional)", examIn));
  planCard.append(examRow, leftEl, addRow, textRow, el("div", "mt-3", ""), pmsg, days);
  planCard.children[planCard.children.length - 3].appendChild(addBtn);
  P.appendChild(planCard);

  function tasks() { var s = KS.study(); return Array.isArray(s.tasks) ? s.tasks.filter(function (t) { return t && typeof t.text === "string" && typeof t.date === "string"; }) : []; }
  function saveTasks(list) { var s = KS.study(); s.tasks = list.slice(-500); KS.saveStudy(s); }
  function drawPlan() {
    var today = KS.dayKey(), list = tasks();
    if (examIn.value) {
      var dl = Math.round((new Date(examIn.value + "T00:00:00") - new Date(today + "T00:00:00")) / 86400000);
      leftEl.textContent = dl > 0 ? dl + " days to your exam." : dl === 0 ? "Your exam is today." : "Your exam date has passed. Pick a new one.";
    } else { leftEl.textContent = ""; }
    days.replaceChildren();
    if (!list.length) { days.appendChild(el("p", "text-sm text-muted", "No tasks yet. Add your first one above.")); return; }
    var dates = Array.from(new Set(list.map(function (t) { return t.date; }))).sort();
    dates.forEach(function (dk) {
      var d = new Date(dk + "T00:00:00");
      var box = el("div", "rounded-xl border border-line p-4" + (dk === today ? " bg-brand-50" : ""));
      box.appendChild(el("p", "text-sm font-bold", (dk === today ? "Today · " : dk < today ? "Earlier · " : "") + d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })));
      var ul = el("ul", "mt-2 space-y-2");
      list.filter(function (t) { return t.date === dk; }).forEach(function (t) {
        var li = el("li", "flex items-start gap-3 text-sm");
        var cb = el("input", "mt-1 h-4 w-4 shrink-0"); cb.type = "checkbox"; cb.checked = !!t.done; cb.setAttribute("aria-label", t.text);
        cb.addEventListener("change", function () { t.done = cb.checked; saveTasks(list); li.classList.toggle("opacity-60", cb.checked); });
        li.appendChild(cb);
        var body = el("div", "min-w-0 flex-1 break-words");
        body.appendChild(el("span", t.done ? "line-through" : "", t.text));
        if (t.subject) {
          var a = el("a", "ml-2 font-medium text-brand-700 underline", "Practise " + t.subject);
          a.href = "/tests/start?mode=subject&subject=" + encodeURIComponent(t.subject) + "&count=20"; body.appendChild(a);
        }
        li.appendChild(body);
        var del = el("button", "text-xs text-muted underline", "Remove"); del.type = "button";
        del.setAttribute("aria-label", "Remove task " + t.text);
        del.addEventListener("click", function () { saveTasks(list.filter(function (x) { return x !== t; })); drawPlan(); });
        li.appendChild(del); ul.appendChild(li);
      });
      box.appendChild(ul); days.appendChild(box);
    });
  }
  addBtn.addEventListener("click", function () {
    var text = tText.value.trim();
    if (!text) { pmsg.textContent = "Write what you want to do."; return; }
    if (!tDate.value) { pmsg.textContent = "Pick a day."; return; }
    var list = tasks(); list.push({ id: Date.now(), date: tDate.value, text: text, subject: tSubj.value, done: false });
    saveTasks(list); tText.value = ""; pmsg.textContent = "Added."; drawPlan();
  });
  tText.addEventListener("keydown", function (e) { if (e.key === "Enter") addBtn.click(); });
  examIn.addEventListener("change", function () { var s = KS.study(); s.plan = { target: examIn.value }; KS.saveStudy(s); drawPlan(); });

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
