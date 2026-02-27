import logging

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from config.database import *

logger = logging.getLogger(__name__)
engine = create_engine(ASYNC_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_redis():
    pass



def get_db():
    db = SessionLocal()
    try:
        yield db
    except SQLAlchemyError as error:
        logger.error("Database connection error: %s", error)
        raise HTTPException(status_code=500, detail="Database connection error") from error
    finally:
        db.close()