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


def test_login_and_account_pages(client):
    for url, marker in (("/login", "auth-root"), ("/profile", "profile-root")):
        r = client.get(url)
        assert r.status_code == 200 and marker in r.text and "ks-cloud.js" in r.text
    assert "data-avatar" in client.get("/").text


def test_csp_allows_google_sign_in_only_on_login(client):
    h = client.get("/login").headers
    csp = h["content-security-policy"]
    assert "https://apis.google.com" in csp and "https://keystone-44f75.firebaseapp.com" in csp
    assert "unsafe-eval" not in csp and h["cross-origin-opener-policy"] == "same-origin-allow-popups"
    for path in ("/", "/tests", "/progress", "/profile"):
        other = client.get(path).headers["content-security-policy"]
        assert "apis.google.com" not in other and "firebaseapp.com" not in other and "accounts.google.com" not in other, path
        assert "https://*.googleapis.com" in other  # cloud sync for signed-in learners


def test_security_txt_only_when_contact_is_set(client, monkeypatch):
    from app.core.config import get_settings
    monkeypatch.setenv("SECURITY_CONTACT", "")
    get_settings.cache_clear()
    assert client.get("/.well-known/security.txt").status_code == 404
    monkeypatch.setenv("SECURITY_CONTACT", "mailto:security@example.com")
    get_settings.cache_clear()
    r = client.get("/.well-known/security.txt")
    assert r.status_code == 200 and "Contact: mailto:security@example.com" in r.text and "Expires: " in r.text
    monkeypatch.setenv("SECURITY_CONTACT", "javascript:alert(1)")
    get_settings.cache_clear()
    assert client.get("/.well-known/security.txt").status_code == 404
    get_settings.cache_clear()


def test_firestore_rules_lock_data_to_owner():
    from pathlib import Path
    rules = (Path(__file__).resolve().parent.parent / "firestore.rules").read_text()
    assert "request.auth.uid == uid" in rules and "allow read, write: if true" not in rules


def test_account_redirects_to_profile(client):
    r = client.get("/account", follow_redirects=False)
    assert r.status_code == 302 and r.headers["location"] == "/profile"


def test_navbar_has_both_auth_states_and_boot_script(client):
    html = client.get("/").text
    assert "ks-boot.js" in html and "ks-out" in html and "ks-in" in html and 'href="/profile"' in html


def test_google_search_console_verification_file(client):
    r = client.get("/google1589151a9c65e3a8.html")
    assert r.status_code == 200
    assert r.text == "google-site-verification: google1589151a9c65e3a8.html"


def test_sitemap_and_robots(client):
    r = client.get("/sitemap.xml")
    assert r.status_code == 200 and r.headers["content-type"].startswith("application/xml")
    assert "<loc>https://keystonee.vercel.app/</loc>" in r.text and "/tests" not in r.text and "/login" not in r.text  # only public pages
    assert "<loc>https://keystonee.vercel.app/books</loc>" in r.text and "<loc>https://keystonee.vercel.app/notes</loc>" in r.text
    t = client.get("/robots.txt")
    assert t.status_code == 200 and "Sitemap: https://keystonee.vercel.app/sitemap.xml" in t.text
    assert "Disallow: /login" in t.text
