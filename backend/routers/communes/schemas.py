from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CommuneRead(BaseModel):
    id: str
    name: str
    postal_code: str
    insee_code: str
    created_at: datetime

    #This is useful for data conversion from slqalechemy
    model_config = ConfigDict(from_attributes=True)