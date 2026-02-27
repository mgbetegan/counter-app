import uuid

from sqlalchemy import DateTime,String,func
from sqlalchemy.orm import DeclarativeBase,mapped_column
class Base(DeclarativeBase):
    __abstract__ = True
    id = mapped_column(String(36), primary_key=True, unique=True, nullable=False,
                                      default=lambda: str(uuid.uuid4()))
    created_at = mapped_column(DateTime, server_default=func.now())
    deleted_at = mapped_column(DateTime, server_default=func.now())