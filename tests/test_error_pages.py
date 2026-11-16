"""Branded error pages for browsers, JSON for scripts, and the shared UI kit wiring."""
import pytest
from fastapi.testclient import TestClient

from app.core import gate
from app.main import app
from tests.conftest import TEST_TOKEN

HTML = {"accept": "text/html"}


def test_404_page_is_branded_and_not_indexed(client):
    r = client.get("/nope", headers=HTML)
    assert r.status_code == 404
    assert "Page not found" in r.text and 'name="robots" content="noindex"' in r.text
    assert "ks-art" in r.text  # the illustration


def test_json_clients_keep_json(client):
    r = client.get("/nope", headers={"accept": "application/json"})
    assert r.status_code == 404 and r.json()["detail"]


def test_htmx_requests_get_json_not_a_page(client):
    r = client.get("/nope", headers={"hx-request": "true", "accept": "text/html"})
    assert r.headers["content-type"].startswith("application/json")


def test_post_errors_stay_json(client):
    r = client.post("/tests/result", json={"bad": 1})
    assert r.headers["content-type"].startswith("application/json")


def test_unhandled_error_renders_500_page_without_leaking(client):
    async def boom():
        raise RuntimeError("secret internals")

    app.add_api_route("/__boom", boom, methods=["GET"], include_in_schema=False)
    try:
        c = TestClient(app, raise_server_exceptions=False, cookies=client.cookies)
        r = c.get("/__boom", headers=HTML)
    finally:
        app.router.routes.pop()
    assert r.status_code == 500
    assert "Something broke on our side" in r.text and "secret internals" not in r.text
    assert "data-reload" in r.text  # has a retry button


def test_gate_503_is_a_page_for_browsers(anon_client, monkeypatch):
    def down(token):
        raise OSError("offline")

    monkeypatch.setattr(gate, "lookup", down)
    anon_client.cookies.set(gate.COOKIE, TEST_TOKEN)
    r = anon_client.get("/tests", headers=HTML, follow_redirects=False)
    assert r.status_code == 503 and "catching its breath" in r.text


@pytest.mark.parametrize("path", ["/", "/login"])
def test_pages_carry_the_ui_kit(client, path):
    html = client.get(path, headers=HTML).text
    assert "ks-ui.css" in html and "ks-ui.js" in html and 'id="ks-splash"' in html


def test_offline_page_is_branded():
    r = TestClient(app).get("/offline")
    assert r.status_code == 200 and "ks-offline.js" in r.text and "Your saved progress is safe" in r.text
