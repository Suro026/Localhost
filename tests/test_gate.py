import pytest

from app.core import gate
from tests.conftest import TEST_TOKEN

GATED = ["/tests", "/tests/start?mode=mock", "/books", "/notes", "/progress", "/study", "/profile", "/exams", "/download/x", "/read/x", "/nope"]
PUBLIC = ["/", "/login", "/offline", "/manifest.webmanifest", "/sitemap.xml", "/robots.txt", "/sw.js", "/google1589151a9c65e3a8.html", "/static/css/app.css"]


@pytest.mark.parametrize("path", GATED)
def test_signed_out_visitors_are_sent_to_login(anon_client, path):
    r = anon_client.get(path, follow_redirects=False)
    assert r.status_code == 302 and r.headers["location"].startswith("/login?next=/")


@pytest.mark.parametrize("path", PUBLIC)
def test_public_pages_stay_open(anon_client, path):
    assert anon_client.get(path, follow_redirects=False).status_code == 200


def test_next_keeps_the_query(anon_client):
    r = anon_client.get("/tests/start?mode=subject&subject=Algorithms", follow_redirects=False)
    assert r.headers["location"] == "/login?next=/tests/start%3Fmode%3Dsubject%26subject%3DAlgorithms"


def test_post_without_login_is_401_not_a_redirect(anon_client):
    r = anon_client.post("/tests/result", data={}, follow_redirects=False)
    assert r.status_code == 401


def test_forged_or_junk_cookie_is_refused(anon_client):
    for bad in ["junk", "a.b.c", "x" * 5000, "test.eyJleHAiOjF9.sig"]:  # last one is expired
        anon_client.cookies.set(gate.COOKIE, bad)
        assert anon_client.get("/tests", follow_redirects=False).status_code == 302


def test_token_google_rejects_is_refused(anon_client):
    anon_client.cookies.set(gate.COOKIE, "test.eyJleHAiOjk5OTk5OTk5OTl9.other")
    assert anon_client.get("/tests", follow_redirects=False).status_code == 302


def test_signed_in_learner_gets_the_page_uncached(client):
    r = client.get("/tests")
    assert r.status_code == 200 and "no-store" in r.headers["cache-control"]


def test_session_endpoint_sets_httponly_cookie(anon_client):
    r = anon_client.post("/auth/session", json={"token": TEST_TOKEN})
    assert r.status_code == 200
    sc = r.headers["set-cookie"].lower()
    assert gate.COOKIE in sc and "httponly" in sc and "samesite=lax" in sc
    assert anon_client.get("/tests").status_code == 200


def test_session_endpoint_rejects_bad_tokens(anon_client):
    assert anon_client.post("/auth/session", json={"token": "nope"}).status_code == 401
    assert anon_client.post("/auth/session", json={}).status_code == 401
    assert anon_client.post("/auth/session", content=b"not json").status_code == 401


def test_logout_clears_the_cookie(client):
    r = client.post("/auth/logout")
    assert r.status_code == 200 and gate.COOKIE in r.headers["set-cookie"]
    client.cookies.clear()
    assert client.get("/tests", follow_redirects=False).status_code == 302


def test_google_unreachable_is_503_not_open(anon_client, monkeypatch):
    def boom(token):
        raise OSError("offline")
    monkeypatch.setattr(gate, "lookup", boom)
    anon_client.cookies.set(gate.COOKIE, TEST_TOKEN)
    assert anon_client.get("/tests", follow_redirects=False).status_code == 503


@pytest.mark.parametrize("value,expected", [("/progress", "/progress"), ("//evil.com", "/tests"), ("https://evil.com", "/tests"), ("/" + chr(92) + "evil", "/tests"), (None, "/tests")])
def test_safe_next(value, expected):
    assert gate.safe_next(value) == expected


def test_landing_page_shows_official_links_to_signed_out_visitors(anon_client):
    html = anon_client.get("/").text
    assert "Official GATE website" in html and "Official GATE WhatsApp channel" in html
