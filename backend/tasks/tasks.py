
from .celery_app import celery_app
from database.db import get_db
from services.commune_service import CommunesService


@celery_app.task
def fetch_communes_task():
    db_session = next(get_db())
    try:
        communes_service = CommunesService(db_session)
        fetched_communes = communes_service.fetch_communes(region_code=11)  # exemple code région
        communes = [
            {"nom": c.get('nom'), "codesPostaux": c.get('codesPostaux'), "code": c.get('code')}
            for c in fetched_communes
        ]
        communes_service.bulk_save_communes(communes)
    finally:
        db_session.close()
