import logging
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from pydantic import ValidationError
from starlette.middleware.base import BaseHTTPMiddleware

from config.env import ENV

logger = logging.getLogger(__name__)


class ApiErrorHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)

        except ValidationError as exc:
            return self._handle_validation(exc)

        except HTTPException as exc:
            return self._handle_http(exc)

        except IntegrityError as exc:
            logger.error(f"IntegrityError: {exc}")
            return self._handle_generic(exc)

        except SQLAlchemyError as exc:
            logger.error(f"SQLAlchemyError: {exc}")
            return self._handle_generic(exc)

        except Exception as exc:
            logger.error(f"Unexpected error: {exc}")
            return self._handle_generic(exc)

    @staticmethod
    def _handle_validation(exc: ValidationError) -> JSONResponse:
        errors = [
            {
                "loc": error["loc"],
                "msg": error["msg"],
                "type": error["type"],
                "input": error.get("input"),
            }
            for error in exc.errors()
        ]
        return JSONResponse(
            status_code=400,
            content={"success": False, "detail": errors},
        )

    @staticmethod
    def _handle_http(exc: HTTPException) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error_code": getattr(exc.detail, "error_code", "HTTP_ERROR"),
                "detail": getattr(exc.detail, "message", exc.detail),
            },
        )

    @staticmethod
    def _handle_generic(exc: Exception) -> JSONResponse:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error_code": "UNEXPECTED_ERROR",
                "detail": "An unexpected error occurred.",
                "stacktrace": str(exc) if ENV == "DEV" else "",
            },
        )