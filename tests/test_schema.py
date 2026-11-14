"""Checks the real, Alembic-migrated PostgreSQL schema (read-only)."""
import pytest
from sqlalchemy import inspect, text

from app.core.database import Base

EXPECTED_TABLES = {
    "users", "user_sessions", "exams", "questions", "attempts", "attempt_answers",
    "notes", "payments", "violations", "alembic_version",
}


@pytest.fixture(scope="module")
def insp(real_engine):
    return inspect(real_engine)


def test_all_tables_exist(insp):
    assert EXPECTED_TABLES <= set(insp.get_table_names())


def test_migration_matches_models(real_engine):
    from alembic.autogenerate import compare_metadata
    from alembic.migration import MigrationContext

    with real_engine.connect() as conn:
        diff = compare_metadata(MigrationContext.configure(conn), Base.metadata)
    assert diff == []


@pytest.mark.parametrize("table", sorted(EXPECTED_TABLES - {"alembic_version", "user_sessions"}))
def test_uuid_primary_keys(insp, table):
    cols = {c["name"]: c for c in insp.get_columns(table)}
    assert str(cols["id"]["type"]) == "UUID"
    assert insp.get_pk_constraint(table)["constrained_columns"] == ["id"]


def test_jsonb_and_array_columns(insp):
    options = next(c for c in insp.get_columns("questions") if c["name"] == "options")
    tags = next(c for c in insp.get_columns("exams") if c["name"] == "topic_tags")
    assert str(options["type"]) == "JSONB"
    assert str(tags["type"]).startswith("ARRAY")


def test_enums(real_engine):
    expected = {
        "user_role": ["student", "admin"],
        "exam_mode": ["year_wise", "subject_wise", "mixed", "full"],
        "difficulty": ["easy", "medium", "hard"],
        "attempt_status": ["in_progress", "submitted", "terminated", "expired"],
        "payment_status": ["pending", "succeeded", "failed", "refunded"],
    }
    with real_engine.connect() as conn:
        for name, labels in expected.items():
            rows = conn.execute(
                text("SELECT e.enumlabel FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid "
                     "JOIN pg_namespace n ON n.oid = t.typnamespace "
                     "WHERE t.typname = :n AND n.nspname = 'public' ORDER BY e.enumsortorder"),
                {"n": name},
            ).scalars().all()
            assert rows == labels, name


@pytest.mark.parametrize("table,column,target", [
    ("exams", "created_by", "users"), ("questions", "exam_id", "exams"),
    ("attempts", "user_id", "users"), ("attempts", "exam_id", "exams"),
    ("attempt_answers", "attempt_id", "attempts"), ("attempt_answers", "question_id", "questions"),
    ("payments", "user_id", "users"), ("payments", "exam_id", "exams"),
    ("violations", "attempt_id", "attempts"), ("user_sessions", "user_id", "users"),
])
def test_foreign_keys(insp, table, column, target):
    fks = [fk for fk in insp.get_foreign_keys(table) if fk["constrained_columns"] == [column]]
    assert fks and fks[0]["referred_table"] == target


@pytest.mark.parametrize("table,column", [
    ("users", "username"), ("users", "email"), ("users", "university_roll"),
    ("exams", "subject"), ("exams", "mode"), ("exams", "exam_year"), ("exams", "is_active"),
    ("questions", "exam_id"), ("questions", "subject"), ("attempts", "user_id"),
    ("attempts", "status"), ("attempt_answers", "attempt_id"), ("notes", "category"),
    ("payments", "user_id"), ("violations", "attempt_id"), ("user_sessions", "expires_at"),
])
def test_indexed_columns(insp, table, column):
    indexed = [i["column_names"] for i in insp.get_indexes(table)]
    uniques = [u["column_names"] for u in insp.get_unique_constraints(table)]
    assert [column] in indexed + uniques


@pytest.mark.parametrize("table,column", [
    ("users", "username"), ("users", "email"), ("users", "university_roll"),
])
def test_unique_identity_columns(insp, table, column):
    unique_idx = [i["column_names"] for i in insp.get_indexes(table) if i["unique"]]
    unique_con = [u["column_names"] for u in insp.get_unique_constraints(table)]
    assert [column] in unique_idx + unique_con


def test_check_constraints(insp):
    assert any("year" in c["sqltext"] for c in insp.get_check_constraints("users"))
    assert any("price" in c["sqltext"] for c in insp.get_check_constraints("exams"))
