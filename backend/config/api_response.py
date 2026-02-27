from typing import Any, Generic, TypeVar

from pydantic import BaseModel, ConfigDict

T = TypeVar("T")

class ApiResponse(BaseModel,Generic[T]):
    success: bool = True
    data: Any
    model_config = ConfigDict(from_attributes=True)