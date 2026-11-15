import logging
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.dependencies import templates
from app.core.headers import SecurityHeadersMiddleware
from app.routers import home, library, tests

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

BASE_DIR = Path(__file__).resolve().parent.parent

app = FastAPI(title="Keystone", docs_url=None, redoc_url=None, openapi_url=None)
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


app.include_router(home.router)
app.include_router(library.router)
app.include_router(tests.router)


@app.exception_handler(StarletteHTTPException)
async def http_error(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404:
        return templates.TemplateResponse(request, "not_found.html", {}, status_code=404)
    from fastapi.exception_handlers import http_exception_handler
    return await http_exception_handler(request, exc)
