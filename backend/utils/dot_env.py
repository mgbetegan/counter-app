import logging
import dotenv


logger = logging.getLogger(__name__)


def load_dotenv():
    logger.info("Loading .env")
    dotenv.load_dotenv()