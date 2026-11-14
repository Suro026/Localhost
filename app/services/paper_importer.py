"""Import question papers from JSON files supplied by the site owner.

Usage:  python -m app.services.paper_importer papers/gate-cse-2024.json [more.json ...]
"""
import json
import logging
import sys
from pathlib import Path

from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models import Exam, Question
from app.schemas.exam import PaperFile

logger = logging.getLogger(__name__)


def parse_paper(path: Path) -> PaperFile:
    return PaperFile.model_validate(json.loads(path.read_text(encoding="utf-8")))


def import_paper(db: Session, paper: PaperFile) -> Exam:
    """Insert one paper in a single transaction; refuse duplicates (same title + year)."""
    meta = paper.exam
    duplicate = db.scalar(select(Exam.id).where(Exam.title == meta.title, Exam.exam_year == meta.year))
    if duplicate:
        raise ValueError(f"Exam already imported: {meta.title} ({meta.year})")

    exam = Exam(
        title=meta.title, subject=meta.subject, mode=meta.mode, exam_year=meta.year,
        difficulty=meta.difficulty, duration_minutes=meta.duration_minutes,
        description=meta.description, is_paid=False, price=0, is_active=True,
        topic_tags=sorted({q.topic for q in paper.questions if q.topic}),
        total_questions=len(paper.questions),
    )
    exam.questions = [
        Question(
            order_index=i, subject=q.subject, topic=q.topic, year=meta.year, source=meta.source,
            question_text=q.question, question_type=q.question_type, options=q.options,
            correct_answer=q.answer, marks=q.marks, explanation=q.explanation,
        )
        for i, q in enumerate(paper.questions, start=1)
    ]
    db.add(exam)
    db.commit()
    return exam


def main(argv: list[str]) -> int:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    if not argv:
        print(__doc__)
        return 2
    failures = 0
    with SessionLocal() as db:
        for name in argv:
            try:
                exam = import_paper(db, parse_paper(Path(name)))
                logger.info("Imported %s: %d questions", exam.title, exam.total_questions)
            except (ValidationError, ValueError, OSError) as exc:
                db.rollback()
                failures += 1
                logger.error("Skipped %s: %s", name, exc)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
