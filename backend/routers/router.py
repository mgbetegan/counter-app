from fastapi import APIRouter
from .communes.route import router as communes_router
router = APIRouter()
router.include_router(communes_router,prefix="/communes")