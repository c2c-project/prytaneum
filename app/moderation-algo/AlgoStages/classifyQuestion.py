import sys
sys.path.append('../')
import GoogleGemini as gemini

def DoesQuestionFitCategory(question: str, category: str, description: str) -> list:
    "Use Google Gemini to see if the question fits the given category or not"
    prompt = 'Does the following comment pertain to the given topic?'
    prompt += 'Provide your answer as either "yes" or "no".\n'
    if(len(description) > 0):
        prompt += f'Topic: "{category}", which means: {description}\n'
    else:
        prompt += f'Topic: "{category}"\n'
    prompt += f'Comment: "{question}"'
    response = gemini.AskGoogleGemini(prompt)
    if('yes' in response.lower()):
        return True
    else:
        return False