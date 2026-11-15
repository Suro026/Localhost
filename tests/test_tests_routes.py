import json
import re

import pytest

from app.services import testing
from app.services.questions import Question


def _data(html: str) -> dict:
    m = re.search(r'<script type="application/json" id="test-data">(.*?)</script>', html, re.S)
    assert m, "payload block missing"
    return json.loads(m.group(1))


def test_hub_lists_2025(client):
    r = client.get("/tests")
    assert r.status_code == 200
    assert "GATE CS 2025" in r.text and "Start mock test" in r.text


def test_exams_redirects(client):
    r = client.get("/exams", follow_redirects=False)
    assert r.status_code == 302 and r.headers["location"] == "/tests"


@pytest.mark.parametrize("url", [
    "/tests/start?mode=paper&year=2025&paper=CS1",
    "/tests/start?mode=subject&subject=Algorithms&count=5",
    "/tests/start?mode=mixed&subjects=Algorithms&subjects=Databases&count=5",
    "/tests/start?mode=mock",
])
def test_start_modes_have_no_answers(client, url):
    r = client.get(url)
    assert r.status_code == 200
    data = _data(r.text)
    assert data["minutes"] > 0 and data["questions"]
    blob = json.dumps(data)
    for key in ("answer", "answer_min", "answer_max", "mta"):
        assert f'"{key}"' not in blob


def test_head_allowed(client):
    assert client.head("/tests").status_code == 200
    assert client.head("/tests/start?mode=mock").status_code == 200


@pytest.mark.parametrize("url", [
    "/tests/start", "/tests/start?mode=nope", "/tests/start?mode=paper&year=1800&paper=CS1",
    "/tests/start?mode=paper&year=abc", "/tests/start?mode=subject&subject=Nothing",
    "/tests/start?mode=mixed", "/tests/start?mode=mixed&subjects=Nothing&count=x",
])
def test_bad_start_shows_hub_message(client, url):
    r = client.get(url)
    assert r.status_code == 200 and "not available" in r.text


def _ids(client, n=5):
    return [q["id"] for q in _data(client.get("/tests/start?mode=paper&year=2025&paper=CS1").text)["questions"]][:n]


def test_result_scores_and_shows_breakdown(client):
    ids = _ids(client)
    r = client.post("/tests/result", json={"ids": ids, "answers": {}})
    assert r.status_code == 200
    assert "By subject" in r.text and "0 correct" in r.text and f"{len(ids)} skipped" in r.text


@pytest.mark.parametrize("body", [
    {"ids": ["nope-1"], "answers": {}},
    {"ids": [], "answers": {}},
    {"ids": "2025-CS1-01", "answers": {}},
    {"ids": [1, 2], "answers": {}},
    {"ids": ["2025-CS1-01"], "answers": []},
    {"ids": ["2025-CS1-01"], "answers": {"2025-CS1-02": "A"}},
    {"ids": ["2025-CS1-01"], "answers": {"2025-CS1-01": "x" * 5000}},
    {"ids": ["2025-CS1-01"], "answers": {"2025-CS1-01": 5}},
    {"ids": ["2025-CS1-01", "2025-CS1-01"], "answers": {}},
    {"ids": [f"2025-CS1-{i:02d}" for i in range(1, 102)], "answers": {}},
])
def test_result_rejects_bad_input(client, body):
    assert client.post("/tests/result", json=body).status_code == 400


def test_result_rejects_non_json_and_oversize(client):
    assert client.post("/tests/result", content=b"not json").status_code == 400
    assert client.post("/tests/result", content=b"[1]").status_code == 400
    assert client.post("/tests/result", content=b" " * (600 * 1024)).status_code == 400


def test_result_get_not_allowed(client):
    assert client.get("/tests/result").status_code == 405


def test_question_text_is_escaped(client, monkeypatch):
    q = Question(id="9999-CSX-01", year=9999, paper="CSX", number=1, section="CS", marks=1, qtype="MCQ",
                 subject="Algorithms", topic="t", text="<script>alert(1)</script>", options=("a", "b", "c", "d"),
                 figure=None, answer=("A",), answer_min=None, answer_max=None, mta=False)
    for mod in (testing, __import__("app.routers.tests", fromlist=["x"])):
        monkeypatch.setattr(mod, "load_questions", lambda: [q])
        monkeypatch.setattr(mod, "get_question", lambda qid: q if qid == q.id else None)
    html = client.get("/tests/start?mode=paper&year=9999&paper=CSX").text
    assert "<script>alert(1)</script>" not in html
    res = client.post("/tests/result", json={"ids": [q.id], "answers": {q.id: "B"}}).text
    assert "<script>alert(1)</script>" not in res and "&lt;script&gt;" in res
