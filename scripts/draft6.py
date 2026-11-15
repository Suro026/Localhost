"""Draft parser for GATE 2018/2019-style papers where GA (Q.1-10) and CS (Q.1-55) are numbered separately.
usage: draft6.py paper.pdf key.pdf out.json LAST_GA_PAGE
CS question n is stored as number n + 10, so the draft has numbers 1..65 like every other paper."""
import sys, re, json, fitz
pdf, key_pdf, out, last_ga = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])

# --- key: rows are read by line position, so a row is [no, type, section, key..., marks]
key = {}
rows = []
for p in fitz.open(key_pdf):
    lines = {}
    for x0, y0, x1, y1, w, *_ in p.get_text("words"):
        lines.setdefault(round(y0 / 3), []).append((x0, w.replace("\xa0", " ")))
    for y in sorted(lines):
        toks = [w for _, w in sorted(lines[y])]
        if toks and toks[0].isdigit() and len(toks) >= 5 and toks[1] in ("MCQ", "MSQ", "NAT"):
            rows.append(toks)
for r in rows:
    n, typ, sec, marks = int(r[0]), r[1], r[2], int(r[-1])
    val = " ".join(r[3:-1])
    if typ == "NAT":
        val = re.sub(r"\s+OR\s+", "|", val)  # "3.7 to 3.8 OR 4.0 to 4.1" -> alternates
    gnum = n if sec == "GA" else n + 10
    key[gnum] = dict(type=typ, section=sec, key=val, marks=marks)
print("key entries", len(key))

JUNK = re.compile(r"\s*(GATE \d{4}\b.*|(GA|CS)\s*|\d+/\d+\s*|Q\.\s*\d+\s*[–-]\s*Q\.\s*\d+\s+carry.*)$")
GARBLE = re.compile(r"[ðñâÎÏ][\u0080-¿]|�")
qs = {}
doc = fitz.open(pdf)
for section, (a, b) in (("GA", (1, last_ga)), ("CS", (last_ga + 1, len(doc)))):
    off = 0 if section == "GA" else 10
    full, where = "", []
    for pn in range(a, b + 1):
        t = "\n".join(l for l in doc[pn - 1].get_text().split("\n") if not JUNK.match(l))
        where.append((len(full), pn)); full += t + "\n"
    def page_of(pos):
        return [pn for s, pn in where if s <= pos][-1]
    marks = [(m.start(), int(m.group(1))) for m in re.finditer(r"(?m)^Q\.\s*(\d+)(?!\s*[–-]\s*Q)\s", full)]
    for idx, (pos, n) in enumerate(marks):
        end = marks[idx + 1][0] if idx + 1 < len(marks) else len(full)
        body = re.sub(r"^Q\.\s*\d+\s*", "", full[pos:end], count=1)
        parts = re.split(r"(?m)^\(([A-D])\)\s*", body)
        stem = parts[0].strip()
        options = {parts[j]: " ".join(parts[j + 1].split()) for j in range(1, len(parts) - 1, 2)}
        qs[n + off] = dict(number=n + off, page=page_of(pos), stem=" ".join(stem.split()), options=options,
                           garbled=bool(GARBLE.search(body)),
                           figure_hint=bool(re.search(r"figure|diagram|shown|given below|table|following (circuit|graph|tree)|map|matrix", stem, re.I)))
json.dump(dict(key={str(k): v for k, v in key.items()}, qs={str(k): v for k, v in qs.items()}),
          open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("questions parsed", len(qs), "missing", sorted(set(range(1, 66)) - set(qs)))
print("figure_hint:", [n for n, q in sorted(qs.items()) if q["figure_hint"]])
print("opt count != 4 for choice qs:", [n for n, q in sorted(qs.items()) if key.get(n, {}).get("type") in ("MCQ", "MSQ") and len(q["options"]) != 4])
