"""Crop questions out of the GOAPS-style PDFs ("Question Number : N   Correct : 1  Wrong : -0.33" above each image).

python crop_goaps.py <paper.pdf> <year> <tag>
Paper order is CS 1..55 then General Aptitude 56..65; written out in the bank's order (GA 1..10, then CS 11..65).
Output: static/img/p/<year>-<tag>-<NN>.webp and scripts/practice/out/<year>-<tag>.json
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


def anchors(doc):
    found = []
    for pn, page in enumerate(doc):
        words = page.get_text("words")
        for r in page.search_for("Question Number"):
            near = [w for w in words if abs(w[1] - r.y0) < 5 and w[0] > r.x1 and w[0] < r.x1 + 120 and w[4].strip().isdigit()]
            right = [w for w in words if abs(w[1] - r.y0) < 5 and w[0] > 330 and w[4].strip().isdigit()]
            assert near and right, (pn, r)
            near.sort(key=lambda w: w[0]); num = near[0][4].strip(); last = near[0]
            for w in near[1:]:  # a two-digit number can be split into two words ("3" "5")
                if w[0] - last[2] < 6:
                    num += w[4].strip(); last = w
            found.append((pn, r.y1 + 2, int(num), int(right[0][4])))  # page, y below the heading, number, marks
    return sorted(found, key=lambda a: (a[0], a[1]))


def main():
    pdf, year, tag = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    doc = pymupdf.open(pdf)
    an = anchors(doc)
    key_start = next((i for i, pg in enumerate(doc) if pg.get_text().lstrip().startswith("Q. No") or "Q. No." in pg.get_text()[:30]), len(doc))
    nums = sorted(a[2] for a in an)
    assert nums == list(range(1, 66)), nums
    IMG.mkdir(parents=True, exist_ok=True); OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for i, (pn, y, n, marks) in enumerate(an):
        nxt = an[i + 1] if i + 1 < len(an) else None
        segs = []
        end_pn = nxt[0] if nxt else key_start - 1
        for p in range(pn, end_pn + 1):
            H = doc[p].rect.height
            y0 = y if p == pn else 30
            y1 = (nxt[1] - 26) if (nxt and p == end_pn) else H - 30
            if y1 - y0 > 6:
                segs.append((p, y0, y1))
        ims = []
        for p, y0, y1 in segs:
            r = doc[p].rect
            pm = doc[p].get_pixmap(dpi=150, clip=pymupdf.Rect(r.x0 + 4, y0, r.x1 - 4, y1))
            ims.append(Image.frombytes("RGB", (pm.width, pm.height), pm.samples))
        W = max(im.width for im in ims); Ht = sum(im.height for im in ims)
        sh = Image.new("RGB", (W, Ht), "white"); yy = 0
        for im in ims:
            sh.paste(im, (0, yy)); yy += im.height
        # drop the "Question Number" heading strip (first ~32 px at 150 dpi), keep the question itself
        bbox = ImageChops.invert(sh.convert("L")).point(lambda v: 255 if v > 40 else 0).getbbox()
        if bbox:
            sh = sh.crop((max(0, bbox[0] - 10), max(0, bbox[1] - 10), min(sh.width, bbox[2] + 10), min(sh.height, bbox[3] + 10)))
        ours = n + 10 if n <= 55 else n - 55
        name = f"{year}-{tag}-{ours:02d}.webp"
        sh.save(IMG / name, "WEBP", quality=82, method=6)
        rows.append({"year": year, "paper": tag, "number": ours, "orig": n, "section": "CS" if n <= 55 else "GA", "marks": marks,
                     "page": pn + 1, "image": f"img/p/{name}"})
    rows.sort(key=lambda r: r["number"])
    (OUT / f"{year}-{tag}.json").write_text(json.dumps(rows, indent=1), encoding="utf-8")
    print("wrote", len(rows))


if __name__ == "__main__":
    main()
