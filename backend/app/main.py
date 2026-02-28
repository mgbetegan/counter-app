from fastapi import FastAPI
from fastapi_pagination import add_pagination
from starlette.middleware.cors import CORSMiddleware

from backend.config.logging_config import setup_logging

from backend.routers.router import router
from backend.utils.api_error_handler import add_error_handlers

setup_logging()

app = FastAPI()

add_error_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
add_pagination(app)