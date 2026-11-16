"""Practice-only questions (official papers whose key is not in the source file): listed by subject, never scored."""
import json

from app.services import practice
from app.services import questions as qs

HTML = {"accept": "text/html"}


def test_every_practice_row_is_valid_and_not_in_the_scored_bank():
    rows = practice.load()
    assert rows
    scored = {(q.year, q.paper) for q in qs.load_questions()}
    for r in rows:
        assert (r.year, r.paper) not in scored  # a paper is either verified or practice, never both
        assert (qs.STATIC_DIR / r.image).is_file() and r.marks in (1, 2)


def test_practice_data_files_carry_no_answers():
    for f in practice.DATA_DIR.glob("*.json"):
        for row in json.loads(f.read_text(encoding="utf-8")):
            assert not {"answer", "answer_min", "answer_max", "key"} & set(row)


def test_hub_and_subject_pages(client):
    hub = client.get("/practice", headers=HTML)
    assert hub.status_code == 200 and "Practice questions" in hub.text
    first = practice.subjects()[0]
    page = client.get(f"/practice/{first[1]}", headers=HTML)
    assert page.status_code == 200 and "/static/img/p/" in page.text and "No answers are shown" in page.text
    year = first[3][0]
    filtered = client.get(f"/practice/{first[1]}?year={year}", headers=HTML)
    assert filtered.status_code == 200 and f"GATE {year}" in filtered.text


def test_unknown_subject_is_a_branded_404(client):
    r = client.get("/practice/not-a-subject", headers=HTML)
    assert r.status_code == 404 and "Page not found" in r.text


def test_slugs():
    assert practice.slug("Programming and Data Structures") == "programming-and-data-structures"
