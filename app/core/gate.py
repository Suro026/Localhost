"""Login gate. Only the landing page, the sign-in page and static assets are public; everything else needs a signed-in learner.

Sign-in itself happens in the browser (Firebase). After it, the page posts the Firebase ID token to /auth/session; we ask
Google to confirm it (identitytoolkit accounts:lookup, the same call Firebase's own SDK trusts) and keep the token in an
HttpOnly cookie. Nothing here needs a server secret, and a forged cookie fails the Google check.
"""
import base64
import hashlib
import json
import time
import urllib.error
import urllib.request

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse, RedirectResponse, Response
from starlette.middleware.base import BaseHTTPMiddleware

COOKIE = "ks_session"
API_KEY = "AIzaSyANEqFgTIpfBB12vaXDgHKON0qTM_VMor0"  # public Firebase web key (same one the browser uses)
LOOKUP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + API_KEY
CACHE_SECONDS = 300
CONSENT_COOKIE = "ks_consent"
LEGAL_VERSION = "2026-11-16"  # bump when the Privacy, Terms or Cookie text changes materially: everyone is asked to read and accept again
# path -> (requests, seconds) allowed per client address. In-memory, so each server instance counts for itself: a brake on abuse, not an exact quota.
RATE_LIMITS = {"/auth/session": (20, 60), "/tests/result": (30, 60), "/legal/accept": (20, 60)}
MAX_TOKEN = 4096

PUBLIC_EXACT = {"/", "/login", "/account", "/privacy", "/terms", "/cookies", "/consent", "/legal/accept", "/sw.js", "/manifest.webmanifest", "/offline", "/sitemap.xml", "/robots.txt", "/auth/session", "/auth/logout"}
PUBLIC_PREFIX = ("/static/", "/.well-known/")

router = APIRouter()
_hits: dict[tuple[str, str], list[float]] = {}
_cache: dict[str, tuple[float, str]] = {}  # sha256(token) -> (checked_at, uid)


def is_public(path: str) -> bool:
    if path in PUBLIC_EXACT or path.startswith(PUBLIC_PREFIX):
        return True
    return path.startswith("/google") and path.endswith(".html") and path.count("/") == 1  # Search Console ownership file


def _payload(token: str) -> dict | None:
    try:
        part = token.split(".")[1]
        return json.loads(base64.urlsafe_b64decode(part + "=" * (-len(part) % 4)))
    except Exception:
        return None


def token_expiry(token: str) -> int | None:
    p = _payload(token)
    exp = p.get("exp") if isinstance(p, dict) else None
    return exp if isinstance(exp, int) else None


def lookup(token: str) -> str | None:
    """Ask Google whether this ID token is genuine and the account still usable. Returns the uid or None. Tests replace this."""
    req = urllib.request.Request(LOOKUP_URL, data=json.dumps({"idToken": token}).encode(), headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=6) as r:
            users = json.loads(r.read()).get("users") or []
    except urllib.error.HTTPError:
        return None  # Google said no: bad, expired or revoked token
    if not users or users[0].get("disabled"):
        return None
    return users[0].get("localId")


class Unavailable(Exception):
    """Google could not be reached, so we cannot say yes or no."""


def verify(token: str | None) -> str | None:
    if not token or len(token) > MAX_TOKEN:
        return None
    exp = token_expiry(token)
    if exp is None or exp <= time.time():
        return None
    key = hashlib.sha256(token.encode()).hexdigest()
    hit = _cache.get(key)
    if hit and time.time() - hit[0] < CACHE_SECONDS:
        return hit[1]
    try:
        uid = lookup(token)
    except (urllib.error.URLError, TimeoutError, OSError) as e:
        raise Unavailable from e
    if uid:
        if len(_cache) > 2000:
            _cache.clear()
        _cache[key] = (time.time(), uid)
    return uid


def safe_next(value: str | None) -> str:
    """Only same-site paths; never an external URL."""
    if value and value.startswith("/") and not value.startswith("//") and "\\" not in value and "\n" not in value and "\r" not in value:
        return value
    return "/tests"


def client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for", "")
    return (fwd.split(",")[0].strip() or (request.client.host if request.client else "?"))[:64]


def rate_limited(request: Request) -> int | None:
    """Seconds to wait if this client has used up its allowance for the path, else None."""
    rule = RATE_LIMITS.get(request.url.path)
    if not rule or request.method != "POST":
        return None
    limit, window = rule
    now = time.time()
    key = (client_ip(request), request.url.path)
    recent = [t for t in _hits.get(key, []) if now - t < window]
    if len(recent) >= limit:
        _hits[key] = recent
        return max(1, int(window - (now - recent[0])))
    recent.append(now)
    _hits[key] = recent
    if len(_hits) > 5000:
        _hits.clear()
    return None


class LoginGateMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        wait = rate_limited(request)
        if wait:
            return JSONResponse({"detail": "Too many requests. Try again shortly."}, status_code=429, headers={"Retry-After": str(wait)})
        if is_public(path):
            return await call_next(request)
        try:
            uid = verify(request.cookies.get(COOKIE))
        except Unavailable:
            return Response("Sign-in check is unavailable right now. Try again in a moment.", status_code=503, headers={"Retry-After": "5"})
        if uid:
            request.state.uid = uid
            if request.cookies.get(CONSENT_COOKIE) != LEGAL_VERSION:  # signed in, but has not read and accepted the policies yet
                if request.method in ("GET", "HEAD"):
                    from urllib.parse import quote
                    target = path + (("?" + request.url.query) if request.url.query else "")
                    return RedirectResponse("/consent?next=" + quote(target, safe="/"), status_code=302)
                return JSONResponse({"detail": "Accept the policies first"}, status_code=403)
            response = await call_next(request)
            response.headers["Cache-Control"] = "private, no-store"
            return response
        if request.method in ("GET", "HEAD"):
            target = path + (("?" + request.url.query) if request.url.query else "")
            from urllib.parse import quote
            return RedirectResponse("/login?next=" + quote(target, safe="/"), status_code=302)
        return JSONResponse({"detail": "Sign in required"}, status_code=401)


def _secure(request: Request) -> bool:
    return request.url.scheme == "https" or request.headers.get("x-forwarded-proto") == "https"


@router.post("/auth/session", include_in_schema=False)
async def create_session(request: Request) -> Response:
    try:
        body = await request.json()
    except Exception:
        body = {}
    token = body.get("token") if isinstance(body, dict) else None
    try:
        uid = verify(token if isinstance(token, str) else None)
    except Unavailable:
        return JSONResponse({"ok": False}, status_code=503)
    if not uid:
        return JSONResponse({"ok": False}, status_code=401)
    ttl = max(60, min((token_expiry(token) or 0) - int(time.time()), 3600))
    resp = JSONResponse({"ok": True})
    resp.set_cookie(COOKIE, token, max_age=ttl, httponly=True, samesite="lax", secure=_secure(request), path="/")
    resp.headers["Cache-Control"] = "no-store"
    return resp


@router.post("/auth/logout", include_in_schema=False)
async def end_session(request: Request) -> Response:
    resp = JSONResponse({"ok": True})
    resp.delete_cookie(COOKIE, path="/")
    resp.headers["Cache-Control"] = "no-store"
    return resp
