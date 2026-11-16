/* Keystone avatars: small hand-drawn SVG characters, no image files and no storage. Chosen avatar id lives in localStorage ("ks-avatar")
   and, for signed-in learners, in the account (see ks-cloud.js). Each avatar has `days`: the study streak needed to use it.
   All are 0 today (free); give a future avatar days: 7 and the picker shows it locked until the learner reaches a 7-day streak. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var D = [
    { id: "owl", name: "Owl", days: 0, svg:
      '<rect width="64" height="64" fill="#6b26d9"/><path d="M13 14 L25 25 L12 31Z M51 14 L39 25 L52 31Z" fill="#4a1aa6"/>' +
      '<ellipse cx="32" cy="38" rx="21" ry="20" fill="#8b5cf6"/><circle cx="23.5" cy="34" r="8.5" fill="#fff"/><circle cx="40.5" cy="34" r="8.5" fill="#fff"/>' +
      '<circle cx="25" cy="35" r="3.6" fill="#1b2234"/><circle cx="39" cy="35" r="3.6" fill="#1b2234"/><circle cx="26" cy="33.8" r="1.1" fill="#fff"/><circle cx="40" cy="33.8" r="1.1" fill="#fff"/>' +
      '<path d="M32 40 L28 47 L36 47Z" fill="#f5a623"/><path d="M20 54 Q32 61 44 54" fill="none" stroke="#a78bfa" stroke-width="3" stroke-linecap="round"/>' },
    { id: "fox", name: "Fox", days: 0, svg:
      '<rect width="64" height="64" fill="#ffd6ea"/><path d="M9 11 L27 22 L11 38Z M55 11 L37 22 L53 38Z" fill="#e8761a"/><path d="M12 26 Q32 17 52 26 Q55 47 32 59 Q9 47 12 26Z" fill="#f59e3a"/>' +
      '<path d="M32 59 Q17 50 15 39 Q32 45 49 39 Q47 50 32 59Z" fill="#fff"/><circle cx="23.5" cy="32" r="3.2" fill="#1b2234"/><circle cx="40.5" cy="32" r="3.2" fill="#1b2234"/>' +
      '<circle cx="24.5" cy="31" r="1" fill="#fff"/><circle cx="41.5" cy="31" r="1" fill="#fff"/><ellipse cx="32" cy="46" rx="3.4" ry="2.8" fill="#1b2234"/>' },
    { id: "bot", name: "Robot", days: 0, svg:
      '<rect width="64" height="64" fill="#0bb8da"/><path d="M32 17 V9" stroke="#1b2234" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="7.5" r="3.5" fill="#eb4799"/>' +
      '<rect x="9" y="29" width="5" height="12" rx="2.5" fill="#fff"/><rect x="50" y="29" width="5" height="12" rx="2.5" fill="#fff"/><rect x="14" y="17" width="36" height="35" rx="9" fill="#f4effd"/>' +
      '<rect x="19" y="26" width="26" height="15" rx="7" fill="#1b2234"/><circle cx="26.5" cy="33.5" r="3.2" fill="#0bb8da"/><circle cx="37.5" cy="33.5" r="3.2" fill="#0bb8da"/>' +
      '<rect x="24" y="45" width="16" height="3.4" rx="1.7" fill="#6b26d9"/>' },
    { id: "cat", name: "Cat", days: 0, svg:
      '<rect width="64" height="64" fill="#e6dafb"/><path d="M11 13 L27 24 L11 40Z M53 13 L37 24 L53 40Z" fill="#4a5268"/><path d="M15 19 L24 25 L15 33Z M49 19 L40 25 L49 33Z" fill="#eb4799" opacity=".7"/>' +
      '<ellipse cx="32" cy="39" rx="22" ry="19" fill="#6b7389"/><ellipse cx="23.5" cy="35" rx="3.6" ry="4.6" fill="#fde68a"/><ellipse cx="40.5" cy="35" rx="3.6" ry="4.6" fill="#fde68a"/>' +
      '<ellipse cx="23.5" cy="35" rx="1.3" ry="4" fill="#1b2234"/><ellipse cx="40.5" cy="35" rx="1.3" ry="4" fill="#1b2234"/><path d="M29.5 43 H34.5 L32 46Z" fill="#eb4799"/>' +
      '<path d="M7 42 H19 M8 48 L19 45 M57 42 H45 M56 48 L45 45" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>' },
    { id: "panda", name: "Panda", days: 0, svg:
      '<rect width="64" height="64" fill="#c9f1fb"/><circle cx="15" cy="16" r="8.5" fill="#1b2234"/><circle cx="49" cy="16" r="8.5" fill="#1b2234"/><ellipse cx="32" cy="37" rx="22" ry="20" fill="#fff"/>' +
      '<ellipse cx="22.5" cy="34" rx="5.2" ry="6.8" transform="rotate(20 22.5 34)" fill="#1b2234"/><ellipse cx="41.5" cy="34" rx="5.2" ry="6.8" transform="rotate(-20 41.5 34)" fill="#1b2234"/>' +
      '<circle cx="23.5" cy="33" r="1.9" fill="#fff"/><circle cx="40.5" cy="33" r="1.9" fill="#fff"/><ellipse cx="32" cy="43.5" rx="4" ry="3" fill="#1b2234"/>' +
      '<path d="M27 49 Q32 53 37 49" fill="none" stroke="#1b2234" stroke-width="2" stroke-linecap="round"/>' },
    { id: "astro", name: "Astronaut", days: 0, svg:
      '<rect width="64" height="64" fill="#1b2234"/><circle cx="9" cy="11" r="1.4" fill="#fff"/><circle cx="55" cy="9" r="1.1" fill="#fff"/><circle cx="52" cy="52" r="1.4" fill="#fff"/><circle cx="10" cy="50" r="1.1" fill="#fff"/><circle cx="31" cy="5" r="1" fill="#fff"/>' +
      '<circle cx="32" cy="33" r="23" fill="#f4effd"/><rect x="16" y="22" width="32" height="23" rx="11.5" fill="#6b26d9"/><path d="M21 31 Q25 26 32 27" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".65"/>' +
      '<circle cx="39" cy="39" r="2.2" fill="#0bb8da"/><rect x="25" y="53" width="14" height="6" rx="3" fill="#eb4799"/>' }
  ];
  var cache = {};
  function find(id) { for (var i = 0; i < D.length; i++) if (D[i].id === id) return D[i]; return null; }
  function node(id) {
    var a = find(id);
    if (!a) return null;
    // the markup above is constant text written in this file, never user input
    if (!cache[id]) cache[id] = new DOMParser().parseFromString('<svg xmlns="' + NS + '" viewBox="0 0 64 64">' + a.svg + "</svg>", "image/svg+xml").documentElement;
    var n = document.importNode(cache[id], true);
    n.setAttribute("aria-hidden", "true"); n.setAttribute("focusable", "false");
    return n;
  }
  function read() { try { return localStorage.getItem("ks-avatar") || ""; } catch (e) { return ""; } }
  window.KSAvatars = {
    list: D,
    get: find,
    node: node,
    current: function () { var v = read(); return find(v) ? v : ""; },
    set: function (id) {
      try { if (id && find(id)) localStorage.setItem("ks-avatar", id); else localStorage.removeItem("ks-avatar"); } catch (e) { /* private mode: not remembered */ }
      if (window.KS && KS.renderAccount) KS.renderAccount();
    },
    unlocked: function (id, streak) { var a = find(id); return !!a && (a.days || 0) <= (streak || 0); }
  };
})();
