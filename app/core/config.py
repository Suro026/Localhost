from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Keystone"
    site_url: str = "https://keystonee.vercel.app"  # canonical origin used in sitemap.xml and robots.txt
    app_env: str = "development"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/localhost"
    secret_key: str = ""
    session_cookie_secure: bool = False
    session_ttl_hours: int = 12

    ai_provider: str = "openai"
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.1"

    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""

    security_contact: str = ""  # mailto: or https: address for /.well-known/security.txt; the file is served only when set
    linkedin_surajit: str = ""
    linkedin_sayan: str = ""
    whatsapp_group_url: str = Field(default="https://chat.whatsapp.com/FinfZJZ6CQLAWgI7uqiMux")

    max_pdf_bytes: int = 25 * 1024 * 1024
    notes_dir: str = "storage/notes"

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
