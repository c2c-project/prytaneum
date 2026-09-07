import hashlib
import json
import os
from pathlib import Path

from google.cloud import language_v2

from Utilities.logEvents import LogEventConsole


# Increment this when the API model, cached response shape, or moderation policy changes.
CACHE_VERSION = 'v1-model-v1'
CACHE_DIRECTORY = Path(__file__).resolve().parent / 'NaturalLanguageModerationCache' / CACHE_VERSION

DEFAULT_BLOCKING_THRESHOLD = 0.7
BLOCKING_THRESHOLDS = {
    'Toxic': DEFAULT_BLOCKING_THRESHOLD,
    'Derogatory': DEFAULT_BLOCKING_THRESHOLD,
    'Insult': DEFAULT_BLOCKING_THRESHOLD,
    'Profanity': DEFAULT_BLOCKING_THRESHOLD,
}

_client = None


def InitNaturalLanguageModeration():
    """Initialize the Cloud Natural Language client using Application Default Credentials."""
    global _client
    local_credentials = Path(__file__).resolve().parent / 'Keys' / 'secret.json'
    if local_credentials.is_file():
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = str(local_credentials)

    try:
        _client = language_v2.LanguageServiceClient()
    except Exception as error:
        _client = None
        LogEventConsole(
            f'Unable to initialize Natural Language moderation client: {error}',
            'WARNING',
        )
    return _client


def _get_client():
    global _client
    if _client is None:
        _client = InitNaturalLanguageModeration()
    return _client


def _cache_path(text: str) -> Path:
    hashed_text = hashlib.sha256(text.encode('utf-8')).hexdigest()
    return CACHE_DIRECTORY / f'{hashed_text}.json'


def _read_cache(filepath: Path) -> dict | None:
    if not filepath.is_file():
        return None

    try:
        with filepath.open('r', encoding='utf-8') as cache_file:
            cached = json.load(cache_file)
        if cached.get('cache_version') != CACHE_VERSION or not isinstance(cached.get('scores'), dict):
            return None
        return {name: float(score) for name, score in cached['scores'].items()}
    except (OSError, TypeError, ValueError, json.JSONDecodeError):
        return None


def _write_cache(filepath: Path, scores: dict) -> None:
    filepath.parent.mkdir(parents=True, exist_ok=True)
    temporary_filepath = filepath.with_suffix(f'.{os.getpid()}.tmp')
    payload = {
        'cache_version': CACHE_VERSION,
        'scores': scores,
    }
    try:
        with temporary_filepath.open('w', encoding='utf-8') as cache_file:
            json.dump(payload, cache_file)
        os.replace(temporary_filepath, filepath)
    except OSError as error:
        LogEventConsole(f'Unable to cache Natural Language moderation response: {error}', 'WARNING')
        try:
            temporary_filepath.unlink(missing_ok=True)
        except OSError:
            pass


def GetModerationScores(text: str, force=False) -> dict:
    """Return moderateText confidence scores keyed by moderation category name."""
    filepath = _cache_path(text)
    if not force:
        cached_scores = _read_cache(filepath)
        if cached_scores is not None:
            return cached_scores

    try:
        document = language_v2.Document(
            content=text,
            type_=language_v2.Document.Type.PLAIN_TEXT,
        )
        response = _get_client().moderate_text(
            request={
                'document': document,
                'model_version': 'MODEL_VERSION_1',
            }
        )
        scores = {
            category.name: float(category.confidence)
            for category in response.moderation_categories
        }
    except Exception as error:
        LogEventConsole(
            f'Natural Language moderateText unable to process question. '
            f'Returning default moderation values. Error: {error}',
            'WARNING',
        )
        return {}

    _write_cache(filepath, scores)
    return scores
