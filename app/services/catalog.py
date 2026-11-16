"""Paper and subject lists shown on the landing page and the tests page, read from the JSON question bank."""
from types import SimpleNamespace

from app.services import testing
from app.services.questions import bank_stats, load_questions, scorable


def bank_view() -> tuple[list[SimpleNamespace], int, int]:
    """Papers (newest first), subject count and scorable-question total."""
    stats = bank_stats()
    papers: list[SimpleNamespace] = []
    for year, paper in sorted({(q.year, q.paper) for q in load_questions() if scorable(q)}, reverse=True):
        spec = testing.build_paper(year, paper)
        if spec is None:
            continue
        branch = "da" if paper.upper().startswith("DA") else "cs"
        papers.append(SimpleNamespace(
            title=spec.title, year=year, branch=branch, minutes=spec.minutes, total=len(spec.ids),
            href=f"/tests/start?mode=paper&year={year}&paper={paper}"))
    subjects = sum(1 for s in testing.SUBJECTS if stats["by_subject"].get(s))
    return papers, subjects, stats["total"]
