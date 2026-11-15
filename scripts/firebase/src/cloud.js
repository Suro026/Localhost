/* Keystone cloud: Firebase sign-in + Firestore sync of the learner's own data.
   Built into static/js/ks-cloud.js with `npm run build` (scripts/firebase). The web config below is public by design;
   what protects the data is firestore.rules (each user can only touch users/<their uid>/...). */
import { initializeApp } from "firebase/app";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail,
  GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, deleteUser,
} from "firebase/auth";
import { getFirestore, collection, doc, getDocs, getDoc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";

const CONFIG = {
  apiKey: "AIzaSyANEqFgTIpfBB12vaXDgHKON0qTM_VMor0",
  authDomain: "keystone-44f75.firebaseapp.com",
  projectId: "keystone-44f75",
  storageBucket: "keystone-44f75.firebasestorage.app",
  messagingSenderId: "253016823390",
  appId: "1:253016823390:web:ce2eee09a91e8bdea9c6cf",
};

const KS = window.KS;
const app = initializeApp(CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);
const PULL_EVERY = 10 * 60 * 1000;
const LOCAL_KEYS = ["ks-attempts", "ks-study", "ks-timer", "ks-auth", "ks-synced-uid", "ks-last-pull"];

const MESSAGES = {
  "auth/invalid-credential": "Wrong email or password.",
  "auth/wrong-password": "Wrong email or password.",
  "auth/user-not-found": "No account with that email. Create one instead.",
  "auth/invalid-email": "That email address does not look right.",
  "auth/email-already-in-use": "An account with that email already exists. Sign in instead.",
  "auth/weak-password": "Use a password with at least 6 characters.",
  "auth/missing-password": "Enter your password.",
  "auth/too-many-requests": "Too many attempts. Wait a few minutes and try again.",
  "auth/network-request-failed": "No connection. Check your internet and try again.",
  "auth/popup-closed-by-user": "The Google window was closed before finishing.",
  "auth/cancelled-popup-request": "The Google window was closed before finishing.",
  "auth/popup-blocked": "Your browser blocked the Google window. Allow pop-ups for this site and try again.",
  "auth/operation-not-allowed": "This sign-in method is not turned on yet.",
  "auth/unauthorized-domain": "This website is not yet allowed to sign in. Ask the site owner to add it in Firebase.",
  "auth/requires-recent-login": "For safety, sign in again and then retry.",
  "permission-denied": "Cloud rules refused this. Ask the site owner to publish the Firestore rules.",
};
const nice = (e) => MESSAGES[e && e.code] || "Something went wrong. Please try again.";
const wrap = (fn) => async (...a) => { try { return { ok: true, value: await fn(...a) }; } catch (e) { return { ok: false, error: nice(e), code: e && e.code }; } };

const lsGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } };
const lsDel = (k) => { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } };

let user = null;
const subs = [];

// ---- Firestore shape: users/<uid>/attempts/<t>  and  users/<uid>/meta/study ----
// Firestore refuses nested arrays, so rows and the study object are stored as JSON strings.
const attemptsRef = (uid) => collection(db, "users", uid, "attempts");
const studyRef = (uid) => doc(db, "users", uid, "meta", "study");
const attemptDoc = (a) => ({
  t: a.t, title: String(a.title || ""), mode: String(a.mode || ""), total: a.total, max: a.max,
  correct: a.correct, wrong: a.wrong, skipped: a.skipped, secs: a.secs || 0, rows: JSON.stringify(a.rows),
});
const fromAttemptDoc = (d) => { try { const a = { ...d, rows: JSON.parse(d.rows) }; return Array.isArray(a.rows) ? a : null; } catch (e) { return null; } };

async function pushAttempt(a) { if (user) await setDoc(doc(attemptsRef(user.uid), String(a.t)), attemptDoc(a)); }
async function pushStudy() { if (user) { const s = KS.study(); await setDoc(studyRef(user.uid), { data: JSON.stringify(s), updated: s.updated || Date.now() }); } }

let studyTimer = null;
function pushStudySoon() { clearTimeout(studyTimer); studyTimer = setTimeout(() => pushStudy().catch(() => {}), 1500); }

async function clearRemoteAttempts(uid) {
  const snap = await getDocs(attemptsRef(uid));
  for (let i = 0; i < snap.docs.length; i += 400) {
    const b = writeBatch(db);
    snap.docs.slice(i, i + 400).forEach((d) => b.delete(d.ref));
    await b.commit();
  }
}

function unionStudy(local, remote) {
  const out = KS.study();
  Object.assign(out, local);
  const seen = new Set(local.sessions.map((x) => x.t + "|" + x.subject));
  out.sessions = local.sessions.concat(remote.sessions.filter((x) => !seen.has(x.t + "|" + x.subject))).sort((a, b) => a.t - b.t);
  const rt = Array.isArray(remote.tasks) ? remote.tasks : [], lt = Array.isArray(local.tasks) ? local.tasks : [];
  const ids = new Set(lt.map((x) => x.id));
  out.tasks = lt.concat(rt.filter((x) => !ids.has(x.id)));
  if ((remote.updated || 0) > (local.updated || 0)) { out.reminder = remote.reminder || out.reminder; out.plan = remote.plan || out.plan; }
  out.updated = Date.now();
  return out;
}

// Merge this device with the account. Returns true when local data changed (so the page can redraw).
async function pull(force) {
  if (!user) return false;
  const uid = user.uid;
  const first = lsGet("ks-synced-uid") !== uid;
  if (!force && !first && Date.now() - Number(lsGet("ks-last-pull") || 0) < PULL_EVERY) return false;
  let changed = false;

  const snap = await getDocs(attemptsRef(uid));
  const remote = []; snap.forEach((d) => { const a = fromAttemptDoc(d.data()); if (a) remote.push(a); });
  const local = KS.attempts();
  const haveLocal = new Set(local.map((a) => a.t)), haveRemote = new Set(remote.map((a) => a.t));
  const add = remote.filter((a) => !haveLocal.has(a.t));
  if (add.length) { KS.write("ks-attempts", local.concat(add).sort((a, b) => a.t - b.t).slice(-200)); changed = true; }
  const missing = local.filter((a) => !haveRemote.has(a.t));
  for (let i = 0; i < missing.length; i += 400) {
    const b = writeBatch(db);
    missing.slice(i, i + 400).forEach((a) => b.set(doc(attemptsRef(uid), String(a.t)), attemptDoc(a)));
    await b.commit();
  }

  const sd = await getDoc(studyRef(uid));
  let remoteStudy = null;
  if (sd.exists()) { try { remoteStudy = JSON.parse(sd.data().data); } catch (e) { remoteStudy = null; } }
  const ls = KS.study();
  if (remoteStudy && typeof remoteStudy === "object") {
    remoteStudy.sessions = Array.isArray(remoteStudy.sessions) ? remoteStudy.sessions : [];
    if (first) { KS.write("ks-study", unionStudy(ls, remoteStudy)); changed = true; await pushStudy(); }
    else if ((remoteStudy.updated || 0) > (ls.updated || 0)) { KS.write("ks-study", remoteStudy); changed = true; }
    else if ((ls.updated || 0) > (remoteStudy.updated || 0)) await pushStudy();
  } else if (ls.sessions.length || (ls.tasks && ls.tasks.length) || ls.reminder.on || ls.plan.target) { await pushStudy(); }

  lsSet("ks-synced-uid", uid); lsSet("ks-last-pull", String(Date.now()));
  return changed;
}

function wipeLocal() { LOCAL_KEYS.forEach(lsDel); }
function notify() { subs.forEach((f) => { try { f(user); } catch (e) { /* ignore */ } }); if (KS.renderAccount) KS.renderAccount(); }

// KS tells us whenever local data changes; push it when someone is signed in.
KS.hook = (kind, payload) => {
  if (!user) return;
  if (kind === "attempt") pushAttempt(payload).catch(() => {});
  else if (kind === "study") pushStudySoon();
  else if (kind === "clear") clearRemoteAttempts(user.uid).catch(() => {});
};

onAuthStateChanged(auth, async (u) => {
  user = u;
  if (u) {
    lsSet("ks-auth", JSON.stringify({ e: u.email || "", n: u.displayName || "" }));
    notify();
    try {
      if (await pull(false)) {
        const last = Number(sessionStorage.getItem("ks-reload") || 0);
        if (Date.now() - last > 15000 && !/^\/(login|account)/.test(location.pathname)) { sessionStorage.setItem("ks-reload", String(Date.now())); location.reload(); return; }
      }
    } catch (e) { /* offline or rules not published: local data keeps working */ }
  } else {
    lsDel("ks-auth");
    notify();
  }
});

window.KSCloud = {
  get user() { return user; },
  onChange: (f) => { subs.push(f); f(user); },
  signIn: wrap((email, pw) => signInWithEmailAndPassword(auth, email, pw)),
  signUp: wrap((email, pw) => createUserWithEmailAndPassword(auth, email, pw)),
  google: wrap(() => signInWithPopup(auth, new GoogleAuthProvider())),
  reset: wrap((email) => sendPasswordResetEmail(auth, email)),
  syncNow: wrap(() => pull(true)),
  signOut: wrap(async () => { await fbSignOut(auth); wipeLocal(); }),
  deleteAccount: wrap(async () => {
    if (!auth.currentUser) throw new Error("no user");
    const uid = auth.currentUser.uid;
    await clearRemoteAttempts(uid);
    await deleteDoc(studyRef(uid));
    await deleteUser(auth.currentUser);
    wipeLocal();
  }),
  lastSync: () => Number(lsGet("ks-last-pull") || 0),
};
document.dispatchEvent(new Event("kscloud:ready"));
