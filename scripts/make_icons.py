"""Render the PWA icons (192/512 and maskable 512) from the logo geometry in static/img/logo-mark.svg."""
from PIL import Image, ImageDraw

S = 4  # supersample


def render(size: int, pad: float, out: str) -> None:
    n = size * S
    im = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if pad:  # maskable: full-bleed background, logo inside the safe zone
        d.rectangle((0, 0, n, n), fill="#6b26d9")
    else:
        d.rounded_rectangle((0, 0, n - 1, n - 1), radius=int(n * 15 / 64), fill="#6b26d9")
    k = n * (1 - 2 * pad) / 64
    o = n * pad

    def p(x, y):
        return (o + x * k, o + y * k)

    w = int(7 * k)
    d.line([p(23.5, 50), p(23.5, 30)], fill="white", width=w)
    d.line([p(40.5, 50), p(40.5, 30)], fill="white", width=w)
    d.arc((*p(20, 18), *p(44, 42)), 180, 360, fill="white", width=w)
    d.polygon([p(28, 14.5), p(36, 14.5), p(38.5, 22), p(25.5, 22)], fill="#0bb8da")
    im.resize((size, size), Image.LANCZOS).save(out)


render(192, 0, "static/img/icon-192.png")
render(512, 0, "static/img/icon-512.png")
render(512, 0.14, "static/img/icon-maskable-512.png")
