# Question bank and mock tests - design

## Intent
Students practise GATE CS on the site: pick a subject, a year, a mix of subjects, or a full mock test, answer in the browser with a timer, and see the score and solutions at the end. The questions come from the PDFs in the owner's "LocalHost Question Bank" Drive folder, turned into structured data once and kept in the repo.

## Goals
- A structured question bank: every question has year, set (CS1/CS2), section, marks, type (MCQ, MSQ, NAT), text, options, figure image if any, official answer, subject, topic.
- Test modes: subject-wise, year-wise (a real past paper), mixed subjects (student picks subjects and count), full mock (GATE pattern, generated from the bank).
- GATE pattern: 65 questions, 100 marks, 180 minutes; 10 General Aptitude + 55 CS/Math; MCQ negative marking 1/3 (1 mark) and 2/3 (2 marks); no negative marking for MSQ and NAT.
- Timer, question palette (answered, marked, not visited), mark for review, auto-submit at zero, result with per-subject breakdown and the correct answer shown.
- No login and no server-side student data: attempts live in the student's browser (localStorage). Works on Vercel as is.

## Non-goals
- No accounts, profile or leaderboard (planned later, tied to the Firebase decision).
- No proctoring, no payments, no admin UI.
- No AI-written questions or solutions; only questions that exist in the source papers.

## Anti-goals
- Never show a wrong answer key as if it were official. A question with no verified key is excluded from scored tests.
- Do not publish commercial content without the owner's explicit yes (see Sources).

## Sources and rights
- Official GATE papers (IIT-organised, 2007 to 2025, CS1/CS2 sets, 20 PDFs in `CS/PYQ`): used as the base. These are public exam papers; answer keys are taken from the official GATE sites.
- "GO Classes / GATE Overflow" test series PDFs (`DA/Test Series`, 12 files) and the "GATE Wallah (Physics Wallah)" PYQ book (`CS`, 36 MB; its first pages state that copying or circulating it is an offence) are commercial products. Builder's ruling, after the owner asked for their questions with the source name left off: they are NOT extracted into the bank. Removing the name would not change that the questions are the publishers' work, and the book's PYQs are the same official GATE questions already covered by the IIT papers. They stay available as PDFs on the Papers page only if the owner decides so.
- Subject folders (EM, DL, CN, C, DBMS, COA, DSA, DM, OS, TOC, aptitude) are inspected in a later pass and added the same way.

## Constraints
- Stack stays FastAPI + Jinja2 + HTMX + Tailwind; minimal vanilla JS for the timer and palette.
- Vercel: no database and no file writes at runtime. The bank is committed JSON (`app/data/questions/*.json`) and figure images under `static/img/q/`.
- The PDFs have broken math fonts (e.g. 2^21 reads as "221") and drop figures and tables, so text-only extraction is not enough.
- Security headers from the hardening pass stay (CSP: scripts from self only; images from self).

## Approaches considered
1. **Vision-assisted extraction into committed JSON (picked):** render each PDF page to an image, read question text, options and figures from the page itself, crop figures to PNG, join with the official key, tag subject and topic, then validate by script (counts per paper, every question has an answer, 4 options for MCQ). Slow once, then free at runtime. Trade-off: heavy up-front work and a manual spot-check pass.
2. **Plain text extraction (PDF text layer):** fast, but math is garbled and figures are lost, so many questions would be wrong or unanswerable. Rejected.
3. **Show each question as a page image and only record the answer:** accurate and quick, but not searchable, not mobile-friendly, and can't be reshuffled by option. Kept only as the fallback for a question that resists clean extraction.

## Decisions as the owner stated them
- Build the interactive tests from questions extracted out of the PDFs.
- Sort them subject-wise and year-wise, then mix them into mixed-subject tests and mock tests.

## My calls (owner can override)
- Mock composition follows GATE: 10 GA plus 55 questions weighted by each subject's average share in 2015 to 2025 papers.
- A question used in a mock is drawn at random from the bank; real past papers are served exactly as they were.
- Subject list follows the official GATE syllabus groups (Engineering Mathematics split into Discrete Maths, Linear Algebra, Calculus, Probability; then DL, COA, PL, DSA, Algorithms, TOC, Compiler, OS, DBMS, CN, General Aptitude).
- Pilot first: GATE CS 2025 (CS1), end to end, before the other 19 papers.

## Risks to verify during build
- Answer keys: marks and the NAT accepted range must come from the official key; "MTA" (marks to all) cases handled.
- Option text with math must render correctly; use plain text with Unicode, and an image only when needed.
- Figure-dependent questions need the figure attached or they are held back.
- Bank size in the repo (JSON plus PNGs) stays small enough for Vercel.
