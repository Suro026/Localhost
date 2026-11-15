import json

import pytest

from app.services import questions as qs


def mcq(number=1, **kw):
    d = {"year": 2025, "paper": "CS1", "number": number, "section": "CS", "marks": 1, "type": "MCQ",
         "subject": "Algorithms", "topic": "Sorting", "text": "Q?", "options": ["a", "b", "c", "d"],
         "figure": None, "answer": ["B"], "answer_min": None, "answer_max": None, "mta": False}
    d.update(kw)
    return d


@pytest.fixture
def bank(tmp_path, monkeypatch):
    monkeypatch.setattr(qs, "DATA_DIR", tmp_path)
    qs.load_questions.cache_clear()
    yield tmp_path
    qs.load_questions.cache_clear()


def write(bank, name, rows):
    (bank / name).write_text(json.dumps(rows), encoding="utf-8")


def test_loads_valid_question(bank):
    write(bank, "2025-CS1.json", [mcq(1), mcq(2, type="MSQ", answer=["A", "C"])])
    got = qs.load_questions()
    assert [q.id for q in got] == ["2025-CS1-01", "2025-CS1-02"]
    assert got[1].answer == ("A", "C") and got[0].options == ("a", "b", "c", "d")


def test_invalid_entries_dropped(bank):
    write(bank, "x.json", [
        mcq(1, options=["a", "b", "c"]),            # MCQ with 3 options
        mcq(2, type="NAT", options=[], answer=[]),   # NAT without a range
        mcq(3, type="WEIRD"),
        mcq(4, marks=3),
        mcq(5),
    ])
    assert [q.number for q in qs.load_questions()] == [5]


def test_corrupt_json_returns_empty(bank):
    (bank / "bad.json").write_text("{", encoding="utf-8")
    assert qs.load_questions() == []


def test_get_question_unknown_is_none(bank):
    write(bank, "a.json", [mcq(1)])
    assert qs.get_question("nope") is None
    assert qs.get_question("../x") is None
    assert qs.get_question("2025-CS1-01").number == 1


def test_scorable_excludes_missing_figure_and_missing_answer(bank, monkeypatch):
    write(bank, "a.json", [mcq(1, figure="img/q/missing.png"), mcq(2, answer=[]), mcq(3)])
    by = {q.number: q for q in qs.load_questions()}
    assert not qs.scorable(by[1]) and not qs.scorable(by[2]) and qs.scorable(by[3])


def test_nat_with_range_is_scorable(bank):
    write(bank, "a.json", [mcq(1, type="NAT", options=[], answer=[], answer_min=2.0, answer_max=2.5)])
    assert qs.scorable(qs.load_questions()[0])


def test_mta_without_answer_is_scorable(bank):
    write(bank, "a.json", [mcq(1, answer=[], mta=True)])
    assert qs.scorable(qs.load_questions()[0])


def test_duplicate_ids_keep_first(bank):
    write(bank, "a.json", [mcq(1, text="first")])
    write(bank, "b.json", [mcq(1, text="second")])
    got = qs.load_questions()
    assert len(got) == 1 and got[0].text == "first"


def test_parse_alternate_answers():
    from app.services.questions import _parse
    base = dict(year=2023, paper="CS", number=1, section="CS", marks=1, subject="s", text="t")
    q = _parse(dict(base, type="MSQ", options=list("abcd"), answer=["A", "C", "D"], answer_alt=[["C", "D"]]))
    assert q.alt_answers == (("C", "D"),)
    n = _parse(dict(base, type="NAT", answer_min=2, answer_max=2, answer_alt=[[4, 4]]))
    assert n.alt_ranges == ((4.0, 4.0),)
    with pytest.raises(ValueError):
        _parse(dict(base, type="NAT", answer_min=2, answer_max=2, answer_alt=[[5, 4]]))
