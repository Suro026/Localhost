import enum
import uuid
from decimal import Decimal

from sqlalchemy import Boolean, CheckConstraint, Enum, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base, CreatedAt, UUIDPrimaryKey


class Difficulty(str, enum.Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"


class ExamMode(str, enum.Enum):
    year_wise = "year_wise"
    subject_wise = "subject_wise"
    mixed = "mixed"
    full = "full"


class Exam(UUIDPrimaryKey, CreatedAt, Base):
    __tablename__ = "exams"
    __table_args__ = (
        CheckConstraint("price >= 0", name="ck_exams_price"),
        CheckConstraint("duration_minutes > 0", name="ck_exams_duration"),
    )

    title: Mapped[str] = mapped_column(String(200))
    subject: Mapped[str] = mapped_column(String(100), index=True)
    mode: Mapped[ExamMode] = mapped_column(Enum(ExamMode, name="exam_mode"), default=ExamMode.subject_wise, index=True)
    exam_year: Mapped[int | None] = mapped_column(Integer, index=True)
    description: Mapped[str] = mapped_column(Text, default="")
    topic_tags: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    difficulty: Mapped[Difficulty] = mapped_column(Enum(Difficulty, name="difficulty"))
    is_custom_ai: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    is_paid: Mapped[bool] = mapped_column(Boolean, default=False)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0)
    duration_minutes: Mapped[int] = mapped_column(Integer, default=30)
    total_questions: Mapped[int] = mapped_column(Integer, default=0)
    created_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), index=True
    )

    questions = relationship(
        "Question", back_populates="exam", cascade="all, delete-orphan",
        order_by="Question.order_index",
    )
