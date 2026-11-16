"""Practice-only questions from older official papers whose answer key is not published in the source PDF.

Each row is an image of the printed question with its subject. There is no answer and no scoring here; the
verified, scored bank lives in questions.py. Rows live in app/data/practice/*.json and bad rows are dropped.
"""
import json
import logging
import re
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

from app.services.questions import STATIC_DIR

logger = logging.getLogger(__name__)
DATA_DIR = Path(__file__).resolve().parent.parent / "data" / "practice"


@dataclass(frozen=True)
class PracticeQ:
    year: int
    paper: str
    number: int
    marks: int
    subject: str
    topic: str
    image: str
    paper_no: int = 0  # the number printed in the paper


def slug(subject: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", subject.lower()).strip("-")


@lru_cache(maxsize=1)
def load() -> list[PracticeQ]:
    out: list[PracticeQ] = []
    try:
        files = sorted(DATA_DIR.glob("*.json"))
    except OSError:
        return []
    for f in files:
        try:
            rows = json.loads(f.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            logger.exception("Practice file unreadable: %s", f.name)
            continue
        for r in rows if isinstance(rows, list) else []:
            try:
                q = PracticeQ(int(r["year"]), str(r["paper"]), int(r["number"]), int(r["marks"]), str(r["subject"]),
                              str(r.get("topic", "")), str(r["image"]), int(r.get("paper_no", r["number"])))
                if q.marks not in (1, 2) or not (STATIC_DIR / q.image).is_file():
                    raise ValueError("bad row")
            except (KeyError, ValueError, TypeError):
                logger.warning("Dropped invalid practice row in %s", f.name)
                continue
            out.append(q)
    return out


def subjects() -> list[tuple[str, str, int, list[int]]]:
    """[(subject, slug, count, years)] in the order subjects appear in the verified bank."""
    from app.services.testing import SUBJECTS
    rows = load()
    result = []
    for s in SUBJECTS:
        qs = [q for q in rows if q.subject == s]
        if qs:
            result.append((s, slug(s), len(qs), sorted({q.year for q in qs}, reverse=True)))
    return result


def for_subject(sl: str, year: int | None = None) -> tuple[str, list[PracticeQ], list[int]] | None:
    from app.services.testing import SUBJECTS
    name = next((s for s in SUBJECTS if slug(s) == sl), None)
    qs = [q for q in load() if q.subject == name] if name else []
    if not qs:
        return None
    years = sorted({q.year for q in qs}, reverse=True)
    if year:
        qs = [q for q in qs if q.year == year]
    return name, sorted(qs, key=lambda q: (-q.year, q.paper, q.paper_no)), years
