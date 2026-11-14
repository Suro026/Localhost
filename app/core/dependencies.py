from pathlib import Path

from fastapi.templating import Jinja2Templates

from app.core.config import get_settings

BASE_DIR = Path(__file__).resolve().parent.parent
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
STATIC_DIR = BASE_DIR.parent / "static"


def static_v(path: str) -> str:
    """Cache-busting URL: changes whenever the file changes."""
    try:
        version = int((STATIC_DIR / path).stat().st_mtime)
    except OSError:
        version = 0
    return f"/static/{path}?v={version}"

def mentor_photo(slug: str) -> str | None:
    """URL of static/img/mentors/<slug>.(jpg|jpeg|png|webp) if the file exists."""
    for ext in ("jpg", "jpeg", "png", "webp"):
        rel = f"img/mentors/{slug}.{ext}"
        if (STATIC_DIR / rel).is_file():
            return static_v(rel)
    return None


_s = get_settings()
templates.env.globals.update(
    static_v=static_v,
    app_name=_s.app_name,
    whatsapp_group_url=_s.whatsapp_group_url,
    mentors=[
        {"name": "Surajit Sadhukhan", "initials": "SS", "role": "Lead", "linkedin": _s.linkedin_surajit,
         "email": "surajitsadhukhan870@gmail.com", "photo": mentor_photo("surajit")},
        {"name": "Sayan Karmakar", "initials": "SK", "role": "Co Lead", "linkedin": _s.linkedin_sayan,
         "email": "sayankarmakar3005@gmail.com", "photo": mentor_photo("sayan")},
    ],
)
