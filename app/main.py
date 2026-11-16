import logging
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.dependencies import templates
from app.core import gate
from app.core.headers import SecurityHeadersMiddleware
from app.routers import home, legal, library, tests

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

BASE_DIR = Path(__file__).resolve().parent.parent

app = FastAPI(title="Keystone", docs_url=None, redoc_url=None, openapi_url=None)
app.add_middleware(gate.LoginGateMiddleware)  # added first so security headers wrap its redirects too
app.add_middleware(SecurityHeadersMiddleware)
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
PWA = BASE_DIR / "static" / "pwa"


@app.get("/sw.js", include_in_schema=False)
async def service_worker():  # must live at the site root so its scope covers every page
    return FileResponse(PWA / "sw.js", media_type="text/javascript", headers={"Cache-Control": "no-cache", "Service-Worker-Allowed": "/"})


@app.get("/manifest.webmanifest", include_in_schema=False)
async def manifest():
    return FileResponse(PWA / "manifest.webmanifest", media_type="application/manifest+json", headers={"Cache-Control": "public, max-age=3600"})


@app.get("/offline", include_in_schema=False)
async def offline():
    return FileResponse(PWA / "offline.html", media_type="text/html")


SITEMAP_PATHS = ["/"]  # everything else needs sign-in, so only the public landing page is listed


@app.get("/sitemap.xml", include_in_schema=False)
async def sitemap():
    from fastapi.responses import Response

    from app.core.config import get_settings

    base = get_settings().site_url.rstrip("/")
    urls = [f"  <url><loc>{base}{p}</loc></url>" for p in SITEMAP_PATHS]
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', *urls, "</urlset>", ""]
    return Response(chr(10).join(lines), media_type="application/xml", headers={"Cache-Control": "public, max-age=3600"})


@app.get("/robots.txt", include_in_schema=False)
async def robots():
    from fastapi.responses import PlainTextResponse

    from app.core.config import get_settings

    base = get_settings().site_url.rstrip("/")
    lines = ["User-agent: *", "Disallow: /login", "Disallow: /profile", "Disallow: /tests/start", "Disallow: /tests/result", "Disallow: /download/", "", f"Sitemap: {base}/sitemap.xml", ""]
    return PlainTextResponse(chr(10).join(lines), headers={"Cache-Control": "public, max-age=3600"})


GOOGLE_VERIFY = "google1589151a9c65e3a8.html"  # Search Console ownership file; must stay live to keep the site verified


@app.get(f"/{GOOGLE_VERIFY}", include_in_schema=False)
async def google_site_verification():
    from fastapi.responses import PlainTextResponse

    return PlainTextResponse(f"google-site-verification: {GOOGLE_VERIFY}", media_type="text/html", headers={"Cache-Control": "public, max-age=3600"})


@app.get("/.well-known/security.txt", include_in_schema=False)
async def security_txt():
    """RFC 9116. Only published once SECURITY_CONTACT is set, so we never advertise a contact nobody reads."""
    from datetime import datetime, timedelta, timezone

    from fastapi.responses import PlainTextResponse

    from app.core.config import get_settings

    contact = get_settings().security_contact.strip()
    if not contact.startswith(("mailto:", "https://")):
        raise StarletteHTTPException(status_code=404)
    expires = (datetime.now(timezone.utc) + timedelta(days=180)).strftime("%Y-%m-%dT%H:%M:%SZ")
    lines = [f"Contact: {contact}", f"Expires: {expires}", "Preferred-Languages: en, hi", ""]
    body = chr(10).join(lines)
    return PlainTextResponse(body, headers={"Cache-Control": "public, max-age=3600"})


app.include_router(gate.router)
app.include_router(home.router)
app.include_router(legal.router)
app.include_router(library.router)
app.include_router(tests.router)


@app.exception_handler(StarletteHTTPException)
async def http_error(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404:
        return templates.TemplateResponse(request, "not_found.html", {}, status_code=404)
    from fastapi.exception_handlers import http_exception_handler
    return await http_exception_handler(request, exc)
