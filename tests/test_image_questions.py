"""Image-based questions (older papers): the printed question is an image, scoring still uses the official key."""
from app.services import questions as qs, testing


def test_2016_papers_are_scorable_image_questions():
    for paper in ("CS1", "CS2"):
        spec = testing.build_paper(2016, paper)
        assert spec and len(spec.ids) == 65
        for qid in spec.ids:
            q = qs.get_question(qid)
            assert q.image_only and q.figure and qs.scorable(q)
            assert (qs.STATIC_DIR / q.figure).is_file()


def test_runner_payload_marks_image_only(client):
    html = client.get("/tests/start?mode=paper&year=2016&paper=CS1").text
    assert '"image_only": true' in html.replace("&#34;", '"')


def test_scoring_uses_official_key():
    q = qs.get_question("2016-CS1-30")  # CS Q.20 (MCQ) and a NAT, both from the appended key table
    nat = qs.get_question("2016-CS1-13")  # limit = 1
    assert nat.qtype == "NAT" and nat.answer_min == nat.answer_max == 1.0
    res = testing.score(["2016-CS1-13"], {"2016-CS1-13": "1"})
    assert res.correct == 1 and q.qtype == "MCQ"
