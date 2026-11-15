from app.models import Difficulty, Exam, ExamMode, Note, Question
from app.core.security import hash_password, verify_password


def test_homepage_static_content(client):
    r = client.get("/")
    assert r.status_code == 200
    html = r.text
    for expected in [
        "AI-Powered Exam Preparation", "Free online mock tests", "Start learning", "All exams", "How it works",
        "Select topics", "AI builds the exam", "Take it securely", "Analyse results",
        "Surajit Sadhukhan", "Sayan Karmakar", "Co Lead",
        "https://chat.whatsapp.com/FinfZJZ6CQLAWgI7uqiMux",
        "Mock tests are coming soon",
    ]:
        assert expected in html


def test_homepage_lists_real_exams_and_note_categories(client, db):
    exam = Exam(title="GATE Sample Paper", subject="CSE", mode=ExamMode.year_wise, exam_year=2024,
                difficulty=Difficulty.hard, topic_tags=["Stack", "Queue"], duration_minutes=90,
                total_questions=1, is_paid=False, price=0, is_active=True)
    exam.questions = [Question(order_index=1, subject="DSA", question_text="Q?", options={"A": "1"},
                               correct_answer="A")]
    hidden = Exam(title="Inactive Paper", subject="CSE", mode=ExamMode.full,
                  difficulty=Difficulty.easy, is_active=False)
    db.add_all([exam, hidden, Note(category="DSA", title="Stacks", file_path="x.pdf"),
                Note(category="DSA", title="Queues", file_path="y.pdf"),
                Note(category="DBMS", title="Hidden", file_path="z.pdf", is_active=False)])
    db.commit()

    html = client.get("/").text
    assert "GATE Sample Paper" in html and "Stack, Queue" in html and "90 min" in html
    assert 'data-level="Hard"' in html
    assert "Inactive Paper" not in html
    # the About sheet shows live counts: 1 paper, 1 question, 2 active notes
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


def test_no_login_or_signup_links_on_home(client):
    html = client.get("/").text
    assert "/login" not in html and "/signup" not in html


def test_exams_redirects_to_tests(client):
    r = client.get("/exams", follow_redirects=False)
    assert r.status_code == 302 and r.headers["location"] == "/tests"
