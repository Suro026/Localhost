from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse, JSONResponse, Response

from app.core import gate
from app.core.dependencies import templates

router = APIRouter()

DOCS = {
    "privacy": ("Privacy Policy", "legal/_privacy.html"),
    "terms": ("Terms of Use", "legal/_terms.html"),
    "cookies": ("Cookie Policy", "legal/_cookies.html"),
}


def _page(request: Request, key: str) -> HTMLResponse:
    title, partial = DOCS[key]
    return templates.TemplateResponse(request, "legal/page.html", {"key": key, "title": title, "partial": partial, "version": gate.LEGAL_VERSION})


@router.api_route("/privacy", methods=["GET", "HEAD"], response_class=HTMLResponse)
def privacy(request: Request) -> HTMLResponse:
    return _page(request, "privacy")


@router.api_route("/terms", methods=["GET", "HEAD"], response_class=HTMLResponse)
def terms(request: Request) -> HTMLResponse:
    return _page(request, "terms")


@router.api_route("/cookies", methods=["GET", "HEAD"], response_class=HTMLResponse)
def cookies(request: Request) -> HTMLResponse:
    return _page(request, "cookies")


@router.api_route("/consent", methods=["GET", "HEAD"], response_class=HTMLResponse)
def consent(request: Request, next: str | None = None) -> HTMLResponse:
    return templates.TemplateResponse(request, "legal/consent.html", {"docs": DOCS, "next": gate.safe_next(next), "version": gate.LEGAL_VERSION})


@router.post("/legal/accept", include_in_schema=False)
async def accept(request: Request) -> Response:
    try:
        body = await request.json()
    except Exception:
        body = {}
    read = body.get("read") if isinstance(body, dict) else None
    if not isinstance(read, list) or set(read) != set(DOCS):  # the page only sends this after all three were scrolled to the end
        return JSONResponse({"ok": False}, status_code=400)
    resp = JSONResponse({"ok": True})
    resp.set_cookie(gate.CONSENT_COOKIE, gate.LEGAL_VERSION, max_age=365 * 24 * 3600, samesite="lax", secure=gate._secure(request), path="/")
    resp.headers["Cache-Control"] = "no-store"
    return resp
