from pathlib import Path
import yaml
import logging
import logging.config

def setup_logging():
    """Load configuration file and configure logging."""
    config_path = Path(__file__).parent / "logging.yaml"
    if not config_path.exists():
        raise FileNotFoundError(f"Logging config yaml not found: {config_path}")
    with open(config_path, "r") as f:
        config = yaml.safe_load(f)
    logging.config.dictConfig(config)
    logger = logging.getLogger("MainLogger")
    logger.info("Logging configured")