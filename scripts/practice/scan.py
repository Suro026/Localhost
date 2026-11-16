"""Scanned papers (no text layer): split pages into ink blocks, annotate them for reading, then crop questions from a spec.

python scan.py blocks <pdf> <outdir> [first-page last-page]   -> annotated PNGs (two pages side by side) with block numbers
python scan.py crop <pdf> <year> <tag> <spec.json>            -> static/img/p/<year>-<tag>-NN.webp + scripts/practice/out/<year>-<tag>.json

spec.json: {"marks": {"1-25": 1, "26-55": 2, ...}, "pages": {"3": [[y, flag], ...], ...}}
 y is where a question starts on that page (100-dpi pixels, read off the ruler of the annotated image; it is snapped to the
 blank gap just above). A question runs to the next entry (any page), minus header and footer. flag "q" = question,
 "x" = skip (heading / end line). "p" = shared statement (common data / linked answers): repeated above the next two questions, not a question itself.
"""
import json
import sys
from pathlib import Path

import numpy as np
import pymupdf
from PIL import Image, ImageChops, ImageDraw

HERE = Path(__file__).resolve().parent
IMG = HERE.parents[1] / "static" / "img" / "p"
OUT = HERE / "out"
DPI, GAP = 100, 13
FOOT_BAND = 110  # rows above the page bottom searched for the footer rule (spec "foot_band" overrides)


def ink_of(page, thr=150):
    pm = page.get_pixmap(dpi=DPI, colorspace=pymupdf.csGRAY)
    a = np.frombuffer(pm.samples, dtype=np.uint8).reshape(pm.height, pm.width)
    return a < thr


def blocks(page):
    ink = ink_of(page)
    H = ink.shape[0]
    rows = ink[:, 40:-40].sum(axis=1) > 0
    runs, y = [], 0
    while y < H:
        if rows[y]:
            s = y
            while y < H and rows[y]:
                y += 1
            runs.append([s, y])
        else:
            y += 1
    merged = []
    for s, e in runs:
        if merged and s - merged[-1][1] < GAP:
            merged[-1][1] = e
        else:
            merged.append([s, e])
    return [(s, e) for s, e in merged if e - s > 4], H


def annotate(doc, outdir, first, last):
    outdir = Path(outdir); outdir.mkdir(parents=True, exist_ok=True)
    pages = list(range(first, last + 1))
    for k in range(0, len(pages), 2):
        ims = []
        for pn in pages[k:k + 2]:
            page = doc[pn - 1]
            pm = page.get_pixmap(dpi=DPI)
            im = Image.frombytes("RGB", (pm.width, pm.height), pm.samples)
            d = ImageDraw.Draw(im)
            for y in range(0, im.height, 50):
                d.line([(0, y), (14 if y % 100 else 26, y)], fill=(255, 0, 0), width=1)
                if y % 100 == 0:
                    d.text((28, y - 5), str(y), fill=(220, 0, 0))
            d.text((im.width - 60, 2), f"p{pn}", fill=(0, 0, 255))
            ims.append(im)
        W = sum(i.width for i in ims); H = max(i.height for i in ims)
        sheet = Image.new("RGB", (W, H), "white"); x = 0
        for i in ims:
            sheet.paste(i, (x, 0)); x += i.width
        sheet.save(outdir / f"pp{pages[k]:02d}.png")


def long_run(row):
    """longest run of consecutive ink pixels in a row (a printed rule has one, even when the scan is slightly skewed)"""
    best = cur = 0
    for v in row:
        cur = cur + 1 if v else 0
        best = max(best, cur)
    return best


RULE_TRIES = ((150, 40), (200, 120), (200, 60))  # (gray threshold, min run): faint or broken rules on pale scans need the later tries


def page_body(page):
    """(top, bottom) of the printed area in 100-dpi px: below the header rule, above the footer rule"""
    H = ink_of(page).shape[0]
    head = foot = []
    for thr, run in RULE_TRIES:
        ink = ink_of(page, thr)
        head = head or [y for y in range(0, 110) if long_run(ink[y, 60:-60]) >= run]
        foot = foot or [y for y in range(H - FOOT_BAND, H) if long_run(ink[y, 60:-60]) >= run]
    top = min(head[0] + 9, head[-1] + 2) if head else 80
    bottom = (foot[0] - 3) if foot else H - 85
    return top, bottom


def snap(page, y):
    """move y up to the middle of the blank band just above it (a question starts below a gap)"""
    ink = ink_of(page)
    blank = ~ink[:, 40:-40].any(axis=1)
    for yy in range(min(y, len(blank) - 1), max(0, y - 40), -1):
        if blank[yy]:
            top = yy
            while top > 0 and blank[top - 1]:
                top -= 1
            return max(page_body(page)[0], (top + yy) // 2 + 1 if yy - top < 8 else yy - 2)
    return max(page_body(page)[0], y - 4)


def crop(doc, year, tag, spec):
    global FOOT_BAND
    FOOT_BAND = spec.get("foot_band", FOOT_BAND)
    marks_rule = {}
    for rng, m in spec["marks"].items():
        a, b = rng.split("-"); marks_rule.update({n: m for n in range(int(a), int(b) + 1)})
    entries = []  # (page, y_top, flag)
    cache = {}
    for pn, items in sorted(spec["pages"].items(), key=lambda kv: int(kv[0])):
        pg = int(pn)
        for y, flag in items:
            entries.append((pg, snap(doc[pg - 1], y), flag))
    entries.sort(key=lambda e: (e[0], e[1]))

    def body_end(pg):
        return page_body(doc[pg - 1])[1]

    def body_start(pg):
        return page_body(doc[pg - 1])[0]

    def seg(a, b):  # a=(page, y) start, b=(page, y) end or None -> segments in 100-dpi px
        out = []
        for pg in range(a[0], (b[0] if b else a[0]) + 1):
            y0 = a[1] if pg == a[0] else body_start(pg)
            y1 = b[1] if (b and pg == b[0]) else body_end(pg)
            if y1 - y0 > 6:
                out.append((pg, y0, y1))
        return out

    pend, rows, n = None, [], 0
    IMG.mkdir(parents=True, exist_ok=True); OUT.mkdir(parents=True, exist_ok=True)
    for i, (pg, y, flag) in enumerate(entries):
        nxt = (entries[i + 1][0], entries[i + 1][1]) if i + 1 < len(entries) else None
        segs = seg((pg, y), nxt)
        if flag == "x":  # not part of any question (section heading, end-of-paper line)
            continue
        if flag == "p":
            pend = [segs, 2]
            continue
        n += 1
        if pend and pend[1] > 0:
            segs = pend[0] + segs; pend[1] -= 1
        ims = []
        for p, y0, y1 in segs:
            r = doc[p - 1].rect; k = r.height / (doc[p - 1].get_pixmap(dpi=DPI).height)
            pm = doc[p - 1].get_pixmap(dpi=150, clip=pymupdf.Rect(0, y0 * k, r.width, y1 * k))
            ims.append(Image.frombytes("RGB", (pm.width, pm.height), pm.samples))
        W = max(im.width for im in ims); Ht = sum(im.height for im in ims)
        sh = Image.new("RGB", (W, Ht), "white"); yy = 0
        for im in ims:
            sh.paste(im, (0, yy)); yy += im.height
        bb = ImageChops.invert(sh.convert("L")).point(lambda v: 255 if v > 60 else 0).getbbox()
        sh = sh.crop((max(0, bb[0] - 12), max(0, bb[1] - 12), min(W, bb[2] + 12), min(Ht, bb[3] + 12)))
        k = (n + 10 if n <= 55 else n - 55) if spec.get("seq65") else n  # CS first, General Aptitude last -> bank order
        name = f"{year}-{tag}-{k:02d}.webp"
        sh.save(IMG / name, "WEBP", quality=80, method=6)
        rows.append({"year": year, "paper": tag, "number": k, "orig": n, "marks": marks_rule[n], "page": pg, "image": f"img/p/{name}"})
    (OUT / f"{year}-{tag}.json").write_text(json.dumps(rows, indent=1), encoding="utf-8")
    print("wrote", len(rows))


if __name__ == "__main__":
    cmd, pdf = sys.argv[1], sys.argv[2]
    doc = pymupdf.open(pdf)
    if cmd == "blocks":
        first = int(sys.argv[4]) if len(sys.argv) > 4 else 1
        last = int(sys.argv[5]) if len(sys.argv) > 5 else len(doc)
        annotate(doc, sys.argv[3], first, last)
    else:
        crop(doc, int(sys.argv[3]), sys.argv[4], json.loads(Path(sys.argv[5]).read_text(encoding="utf-8")))
