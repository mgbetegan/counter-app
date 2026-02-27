from fastapi.params import Query
from fastapi_pagination.cursor import CursorParams

class LimitedCursorParams(CursorParams):
    size: int = Query(100, ge=1, le=500)