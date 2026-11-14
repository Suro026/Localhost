import logging
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.dependencies import templates
from app.core.headers import SecurityHeadersMiddleware
from app.routers import home, library, pages

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

BASE_DIR = Path(__file__).resolve().parent.parent

app = FastAPI(title="Keystone", docs_url=None, redoc_url=None, openapi_url=None)
app.add_middleware(SecurityHeadersMiddleware)
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
app.include_router(home.router)
app.include_router(library.router)
app.include_router(pages.router)


@app.exception_handler(StarletteHTTPException)
async def http_error(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404:
        return templates.TemplateResponse(request, "not_found.html", {}, status_code=404)
    from fastapi.exception_handlers import http_exception_handler
    return await http_exception_handler(request, exc)
