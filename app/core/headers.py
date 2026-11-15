"""Security headers applied to every response."""
from starlette.middleware.base import BaseHTTPMiddleware

# sha256 of the one inline script in base.html (adds the "js" class). Update if that script changes.
INLINE_JS_HASH = "sha256-qOhFsq0QMV2REqNwk5hGH5bZE9SkX6gt6yeyKdYPv+U="

CSP = "; ".join([
    "default-src 'self'",
    f"script-src 'self' '{INLINE_JS_HASH}' https://apis.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "frame-src https://drive.google.com https://keystone-44f75.firebaseapp.com https://accounts.google.com",
    "connect-src 'self' https://*.googleapis.com https://*.google.com",
    "form-action 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
])

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
        for name, value in HEADERS.items():
            response.headers.setdefault(name, value)
        return response
