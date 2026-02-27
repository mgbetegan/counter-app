
from sqlalchemy import Column, String

from ._base import Base


class Commune(Base):
    __tablename__ = 'communes'
    name = Column(String(255),nullable=False,index=True)
    postal_code = Column(String(255),nullable=False,index=True)
    insee_code = Column(String(20),nullable=False,unique=True)