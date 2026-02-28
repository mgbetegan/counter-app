from celery import Celery
from config.database import *
celery_app = Celery(
    "worker",
    broker=f"redis://{REDIS_HOST}:{REDIS_PORT}/0",
    backend=f"redis://{REDIS_HOST}:{REDIS_PORT}/1"
)

celery_app.conf.update(
    worker_pool="solo",
    worker_hijack_root_logger=False,
    beat_schedule={
        "fetch-communes-every-5min": {
            "task": "tasks.tasks.fetch_communes_task",
            "schedule": 300.0,
        }
    },
)


celery_app.autodiscover_tasks(["tasks.tasks"])