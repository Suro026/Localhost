import json
from collections import Counter

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse

from app.core.dependencies import templates
from app.services import testing
from app.services.questions import bank_stats, get_question, load_questions, scorable

router = APIRouter()

MAX_BODY = 512 * 1024
MAX_ANSWER = 4096


def _hub(request: Request, message: str | None = None) -> HTMLResponse:
    qs = [q for q in load_questions() if scorable(q)]
    papers = sorted(Counter((q.year, q.paper) for q in qs).items(), reverse=True)
    stats = bank_stats()
    subjects = [(s, stats["by_subject"].get(s, 0)) for s in testing.SUBJECTS if stats["by_subject"].get(s, 0)]
    return templates.TemplateResponse(
        request, "tests/hub.html",
        {"papers": [(y, p, n) for (y, p), n in papers], "subjects": subjects, "total": stats["total"], "message": message},
    )


@router.api_route("/exams", methods=["GET", "HEAD"])
def exams() -> RedirectResponse:
    return RedirectResponse("/tests", status_code=302)


@router.api_route("/tests", methods=["GET", "HEAD"], response_class=HTMLResponse)
def hub(request: Request) -> HTMLResponse:
    return _hub(request)


def _int(value: str | None, default: int) -> int:
    try:
        return int(value) if value is not None else default
    except ValueError:
        return default


@router.api_route("/progress", methods=["GET", "HEAD"], response_class=HTMLResponse)
def progress(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, "tests/progress.html", {})


@router.api_route("/login", methods=["GET", "HEAD"], response_class=HTMLResponse)
def login(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, "auth/login.html", {})


@router.api_route("/profile", methods=["GET", "HEAD"], response_class=HTMLResponse)
def profile(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, "auth/profile.html", {})


@router.get("/account", include_in_schema=False)
def account() -> RedirectResponse:
    return RedirectResponse("/profile", status_code=302)


@router.api_route("/study", methods=["GET", "HEAD"], response_class=HTMLResponse)
def study(request: Request) -> HTMLResponse:
    have = bank_stats()["by_subject"]
    return templates.TemplateResponse(
        request, "tests/study.html", {"subjects": [s for s in testing.SUBJECTS if have.get(s)]})


@router.api_route("/tests/start", methods=["GET", "HEAD"], response_class=HTMLResponse)
def start(request: Request) -> HTMLResponse:
    p = request.query_params
    mode = p.get("mode", "")
    spec = None
    if mode == "paper":
        year = _int(p.get("year"), 0)
        spec = testing.build_paper(year, p.get("paper", "")) if year else None
    elif mode == "subject":
        spec = testing.build_subject(p.get("subject", ""), _int(p.get("count"), 20))
    elif mode == "mixed":
        spec = testing.build_mixed(p.getlist("subjects"), _int(p.get("count"), 20))
    elif mode == "weak":
        spec = testing.build_weak(p.getlist("t"), _int(p.get("count"), 20))
    elif mode == "mock":
        spec = testing.build_mock()
    if spec is None:
        return _hub(request, "That test is not available. Pick one from the list below.")
    questions = [
        {
            "id": q.id, "number": i + 1, "section": q.section, "marks": q.marks, "type": q.qtype,
            "subject": q.subject, "text": q.text, "options": list(q.options),
            "figure": f"/static/{q.figure}" if q.figure else None,
        }
        for i, q in enumerate(get_question(qid) for qid in spec.ids)
    ]
    payload = {"title": spec.title, "mode": spec.mode, "minutes": spec.minutes, "questions": questions}
    return templates.TemplateResponse(request, "tests/run.html", {"spec": spec, "payload": payload})


def _clean_answers(raw) -> dict | None:
    if not isinstance(raw, dict):
        return None
    out = {}
    for key, val in raw.items():
        if not isinstance(key, str):
            return None
        if isinstance(val, str):
            if len(val) > MAX_ANSWER:
                return None
        elif isinstance(val, list):
            if len(val) > 8 or not all(isinstance(v, str) and len(v) <= 8 for v in val):
                return None
        elif val is not None:
            return None
        out[key] = val
    return out


@router.post("/tests/result", response_class=HTMLResponse)
async def result(request: Request):
    bad = JSONResponse({"error": "Invalid test submission."}, status_code=400)
    body = await request.body()
    if len(body) > MAX_BODY:
        return bad
    try:
        data = json.loads(body)
    except (ValueError, UnicodeDecodeError):
        return bad
    if not isinstance(data, dict):
        return bad
    ids, answers = data.get("ids"), _clean_answers(data.get("answers", {}))
    if not isinstance(ids, list) or not all(isinstance(i, str) for i in ids) or answers is None or not ids:
        return bad
    try:
        res = testing.score(ids, answers)
    except ValueError:
        return bad
    data = {
        "total": res.total, "max": res.max_marks, "correct": res.correct, "wrong": res.wrong, "skipped": res.skipped,
        "rows": [[r.question.id, r.question.subject, r.question.topic, r.status[0], r.marks, r.question.marks]
                 for r in res.rows],
    }
    return templates.TemplateResponse(request, "tests/result.html", {"res": res, "data": data})
