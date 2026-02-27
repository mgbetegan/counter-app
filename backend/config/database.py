import os

DATABASE_URL = os.getenv("DATABASE_URL", "mariadb+aiomysql://technical_assessment:papersnest-test-local@127.0.0.1:1117/technical_assessment_db")

REDIS_HOST = os.getenv("REDIS_HOST", "127.0.0.1")
REDIS_PORT = os.getenv("REDIS_PORT", "6379")
REDIS_USERNAME = os.getenv("REDIS_USERNAME", "default")
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)
REDIS_DB = int(os.getenv("REDIS_DB", "0"))
REDIS_PROTOCOL = int(os.getenv("REDIS_PROTOCOL", "3"))

