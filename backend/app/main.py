from fastapi import FastAPI
from fastapi_pagination import add_pagination
from starlette.middleware.cors import CORSMiddleware

from backend.config.logging_config import setup_logging

from backend.routers.router import router
from backend.middlewares.api_error_handler import ApiErrorHandlerMiddleware

setup_logging()

app = FastAPI()

app.add_middleware(ApiErrorHandlerMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)
add_pagination(app)