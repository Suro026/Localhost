import uuid
from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker

import app.models  # noqa: F401
from app.core.config import get_settings
from app.core.database import Base, get_db
from app.core import gate
from app.main import app

TEST_TOKEN = "test.eyJleHAiOjk5OTk5OTk5OTl9.sig"  # payload {"exp": 9999999999}; gate.lookup is faked below


@pytest.fixture(autouse=True)
def fake_google(monkeypatch):
    monkeypatch.setattr(gate, "lookup", lambda token: "uid-1" if token == TEST_TOKEN else None)
    gate._cache.clear()
    gate._hits.clear()


@pytest.fixture(scope="session")
def real_engine() -> Engine:
    """Engine on the real database; used read-only for migrated-schema checks."""
    return create_engine(get_settings().database_url, pool_pre_ping=True)


@pytest.fixture(scope="session")
def scratch_engine(real_engine: Engine) -> Iterator[Engine]:
    """Throwaway schema so tests never touch real data. Dropped at session end."""
    name = f"test_{uuid.uuid4().hex[:10]}"
    with real_engine.begin() as conn:
        conn.execute(text(f'CREATE SCHEMA "{name}"'))
    engine = create_engine(get_settings().database_url, connect_args={"options": f"-csearch_path={name}"})
    Base.metadata.create_all(engine)
    yield engine
    engine.dispose()
    with real_engine.begin() as conn:
        conn.execute(text(f'DROP SCHEMA "{name}" CASCADE'))


@pytest.fixture()
def db(scratch_engine: Engine) -> Iterator[Session]:
    session = sessionmaker(bind=scratch_engine, expire_on_commit=False)()
    yield session
    session.rollback()
    for table in reversed(Base.metadata.sorted_tables):
        session.execute(table.delete())
    session.commit()
    session.close()


@pytest.fixture()
def client(db: Session) -> Iterator[TestClient]:
    app.dependency_overrides[get_db] = lambda: db
    c = TestClient(app)
    c.cookies.set(gate.CONSENT_COOKIE, gate.LEGAL_VERSION)
    c.cookies.set(gate.COOKIE, TEST_TOKEN)  # a signed-in learner; use anon_client for the logged-out view
    yield c
    app.dependency_overrides.clear()


@pytest.fixture()
def anon_client() -> TestClient:
    return TestClient(app)
