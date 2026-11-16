"""Cut one image per question out of an official text-layer GATE paper (first set only).

python scripts/practice/crop.py <paper.pdf> <year> <paper> [--top 60] [--bottom 45]

Questions are located by their "Q.n" labels. The first run of Q.1..Q.10 is General Aptitude, the next Q.1..Q.55 is the
subject paper; both are numbered 1..65 as in the verified bank. Output: static/img/p/<year>-<paper>-<NN>.webp and
scripts/practice/out/<year>-<paper>.json (page + marks + kind, no subject yet).
"""
import json
import re
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[2]
IMG = ROOT / "static" / "img" / "p"
OUT = ROOT / "scripts" / "practice" / "out"
LABEL = re.compile(r"^Q\.\s?(\d+)(?=\s|$)")
CARRY = re.compile(r"^Q\.\s?\d+\s*(to|–|-)\s*Q\.\s?\d+", re.I)
FOOT = re.compile(r"^(\d{4}|.*INFORMATION TECH.*|CS-[A-Z]|COMPUTER SCIENCE.{0,40}CS|CS\s?\(Set [A-Z0-9]\)|\d+\s*/\s*\d+|Page \d+ of \d+|GATE \d{4}.*|[A-Z ]*\s?-\s?[A-Z]{2}\s*\d*/\d+)$")
GROUP = re.compile(r"^(Common Data Questions?|Statement for Linked Answer Questions?|Common Data for Questions)", re.I)
STOP = re.compile(r"(^General Aptitude \(GA\) Questions|^Linked Answer Questions\s*$|^(Common Data Questions?|Statement for Linked Answer Questions?|Common Data for Questions)|^Q\.\s?\d+\s*(to|–|-)\s*Q\.\s?\d+.*carry|END OF (THE )?QUESTION PAPER|^Page \d+|Space for rough)", re.I)


def lines(doc, lo=0, hi=None):
    for pn, page in enumerate(doc):
        if pn < lo or (hi is not None and pn > hi):
            continue
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                t = "".join(s["text"] for s in l["spans"]).strip()
                if t:
                    yield pn, l["bbox"], t


def main():
    pdf, year, paper = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    top = float(sys.argv[sys.argv.index("--top") + 1]) if "--top" in sys.argv else 60
    bottom = float(sys.argv[sys.argv.index("--bottom") + 1]) if "--bottom" in sys.argv else 45
    doc = pymupdf.open(pdf)
    lo, hi = 0, len(doc) - 1
    if "--pages" in sys.argv:
        a, b = sys.argv[sys.argv.index("--pages") + 1].split("-"); lo, hi = int(a) - 1, int(b) - 1
    tag = sys.argv[sys.argv.index("--tag") + 1] if "--tag" in sys.argv else paper
    marks = lambda n: 1 if n <= 5 or 11 <= n <= 35 else 2
    # collect anchors: sequence GA 1..10 then CS 1..55, taking the first set only
    seq65 = "--seq65" in sys.argv  # paper numbered Q.1..Q.65 (CS first, General Aptitude last)
    anchors, seq_ga, seq_cs = [], 0, 0
    stops, foot, groups, head = [], {}, [], {}
    for pn, bb, t in lines(doc, lo, hi):
        if FOOT.match(t) and bb[1] > doc[pn].rect.height * 0.8:
            foot[pn] = min(foot.get(pn, 1e9), bb[1])
        if FOOT.match(t) and bb[3] < doc[pn].rect.height * 0.2:
            head[pn] = max(head.get(pn, 0), bb[3])
        if STOP.search(t):
            stops.append((pn, bb[1]))
        if GROUP.match(t):
            groups.append((pn, bb[1]))
        m = None if CARRY.match(t) else LABEL.match(t)
        if not m:
            continue
        n = int(m.group(1))
        if seq65:
            if n == len(anchors) + 1:
                anchors.append((pn, bb[1], n))
            continue
        if seq_ga < 10 and n == seq_ga + 1:
            seq_ga += 1; anchors.append((pn, bb[1], n))
        elif seq_ga == 10 and seq_cs < 55 and n == seq_cs + 1:
            seq_cs += 1; anchors.append((pn, bb[1], 10 + n))
    nums = [a[2] for a in anchors]
    assert nums == list(range(1, len(nums) + 1)), nums
    print("anchors", len(anchors), "of 65")
    anchors.sort(key=lambda a: a[2]) if False else None
    IMG.mkdir(parents=True, exist_ok=True); OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    def span(a_pn, a_y, e_pn, e_y):
        out = []
        for p in range(a_pn, e_pn + 1):
            H = doc[p].rect.height
            base = head[p] + 2 if p in head else top
            y0 = max(base, a_y - 4) if p == a_pn else base
            y1 = (e_y - 3) if (p == e_pn and e_y is not None) else min(H - bottom, foot.get(p, 1e9) - 3)
            if y1 - y0 > 6:
                out.append((p, y0, y1))
        return out
    pre = {}  # anchor index -> segments of the shared "common data / linked answer" statement printed above the pair
    for gp, gy in groups:
        later = [i for i, a in enumerate(anchors) if (a[0], a[1]) > (gp, gy)][:2]
        if len(later) == 2:
            f = anchors[later[0]]
            for i in later:
                pre[i] = span(gp, gy + 0, f[0], f[1] - 6)
    for i, (pn, y, n) in enumerate(anchors):
        nxt = anchors[i + 1] if i + 1 < len(anchors) else None
        segs = []
        end_pn, end_y = (nxt[0], nxt[1]) if nxt else (min(pn + 1, hi), None)
        # earliest stop line between this anchor and the next one ends the question there
        for sp, sy in stops:
            if (sp, sy) > (pn, y) and (nxt is None or (sp, sy) < (end_pn, end_y)):
                end_pn, end_y = sp, sy; break
        for p in range(pn, end_pn + 1):
            H = doc[p].rect.height
            base = head[p] + 2 if p in head else top
            y0 = max(base, y - 4) if p == pn else base
            y1 = (end_y - 3) if (p == end_pn and end_y is not None) else min(H - bottom, foot.get(p, 1e9) - 3)
            if y1 - y0 > 6:
                segs.append((p, y0, y1))
        if i in pre:
            segs = pre[i] + segs
        ims, txt = [], []
        for p, y0, y1 in segs:
            r = doc[p].rect
            txt.append(doc[p].get_text('text', clip=pymupdf.Rect(r.x0 + 30, y0, r.x1 - 30, y1)))
            pm = doc[p].get_pixmap(dpi=150, clip=pymupdf.Rect(r.x0 + 30, y0, r.x1 - 30, y1))
            ims.append(Image.frombytes("RGB", (pm.width, pm.height), pm.samples))
        W = max(im.width for im in ims); Ht = sum(im.height for im in ims)
        sh = Image.new("RGB", (W, Ht), "white"); yy = 0
        for im in ims:
            sh.paste(im, (0, yy)); yy += im.height
        bbox = ImageChops.invert(sh.convert("L")).point(lambda v: 255 if v > 40 else 0).getbbox()
        if bbox:
            pad = 10
            sh = sh.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(W, bbox[2] + pad), min(Ht, bbox[3] + pad)))
        k = (n + 10 if n <= 55 else n - 55) if seq65 else n
        mk = (1 if n <= 25 or 56 <= n <= 60 else 2) if seq65 else marks(n)
        name = f"{year}-{tag}-{k:02d}.webp"
        sh.save(IMG / name, "WEBP", quality=82, method=6)
        rows.append({"year": year, "paper": tag, "number": k, "orig": n, "section": "GA" if k <= 10 else "CS", "marks": mk, "page": pn + 1, "has_options": "(A)" in "".join(txt), "raw": " ".join("".join(txt).split())[:300], "image": f"img/p/{name}"})
    (OUT / f"{year}-{tag}.json").write_text(json.dumps(rows, indent=1), encoding="utf-8")
    print("wrote", len(rows))


if __name__ == "__main__":
    main()
