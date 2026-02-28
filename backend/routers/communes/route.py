import logging
from http.client import HTTPException

from fastapi import APIRouter, Depends, Query
from fastapi_pagination import set_page, set_params, pagination_ctx

from fastapi_pagination.cursor import CursorParams
from sqlalchemy.orm import Session

from backend.config.api_response import ApiResponse
from backend.database.db import get_db
from .schemas import CommuneRead
from backend.services.commune_service import CommunesService
from ...pagination.cursor_params import LimitedCursorParams
from ...pagination.pagination import CursorPaginatedPage

router = APIRouter()
logger = logging.getLogger(__name__)
def get_user_service(db: Session = Depends(get_db)):
    return CommunesService(db)

@router.get('/',response_model=ApiResponse[CursorPaginatedPage[CommuneRead]])# type: ignore
async def get_communes(_params: LimitedCursorParams = Depends(),
                       _=Depends(pagination_ctx(CursorPaginatedPage[CommuneRead])),
                       service: CommunesService = Depends(get_user_service),
                       name:str = Query(None)
                       ):
    try:
        communes = service.get_paginated_communes(name)
        return ApiResponse(success=True,data=communes)
    except Exception as e:
        logger.error(f"Error fetching all communes: {e}")
        raise e