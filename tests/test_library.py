import json

import pytest

from app.services import library


@pytest.fixture(autouse=True)
def _fresh_cache():
    library.load_library.cache_clear()
    yield
    library.load_library.cache_clear()


def test_catalog_excludes_ramakrishnan():
    raw = library.DATA_FILE.read_text(encoding="utf-8")
    assert "Ramakrishnan" not in raw


def test_published_notes_exist_and_books_are_held():
    files = library.load_library()
    assert files and all(f.kind == "note" for f in files)
    assert library.subjects("book") == []
    assert not any("compiled book" in f.title for f in files)


def test_get_file_unknown_returns_none():
    assert library.get_file("nope") is None
    assert library.get_file("../x") is None
    assert library.get_file("") is None


def test_get_file_known_returns_file():
    first = library.load_library()[0]
    assert library.get_file(first.id) == first


def test_subjects_sorted_and_no_empty():
    groups = library.subjects("note")
    names = [name for name, _ in groups]
    assert names == sorted(names)
    assert all(files for _, files in groups)


def test_corrupt_json_returns_empty(tmp_path, monkeypatch):
    bad = tmp_path / "library.json"
    bad.write_text("{", encoding="utf-8")
    monkeypatch.setattr(library, "DATA_FILE", bad)
    library.load_library.cache_clear()
    assert library.load_library() == []


def test_missing_json_returns_empty(tmp_path, monkeypatch):
    monkeypatch.setattr(library, "DATA_FILE", tmp_path / "nope.json")
    library.load_library.cache_clear()
    assert library.load_library() == []


def test_unpublished_entries_are_hidden(tmp_path, monkeypatch):
    f = tmp_path / "library.json"
    f.write_text(json.dumps([
        {"id": "a1", "title": "Shown", "size_mb": 1.0, "subject": "S", "group": None, "kind": "note", "ext": "pdf", "published": True},
        {"id": "b2", "title": "Hidden", "size_mb": 1.0, "subject": "S", "group": None, "kind": "note", "ext": "pdf", "published": False},
    ]), encoding="utf-8")
    monkeypatch.setattr(library, "DATA_FILE", f)
    library.load_library.cache_clear()
    assert [x.id for x in library.load_library()] == ["a1"]
    assert library.get_file("b2") is None
