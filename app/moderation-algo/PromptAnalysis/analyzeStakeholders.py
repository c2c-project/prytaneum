import sys
sys.path.append('../')
import GoogleGemini as gemini
import json

def ExtractShareholders(posts: list):
    "Extract the shareholders from the given posts"
    prompt = 'I will give you a list of online comments. You will provide me a list describing the demographics of the person writing each comment.'
    prompt += 'For example, if a comment says "As a mother of five, I am having trouble looking for jobs in between taking care of my kids.", '
    prompt += 'then the description would be "unemployed mother of five kids". '
    prompt += 'If the comment provides no identifying details about the person writing it, then the description should be "none". '
    prompt += 'Format your answer as a Python list of descriptions like so: ["description1", "description2", ...]. '
    prompt += 'The comments are: \n'
    for i, post in enumerate(posts):
        prompt += f'Comment {i+1}: "{post}"\n'
    prompt += 'Your list of descriptions for each comment:\n'

    response = gemini.AskGoogleGemini(prompt)
    return json.loads(response)