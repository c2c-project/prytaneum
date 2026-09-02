import sys
sys.path.append('../')
import NaturalLanguageModeration as moderation

def IsOffensive(text: str, threshold=None) -> bool:
    """Return whether a blocking moderation category meets its configured threshold."""
    moderation_scores = moderation.GetModerationScores(text)
    for category, configured_threshold in moderation.BLOCKING_THRESHOLDS.items():
        effective_threshold = configured_threshold if threshold is None else threshold
        if moderation_scores.get(category, 0.0) >= effective_threshold:
            return True
    return False
