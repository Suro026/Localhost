import sys, re, json, fitz
pdf, key_pdf, out = sys.argv[1], sys.argv[2], sys.argv[3]
doc = fitz.open(pdf)
# --- key
kt = "".join(p.get_text() for p in fitz.open(key_pdf)).split("\n")
kt = [x.strip() for x in kt if x.strip()]
i = next(j for j,x in enumerate(kt) if x in ("Marks","Mark")) + 1
key = {}
while i + 5 < len(kt):
    if not kt[i].isdigit(): i += 1; continue
    n, sess, typ, sec, k, m = kt[i:i+6]
    if typ in ("MCQ","MSQ","NAT"):
        key[int(n)] = dict(type=typ, section=sec, key=k, marks=int(m)); i += 6
    else: i += 1
print("key entries", len(key))
# --- question text per page, with page tags
pages = []
for pn, pg in enumerate(doc, 1):
    t = pg.get_text()
    t = chr(10).join(l for l in t.split(chr(10)) if not re.match(r"\s*(Computer Science and Information Technology|Page \d+ of \d+|Organi[sz]ing Institute)", l))
    pages.append((pn, t))
full = ""; where = {}
for pn, t in pages:
    start = len(full); full += t + "\n"; where[(start, len(full))] = pn
def page_of(pos):
    for (a,b),pn in where.items():
        if a <= pos < b: return pn
marks = [(m.start(), int(m.group(1))) for m in re.finditer(r"(?m)^Q\.(\d+)\s", full)]
GARBLE = re.compile(r"[\u00f0\u00f1\u00e2\u00ce\u00cf][\u0080-\u00bf]|\ufffd")
qs = {}
for idx, (pos, n) in enumerate(marks):
    end = marks[idx+1][0] if idx+1 < len(marks) else len(full)
    body = full[pos:end]
    body = re.sub(r"^Q\.\d+\s*", "", body, count=1)
    body = re.sub(r"\n(Q\.\d+ . Q\.\d+ Carry .*)", "", body)
    opts = re.split(r"(?m)^\(([A-D])\)\s*", body)
    stem = opts[0].strip()
    options = {opts[j]: " ".join(opts[j+1].split()) for j in range(1, len(opts)-1, 2)}
    qs[n] = dict(number=n, page=page_of(pos), stem=" ".join(stem.split()), options=options,
                 garbled=bool(GARBLE.search(body)),
                 figure_hint=bool(re.search(r"figure|diagram|shown|given below|table|following (circuit|graph|tree)|map|matrix", stem, re.I)))
json.dump(dict(key=key, qs=qs), open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("questions parsed", len(qs), "missing", sorted(set(range(1,66)) - set(qs)))
print("garbled:", [n for n,q in qs.items() if q["garbled"]])
print("figure_hint:", [n for n,q in qs.items() if q["figure_hint"]])
print("opt count !=4 for choice qs:", [n for n,q in qs.items() if key.get(n,{}).get("type") in ("MCQ","MSQ") and len(q["options"])!=4])
