/* Runs before first paint: tells the CSS whether a signed-in hint exists, so the navbar never flashes "Sign in" for a signed-in learner. */
try { if (localStorage.getItem("ks-auth")) document.documentElement.setAttribute("data-auth", "in"); } catch (e) { /* storage blocked: stay signed-out */ }

/* First page of a browser session only: ask the CSS to show the splash. ks-ui.js fades it out. */
try {
  if (!sessionStorage.getItem("ks-splash") && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sessionStorage.setItem("ks-splash", "1");
    document.documentElement.setAttribute("data-splash", "");
  }
} catch (e) { /* storage blocked: no splash */ }
