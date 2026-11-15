import sys, re, json, fitz
pdf, key_pdf, out = sys.argv[1], sys.argv[2], sys.argv[3]
FIRST_CS_PAGE = int(sys.argv[4]) if len(sys.argv) > 4 else 8
doc = fitz.open(pdf)
# --- key
kt = "".join(p.get_text() for p in fitz.open(key_pdf)).split("\n")
kt = [x.strip() for x in kt if x.strip()]
TYPES = ("MCQ","MSQ","NAT")
key = {}
i = 0
while i < len(kt):
    x = kt[i]
    if x.isdigit() and i + 4 < len(kt):
        m5 = re.fullmatch(r"\d+\s+(MCQ|MSQ|NAT)", kt[i+1])
        if m5 and kt[i+4].isdigit():
            key[int(x)] = dict(type=m5.group(1), section=kt[i+2], key=kt[i+3], marks=int(kt[i+4])); i += 5; continue
        if kt[i+2] in TYPES and i + 5 < len(kt) and kt[i+5].isdigit():
            key[int(x)] = dict(type=kt[i+2], section=kt[i+3], key=kt[i+4], marks=int(kt[i+5])); i += 6; continue
    i += 1
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
GARBLE = re.compile(r"[ðñâÎÏ][-¿]|�")
JUNK = re.compile(r"(?m)^(CS|GATE \d{4} Computer Science.*|Page \d+ of \d+|Q\.\d+ . Q\.\d+ Carry .*|General Aptitude \(GA\)|. Q\.\d+ Carry .*)\s*$")
split_at = next(a for (a, b), pn in where.items() if pn == FIRST_CS_PAGE)
qs = {}
def add(n, pos, body):
    body = JUNK.sub("", body)
    opts = re.split(r"(?m)^\(([A-D])\)\s*", body)
    stem = opts[0].strip()
    options = {opts[j]: " ".join(opts[j+1].split()) for j in range(1, len(opts)-1, 2)}
    qs[n] = dict(number=n, page=page_of(pos), stem=" ".join(stem.split()), options=options, garbled=bool(GARBLE.search(body)),
                 figure_hint=bool(re.search(r"figure|diagram|shown|given below|table|following (circuit|graph|tree)|map|matrix", stem, re.I)))
ga = full[:split_at]
gm = [(m.start(), m.end(), int(m.group(1))) for m in re.finditer(r"(?m)^Q\.(\d+)\s*$", ga)]
seen = set()
gm = [x for x in gm if not (x[2] in seen or seen.add(x[2]))]
for i, (s0, e0, n) in enumerate(gm):
    end = gm[i+1][0] if i + 1 < len(gm) else len(ga)
    add(n, s0, ga[e0:end])
cs = full[split_at:]
cm = [(m.start(), m.end(), int(m.group(1))) for m in re.finditer(r"(?m)^Q\.(\d+)\s*$", cs)]
prev = 0
for s0, e0, n in cm:
    add(n, split_at + prev, cs[prev:s0])
    prev = e0
json.dump(dict(key=key, qs=qs), open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("questions parsed", len(qs), "missing", sorted(set(range(1,66)) - set(qs)))
print("garbled:", [n for n,q in qs.items() if q["garbled"]])
print("figure_hint:", [n for n,q in qs.items() if q["figure_hint"]])
print("opt count !=4 for choice qs:", [n for n,q in qs.items() if key.get(n,{}).get("type") in ("MCQ","MSQ") and len(q["options"])!=4])
