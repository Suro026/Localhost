# Question Bank and Mock Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship an in-site test engine (year-wise paper, subject-wise, mixed-subject, full mock) over a structured bank of official GATE CS questions extracted from the Drive PDFs.

**Architecture:** Questions live in committed JSON (`app/data/questions/<year>-<set>.json`) with figure PNGs under `static/img/q/`. A loader validates and serves them; a builder assembles a test (list of question ids) for each mode; the browser runs the timer and palette from a server-rendered JSON block and POSTs `{ids, answers}` to a stateless scoring endpoint. No database, no login, no server-side student data.

**Tech Stack:** FastAPI, Jinja2, Tailwind (built CSS committed), vanilla JS (timer/palette, localStorage autosave), pytest + TestClient. Extraction is an offline authoring step (page images read by the builder, output validated by script), not runtime code.

**Spec:** `docs/superpowers/specs/2026-11-15-question-bank-mock-tests-design.md`

## Global Constraints

- Stack stays FastAPI + Jinja2 + HTMX + Tailwind; vanilla JS only.
- Sources are the official GATE papers and, later, the owner's own subject material. The GO Classes test series and the "GATE Wallah / Physics Wallah" PYQ book are NOT extracted (spec, Sources and rights).
- GATE pattern: 65 questions, 100 marks, 180 minutes; 10 GA (5x1 + 5x2) plus 55 others; MCQ negative marking 1/3 for 1 mark and 2/3 for 2 marks; MSQ and NAT have no negative marking and no partial marks.
- No login, no stored student data; attempts live in the browser (localStorage).
- A question without a verified official answer is excluded from every scored test.
- Security headers from `app/core/headers.py` stay: scripts from self only (no inline handlers or inline scripts), images from self. Pass test data as `<script type="application/json">`, never as executable inline JS.
- No secrets in the repo; `.env` stays ignored. Built `static/css/app.css` is committed (rebuild after Tailwind class changes).
- Run tests with `/c/lh-venv/Scripts/python -m pytest -q`; dev server needs a manual restart after `app/core/dependencies.py` changes.

## Review Focus

- Scoring edge cases: unanswered, MSQ with a missing or extra option (0 marks, no negative), NAT answer inside the accepted range and a non-numeric NAT input (0 marks, no crash), "marks to all" question (full marks for every attempt).
- Tampered POST: unknown question ids, duplicate ids, thousands of ids, an answer for a question not in the test, malformed JSON. Expected: 400/422, never a 500, nothing reflected unescaped.
- Mixed test with zero subjects chosen, or a count larger than the available questions: clear message, no crash, and the count is clamped.
- Refresh or tab sleep during a test: the timer uses an absolute end time kept in localStorage, so remaining time stays correct and answers survive a reload.
- Question text or options containing `<`, `&`, quotes or Unicode math render escaped and intact; a question whose figure file is missing is held back from tests, not shown broken.

---

### Task 1: Question model, loader and bank validation

**Files:**
- Create: `app/services/questions.py`, `scripts/validate_bank.py`, `app/data/questions/.gitkeep`
- Test: `tests/test_questions.py`

**Interfaces:**
- Produces: frozen dataclass `Question(id: str, year: int, paper: str, number: int, section: str, marks: int, qtype: str, subject: str, topic: str, text: str, options: tuple[str, ...], figure: str | None, answer: tuple[str, ...], answer_min: float | None, answer_max: float | None, mta: bool)`; `qtype` is `"MCQ" | "MSQ" | "NAT"`; `paper` is e.g. `"CS1"`; `id` is `f"{year}-{paper}-{number:02d}"`.
- Produces: `load_questions() -> list[Question]` (lru_cache, reads every `app/data/questions/*.json`, drops invalid entries, never raises); `get_question(qid: str) -> Question | None`; `scorable(q: Question) -> bool` (has a verified answer and, if `figure` is set, the file exists under `static/`); `bank_stats() -> dict` (counts by year, subject, qtype).
- JSON shape per question: `{"year","paper","number","section","marks","type","subject","topic","text","options","figure","answer","answer_min","answer_max","mta"}`; MCQ `answer` is `["B"]`, MSQ `["A","C"]`, NAT uses `answer_min/answer_max` and an empty `answer`.

- [ ] **Step 1: Write failing tests** in `tests/test_questions.py`: `test_loads_valid_question` (temp JSON dir via monkeypatch), `test_invalid_entries_dropped` (MCQ with 3 options, NAT with no range, unknown type, marks not in {1,2}), `test_corrupt_json_returns_empty`, `test_get_question_unknown_is_none` (`get_question("nope")`, `get_question("../x")`), `test_scorable_excludes_missing_figure_and_missing_answer`, `test_ids_are_unique_across_files`.
- [ ] **Step 2: Run** `pytest tests/test_questions.py -v`. Expected: FAIL (module missing).
- [ ] **Step 3: Implement the dataclass and four functions** in `app/services/questions.py`; tolerate `OSError`/`ValueError`/`KeyError`/`TypeError`, same style as `app/services/library.py`.
- [ ] **Step 4: Implement `scripts/validate_bank.py`**: prints per-paper counts and exits non-zero if any paper has a question count outside 55-65, an id gap, an unscorable question, a duplicate id, or an unknown subject (subject list in Task 3).
- [ ] **Step 5: Run** `pytest tests/test_questions.py -v`. Expected: PASS.
- [ ] **Step 6: Commit** `git add app/services/questions.py scripts tests app/data/questions && git commit -m "feat: question bank model, loader and validator"`.

### Task 2: Extract the pilot paper (GATE CS 2025, CS1)

**Files:**
- Create: `app/data/questions/2025-CS1.json`, `static/img/q/2025-CS1-<number>.png` for figure questions
- Modify: none

**Interfaces:**
- Consumes: Task 1 JSON shape and `scripts/validate_bank.py`.
- Produces: the first complete paper (65 questions), used by every later task's tests as the known-good dataset.

- [ ] **Step 1:** Fetch the CS1 2025 PDF from Drive (`CS12025.pdf`, id `1GQILR2bsWYNQ7Nx983vr5AvgZvUqe2d_`) into the scratchpad; render each page to a PNG with PyMuPDF (install into `C:\lh-venv` if missing).
- [ ] **Step 2:** Read each page image and write the question text with correct math (Unicode, e.g. `2²¹`), options, marks and type; crop each figure/table/diagram to `static/img/q/2025-CS1-<number>.png` and set `figure`.
- [ ] **Step 3:** Fetch the official CS1 2025 answer key from the GATE 2025 (IIT Roorkee) site; fill `answer` (MCQ/MSQ letters, NAT range, `mta` for marks-to-all). If the key cannot be fetched, stop and report; do not guess answers.
- [ ] **Step 4:** Tag `subject` and `topic` for every question using the Task 3 subject list.
- [ ] **Step 5: Run** `python scripts/validate_bank.py`. Expected: 65 questions, 10 GA (5 one-mark, 5 two-mark), 0 unscorable, 0 duplicates, exit 0.
- [ ] **Step 6: Spot-check** 10 random questions against the page images (text, options, answer); fix any mismatch.
- [ ] **Step 7: Commit** `git add app/data/questions/2025-CS1.json static/img/q && git commit -m "data: GATE CS 2025 CS1 questions"`.

### Task 3: Test builder and scoring

**Files:**
- Create: `app/services/testing.py`
- Test: `tests/test_testing.py`

**Interfaces:**
- Consumes: `load_questions`, `scorable`, `get_question` from Task 1.
- Produces: `SUBJECTS: tuple[str, ...]` (`"General Aptitude"`, `"Discrete Mathematics"`, `"Linear Algebra"`, `"Calculus"`, `"Probability and Statistics"`, `"Digital Logic"`, `"Computer Organization"`, `"Programming and Data Structures"`, `"Algorithms"`, `"Theory of Computation"`, `"Compiler Design"`, `"Operating System"`, `"Databases"`, `"Computer Networks"`); `@dataclass(frozen=True) TestSpec(mode: str, ids: tuple[str, ...], minutes: int, title: str)` with `mode` in `"paper" | "subject" | "mixed" | "mock"`.
- Produces: `build_paper(year: int, paper: str) -> TestSpec | None`; `build_subject(subject: str, count: int = 20, rng=None) -> TestSpec | None`; `build_mixed(subjects: list[str], count: int, rng=None) -> TestSpec | None` (count clamped to 1..available, `None` if no scorable question); `build_mock(rng=None) -> TestSpec | None` (GATE pattern, 65 questions, 180 min; fills from the bank as far as it can and uses all available questions if the bank is smaller, with `title` saying so); `score(ids: list[str], answers: dict[str, list[str] | str]) -> Result`.
- Produces: `Result` dataclass with `total: float`, `max_marks: int`, `correct: int`, `wrong: int`, `skipped: int`, `per_subject: dict[str, tuple[float, int]]`, `rows: list[RowResult]` where `RowResult(question: Question, given: tuple[str, ...] | str | None, status: "correct" | "wrong" | "skipped", marks: float)`.

- [ ] **Step 1: Write failing tests** in `tests/test_testing.py` with a small in-memory bank (monkeypatch `load_questions`): `test_mcq_1_mark_wrong_is_minus_one_third`, `test_mcq_2_mark_wrong_is_minus_two_thirds`, `test_msq_exact_match_full_marks_else_zero_no_penalty`, `test_nat_inside_range_correct_outside_zero`, `test_nat_non_numeric_is_wrong_zero_no_crash`, `test_mta_gives_full_marks_even_if_skipped`, `test_unknown_and_duplicate_ids_rejected` (raises `ValueError`), `test_mock_has_gate_pattern_when_bank_is_large`, `test_mixed_zero_subjects_returns_none`, `test_mixed_count_clamped`, `test_paper_returns_all_scorable_in_order`.
- [ ] **Step 2: Run** `pytest tests/test_testing.py -v`. Expected: FAIL.
- [ ] **Step 3: Implement** the builders and `score` in `app/services/testing.py`; builders take an optional `random.Random` so tests are deterministic.
- [ ] **Step 4: Run** the tests. Expected: PASS.
- [ ] **Step 5: Commit** `git commit -m "feat: test builder and scoring"`.

### Task 4: Routes and templates

**Files:**
- Create: `app/routers/tests.py`, `app/templates/tests/hub.html`, `app/templates/tests/run.html`, `app/templates/tests/result.html`
- Modify: `app/main.py` (include router), `app/routers/pages.py` (remove the `/exams` coming-soon route in favour of a redirect), `app/templates/components/navbar.html`, `app/templates/components/footer.html` (Exams link drops the "soon" badge)
- Test: `tests/test_tests_routes.py`

**Interfaces:**
- Consumes: Task 3 builders, `score`, `bank_stats`.
- Produces: `GET /exams` (302 to `/tests`); `GET /tests` hub (cards: past papers by year, subject-wise, mixed, full mock; empty state when the bank has no scorable question); `GET /tests/start?mode=paper|subject|mixed|mock&year=&paper=&subject=&subjects=&count=` renders `tests/run.html` containing a `<script type="application/json" id="test-data">` block with the question list (text, options, figure URL, marks, type, number, subject, no answers) plus `minutes`; `POST /tests/result` takes JSON `{"ids": [...], "answers": {...}}` (max 100 ids, max 4 KB per answer), returns `tests/result.html`; HEAD allowed on GET routes; invalid mode or parameters return the hub with a message and status 200, bad POST returns 400.
- Server never includes `answer`, `answer_min`, `answer_max` in the `run.html` payload.

- [ ] **Step 1: Write failing tests**: hub 200 and lists 2025; `/exams` redirects; start for each mode returns 200 and a JSON block parseable as JSON with no `answer` keys; unknown mode/year returns hub message, not 500; POST result with valid ids returns 200 and shows score; POST with unknown id, duplicate ids, 101 ids, non-JSON body returns 400; a question text containing `<script>` is escaped in `run.html` and `result.html`.
- [ ] **Step 2: Run** `pytest tests/test_tests_routes.py -v`. Expected: FAIL.
- [ ] **Step 3: Implement the router and templates**; Tailwind classes consistent with Books/Notes pages; nav "Exams" now links to `/tests`.
- [ ] **Step 4: Rebuild CSS** (`./bin/tailwindcss.exe -i static/css/input.css -o static/css/app.css --minify`), run the full suite. Expected: all pass.
- [ ] **Step 5: Commit** `git commit -m "feat: tests hub, run and result pages"`.

### Task 5: Test-taking UI (timer, palette, review, autosave)

**Files:**
- Create: `static/js/test-runner.js`
- Modify: `app/templates/tests/run.html` (load script with `defer` via `static_v`), `static/css/input.css` only if new Tailwind classes need `@source` coverage
- Test: extend `tests/test_tests_routes.py` (script is referenced; no inline handlers) plus a manual browser check

**Interfaces:**
- Consumes: the `#test-data` JSON block and `POST /tests/result` from Task 4.
- Produces: runner behaviour: one question at a time; options as radio (MCQ) or checkbox (MSQ) or number input (NAT); palette with answered / marked / not visited states; Mark for review; Clear response; Previous/Next; countdown from an absolute end time saved in localStorage key `ks-test-<hash>`; autosave answers on every change; auto-submit at zero; Submit asks for confirmation; after submit the saved state is cleared; works at 320 px width with the palette as a collapsible sheet.

- [ ] **Step 1: Write failing test**: `run.html` references `test-runner.js` and contains no `onclick=`/`on*=` attributes (existing security test already covers inline handlers site-wide).
- [ ] **Step 2: Implement `static/js/test-runner.js`** (no inline code, DOM built with `textContent`, never `innerHTML` for question text).
- [ ] **Step 3: Manual check in the browser pane** at 1440 px and 320 px with the 2025 paper: answer a few questions, mark one, reload (state and remaining time survive), submit, confirm the result page shows correct per-question marks and per-subject totals.
- [ ] **Step 4: Run** the full suite. Expected: pass.
- [ ] **Step 5: Commit** `git commit -m "feat: test runner with timer, palette and autosave"`.

### Task 6: Fill the bank (remaining official papers and subject material)

**Files:**
- Create: `app/data/questions/<year>-<paper>.json` for each remaining paper (2007-2024 and CS2 sets where available), figure PNGs
- Modify: none

**Interfaces:**
- Consumes: Task 2 workflow; `scripts/validate_bank.py` from Task 1.
- Produces: the full bank; every paper passes validation; per-subject counts printed by `bank_stats()`.

- [ ] **Step 1:** Repeat Task 2 steps 1-5 for each remaining official PDF in `CS/PYQ` (19 files), one paper per commit, running `scripts/validate_bank.py` after each. Papers older than 2014 have a different pattern (e.g. no NAT or no MSQ); the validator accepts the counts printed in that paper's cover page.
- [ ] **Step 2:** Inspect the CS subject folders (EM, DL, CN, C, DBMS, COA, DSA, DM, OS, TOC, aptitude) and `DA/DA` (DA2024, DA2025); for each file decide whether it is an official paper or the owner's own material. Add official and owner-authored questions with the same pipeline; skip anything that is a commercial publisher's product and list the skipped files in the final report.
- [ ] **Step 3: Run** `python scripts/validate_bank.py`. Expected: exit 0, no unscorable questions, every subject in `SUBJECTS` has at least one question.
- [ ] **Step 4:** Check that total size of `app/data/questions` plus `static/img/q` stays under 25 MB; if not, compress the PNGs.
- [ ] **Step 5: Commit** per paper `git commit -m "data: GATE CS <year> <paper> questions"`.

### Task 7: Hardening, responsive check and ship

**Files:**
- Modify: `tests/test_security.py` (add the new routes to the header/HEAD parametrisation)

- [ ] **Step 1:** Add `/tests`, `/tests/start?mode=mock` to the security header and no-inline-handler tests; add a POST test that the response carries the same headers and a 405 for non-POST on `/tests/result`.
- [ ] **Step 2: Run** the full suite. Expected: all pass.
- [ ] **Step 3: Responsive check** at 320, 375, 768, 1024, 1440 on `/tests`, a running test and a result page (JS overflow check plus a screenshot each); fix overflow or tap targets under 40 px.
- [ ] **Step 4:** Merge to `main` (ff-only) and push; wait for the Vercel deploy; on https://keystonee.vercel.app run one full mock and one paper end to end, confirm 200s, no CSP errors in the console and security headers present.
- [ ] **Step 5: Report** to the owner: questions per year and subject, any questions held back (missing figure or key), files skipped as commercial, and the pending Firebase/login decision.
