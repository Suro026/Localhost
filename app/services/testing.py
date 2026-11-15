"""Build tests from the question bank and score them (GATE rules). Stateless: no student data is stored."""
import math
import random
from dataclasses import dataclass, field

from app.services.questions import Question, get_question, load_questions, scorable

SUBJECTS: tuple[str, ...] = (
    "General Aptitude", "Discrete Mathematics", "Linear Algebra", "Calculus", "Probability and Statistics",
    "Digital Logic", "Computer Organization", "Programming and Data Structures", "Algorithms",
    "Theory of Computation", "Compiler Design", "Operating System", "Databases", "Computer Networks",
)
MAX_IDS = 100
MINUTES_PER_QUESTION = 180 / 65


@dataclass(frozen=True)
class TestSpec:
    __test__ = False  # not a pytest class
    mode: str  # "paper" | "subject" | "mixed" | "mock"
    ids: tuple[str, ...]
    minutes: int
    title: str


@dataclass(frozen=True)
class RowResult:
    question: Question
    given: tuple[str, ...] | str | None
    status: str  # "correct" | "wrong" | "skipped"
    marks: float


@dataclass
class Result:
    total: float = 0.0
    max_marks: int = 0
    correct: int = 0
    wrong: int = 0
    skipped: int = 0
    per_subject: dict[str, tuple[float, int]] = field(default_factory=dict)
    rows: list[RowResult] = field(default_factory=list)


def _pool() -> list[Question]:
    return [q for q in load_questions() if scorable(q)]


def _minutes(n: int) -> int:
    return max(10, round(n * MINUTES_PER_QUESTION))


def build_paper(year: int, paper: str) -> TestSpec | None:
    qs = sorted((q for q in _pool() if q.year == year and q.paper == paper), key=lambda q: q.number)
    if not qs:
        return None
    return TestSpec("paper", tuple(q.id for q in qs), 180, f"GATE CS {year} ({paper})")


def build_subject(subject: str, count: int = 20, rng: random.Random | None = None) -> TestSpec | None:
    rng = rng or random.Random()
    pool = [q for q in _pool() if q.subject == subject]
    if not pool:
        return None
    n = max(1, min(count, len(pool)))
    picked = rng.sample(pool, n)
    return TestSpec("subject", tuple(q.id for q in picked), _minutes(n), f"{subject}: {n} questions")


def build_mixed(subjects: list[str], count: int, rng: random.Random | None = None) -> TestSpec | None:
    rng = rng or random.Random()
    wanted = {s for s in subjects if s in SUBJECTS}
    pool = [q for q in _pool() if q.subject in wanted]
    if not pool:
        return None
    n = max(1, min(count, len(pool)))
    picked = rng.sample(pool, n)
    return TestSpec("mixed", tuple(q.id for q in picked), _minutes(n), f"Mixed practice: {n} questions")


def build_mock(rng: random.Random | None = None) -> TestSpec | None:
    """GATE pattern: GA 5x1 + 5x2, then 25x1 + 30x2 from the other subjects (uniform draw = bank share)."""
    rng = rng or random.Random()
    pool = _pool()
    if not pool:
        return None
    plan = [("GA", 1, 5), ("GA", 2, 5), ("CS", 1, 25), ("CS", 2, 30)]
    ids: list[str] = []
    for section, marks, want in plan:
        cand = [q for q in pool if (q.section == "GA") == (section == "GA") and q.marks == marks]
        ids += [q.id for q in rng.sample(cand, min(want, len(cand)))]
    full = len(ids) == 65
    title = "Full mock test" if full else f"Mock test (partial: {len(ids)} questions available so far)"
    return TestSpec("mock", tuple(ids), 180 if full else _minutes(len(ids)), title)


def _letters(given) -> tuple[str, ...]:
    items = given if isinstance(given, (list, tuple)) else [given]
    return tuple(sorted({str(x).strip().upper() for x in items if str(x).strip().upper() in ("A", "B", "C", "D")}))


def _number(given) -> float | None:
    try:
        v = float(str(given).strip())
    except (ValueError, TypeError):
        return None
    return v if math.isfinite(v) else None


def _grade(q: Question, given) -> tuple[str, float, object]:
    if q.mta:
        return "correct", float(q.marks), given
    if q.qtype == "NAT":
        if given is None or str(given).strip() == "":
            return "skipped", 0.0, None
        v = _number(given)
        if v is not None and q.answer_min - 1e-9 <= v <= q.answer_max + 1e-9:
            return "correct", float(q.marks), str(given).strip()
        return "wrong", 0.0, str(given).strip()
    letters = _letters(given) if given not in (None, "", []) else ()
    if not letters:
        return "skipped", 0.0, None
    if letters == tuple(sorted(q.answer)):
        return "correct", float(q.marks), letters
    penalty = -q.marks / 3 if q.qtype == "MCQ" else 0.0
    return "wrong", penalty, letters


def score(ids: list[str], answers: dict) -> Result:
    if len(ids) > MAX_IDS or len(set(ids)) != len(ids):
        raise ValueError("bad question list")
    questions = []
    for qid in ids:
        q = get_question(qid)
        if q is None or not scorable(q):
            raise ValueError("unknown question")
        questions.append(q)
    if set(answers) - set(ids):
        raise ValueError("answer for a question that is not in this test")
    res = Result()
    per: dict[str, list[float]] = {}
    for q in questions:
        status, marks, shown = _grade(q, answers.get(q.id))
        res.rows.append(RowResult(q, shown, status, round(marks, 2)))
        res.total += marks
        res.max_marks += q.marks
        setattr(res, status, getattr(res, status) + 1)
        acc = per.setdefault(q.subject, [0.0, 0])
        acc[0] += marks
        acc[1] += q.marks
    res.total = round(res.total, 2)
    res.per_subject = {s: (round(a, 2), int(m)) for s, (a, m) in per.items()}
    return res
