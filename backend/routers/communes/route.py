import logging
from fastapi import APIRouter, Depends, Query
from fastapi_pagination import  pagination_ctx

from sqlalchemy.orm import Session

from config.api_response import ApiResponse
from database.db import get_db
from .schemas import CommuneRead
from services.commune_service import CommunesService
from pagination.cursor_params import LimitedCursorParams
from pagination.pagination import CursorPaginatedPage

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