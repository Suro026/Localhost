# Books and Notes pages (Drive-backed) - design

## Intent
Students should be able to read the LocalHost GATE CS books and notes on the site itself (preview inside the web app) and also download them. Files live in the owner's Google Drive; the site only references them. Exams, tests and profile are out of scope for now (planned after this ships).

## Goals
- `/books` and `/notes` pages: subject cards, then the PDFs in that subject, with a search box.
- In-site preview: PDF opens in a viewer page on our domain (Drive's embedded preview in an iframe). The student does not leave the site.
- Download button on every file.
- Works on the current Vercel deploy with no database and no Google API key at runtime.
- Same look as the landing page (violet, folder-tab language), no login required.

## Non-goals
- No signup/login, no student data stored, no profile (later).
- No uploads, no admin UI for files, no search inside PDF text.
- Exams, question bank and test series are not touched.

## Anti-goals
- Do not publish the commercial textbook "Ramakrishnan - Database Management Systems 3rd Edition.pdf" (owner's call: leave that one out). It stays in Drive but is excluded from the catalog.
- No secrets or Drive credentials in the repo.

## Constraints
- Stack stays FastAPI + Jinja2 + HTMX + Tailwind; minimal vanilla JS.
- Vercel is serverless: no local file storage, no live Postgres yet. So the file list is a committed JSON catalog.
- Source folders (both owned by genai24.surajit, shared as "anyone with link"): LocalHost BookBank `1DH-ORqGLK4f1DUpiOkRKQBKAsM9OhGxC` (10 subjects), LocalHost Notes `1k-172t3cs3BLh7xeobQvpNlvPC8QTH2s` (12 subjects).
- Built `static/css/app.css` is committed; rebuild and commit after Tailwind class changes.

## Approaches considered
1. **Committed JSON catalog + Drive embed (picked):** a catalog file (subject, title, Drive file id, size) read at startup; viewer uses `drive.google.com/file/d/ID/preview`; download uses the Drive download URL. Trade-off: adding files means regenerating the catalog; Drive must keep the files link-shared.
2. Live Drive API with an API key: always up to date, but needs a Google key and runtime calls (rate limits, latency, a secret on Vercel).
3. Copy the PDFs into the repo/storage: full control, but books are tens of MB, Vercel can't store them, and it multiplies the copyright exposure.

## Decisions (as decided with the owner)
- Books and Notes both go live now; only the one DBMS textbook is excluded.
- Preview in-site, plus a download option.

## My calls (builder to settle, owner can override)
- Catalog is generated from Drive by me now and refreshed on request; a small sync script using a Drive API key can be added later.
- The catalog lives in `app/data/library.json`; the Note model/table is not used for this.
- Viewer page route `/read/{file_id}`; unknown ids return 404 (only ids in the catalog are served).
- Files nested deeper than subject (e.g. "DA Paper") are shown as sub-groups under that subject.
- A "Books" item is added to the main nav next to Notes.

## Risks to verify during build
- Link-shared files must open in the Drive preview without a Google login (test in a private browser state).
- Large PDFs (20 MB) may be slow in the embedded preview; the download button is the fallback.
- Drive may throttle heavy download traffic on popular files.
