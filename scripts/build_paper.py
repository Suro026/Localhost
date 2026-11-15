"""Generic builder: python build_paper.py <data.py> <paper.pdf> <draft.json> <repo> <year> <paper> <docname> <keyurl>
data.py defines META {n:(subject,topic)}, OV {n:{text?,options?}}, FIG {n:(page, spec)} where spec is
("rows", i, j)  -> crop between table lines i and j (negative ok)  or  ("rect", x0, y0, x1, y1) in PDF points."""
import sys, re, json, os, importlib.util, unicodedata, fitz

data_py, pdf, draft_path, repo, year, paper, docname, keyurl = sys.argv[1:9]
year = int(year)
spec = importlib.util.spec_from_file_location("data", data_py); D = importlib.util.module_from_spec(spec); spec.loader.exec_module(D)
d = json.load(open(draft_path, encoding="utf-8"))
key, drafts = d["key"], d["qs"]
HDR = re.compile(r"\s*Computer Science and Information Technology[^\n]*\s*Organising Institute:[^\n]*Page \d+ of \d+", re.S)
doc = fitz.open(pdf)
imgdir = os.path.join(repo, "static", "img", "q"); os.makedirs(imgdir, exist_ok=True)

def norm(s):
    # math-italic letters (U+1D400..1D7FF) -> plain letters; everything else untouched
    out = []
    for ch in s:
        out.append(unicodedata.normalize("NFKC", ch) if 0x1D400 <= ord(ch) <= 0x1D7FF else ch)
    s = "".join(out).replace(" ", " ").replace("⁡", " ").replace("⁢", "")
    return " ".join(s.split()) if "\n" not in s else "\n".join(" ".join(l.split()) for l in s.split("\n")).strip()

def figure(n):
    page, sp = D.FIG[n]
    pg = doc[page - 1]
    if sp[0] == "rows":
        ys = {}
        for x in pg.get_drawings():
            r = x["rect"]
            if r.height < 2 and r.width > 250: ys[round(r.y0, 1)] = (r.x0, r.x1)
        order = sorted(ys)
        x0 = min(v[0] for v in ys.values()); x1 = max(v[1] for v in ys.values())
        rect = fitz.Rect(x0 + 1, order[sp[1]] + 1, x1 - 1, order[sp[2]] - 1)
    else:
        rect = fitz.Rect(*sp[1:])
    name = f"{year}-{paper}-{n:02d}.png"
    pg.get_pixmap(dpi=170, clip=rect).save(os.path.join(imgdir, name))
    return "img/q/" + name

out = []
for n in sorted(int(k) for k in drafts):
    k = key[str(n)]; dr = drafts[str(n)]; ov = D.OV.get(n, {})
    typ = k["type"]
    text = ov.get("text") or norm(HDR.sub("", dr["stem"]))
    options = ov.get("options")
    if options is None:
        options = [norm(HDR.sub("", dr["options"][c])) for c in "ABCD"] if typ != "NAT" else []
    if typ == "NAT": options = []
    answer, amin, amax, mta, alt = [], None, None, False, []
    kv, *alt_raw = [x.strip() for x in k["key"].split("|")]  # "A;C;D|C;D" or "2 to 2|4 to 4"
    kv = kv.strip()
    if kv.upper() == "MTA": mta = True
    elif typ == "NAT":
        lo, hi = [float(x) for x in re.split(r"\s+to\s+", kv)]; amin, amax = lo, hi
        alt = [[float(x) for x in re.split(r"\s+to\s+", a)] for a in alt_raw]
    else:
        answer = kv.split(";")
        alt = [a.split(";") for a in alt_raw]
    subj, topic = D.META[n]
    out.append(dict(year=year, paper=paper, number=n, section="GA" if k["section"] == "GA" else "CS", marks=k["marks"], type=typ,
                    subject=subj, topic=topic, text=text, options=options,
                    figure=figure(n) if n in D.FIG else None, answer=answer, answer_min=amin, answer_max=amax, mta=mta,
                    **({"answer_alt": alt} if alt else {}),
                    source=dict(document=docname, page=dr["page"], source_type=f"official GATE {year} question paper (IIT Roorkee)", answer_key=keyurl),
                    validation_status="manually verified against page images", copyright_status="unverified"))
os.makedirs(os.path.join(repo, "app", "data", "questions"), exist_ok=True)
fn = os.path.join(repo, "app", "data", "questions", f"{year}-{paper}.json")
json.dump(out, open(fn, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("wrote", fn, len(out), "questions;", sum(1 for r in out if r["figure"]), "figures")
