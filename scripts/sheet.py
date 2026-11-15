import sys, os, fitz
from PIL import Image, ImageDraw
pdf, out, dpi = sys.argv[1], sys.argv[2], int(sys.argv[3]); pages = [int(x) for x in sys.argv[4:]]
doc = fitz.open(pdf); ims = []
for p in pages:
    pg = doc[p-1]; r = fitz.Rect(40, 85, 556, 740)
    pix = pg.get_pixmap(dpi=dpi, clip=r)
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    d = ImageDraw.Draw(im); d.text((3, 2), f"p{p}", fill=(255, 0, 0)); ims.append(im)
W = sum(i.width for i in ims); H = max(i.height for i in ims)
sh = Image.new("RGB", (W, H), "white"); x = 0
for i in ims: sh.paste(i, (x, 0)); x += i.width
sh.save(out); print(sh.size)
