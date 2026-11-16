from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import HTMLResponse

from app.core.dependencies import templates
from app.services import practice

router = APIRouter()


@router.api_route("/practice", methods=["GET", "HEAD"], response_class=HTMLResponse)
def hub(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, "practice/hub.html", {"groups": practice.subjects()})


@router.api_route("/practice/{sl}", methods=["GET", "HEAD"], response_class=HTMLResponse)
def subject(request: Request, sl: str, year: int | None = None) -> HTMLResponse:
    found = practice.for_subject(sl, year)
    if found is None:
        raise HTTPException(404)
    name, qs, years = found
    return templates.TemplateResponse(request, "practice/subject.html", {"name": name, "slug": sl, "qs": qs, "years": years, "year": year})
