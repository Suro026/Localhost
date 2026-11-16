import logging
from types import SimpleNamespace

from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse
from sqlalchemy import func, select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import templates
from app.models import Note
from app.services.catalog import bank_view

router = APIRouter()
logger = logging.getLogger(__name__)

DEFAULT_NOTE_CATEGORIES = ["DSA", "DBMS", "OS", "CN", "AI/ML"]


@router.api_route("/", methods=["GET", "HEAD"], response_class=HTMLResponse)
def home(request: Request, db: Session = Depends(get_db)) -> HTMLResponse:
    note_categories: list[tuple[str, int | None]] = []
    notes = 0
    try:
        notes = db.scalar(select(func.count(Note.id)).where(Note.is_active.is_(True))) or 0
        note_categories = [
            (row[0], row[1])
            for row in db.execute(
                select(Note.category, func.count(Note.id))
                .where(Note.is_active.is_(True))
                .group_by(Note.category)
                .order_by(Note.category)
                .limit(10)
            )
        ]
    except SQLAlchemyError:
        logger.exception("Homepage notes unavailable; rendering without them")
    if not note_categories:
        note_categories = [(name, None) for name in DEFAULT_NOTE_CATEGORIES]
    papers, subjects, total = bank_view()
    stats = SimpleNamespace(exams=len(papers), questions=total, notes=notes, subjects=subjects)
    mode_counts = {"year_wise": len(papers), "subject_wise": subjects, "mixed": subjects, "full": 1}
    return templates.TemplateResponse(
        request,
        "home.html",
        {"papers": papers, "note_categories": note_categories, "mode_counts": mode_counts, "stats": stats},
    )
