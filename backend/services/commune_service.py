import logging
import requests
from sqlalchemy.dialects.mysql import insert
from sqlalchemy.orm import Session
from database.models.commune import Commune

BATCH_SIZE = 2000
logger = logging.getLogger(__name__)

class CommunesService:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def fetch_communes(self,region_code:str)->list[dict]:
        url = "https://geo.api.gouv.fr/communes"
        params = {
            "codeRegion": region_code,
            "fields": "nom,codesPostaux,code",
            "format": "json",
        }
        try:
            response = requests.request(method="GET", url =url, params=params )
            return response.json()
        except requests.Timeout:
            logger.critical(f"Timeout while calling Geo API for region {region_code}")
            return []
        except requests.RequestException as e:
            logger.error(f"RequestException while calling Geo API for region {region_code}: {e}")
            return []

    def save_commune(self):
        pass
    def bulk_save_communes(self, communes_data: list[dict]):
        if not communes_data:
            logger.info("No communes data to save.")
            return

        total = len(communes_data)
        try:
            for i in range(0, total, BATCH_SIZE):
                batch = communes_data[i:i + BATCH_SIZE]
                data = [
                    {
                        "name": c.get("nom"),
                        "postal_code": ", ".join(c.get("codesPostaux", [])),
                        "insee_code": c.get("code"),
                    }
                    for c in batch
                ]

                stmt = insert(Commune).values(data)

                stmt = stmt.on_duplicate_key_update(
                    insee_code=stmt.inserted.insee_code,
                )
                self.db_session.execute(stmt)

            self.db_session.commit()
            logger.info(f"Saved {total} communes (insert/update).")

        except Exception as e:
            self.db_session.rollback()
            logger.exception(f"Error saving communes: {e}")

    def get_all_communes(self) -> list:
        """Used to retrieve all communes form db"""
        try:
            communes = self.db_session.query(Commune).all()
            logger.info(f"Retrieved {len(communes)} communes from the database")
            return communes
        except Exception as e:
            logger.error(f"Error fetching all communes: {e}")
            return []
