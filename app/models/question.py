import uuid

from sqlalchemy import ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base, UUIDPrimaryKey


class Question(UUIDPrimaryKey, Base):
    __tablename__ = "questions"
    __table_args__ = (UniqueConstraint("exam_id", "order_index", name="uq_question_order"),)

    exam_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("exams.id", ondelete="CASCADE"), index=True
    )
    subject: Mapped[str] = mapped_column(String(100), default="", index=True)
    topic: Mapped[str] = mapped_column(String(100), default="", index=True)
    year: Mapped[int | None] = mapped_column(Integer, index=True)
    source: Mapped[str] = mapped_column(String(200), default="")
    question_text: Mapped[str] = mapped_column(Text)
    question_type: Mapped[str] = mapped_column(String(20), default="mcq")  # mcq | msq | nat
    options: Mapped[dict] = mapped_column(JSONB, default=dict)
    correct_answer: Mapped[str] = mapped_column(String(100))
    marks: Mapped[int] = mapped_column(Integer, default=1)
    explanation: Mapped[str] = mapped_column(Text, default="")
    order_index: Mapped[int] = mapped_column(Integer)

    exam = relationship("Exam", back_populates="questions")
