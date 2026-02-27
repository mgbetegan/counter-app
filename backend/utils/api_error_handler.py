from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from pydantic import ValidationError

from backend.config.env import ENV

from config.env import ENV


def add_error_handlers(app):
    """Attach custom error handlers to the app."""
    @app.exception_handler(ValidationError)
    async def validation_exception_handler(_request: Request, exc: ValidationError):
        detailed_errors = []
        for error in exc.errors():
            detailed_errors.append(error)
            detailed_errors.append({
                "loc": error["loc"],
                "msg": error["msg"],
                "type": error["type"],
                "input": error["input"],
            })
        return JSONResponse(
            status_code=400,
            content={"detail": detailed_errors},
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(_request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error_code": getattr(exc.detail, "error_code", "HTTP_ERROR"),
                "detail": getattr(exc.detail, "message", exc.detail),
            },
        )

    @app.exception_handler(Exception)
    @app.exception_handler(SQLAlchemyError)
    @app.exception_handler(IntegrityError)
    async def generic_exception_handler(request: Request,
                                        exc: Exception | SQLAlchemyError | IntegrityError
                                        ) -> JSONResponse:
        """Log error before continue"""
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error_code": "UNEXPECTED_ERROR",
                "detail": "An unexpected error occurred.",
                "stacktrace": str(exc) if ENV == "DEV" else "",
            }
        )
