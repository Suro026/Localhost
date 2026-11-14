// Presentation-only motion: scroll reveal, count-up, ticking demo timer, cursor glow.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal, with a stagger index for children of [data-stagger]
  document.querySelectorAll("[data-stagger]").forEach((parent) => {
    [...parent.children].forEach((child, i) => {
      child.setAttribute("data-reveal", "");
      child.style.setProperty("--i", i);
    });
  });
  const targets = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach((el) => io.observe(el));
  }

  // Count-up numbers
  const fmt = new Intl.NumberFormat("en-IN");
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count) || 0;
    if (reduce) { el.textContent = fmt.format(end); return; }
    const run = () => {
      const t0 = performance.now(), dur = 1400;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = fmt.format(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { run(); o.disconnect(); } }).observe(el);
  });

  // Demo timer in the hero preview (purely decorative)
  const timer = document.getElementById("demo-timer");
  if (timer && !reduce) {
    let s = 2 * 3600 + 41 * 60 + 18;
    setInterval(() => {
      s = s > 0 ? s - 1 : 3 * 3600;
      const p = (n) => String(n).padStart(2, "0");
      timer.textContent = `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
    }, 1000);
  }

  // Cursor-following glow
  const hero = document.querySelector(".hero-glow");
  if (hero && !reduce) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  // Scroll progress bar + navbar tightening
  const progress = document.getElementById("progress");
  const nav = document.querySelector("header[data-nav]");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.setProperty("--p", max > 0 ? (scrollY / max).toFixed(4) : 0);
    if (nav) nav.classList.toggle("nav-scrolled", scrollY > 24);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (reduce) {
    const typed = document.getElementById("typed");
    if (typed) typed.textContent = (JSON.parse(typed.dataset.words || "[]")[0]) || "";
    return;
  }

  // Typewriter cycling through subjects
  const typed = document.getElementById("typed");
  if (typed) {
    const words = JSON.parse(typed.dataset.words || "[]");
    let w = 0, c = 0, del = false;
    const step = () => {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(step, 1500); }
      if (del && c === 0) { del = false; w = (w + 1) % words.length; return setTimeout(step, 350); }
      c += del ? -1 : 1;
      setTimeout(step, del ? 35 : 80);
    };
    step();
  }

  // Card spotlight
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".spot");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--sx", `${e.clientX - r.left}px`);
    card.style.setProperty("--sy", `${e.clientY - r.top}px`);
  }, { passive: true });

  const fine = matchMedia("(pointer: fine)").matches;
  if (!fine) return;

  // 3D tilt
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const host = el.parentElement;
    host.style.perspective = "1100px";
    host.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg)`;
    });
    host.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  // Magnetic buttons
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(dx * 0.22).toFixed(1)}px, ${(dy * 0.28).toFixed(1)}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  // Cursor ring that eases toward the pointer and grows over links
  const ring = document.getElementById("cursor");
  if (ring) {
    let tx = 0, ty = 0, x = 0, y = 0;
    addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; ring.classList.add("on"); }, { passive: true });
    document.addEventListener("pointerover", (e) => {
      ring.classList.toggle("big", !!(e.target.closest && e.target.closest("a, button, label, [data-magnetic]")));
    });
    document.addEventListener("pointerleave", () => ring.classList.remove("on"));
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      ring.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }
})();
