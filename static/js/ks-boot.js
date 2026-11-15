/* Runs before first paint: tells the CSS whether a signed-in hint exists, so the navbar never flashes "Sign in" for a signed-in learner. */
try { if (localStorage.getItem("ks-auth")) document.documentElement.setAttribute("data-auth", "in"); } catch (e) { /* storage blocked: stay signed-out */ }
