"""Drive-backed library of books and notes, read from a committed JSON catalog.

Entries with ``published: false`` are held back and never listed or served.
"""
import json
import logging
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

logger = logging.getLogger(__name__)

DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "library.json"


@dataclass(frozen=True)
class LibraryFile:
    id: str
    title: str
    size_mb: float
    subject: str
    group: str | None
    kind: str  # "book" or "note"
    ext: str = "pdf"


@lru_cache(maxsize=1)
def load_library() -> list[LibraryFile]:
    try:
        raw = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        return [
            LibraryFile(
                id=str(r["id"]), title=str(r["title"]), size_mb=float(r.get("size_mb", 0)),
                subject=str(r["subject"]), group=r.get("group"), kind=str(r["kind"]), ext=str(r.get("ext", "pdf")),
            )
            for r in raw
            if r.get("published", True)
        ]
    except (OSError, ValueError, KeyError, TypeError):
        logger.exception("Library catalog unavailable; serving an empty library")
        return []


def subjects(kind: str) -> list[tuple[str, list[LibraryFile]]]:
    grouped: dict[str, list[LibraryFile]] = {}
    for f in load_library():
        if f.kind == kind:
            grouped.setdefault(f.subject, []).append(f)
    return [(name, sorted(files, key=lambda f: f.title.lower())) for name, files in sorted(grouped.items())]


def get_file(file_id: str) -> LibraryFile | None:
    return next((f for f in load_library() if f.id == file_id), None)
