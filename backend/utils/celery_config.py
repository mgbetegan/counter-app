from celery import Celery

celery_app = Celery(
    "worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1"
)

celery_app.conf.beat_schedule = {
    "fetch-communes-every-5min": {
        "task": "app.tasks.fetch_communes_task",
        "schedule": 300.0,
    }
}