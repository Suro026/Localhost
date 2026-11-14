# Keystone

AI-powered exam and learning platform. FastAPI + PostgreSQL + Jinja2 + HTMX + Tailwind CSS.

## Setup

1. Create a venv at a short path (long paths break compiled wheels on Windows) and install:
   `python -m venv C:\lh-venv` then `C:\lh-venv\Scripts\python -m pip install -r requirements.txt`
2. Copy `.env.example` to `.env` and set `DATABASE_URL` and `SECRET_KEY`.
3. Build CSS with the Tailwind standalone CLI (`bin/tailwindcss.exe`, not committed):
   `bin\tailwindcss.exe -i static/css/input.css -o static/css/app.css --minify`
4. Run: `C:\lh-venv\Scripts\python -m uvicorn app.main:app --reload`

## Status

- Phase 1 (setup, models, config) and Phase 2 (base template, homepage): done.
- Next: Alembic migration, authentication.
