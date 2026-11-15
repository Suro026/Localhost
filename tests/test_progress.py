import json
import random
import re
from urllib.parse import quote

from app.services import testing


def _a_topic() -> str:
    q = next(q for q in testing._pool() if q.topic)
    return f"{q.subject}|{q.topic}"


def test_build_weak_uses_only_requested_topics():
    key = _a_topic()
    spec = testing.build_weak([key], 5, random.Random(1))
    assert spec and spec.mode == "weak" and 1 <= len(spec.ids) <= 5
    by_id = {q.id: q for q in testing._pool()}
    assert all(f"{by_id[i].subject}|{by_id[i].topic}" == key for i in spec.ids)


def test_build_weak_rejects_unknown_and_malformed():
    assert testing.build_weak(["nope", "No|Such topic", ""], 5) is None
    assert testing.build_weak([], 5) is None


def test_weak_start_page_and_empty_fallback(client):
    r = client.get("/tests/start?mode=weak&t=" + quote(_a_topic()))
    assert r.status_code == 200 and 'id="test-data"' in r.text
    r2 = client.get("/tests/start?mode=weak&t=zzz")
    assert 'id="test-data"' not in r2.text


def test_progress_and_study_pages(client):
    for url, marker in (("/progress", "progress-root"), ("/study", "study-root")):
        r = client.get(url)
        assert r.status_code == 200 and marker in r.text
    assert "ks.js" in client.get("/progress").text


def test_study_subjects_attribute_is_valid_json(client):
    import html
    m = re.search(r'data-subjects="([^"]*)"', client.get("/study").text)
    assert m
    subjects = json.loads(html.unescape(m.group(1)))
    assert subjects and all(isinstance(s, str) for s in subjects)


def test_navbar_links(client):
    t = client.get("/").text
    assert 'href="/progress"' in t and 'href="/study"' in t


def test_pwa_files_served(client):
    m = client.get("/manifest.webmanifest")
    assert m.status_code == 200 and json.loads(m.text)["display"] == "standalone"
    sw = client.get("/sw.js")
    assert sw.status_code == 200 and sw.headers["service-worker-allowed"] == "/"
    assert client.get("/offline").status_code == 200
    for icon in ("icon-192.png", "icon-512.png", "icon-maskable-512.png"):
        assert client.get(f"/static/img/{icon}").status_code == 200
    assert 'rel="manifest"' in client.get("/").text


def test_navbar_marks_current_page(client):
    assert 'aria-current="page"' in client.get("/progress").text
