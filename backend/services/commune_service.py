import logging

import requests
from sqlalchemy.orm import Session

from backend.database.models.commune import Commune

logger = logging.getLogger(__name__)

class CommunesService:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def fetch_communes(region_code:str)->list[dict]:
        url = f"https://geo.api.gouv.fr/communes?region={region_code}&fields=nom,codesPostaux&format=json"
        try:
            response = requests.request(method="GET", url =url )
            return response.json()
        except requests.Timeout:
            logger.critical(f"Timeout while calling Geo API for region {region_code}")
            return []
        except requests.RequestException as e:
            logger.error(f"RequestException while calling Geo API for region {region_code}: {e}")
            return []

    def save_commune(self):
        pass

    def get_all_communes(self) -> list:
        """Used to retrieve all communes form db"""
        try:
            communes = self.db_session.query(Commune).all()
            logger.info(f"Retrieved {len(communes)} communes from the database")
            return communes
        except Exception as e:
            logger.error(f"Error fetching all communes: {e}")
            return []
