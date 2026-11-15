"""Security headers applied to every response."""
from starlette.middleware.base import BaseHTTPMiddleware

# sha256 of the one inline script in base.html (adds the "js" class). Update if that script changes.
INLINE_JS_HASH = "sha256-qOhFsq0QMV2REqNwk5hGH5bZE9SkX6gt6yeyKdYPv+U="

def build_csp(path: str = "/") -> str:
    """Strict by default. Google's sign-in script and frames are allowed only on /login. reCAPTCHA (App Check) is allowed everywhere because cloud sync runs on every page for signed-in learners."""
    login = path.startswith("/login")
    script = f"script-src 'self' '{INLINE_JS_HASH}' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/" + (" https://apis.google.com" if login else "")
    frames = "frame-src https://drive.google.com https://www.google.com/recaptcha/ https://recaptcha.google.com" + (" https://keystone-44f75.firebaseapp.com https://accounts.google.com" if login else "")
    connect = "connect-src 'self' https://*.googleapis.com https://www.google.com/recaptcha/" + (" https://*.google.com" if login else "")
    return "; ".join([
        "default-src 'self'", script,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https://lh3.googleusercontent.com", frames, connect,  # the last one: Google profile photos
        "form-action 'self'", "object-src 'none'", "base-uri 'self'", "frame-ancestors 'none'",
    ])


CSP = build_csp()

HEADERS = {
    "Content-Security-Policy": CSP,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",  # Google sign-in opens a popup
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
}


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers.setdefault("Content-Security-Policy", build_csp(request.url.path))
        for name, value in HEADERS.items():
            response.headers.setdefault(name, value)
        return response
