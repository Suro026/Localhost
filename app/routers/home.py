import logging
from types import SimpleNamespace

from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse
from sqlalchemy import func, select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import templates
from app.models import Exam, Note

router = APIRouter()
logger = logging.getLogger(__name__)

DEFAULT_NOTE_CATEGORIES = ["DSA", "DBMS", "OS", "CN", "AI/ML"]


@router.api_route("/", methods=["GET", "HEAD"], response_class=HTMLResponse)
def home(request: Request, db: Session = Depends(get_db)) -> HTMLResponse:
    featured_exams: list[Exam] = []
    note_categories: list[tuple[str, int | None]] = []
    mode_counts: dict[str, int] = {}
    stats = SimpleNamespace(exams=0, questions=0, notes=0)
    try:
        active = Exam.is_active.is_(True)
        featured_exams = list(db.scalars(select(Exam).where(active).order_by(Exam.created_at.desc()).limit(6)))
        mode_counts = {m.value: n for m, n in db.execute(select(Exam.mode, func.count(Exam.id)).where(active).group_by(Exam.mode))}
        stats.exams = sum(mode_counts.values())
        stats.questions = db.scalar(select(func.coalesce(func.sum(Exam.total_questions), 0)).where(active)) or 0
        stats.notes = db.scalar(select(func.count(Note.id)).where(Note.is_active.is_(True))) or 0
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
        logger.exception("Homepage data unavailable; rendering empty sections")
    if not note_categories:
        note_categories = [(name, None) for name in DEFAULT_NOTE_CATEGORIES]
    return templates.TemplateResponse(
        request,
        "home.html",
        {"featured_exams": featured_exams, "note_categories": note_categories,
         "mode_counts": mode_counts, "stats": stats},
    )
