"""Contact sheets for tagging: python sheet2.py <year> <tag> <outdir> [per]"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
root = Path(__file__).resolve().parents[2] / "static" / "img" / "p"
year, tag, out = sys.argv[1], sys.argv[2], Path(sys.argv[3]); per = int(sys.argv[4]) if len(sys.argv) > 4 else 12
files = sorted(root.glob(f"{year}-{tag}-*.webp")); W = 520
for k in range(0, len(files), per):
    ims = []
    for f in files[k:k + per]:
        im = Image.open(f).convert("RGB"); im = im.resize((W, max(30, min(340, int(im.height * W / im.width)))))
        ImageDraw.Draw(im).rectangle((0, 0, 22, 14), fill=(255, 255, 255)); ImageDraw.Draw(im).text((2, 1), f.stem[-2:], fill=(220, 0, 0)); ims.append(im)
    rows = (len(ims) + 2) // 3; hs = [max(i.height for i in ims[r * 3:(r + 1) * 3]) for r in range(rows)]
    sh = Image.new("RGB", (3 * (W + 6), sum(hs) + 6 * rows), (190, 190, 190)); y = 0
    for r in range(rows):
        for c, im in enumerate(ims[r * 3:(r + 1) * 3]): sh.paste(im, (c * (W + 6), y))
        y += hs[r] + 6
    sh.save(out / f"{year}-{tag}-s{k // per + 1}.png")
print(len(files))
