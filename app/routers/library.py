from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse

from app.core.dependencies import templates
from app.services import library

router = APIRouter()

PAGES = {
    "book": ("Books", "Standard GATE textbooks by subject. Read them here or download a copy."),
    "note": ("Notes", "Short notes and subject notes. Read them here or download a copy."),
}


def _list_page(request: Request, kind: str) -> HTMLResponse:
    title, intro = PAGES[kind]
    return templates.TemplateResponse(
        request, "library/list.html", {"kind": kind, "title": title, "intro": intro, "groups": library.subjects(kind)}
    )


@router.api_route("/books", methods=["GET", "HEAD"], response_class=HTMLResponse)
def books(request: Request) -> HTMLResponse:
    return _list_page(request, "book")


@router.api_route("/notes", methods=["GET", "HEAD"], response_class=HTMLResponse)
def notes(request: Request) -> HTMLResponse:
    return _list_page(request, "note")


def _known(file_id: str) -> library.LibraryFile:
    file = library.get_file(file_id)
    if file is None:
        raise HTTPException(status_code=404, detail="File not found")
    return file


@router.api_route("/read/{file_id}", methods=["GET", "HEAD"], response_class=HTMLResponse)
def read(request: Request, file_id: str) -> HTMLResponse:
    file = _known(file_id)
    return templates.TemplateResponse(
        request, "library/viewer.html",
        {"file": file, "preview_url": f"https://drive.google.com/file/d/{file.id}/preview",
         "back_url": "/books" if file.kind == "book" else "/notes"},
    )


@router.api_route("/download/{file_id}", methods=["GET", "HEAD"])
def download(file_id: str) -> RedirectResponse:
    file = _known(file_id)
    return RedirectResponse(f"https://drive.google.com/uc?export=download&id={file.id}", status_code=302)
