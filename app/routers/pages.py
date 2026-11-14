from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse

from app.core.dependencies import templates

router = APIRouter()


@router.get("/exams", response_class=HTMLResponse)
def exams(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, "coming_soon.html", {})
