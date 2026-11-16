"""Write app/data/questions/<year>-<paper>.json from crop_key.py output (embedded key) and a subject tag table keyed by number.

python build_key.py <year> <paper> <tags-module> <tags-name> <document-label>
"""
import json
import re
import sys
from importlib import import_module
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
year, paper, mod, name, label = int(sys.argv[1]), sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]
tags = getattr(import_module(mod), name)
rows = json.loads((HERE / "out" / f"{year}-{paper}.json").read_text(encoding="utf-8"))
assert len(rows) == 65 == len(tags)
out = []
for r in rows:
    n, typ, key = r["number"], r["type"], r["key"]
    subject, topic = tags[n]
    assert (subject == "General Aptitude") == (n <= 10), n
    q = {"year": year, "paper": paper, "number": n, "section": "GA" if n <= 10 else "CS", "marks": r["marks"], "type": typ,
         "subject": subject, "topic": topic, "text": "", "options": ["A", "B", "C", "D"] if typ == "MCQ" else [],
         "figure": r["image"], "image_only": True}
    if typ == "MCQ":
        assert re.fullmatch(r"[A-D]", key), (n, key)
        q["answer"] = [key]
    else:
        m = re.fullmatch(r"\s*(-?[\d.]+)\s*(?:to\s*(-?[\d.]+))?\s*", key)
        assert m, (n, key)
        lo = float(m.group(1)); hi = float(m.group(2)) if m.group(2) else lo
        q["answer"], q["answer_min"], q["answer_max"] = [], lo, hi
    q["source"] = {"document": label, "page": r["page"], "source_type": "official GATE question paper PDF",
                   "answer_key": "answer shown in the same official IITG paper file (ticked option or Correct Answer line)"}
    out.append(q)
dest = HERE.parents[1] / "app" / "data" / "questions" / f"{year}-{paper}.json"
dest.write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")
print("wrote", dest.name, len(out))
