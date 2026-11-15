import re

import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


@pytest.mark.parametrize("path", ["/", "/books", "/notes", "/exams", "/tests", "/tests/start?mode=mock", "/nope"])
def test_security_headers_present(path):
    r = client.get(path)
    h = r.headers
    assert h["x-content-type-options"] == "nosniff"
    assert h["referrer-policy"]
    assert "frame-ancestors 'none'" in h["content-security-policy"]
    assert "object-src 'none'" in h["content-security-policy"]
    assert "base-uri 'self'" in h["content-security-policy"]
    assert "camera=()" in h["permissions-policy"]
    assert h["x-frame-options"] == "DENY"


def test_csp_has_no_unsafe_inline_script():
    csp = client.get("/").headers["content-security-policy"]
    script = [d for d in csp.split(";") if d.strip().startswith("script-src")][0]
    assert "unsafe-inline" not in script and "unsafe-eval" not in script


def test_viewer_may_frame_drive_but_nothing_else():
    csp = client.get("/").headers["content-security-policy"]
    assert "frame-src https://drive.google.com" in csp


def test_no_inline_event_handlers_in_pages():
    for path in ["/", "/books", "/notes", "/tests", "/tests/start?mode=mock"]:
        assert not re.search(r"\son\w+=", client.get(path).text), path


def test_inline_script_is_hash_allowed():
    html = client.get("/").text
    csp = client.get("/").headers["content-security-policy"]
    assert "sha256-" in csp
    assert 'classList.add("js")' in html


def test_openapi_not_exposed():
    assert client.get("/openapi.json").status_code == 404


def test_head_requests_ok():
    assert client.head("/").status_code == 200
    assert client.head("/books").status_code == 200


def test_404_is_html_page():
    r = client.get("/nope")
    assert r.status_code == 404
    assert "text/html" in r.headers["content-type"]
    assert "Page not found" in r.text


def test_static_404_is_not_leaky():
    r = client.get("/static/../app/main.py")
    assert r.status_code in (400, 404)
    assert "FastAPI" not in r.text


def test_read_unknown_id_html_404():
    assert client.get("/read/zzz").status_code == 404


def test_result_post_has_security_headers_and_get_is_405():
    r = client.post("/tests/result", json={"ids": ["2025-CS1-01"], "answers": {}})
    assert r.status_code == 200
    assert r.headers["x-frame-options"] == "DENY" and "frame-ancestors 'none'" in r.headers["content-security-policy"]
    bad = client.post("/tests/result", json={"ids": []})
    assert bad.status_code == 400 and bad.headers["x-content-type-options"] == "nosniff"
    assert client.get("/tests/result").status_code == 405


def test_test_runner_page_has_no_answers_leaked():
    html = client.get("/tests/start?mode=paper&year=2025&paper=CS1").text
    assert '"answer' not in html and '"mta"' not in html
