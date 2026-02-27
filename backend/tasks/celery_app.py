from celery import Celery
from config.database import *
celery_app = Celery(
    "worker",
    broker=f"{REDIS_HOST}:{REDIS_PORT}/0",
    backend=f"{REDIS_HOST}:{REDIS_PORT}/1"
)

celery_app.conf.beat_schedule = {
    "fetch-communes-every-5min": {
        "task": "tasks.tasks.fetch_communes_task",
        "schedule": 300.0,
    }
}

celery_app.autodiscover_tasks(["tasks.tasks"])