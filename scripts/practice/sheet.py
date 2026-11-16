"""Contact sheets of the cropped questions, for checking cut-offs: python sheet.py <year> <paper> <outdir>"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
root = Path(__file__).resolve().parents[2] / "static" / "img" / "p"
year, paper, out = sys.argv[1], sys.argv[2], Path(sys.argv[3])
files = sorted(root.glob(f"{year}-{paper}-*.webp"))
W, per = 560, 6
for k in range(0, len(files), per):
    ims = []
    for f in files[k:k + per]:
        im = Image.open(f).convert("RGB"); r = W / im.width
        im = im.resize((W, max(40, int(im.height * r)))); ImageDraw.Draw(im).text((4, 2), f.stem, fill=(220, 0, 0)); ims.append(im)
    cols = 3; rows = (len(ims) + cols - 1) // cols
    hs = [max(i.height for i in ims[r * cols:(r + 1) * cols]) for r in range(rows)]
    sheet = Image.new("RGB", (cols * (W + 8), sum(hs) + 8 * rows), (200, 200, 200)); y = 0
    for r in range(rows):
        for c, im in enumerate(ims[r * cols:(r + 1) * cols]): sheet.paste(im, (c * (W + 8), y))
        y += hs[r] + 8
    sheet.save(out / f"{year}-{paper}-sheet{k // per + 1:02d}.png")
print(len(files))
