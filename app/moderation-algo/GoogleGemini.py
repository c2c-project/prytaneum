import os
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
import hashlib
import json

def AskGoogleGemini(prompt: str, model='gemini-2.0-flash-001', max_output_tokens=1024, force=False, temperature=0.2, top_k=40) -> str:
    "Ask a prompt to given Google Cloud model and return the response text and safety ratings."
    # Get cache folder path of desired model and create one if it does not already exist
    folder = os.path.dirname(os.path.abspath(__file__)) + '/' # Folder of this script
    cachefolder = folder + 'GooglegeminiCache/' + model.replace('.', '_') + '/' # Folder names cannot have periods
    os.makedirs(cachefolder, exist_ok=True)

    # Construct non-limiting safety filters
    safety_settings = []
    for category in HarmCategory:
        safety_settings.append({
            "category": category,
            "threshold": HarmBlockThreshold.BLOCK_NONE,
        })
    
    safety_settings=[
            {
                "category": HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                "threshold": HarmBlockThreshold.BLOCK_NONE,
            },
            {
                "category": HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                "threshold": HarmBlockThreshold.BLOCK_NONE,
            },
            {
                "category": HarmCategory.HARM_CATEGORY_HARASSMENT,
                "threshold": HarmBlockThreshold.BLOCK_NONE,
            },
            {
                "category": HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                "threshold": HarmBlockThreshold.BLOCK_NONE,
            },
        ]

    # Fetch the requested model with no safety filters
    model = genai.GenerativeModel(model, safety_settings=safety_settings)
    
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
        completion = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                #max_output_tokens=max_output_tokens,
                temperature=temperature, # Randomness: Low temp = low randomness, high temp = high creativity
                top_k=top_k,
            ),
        )
        response = completion.text
        if(response is None):
            response = 'unknown'
        
        # Output the response and its safety ratings to cache if it has not been executed before
        with open(filepath, 'w') as f:
            f.write(response)
    
    return response
