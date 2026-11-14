"""Validated import format for question papers supplied by the site owner."""
import re

from pydantic import BaseModel, Field, field_validator, model_validator

from app.models.exam import Difficulty, ExamMode

_OPTION_KEYS = {"A", "B", "C", "D"}


class PaperQuestion(BaseModel):
    question: str = Field(min_length=3)
    subject: str = Field(min_length=1, max_length=100)
    topic: str = Field(default="", max_length=100)
    question_type: str = "mcq"  # mcq | msq | nat
    options: dict[str, str] = Field(default_factory=dict)
    answer: str = Field(min_length=1, max_length=100)
    marks: int = Field(default=1, ge=1, le=10)
    explanation: str = ""

    @field_validator("question_type")
    @classmethod
    def _type(cls, v: str) -> str:
        v = v.lower()
        if v not in {"mcq", "msq", "nat"}:
            raise ValueError("question_type must be mcq, msq or nat")
        return v

    @model_validator(mode="after")
    def _consistent(self) -> "PaperQuestion":
        if self.question_type in {"mcq", "msq"}:
            if set(self.options) != _OPTION_KEYS or not all(v.strip() for v in self.options.values()):
                raise ValueError("mcq/msq need non-empty options A, B, C and D")
            picked = {p.strip().upper() for p in self.answer.split(",") if p.strip()}
            if not picked or not picked <= _OPTION_KEYS:
                raise ValueError("answer must use option letters A-D")
            if self.question_type == "mcq" and len(picked) != 1:
                raise ValueError("mcq must have exactly one correct option")
            self.answer = ",".join(sorted(picked))
        else:
            try:
                float(self.answer)
            except ValueError as exc:
                raise ValueError("nat answer must be a number") from exc
        return self


class PaperExam(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    subject: str = Field(min_length=1, max_length=100)
    mode: ExamMode = ExamMode.year_wise
    year: int | None = Field(default=None, ge=1990, le=2100)
    difficulty: Difficulty = Difficulty.medium
    duration_minutes: int = Field(default=180, gt=0, le=600)
    description: str = ""
    source: str = Field(min_length=3, max_length=200, description="Where the paper comes from")

    @model_validator(mode="after")
    def _year_needed(self) -> "PaperExam":
        if self.mode == ExamMode.year_wise and self.year is None:
            raise ValueError("year_wise exams need a year")
        return self


class PaperFile(BaseModel):
    exam: PaperExam
    questions: list[PaperQuestion] = Field(min_length=1)


def slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
