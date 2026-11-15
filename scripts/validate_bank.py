"""Check the question bank. Exit 1 on any problem.  Run: python scripts/validate_bank.py"""
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from app.services import questions as qs  # noqa: E402

SUBJECTS = {
    "General Aptitude", "Discrete Mathematics", "Linear Algebra", "Calculus", "Probability and Statistics",
    "Digital Logic", "Computer Organization", "Programming and Data Structures", "Algorithms",
    "Theory of Computation", "Compiler Design", "Operating System", "Databases", "Computer Networks",
}


def main() -> int:
    problems: list[str] = []
    raw_ids: Counter = Counter()
    for f in sorted(qs.DATA_DIR.glob("*.json")):
        for r in json.loads(f.read_text(encoding="utf-8")):
            raw_ids[f"{r.get('year')}-{r.get('paper')}-{int(r.get('number', 0)):02d}"] += 1
    problems += [f"duplicate id {i}" for i, n in raw_ids.items() if n > 1]

    loaded = qs.load_questions()
    if len(loaded) != len(raw_ids):
        problems.append(f"{len(raw_ids) - len(loaded)} entries failed to parse")

    papers: dict[tuple, list] = defaultdict(list)
    for q in loaded:
        papers[(q.year, q.paper)].append(q)
        if not qs.scorable(q):
            problems.append(f"{q.id}: not scorable (no answer or missing figure)")
        if q.subject not in SUBJECTS:
            problems.append(f"{q.id}: unknown subject {q.subject!r}")

    for (year, paper), items in sorted(papers.items()):
        nums = sorted(q.number for q in items)
        n = len(nums)
        if not 55 <= n <= 65:
            problems.append(f"{year}-{paper}: {n} questions (expected 55-65)")
        gaps = sorted(set(range(1, max(nums) + 1)) - set(nums))
        if gaps:
            problems.append(f"{year}-{paper}: missing numbers {gaps}")
        ga = [q for q in items if q.section == "GA"]
        print(f"{year}-{paper}: {n} questions, {len(ga)} GA, {sum(q.marks for q in items)} marks")

    for p in problems:
        print("PROBLEM:", p)
    print("OK" if not problems else f"{len(problems)} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
