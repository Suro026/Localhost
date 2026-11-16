from app.models import Difficulty, Exam, ExamMode, Note, Question
from app.core.security import hash_password, verify_password


def test_homepage_static_content(client):
    r = client.get("/")
    assert r.status_code == 200
    html = r.text
    for expected in [
        "Free GATE Mock Tests", "Free online mock tests", "Start learning", "How it works",
        "Pick a test", "Sit it timed", "Get scored", "Review",
        "Surajit Sadhukhan", "Sayan Karmakar", "Co Lead",
        "https://chat.whatsapp.com/FinfZJZ6CQLAWgI7uqiMux",
        "Official answer keys",
    ]:
        assert expected in html


def test_homepage_lists_bank_papers_and_note_counts(client, db):
    from app.services.questions import bank_stats
    db.add_all([Note(category="DSA", title="Stacks", file_path="x.pdf"),
                Note(category="DSA", title="Queues", file_path="y.pdf"),
                Note(category="DBMS", title="Hidden", file_path="z.pdf", is_active=False)])
    db.commit()

    html = client.get("/").text
    # the exam papers live on the tests page now, not on the landing page
    assert "GATE CS 2021 (CS1)" not in html and "data-exam" not in html
    tests_html = client.get("/tests").text
    assert "GATE CS 2021 (CS1)" in tests_html and "GATE DA 2025" in tests_html
    assert "/tests/start?mode=paper&amp;year=2021&amp;paper=CS1" in tests_html or "/tests/start?mode=paper&year=2021&paper=CS1" in tests_html
    assert 'data-dur="180 min"' in tests_html and 'data-qs="65"' in tests_html
    assert "coming soon" not in html.lower()
    # the About sheet shows live counts: bank questions and 2 active notes
    assert f'data-count="{bank_stats()["total"]}"' in html
    assert 'data-count="2"' in html


def test_static_assets_served(client):
    for path in ("/static/css/app.css", "/static/js/htmx.min.js"):
        assert client.get(path).status_code == 200


def test_no_frontend_framework_in_page(client):
    html = client.get("/").text.lower()
    assert "react" not in html and "vue" not in html and "next.js" not in html


def test_exam_jsonb_array_enum_roundtrip(db):
    exam = Exam(title="Roundtrip", subject="CSE", mode=ExamMode.mixed, difficulty=Difficulty.medium,
                topic_tags=["a", "b"])
    exam.questions = [Question(order_index=1, subject="S", question_text="Q", correct_answer="B",
                               options={"A": "x", "B": "y", "C": "z", "D": "w"})]
    db.add(exam)
    db.commit()
    db.expire_all()
    got = db.get(Exam, exam.id)
    assert got.topic_tags == ["a", "b"] and got.mode is ExamMode.mixed
    assert got.questions[0].options["B"] == "y"


def test_argon2_password_hashing():
    h = hash_password("Correct-Horse-9")
    assert h.startswith("$argon2") and "Correct-Horse-9" not in h
    assert verify_password(h, "Correct-Horse-9")
    assert not verify_password(h, "wrong")
    assert not verify_password("not-a-hash", "x")


def test_navbar_links_books_and_notes(client):
    html = client.get("/").text
    assert 'href="/books"' in html and 'href="/notes"' in html


def test_home_links_only_to_pages_that_exist(client):
    html = client.get("/").text
    assert "/signup" not in html  # sign-up lives on /login
    assert client.get("/login").status_code == 200


def test_exams_redirects_to_tests(client):
    r = client.get("/exams", follow_redirects=False)
    assert r.status_code == 302 and r.headers["location"] == "/tests"
