"""Write app/data/practice/<year>-<paper>.json (images + subject, no answers) from crop output and a tag table keyed by the paper's own question number.
python build_practice.py <year> <paper> <tags-module> <tags-name>"""
import json
import sys
from importlib import import_module
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
year, paper, mod, name = int(sys.argv[1]), sys.argv[2], sys.argv[3], sys.argv[4]
tags = getattr(import_module(mod), name)
rows = json.loads((HERE / "out" / f"{year}-{paper}.json").read_text(encoding="utf-8"))
out = []
for r in sorted(rows, key=lambda r: r["number"]):
    subject, topic = tags[r["orig"]]
    assert (subject == "General Aptitude") == (r["number"] <= 10), r["number"]
    out.append({"year": year, "paper": paper, "number": r["number"], "paper_no": r["orig"], "marks": r["marks"], "subject": subject, "topic": topic,
                "image": r["image"], "source": "official GATE question paper PDF, first set; answer key not published in the file"})
assert len(out) == 65
dest = HERE.parents[1] / "app" / "data" / "practice" / f"{year}-{paper}.json"
dest.write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")
print("wrote", dest.name, len(out))
