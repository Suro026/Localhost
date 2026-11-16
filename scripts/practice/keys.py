"""Read the official answer-key table that IITG appends to some papers.
python keys.py <paper.pdf>  ->  prints one parsed key per table found: [(no, type, section, key, marks)]."""
import re
import sys
import pymupdf

ROW = re.compile(r"(\d+)\|(MCQ|MSQ|NAT)\|(GA|CS-?\d?)\|([^|]+)\|(\d)(?=\||$)")


def tables(pdf):
    doc = pymupdf.open(pdf)
    cur, out = None, []
    for pn, page in enumerate(doc):
        lines = [l.strip() for l in page.get_text().split("\n") if l.strip()]
        txt = "|".join(lines)
        if txt.startswith("Q. No") or "Q. No|Type" in txt[:40]:
            if cur is not None:
                out.append(cur)
            cur = []
        elif cur is None or not re.match(r"^\d+\|(MCQ|MSQ|NAT)\|", txt):
            if cur is not None:
                out.append(cur); cur = None
            continue
        for m in ROW.finditer(txt):
            cur.append((int(m.group(1)), m.group(2), m.group(3), m.group(4).strip(), int(m.group(5))))
    if cur:
        out.append(cur)
    return out


if __name__ == "__main__":
    for t in tables(sys.argv[1]):
        print(len(t), t[:3], t[-2:])
