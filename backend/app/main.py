from fastapi import FastAPI
from fastapi_pagination import add_pagination
from backend.config.logging_config import setup_logging

from backend.routers.router import router
from backend.utils.api_error_handler import add_error_handlers

setup_logging()

app = FastAPI()

add_error_handlers(app)

app.include_router(router)
add_pagination(app)