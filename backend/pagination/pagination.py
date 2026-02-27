from fastapi_pagination.cursor import CursorPage
from fastapi_pagination.customization import CustomizedPage, UseParamsFields

CursorPaginatedPage = CustomizedPage[
    CursorPage,
    UseParamsFields(size=500)
]