"""Crop questions and read the embedded answers from IITG master-style paper PDFs (GATE 2015).

Each question is: a header line "Question Number : N  Question Type : MCQ|NAT", a body made of images (question and its
(A)-(D) options), then for MCQ an "Options :" line followed by one image row per option (a green tick marks the key,
the row's letter is part of the image) and for NAT a "Correct Answer :" line followed by the value.

python crop_key.py <pdf> <year> <tag> <first-page> <last-page>     (pages 1-based, inclusive; one session)
Writes static/img/p/<year>-<tag>-NN.webp and scripts/practice/out/<year>-<tag>.json
"""
import json
import re
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageChops

HERE = Path(__file__).resolve().parent
IMG = HERE.parents[1] / "static" / "img" / "p"
OUT = HERE / "out"
HEAD = re.compile(r"^Question Number\s*:\s*(\d+)\s+Question Type\s*:\s*(MCQ|NAT)")
ROW = (753, 25)


def tick_letters(doc, pages):
    """xref of each option-row image -> ('tick'|'cross', letter), decided by colour and left-to-right position order."""
    seen = {}
    for pn in pages:
        for im in doc[pn].get_image_info(xrefs=True):
            if (im["width"], im["height"]) == ROW:
                seen.setdefault(im["xref"], pn)
    info = {}
    for x in seen:
        pm = pymupdf.Pixmap(doc, x)
        if pm.alpha or pm.colorspace.n != 3:
            pm = pymupdf.Pixmap(pymupdf.csRGB, pm)
        im = Image.frombytes("RGB", (pm.width, pm.height), pm.samples).crop((0, 0, 120, 25))
        px = list(im.getdata())
        green = sum(1 for r, g, b in px if g > 90 and g > r + 40 and g > b + 40)
        red = sum(1 for r, g, b in px if r > 150 and r > g + 80 and r > b + 80)
        digits = None
        info[x] = ("tick" if green > red and green > 20 else "cross" if red > 20 else "legend", im)
    return info


def main():
    pdf, year, tag, p1, p2 = sys.argv[1], int(sys.argv[2]), sys.argv[3], int(sys.argv[4]) - 1, int(sys.argv[5]) - 1
    doc = pymupdf.open(pdf)
    pages = range(p1, p2 + 1)
    kinds = tick_letters(doc, pages)
    # the row's letter: ordered A..D by its printed number; read from a per-xref label made by position within its question
    events = []  # (page, y, kind, payload)
    for pn in pages:
        for b in doc[pn].get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                t = " ".join("".join(s["text"] for s in l["spans"]).split())
                if t:
                    events.append((pn, l["bbox"][1], "text", t, l["bbox"][3]))
        for im in doc[pn].get_image_info(xrefs=True):
            if (im["width"], im["height"]) == ROW and im["xref"] in kinds:
                events.append((pn, im["bbox"][1], "row", im["xref"], im["bbox"][3]))
    events.sort(key=lambda e: (e[0], e[1]))
    qs, cur, state = [], None, None
    for pn, y, kind, val, y2 in events:
        if kind == "text":
            m = HEAD.match(val)
            if m:
                cur = {"n": int(m.group(1)), "type": m.group(2), "page": pn + 1, "segs": [], "rows": [], "key": None}
                qs.append(cur); state = "body"; start = (pn, y2 + 2)
                continue
            if cur is None:
                continue
            if val.startswith("Options") and state == "body":
                cur["segs"].append((start, (pn, y - 2))); state = "rows"
            elif val.startswith("Correct Answer") and state == "body":
                cur["segs"].append((start, (pn, y - 2))); state = "answer"
            elif state == "answer" and cur["key"] is None and re.fullmatch(r"-?[\d.]+( to -?[\d.]+)?", val):
                cur["key"] = val; state = "done"
            elif state == "answer" and val.startswith("Correct Answer") is False and cur["key"] is None:
                cur["key"] = val; state = "done"
        elif kind == "row" and cur is not None and state == "rows":
            cur["rows"].append(val)
    assert [q["n"] for q in qs] == list(range(1, 66)), [q["n"] for q in qs]
    IMG.mkdir(parents=True, exist_ok=True); OUT.mkdir(parents=True, exist_ok=True)
    out = []
    for q in qs:
        (s_pn, s_y), (e_pn, e_y) = q["segs"][0]
        ims = []
        for p in range(s_pn, e_pn + 1):
            r = doc[p].rect
            y0 = s_y if p == s_pn else 0
            y1 = e_y if p == e_pn else r.height
            if y1 - y0 < 4:
                continue
            pm = doc[p].get_pixmap(dpi=120, clip=pymupdf.Rect(0, y0, r.width, y1))
            ims.append(Image.frombytes("RGB", (pm.width, pm.height), pm.samples))
        W = max(i.width for i in ims); H = sum(i.height for i in ims)
        sh = Image.new("RGB", (W, H), "white"); yy = 0
        for i in ims:
            sh.paste(i, (0, yy)); yy += i.height
        bb = ImageChops.invert(sh.convert("L")).point(lambda v: 255 if v > 40 else 0).getbbox()
        sh = sh.crop((max(0, bb[0] - 10), max(0, bb[1] - 10), min(W, bb[2] + 10), min(H, bb[3] + 10)))
        name = f"{year}-{tag}-{q['n']:02d}.webp"
        sh.save(IMG / name, "WEBP", quality=82, method=6)
        if q["type"] == "MCQ":
            assert len(q["rows"]) == 4, (q["n"], len(q["rows"]))
            ticks = [i for i, x in enumerate(q["rows"]) if kinds[x][0] == "tick"]
            assert len(ticks) == 1, (q["n"], ticks)
            key = "ABCD"[ticks[0]]
        else:
            assert q["key"] is not None, q["n"]
            key = q["key"]
        out.append({"year": year, "paper": tag, "number": q["n"], "type": q["type"], "key": key, "page": q["page"],
                    "marks": 1 if q["n"] <= 5 or 11 <= q["n"] <= 35 else 2, "image": f"img/p/{name}"})
    (OUT / f"{year}-{tag}.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print("wrote", len(out), "MCQ", sum(1 for o in out if o["type"] == "MCQ"), "NAT", sum(1 for o in out if o["type"] == "NAT"))


if __name__ == "__main__":
    main()
