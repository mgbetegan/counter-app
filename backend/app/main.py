from fastapi import FastAPI
from backend.config.logging_config import setup_logging

from backend.routers.router import router
from backend.utils.api_error_handler import add_error_handlers

setup_logging()

app = FastAPI()

add_error_handlers(app)

app.include_router(router)