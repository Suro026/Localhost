"""GATE question bank, read from committed JSON files in app/data/questions.

Invalid entries are dropped; the loader never raises.
"""
import json
import logging
from collections import Counter
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

logger = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parent.parent.parent
DATA_DIR = ROOT / "app" / "data" / "questions"
STATIC_DIR = ROOT / "static"

TYPES = ("MCQ", "MSQ", "NAT")


@dataclass(frozen=True)
class Question:
    id: str
    year: int
    paper: str
    number: int
    section: str
    marks: int
    qtype: str
    subject: str
    topic: str
    text: str
    options: tuple[str, ...]
    figure: str | None
    answer: tuple[str, ...]
    answer_min: float | None
    answer_max: float | None
    mta: bool


def _parse(r: dict) -> Question:
    qtype = str(r["type"])
    marks = int(r["marks"])
    options = tuple(str(o) for o in r.get("options") or ())
    answer = tuple(str(a) for a in r.get("answer") or ())
    amin = None if r.get("answer_min") is None else float(r["answer_min"])
    amax = None if r.get("answer_max") is None else float(r["answer_max"])
    if qtype not in TYPES or marks not in (1, 2):
        raise ValueError("bad type or marks")
    if qtype in ("MCQ", "MSQ") and len(options) != 4:
        raise ValueError("choice question needs 4 options")
    if qtype == "NAT" and (amin is None or amax is None or amin > amax):
        raise ValueError("NAT needs a range")
    year, paper, number = int(r["year"]), str(r["paper"]), int(r["number"])
    return Question(
        id=f"{year}-{paper}-{number:02d}", year=year, paper=paper, number=number, section=str(r["section"]),
        marks=marks, qtype=qtype, subject=str(r["subject"]), topic=str(r.get("topic", "")), text=str(r["text"]),
        options=options, figure=r.get("figure"), answer=answer, answer_min=amin, answer_max=amax,
        mta=bool(r.get("mta", False)),
    )


@lru_cache(maxsize=1)
def load_questions() -> list[Question]:
    out: dict[str, Question] = {}
    try:
        files = sorted(DATA_DIR.glob("*.json"))
    except OSError:
        return []
    for f in files:
        try:
            rows = json.loads(f.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            logger.exception("Question file unreadable: %s", f.name)
            continue
        if not isinstance(rows, list):
            continue
        for r in rows:
            try:
                q = _parse(r)
            except (ValueError, KeyError, TypeError):
                logger.warning("Dropped invalid question in %s", f.name)
                continue
            out.setdefault(q.id, q)
    return list(out.values())


def get_question(qid: str) -> Question | None:
    return {q.id: q for q in load_questions()}.get(qid)


def scorable(q: Question) -> bool:
    if q.figure and not (STATIC_DIR / q.figure).is_file():
        return False
    if q.mta:
        return True
    if q.qtype == "NAT":
        return True  # range already validated
    return bool(q.answer)


def bank_stats() -> dict:
    qs = [q for q in load_questions() if scorable(q)]
    return {
        "total": len(qs),
        "by_year": dict(sorted(Counter(q.year for q in qs).items())),
        "by_subject": dict(Counter(q.subject for q in qs)),
        "by_type": dict(Counter(q.qtype for q in qs)),
    }
