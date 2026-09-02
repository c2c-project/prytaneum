import hashlib
import json
import os

from google import genai
from google.genai import types

client = genai.Client()


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
        
        # Output the response and its safety ratings to cache if it has not been executed before
        with open(filepath, 'w') as f:
            f.write(response)
    
    return response
