import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services import library

BOOK_ID = "1W2WkAsCBRs8WAV4eaXQZOyIeENwEywIn"


@pytest.fixture()
def client() -> TestClient:
    library.load_library.cache_clear()
    return TestClient(app, follow_redirects=False)


@pytest.fixture()
def known():
    return library.subjects("note")[0][1][0]


def test_notes_page_lists_subjects_and_files(client, known):
    r = client.get("/notes")
    assert r.status_code == 200
    assert library.subjects("note")[0][0] in r.text
    assert f"/read/{known.id}" in r.text and f"/download/{known.id}" in r.text


def test_books_page_lists_books(client):
    r = client.get("/books")
    assert r.status_code == 200
    assert f"/read/{BOOK_ID}" in r.text
    assert "No files yet" not in r.text
    assert client.get(f"/read/{BOOK_ID}").status_code == 200


def test_viewer_embeds_drive_preview(client, known):
    r = client.get(f"/read/{known.id}")
    assert r.status_code == 200
    assert f"https://drive.google.com/file/d/{known.id}/preview" in r.text


def test_download_redirects_to_drive(client, known):
    r = client.get(f"/download/{known.id}")
    assert r.status_code == 302
    assert r.headers["location"] == f"https://drive.google.com/uc?export=download&id={known.id}"


@pytest.mark.parametrize("bad", ["does-not-exist", "..%2Fx", "%3Cscript%3Ealert(1)%3C%2Fscript%3E", "a'b"])
def test_unknown_or_held_ids_are_404(client, bad):
    for path in ("/read/", "/download/"):
        r = client.get(path + bad)
        assert r.status_code == 404
        assert "<script>alert" not in r.text


def test_empty_catalog_renders_empty_state(client, monkeypatch):
    monkeypatch.setattr(library, "load_library", lambda: [])
    r = client.get("/notes")
    assert r.status_code == 200 and "No files yet" in r.text


def test_titles_are_escaped(client, monkeypatch):
    evil = library.LibraryFile(id="x1", title='A & <b>"B"</b>', size_mb=1.0, subject="S", group=None, kind="note")
    monkeypatch.setattr(library, "load_library", lambda: [evil])
    r = client.get("/notes")
    assert "<b>" not in r.text and "A &amp; &lt;b&gt;" in r.text


def test_books_page_shows_disclaimer_and_notes_page_does_not(client):
    assert "Disclaimer" in client.get("/books").text
    assert "collected from Google" in client.get("/books").text
    assert "Disclaimer" not in client.get("/notes").text
