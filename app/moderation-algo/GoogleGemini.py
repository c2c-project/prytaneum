import hashlib
import json
import os

from pathlib import Path

from google import genai
from google.genai import types

from Utilities.logEvents import LogEventConsole

_client = None


def InitGoogleGemini():
    """Initialize the Google GenAI client using either API key or Vertex AI via Application Default Credentials."""
    global _client
    local_credentials = Path(__file__).resolve().parent / 'Keys' / 'secret.json'
    if local_credentials.is_file() and 'GOOGLE_APPLICATION_CREDENTIALS' not in os.environ:
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = str(local_credentials)

    api_key = os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY')

    try:
        if api_key:
            _client = genai.Client(api_key=api_key)
        else:
            project = (
                os.environ.get('GCP_PROJECT_ID')
                or os.environ.get('GOOGLE_CLOUD_PROJECT')
                or 'prytaneum-project'
            )
            location = os.environ.get('GOOGLE_CLOUD_LOCATION', 'us-central1')
            _client = genai.Client(vertexai=True, project=project, location=location)
    except Exception as error:
        _client = None
        LogEventConsole(f'Unable to initialize Google Gemini client: {error}', 'WARNING')
    return _client


def _get_client():
    global _client
    if _client is None:
        _client = InitGoogleGemini()
    return _client


def AskGoogleGemini(prompt: str, model='gemini-3.7-flash', max_output_tokens=1024, force=False, temperature=0.2, top_k=40) -> str:
    "Ask a prompt to given Google Cloud model and return the response text and safety ratings."
    # Get cache folder path of desired model and create one if it does not already exist
    folder = os.path.dirname(os.path.abspath(__file__)) + '/' # Folder of this script
    cachefolder = folder + 'GooglegeminiCache/' + model.replace('.', '_') + '/' # Folder names cannot have periods
    os.makedirs(cachefolder, exist_ok=True)

    # Construct non-limiting safety filters -- this goes into the config argument below
    safety_settings = [
        types.SafetySetting(
            category='HARM_CATEGORY_HATE_SPEECH',
            threshold='BLOCK_NONE',
        ),
        types.SafetySetting(
            category='HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold='BLOCK_NONE',
        ),
        types.SafetySetting(
            category='HARM_CATEGORY_HARASSMENT',
            threshold='BLOCK_NONE',
        ),
        types.SafetySetting(
            category='HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold='BLOCK_NONE',
        ),
    ]

    # Check if the prompt has been executed before
    response = ''
    hashedPrompt = str(hashlib.md5(prompt.encode('utf-8')).hexdigest()[:8])
    filepath = cachefolder + hashedPrompt
    if(os.path.isfile(filepath)):
        with open(filepath, 'r') as f:
            response = f.read()

    # If force is True, always get a new response from Gemini
    if(force):
        response = ''
        
    # Get the response and its safety ratings from Gemini if it was not cached
    if(response == ''):
        client = _get_client()
        if client is None:
            LogEventConsole('Google Gemini client unavailable, returning default response.', 'WARNING')
            return 'unknown'

        try:
            completion = client.models.generate_content(
                model=model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    # max_output_tokens=max_output_tokens,
                    top_k=top_k,
                    temperature=temperature,  # Randomness: Low temp = low randomness, high temp = high creativity
                    http_options=types.HttpOptions(
                        retry_options=types.HttpRetryOptions(
                            attempts=10,        # default is 5
                            initial_delay=1.0,  # seconds
                            exp_base=2,         # 1s, 2s, 4s, 8s, ...
                            http_status_codes=[408, 429, 500, 502, 503, 504],
                        ),
                        timeout=120000,  # ms
                    ),
                    safety_settings=safety_settings,
                ),
            )

            response = completion.text
            if(response is None):
                response = 'unknown'
        except Exception as error:
            LogEventConsole(f'Google Gemini API request failed: {error}', 'WARNING')
            return 'unknown'

        # Output the response and its safety ratings to cache if it has not been executed before
        with open(filepath, 'w') as f:
            f.write(response)

    return response
