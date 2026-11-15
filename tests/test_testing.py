import random

import pytest

from app.services import testing as T
from app.services.questions import Question


def mk(n, *, year=2025, paper="CS1", section="CS", marks=1, qtype="MCQ", subject="Algorithms", answer=("B",),
       amin=None, amax=None, mta=False):
    opts = ("a", "b", "c", "d") if qtype != "NAT" else ()
    return Question(id=f"{year}-{paper}-{n:02d}", year=year, paper=paper, number=n, section=section, marks=marks,
                    qtype=qtype, subject=subject, topic="t", text="Q", options=opts, figure=None,
                    answer=tuple(answer) if qtype != "NAT" else (), answer_min=amin, answer_max=amax, mta=mta)


@pytest.fixture
def use(monkeypatch):
    def _use(qs):
        monkeypatch.setattr(T, "load_questions", lambda: qs)
        monkeypatch.setattr(T, "get_question", lambda qid: {q.id: q for q in qs}.get(qid))
    return _use


def test_mcq_1_mark_wrong_is_minus_one_third(use):
    use([mk(1, marks=1)])
    r = T.score(["2025-CS1-01"], {"2025-CS1-01": ["C"]})
    assert r.total == pytest.approx(-1 / 3, abs=0.01) and r.wrong == 1


def test_mcq_2_mark_wrong_is_minus_two_thirds(use):
    use([mk(1, marks=2)])
    assert T.score(["2025-CS1-01"], {"2025-CS1-01": "C"}).total == pytest.approx(-2 / 3, abs=0.01)


def test_mcq_correct_and_skipped(use):
    use([mk(1, marks=2), mk(2, marks=1)])
    r = T.score(["2025-CS1-01", "2025-CS1-02"], {"2025-CS1-01": ["B"]})
    assert r.total == 2 and r.correct == 1 and r.skipped == 1 and r.max_marks == 3


def test_msq_exact_match_full_marks_else_zero_no_penalty(use):
    use([mk(1, qtype="MSQ", marks=2, answer=("A", "C"))])
    ok = T.score(["2025-CS1-01"], {"2025-CS1-01": ["C", "A"]})
    missing = T.score(["2025-CS1-01"], {"2025-CS1-01": ["A"]})
    extra = T.score(["2025-CS1-01"], {"2025-CS1-01": ["A", "B", "C"]})
    assert ok.total == 2 and missing.total == 0 and extra.total == 0 and extra.wrong == 1


def test_nat_inside_range_correct_outside_zero(use):
    use([mk(1, qtype="NAT", amin=1.9, amax=2.1)])
    assert T.score(["2025-CS1-01"], {"2025-CS1-01": "2"}).total == 1
    assert T.score(["2025-CS1-01"], {"2025-CS1-01": "2.1"}).total == 1
    assert T.score(["2025-CS1-01"], {"2025-CS1-01": "2.2"}).total == 0


def test_nat_non_numeric_is_wrong_zero_no_crash(use):
    use([mk(1, qtype="NAT", amin=1, amax=1)])
    for bad in ("abc", "1e999999", "nan", "", "--1"):
        r = T.score(["2025-CS1-01"], {"2025-CS1-01": bad})
        assert r.total == 0


def test_mta_gives_full_marks_even_if_skipped(use):
    use([mk(1, marks=2, answer=(), mta=True)])
    r = T.score(["2025-CS1-01"], {})
    assert r.total == 2 and r.correct == 1


def test_unknown_duplicate_and_too_many_ids_rejected(use):
    use([mk(1)])
    with pytest.raises(ValueError):
        T.score(["nope"], {})
    with pytest.raises(ValueError):
        T.score(["2025-CS1-01", "2025-CS1-01"], {})
    with pytest.raises(ValueError):
        T.score([f"x{i}" for i in range(101)], {})
    with pytest.raises(ValueError):
        T.score(["2025-CS1-01"], {"2025-CS1-99": ["A"]})  # answer for a question not in the test


def test_per_subject_breakdown(use):
    use([mk(1, subject="Algorithms"), mk(2, subject="Databases", marks=2)])
    r = T.score(["2025-CS1-01", "2025-CS1-02"], {"2025-CS1-01": ["B"], "2025-CS1-02": ["B"]})
    assert r.per_subject == {"Algorithms": (1, 1), "Databases": (2, 2)}


def big_bank():
    qs, n = [], 1
    for i in range(10):  # GA
        qs.append(mk(n, section="GA", marks=1 if i < 5 else 2, subject="General Aptitude")); n += 1
    subj = list(T.SUBJECTS[1:])
    for i in range(80):
        qs.append(mk(n, marks=1 if i < 40 else 2, subject=subj[i % len(subj)])); n += 1
    return qs


def test_mock_has_gate_pattern_when_bank_is_large(use):
    use(big_bank())
    s = T.build_mock(random.Random(1))
    qs = [T.get_question(i) for i in s.ids]
    assert len(s.ids) == 65 and s.minutes == 180 and s.mode == "mock"
    assert sum(q.marks for q in qs) == 100
    assert sum(1 for q in qs if q.section == "GA") == 10
    assert len(set(s.ids)) == 65


def test_mock_with_small_bank_uses_everything(use):
    use([mk(1), mk(2), mk(3, marks=2)])
    s = T.build_mock(random.Random(1))
    assert len(s.ids) == 3 and "partial" in s.title.lower()


def test_mixed_zero_subjects_returns_none(use):
    use(big_bank())
    assert T.build_mixed([], 10) is None
    assert T.build_mixed(["Not A Subject"], 10) is None


def test_mixed_count_clamped(use):
    use(big_bank())
    s = T.build_mixed(["Algorithms"], 500, random.Random(1))
    assert 0 < len(s.ids) < 500
    assert len(T.build_mixed(["Algorithms"], 0, random.Random(1)).ids) == 1


def test_subject_builder_filters_by_subject(use):
    use(big_bank())
    s = T.build_subject("Databases", 5, random.Random(2))
    assert s.mode == "subject" and len(s.ids) == 5
    assert all(T.get_question(i).subject == "Databases" for i in s.ids)
    assert T.build_subject("Nope") is None


def test_paper_returns_all_scorable_in_order(use):
    use([mk(2), mk(1), mk(3, year=2024)])
    s = T.build_paper(2025, "CS1")
    assert s.ids == ("2025-CS1-01", "2025-CS1-02") and s.mode == "paper"
    assert T.build_paper(1999, "CS1") is None


def test_msq_alternate_answer_set_is_accepted(use):
    import dataclasses
    q = dataclasses.replace(mk(1, qtype="MSQ", answer=("A", "C", "D")), alt_answers=(("C", "D"),))
    use([q])
    assert T.score([q.id], {q.id: ["D", "C"]}).correct == 1
    assert T.score([q.id], {q.id: ["A", "C", "D"]}).correct == 1
    assert T.score([q.id], {q.id: ["C"]}).wrong == 1


def test_nat_alternate_range_is_accepted(use):
    import dataclasses
    q = dataclasses.replace(mk(1, qtype="NAT", amin=2, amax=2), alt_ranges=((4.0, 4.0),))
    use([q])
    assert T.score([q.id], {q.id: "4"}).correct == 1
    assert T.score([q.id], {q.id: "2"}).correct == 1
    assert T.score([q.id], {q.id: "3"}).wrong == 1


def test_mock_excludes_data_science_paper_questions_outside_ga(use):
    qs = [mk(i, paper="CS1", section="GA", marks=1) for i in range(1, 6)]
    qs += [mk(i, paper="DA", section="CS", marks=1, subject="Machine Learning") for i in range(1, 30)]
    qs += [mk(i, paper="CS1", section="CS", marks=1) for i in range(40, 70)]
    use(qs)
    spec = T.build_mock()
    assert not any(i.startswith("2025-DA-") for i in spec.ids)


def test_paper_title_names_the_exam(use):
    use([mk(1, paper="DA", section="CS"), mk(1, paper="CS1", section="CS")])
    assert T.build_paper(2025, "DA").title == "GATE DA 2025"
    assert T.build_paper(2025, "CS1").title == "GATE CS 2025 (CS1)"
