from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.db import get_db
from backend.services.commune_service import CommunesService

router = APIRouter()

def get_user_service(db: Session = Depends(get_db)):
    return CommunesService(db)
@router.get('/')
async def get_communes(service: CommunesService = Depends(get_user_service)):
    communes = service.fetch_communes()
    return communes