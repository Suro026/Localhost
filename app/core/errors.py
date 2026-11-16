"""Branded error pages. One place decides what a failed request looks like.

Browsers navigating to a page get the Keystone error page. Scripts (fetch/HTMX, JSON clients) keep a JSON body,
so the test runner and the sign-in flow still read errors the way they always did.
"""
import logging

from fastapi.responses import JSONResponse, PlainTextResponse
from starlette.requests import Request

log = logging.getLogger("keystone")

# code -> (page word, heading, message, art, show "try again")
PAGES = {
    400: ("Bad request", "That request did not look right", "The link or form was incomplete. Go back and try again.", "broken", False),
    401: ("Sign in", "Please sign in first", "This page is for signed-in learners.", "lock", False),
    403: ("Not allowed", "You cannot open this page", "Your account does not have access to it.", "lock", False),
    404: ("Not found", "Page not found", "That link does not lead anywhere. Pick one of these instead.", "missing", False),
    405: ("Not allowed", "That action is not allowed here", "Go back and use the buttons on the page.", "broken", False),
    429: ("Slow down", "Too many requests", "You are going a little fast. Wait a few seconds, then try again.", "clock", True),
    500: ("Our side", "Something broke on our side", "Your saved progress on this device is safe. Try again, and if it keeps happening, email us.", "broken", True),
    503: ("Unavailable", "Keystone is catching its breath", "A service we depend on is not answering. This usually clears in a moment.", "clock", True),
}
FALLBACK = (500, "Our side", "Something went wrong", "Please try again in a moment.", "broken", True)


def wants_html(request: Request) -> bool:
    """A page load, not an HTMX call or a client that asked for JSON."""
    if request.method not in ("GET", "HEAD"):
        return False
    if request.headers.get("hx-request") or request.headers.get("x-requested-with"):
        return False
    return "application/json" not in request.headers.get("accept", "")


def error_response(request: Request, status: int, detail=None, headers: dict | None = None):
    """The right response for this status: a branded page for browsers, JSON otherwise."""
    if not wants_html(request):
        msg = detail if isinstance(detail, str) else PAGES.get(status, FALLBACK[1:])[1]
        return JSONResponse({"detail": msg}, status_code=status, headers=headers)
    code = status if status in PAGES else FALLBACK[0]
    word, title, message, art, retry = PAGES.get(status, FALLBACK[1:])
    try:
        from app.core.dependencies import templates
        resp = templates.TemplateResponse(
            request, "error.html",
            {"code": status, "word": word, "title": title, "message": message, "art": art, "retry": retry},
            status_code=status, headers=headers,
        )
        resp.headers["Cache-Control"] = "no-store"
        return resp
    except Exception:  # the error page itself must never be the thing that fails
        log.exception("could not render error page for %s", code)
        return PlainTextResponse(f"{title}. {message}", status_code=status, headers=headers)
