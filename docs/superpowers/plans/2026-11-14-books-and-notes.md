# Books and Notes Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/books` and `/notes` pages that list Drive-hosted PDFs by subject, preview them inside the site, and offer a download button.

**Architecture:** A committed JSON catalog (`app/data/library.json`) is loaded by a small service; a new router serves list pages, a viewer page (Drive `/preview` iframe) and a download redirect, all restricted to ids present in the catalog. No database and no Google credentials at runtime, so it works on the existing Vercel deploy.

**Tech Stack:** FastAPI, Jinja2, Tailwind (built CSS committed), `static/css/folder.css` look, vanilla JS for the search filter, pytest + TestClient.

**Spec:** `docs/superpowers/specs/2026-11-14-books-and-notes-design.md`

## Global Constraints

- Stack stays FastAPI + Jinja2 + HTMX + Tailwind; vanilla JS only, no React/Vue/etc.
- No login, no student data stored.
- Do not include "Ramakrishnan - Database Management Systems 3rd Edition.pdf" in the catalog.
- No secrets or Drive credentials in the repo; routes must not touch the database.
- Source folders: BookBank `1DH-ORqGLK4f1DUpiOkRKQBKAsM9OhGxC`, Notes `1k-172t3cs3BLh7xeobQvpNlvPC8QTH2s`.
- After any Tailwind class change: `./bin/tailwindcss.exe -i static/css/input.css -o static/css/app.css --minify` and commit `app.css`.
- Run tests with `/c/lh-venv/Scripts/python -m pytest -q`; the dev server needs a manual restart after changes to `app/core/dependencies.py`.

## Review Focus

- Unknown file id on `/read/<id>` and `/download/<id>` returns 404 (never redirects to an arbitrary Drive id).
- Ids containing `/`, `..`, quotes or `<script>` return 404 and are never reflected unescaped.
- A missing or corrupt `library.json` renders an empty-state page with status 200, not a 500.
- A subject with zero files is not shown; file titles with `&`, quotes or non-ASCII render escaped and intact.
- Search with an empty box shows everything; a search with no hits shows a "no match" message.

---

### Task 1: Library catalog and loader

**Files:**
- Create: `app/data/library.json`, `app/services/library.py`
- Test: `tests/test_library.py`

**Interfaces:**
- Produces: `LibraryFile(id: str, title: str, size_mb: float, subject: str, group: str | None, kind: str)` frozen dataclass; `load_library() -> list[LibraryFile]` (cached, returns `[]` on missing/invalid JSON); `subjects(kind: str) -> list[tuple[str, list[LibraryFile]]]` (subjects with files only, sorted by name); `get_file(file_id: str) -> LibraryFile | None`. `kind` is `"book"` or `"note"`.
- JSON shape: list of `{"id","title","size_mb","subject","group","kind"}`; `group` is a sub-folder name or `null`.

- [ ] **Step 1: Write failing tests** in `tests/test_library.py`: `test_catalog_excludes_ramakrishnan` (no title contains "Ramakrishnan"), `test_catalog_has_both_kinds` (both `book` and `note` present), `test_get_file_unknown_returns_none` (`get_file("nope")`, `get_file("../x")` are `None`), `test_subjects_hide_empty_and_sort`, `test_corrupt_json_returns_empty` (monkeypatch the path to a temp file with `{`, clear the cache, expect `[]`).
- [ ] **Step 2: Run** `pytest tests/test_library.py -v`. Expected: FAIL (module missing).
- [ ] **Step 3: Generate `app/data/library.json`** by walking both Drive folders with the Drive search tool (every subject folder and one level of sub-folders, PDFs only), dropping the Ramakrishnan file; set `kind` by source folder, `size_mb` rounded to 0.1.
- [ ] **Step 4: Implement the dataclass and the three functions** in `app/services/library.py`; read the JSON with `functools.lru_cache`, tolerate `OSError` and `ValueError`.
- [ ] **Step 5: Run** `pytest tests/test_library.py -v`. Expected: PASS.
- [ ] **Step 6: Commit** `git add app/data app/services/library.py tests/test_library.py && git commit -m "feat: add Drive library catalog and loader"`.

### Task 2: Routes

**Files:**
- Create: `app/routers/library.py`
- Modify: `app/main.py` (include router)
- Test: `tests/test_library_routes.py`

**Interfaces:**
- Consumes: `subjects`, `get_file` from Task 1.
- Produces: `GET /books`, `GET /notes` (render `library/list.html` with context `kind: str`, `title: str`, `groups: list[tuple[str, list[LibraryFile]]]`); `GET /read/{file_id}` (render `library/viewer.html` with `file: LibraryFile`, `preview_url: str`, 404 if unknown); `GET /download/{file_id}` (302 to `https://drive.google.com/uc?export=download&id={file_id}`, 404 if unknown).

- [ ] **Step 1: Write failing tests**: `/books` and `/notes` return 200 and contain a known catalog subject; `/read/<known id>` returns 200 with `drive.google.com/file/d/<id>/preview` in the body; `/download/<known id>` returns 302 with the exact Location; `/read/does-not-exist`, `/download/does-not-exist`, `/read/..%2Fx` and `/read/<script>` return 404 and the body never contains `<script>` unescaped; with the catalog patched to `[]`, `/books` returns 200 and shows the empty-state text.
- [ ] **Step 2: Run** `pytest tests/test_library_routes.py -v`. Expected: FAIL (404s).
- [ ] **Step 3: Implement the router** with no DB dependency; register in `app/main.py`.
- [ ] **Step 4: Run tests.** Expected: PASS (templates arrive in Task 3, so create minimal stub templates first if needed and replace them there).
- [ ] **Step 5: Commit** `git commit -m "feat: add books, notes, read and download routes"`.

### Task 3: Templates and search

**Files:**
- Create: `app/templates/library/list.html`, `app/templates/library/viewer.html`, `static/js/library.js`
- Modify: `static/css/input.css` only if new Tailwind classes need `@source` coverage; rebuild `app.css`.

**Interfaces:**
- Consumes: route contexts from Task 2.

- [ ] **Step 1: Build `list.html`** extending `base.html`: page heading, a search input (`id="lib-search"`), one block per subject (heading + count) with rows showing title, size, a "Read" link to `/read/{id}` and a "Download" link to `/download/{id}`; sub-groups (`group`) shown as a small label under the subject; empty state text "No files yet. They appear here once they are added."; a "no match" message element hidden by default. Violet palette tokens already in `input.css`; keep styling consistent with the landing page (rounded folder-like cards, no new fonts).
- [ ] **Step 2: Write `static/js/library.js`**: on `input` in `#lib-search`, hide rows whose lowercased title lacks the query, hide subject blocks with no visible rows, toggle the "no match" element; empty query shows all. Load it with `defer` via `static_v`.
- [ ] **Step 3: Build `viewer.html`**: file title, "Back to Books/Notes" link, Download button, and a full-width iframe (`src=preview_url`, `loading="lazy"`, `allow="autoplay"` omitted) at about 80vh; below it a one-line fallback "Preview not loading? Use Download."
- [ ] **Step 4: Rebuild CSS** (`./bin/tailwindcss.exe ... --minify`), run the full test suite. Expected: all pass.
- [ ] **Step 5: Commit** `git commit -m "feat: library list and viewer pages with search"`.

### Task 4: Navigation and homepage links

**Files:**
- Modify: `app/templates/components/navbar.html`, `app/templates/home.html` (practice/notes links that currently point to notes), `tests/test_home.py`

- [ ] **Step 1: Write failing test** in `tests/test_home.py`: homepage HTML contains links to `/books` and `/notes`.
- [ ] **Step 2: Run** it. Expected: FAIL.
- [ ] **Step 3: Add a "Books" nav link next to "Notes"** (both desktop and mobile menus) and point homepage notes chips to `/notes`.
- [ ] **Step 4: Run the full suite and rebuild CSS.** Expected: pass.
- [ ] **Step 5: Commit** `git commit -m "feat: link Books and Notes from nav and homepage"`.

### Task 5: Verify, ship, check production

- [ ] **Step 1: Restart the dev server and open `/books`, `/notes`, one `/read/<id>` in the browser pane;** confirm the Drive preview renders without a Google login (use a fresh tab with no Google cookies) and the Download link starts a download for a small file.
- [ ] **Step 2: Check 375px and 1440px widths** for overflow on list and viewer pages.
- [ ] **Step 3: Push to `main`** (`git push`), wait for the Vercel deploy, then load `https://localhost-seven.vercel.app/books` and `/notes` and one viewer page; confirm 200s and that `app.css` loads.
- [ ] **Step 4: Report** to the owner anything Drive blocks (for example files that need a login), without changing sharing settings.
