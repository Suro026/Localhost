"""Write app/data/questions/<year>-<paper>.json from cropped images (crop.py), subject tags and the official key table.

python build_verified.py <year> <paper> <paper.pdf> <key-table-index> <tags-module> <tags-name> <doc-label> <page-range>
Every key row is checked against the question (MCQ has options, NAT does not) and its marks before anything is written.
"""
import json
import re
import sys
from importlib import import_module
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
sys.path.insert(0, str(HERE))
import keys  # noqa: E402

year, paper, pdf, idx, mod, name, label, pages = sys.argv[1:9]
year, idx = int(year), int(idx)
tags = getattr(import_module(mod), name)
rows = json.loads((HERE / "out" / f"{year}-{paper}.json").read_text(encoding="utf-8"))
table = keys.tables(pdf)[idx]
assert len(rows) == len(table) == 65 == len(tags), (len(rows), len(table), len(tags))
out = []
for r, k in zip(rows, table):
    no, typ, sec, key, marks = k
    n = r["number"]
    assert no == (n if n <= 10 else n - 10), (n, no)
    assert typ == ("MCQ" if r["has_options"] else "NAT") and marks == r["marks"], (n, typ, marks)
    subject, topic = tags[n]
    assert (subject == "General Aptitude") == (n <= 10), n
    q = {"year": year, "paper": paper, "number": n, "section": "GA" if n <= 10 else "CS", "marks": marks, "type": typ,
         "subject": subject, "topic": topic, "text": "", "options": ["A", "B", "C", "D"] if typ == "MCQ" else [],
         "figure": r["image"], "image_only": True}
    if typ == "MCQ":
        assert re.fullmatch(r"[A-D]", key), (n, key)
        q["answer"] = [key]
    else:
        m = re.fullmatch(r"\s*(-?[\d.]+)\s*:\s*(-?[\d.]+)\s*", key)
        assert m, (n, key)
        q["answer"], q["answer_min"], q["answer_max"] = [], float(m.group(1)), float(m.group(2))
    q["source"] = {"document": label, "page": r["page"], "source_type": "official GATE question paper PDF",
                   "answer_key": "official key table appended to the same IITG PDF"}
    out.append(q)
dest = ROOT / "app" / "data" / "questions" / f"{year}-{paper}.json"
dest.write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")
print("wrote", dest.name, len(out))
