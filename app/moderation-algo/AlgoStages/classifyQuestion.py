import sys
sys.path.append('../')
import GoogleGemini as gemini

def DoesQuestionFitCategory(question: str, category: str, description: str) -> list:
    "Use Google Gemini to see if the question fits the given category or not"
    prompt = ''
    if(len(description) > 0):
        prompt += f'"{category}" is defined as: "{description}".\n\n'
    prompt += f'Is the following text discussing "{category}"? '
    prompt += 'Provide your answer as either "yes" or "no".'
    prompt += '\n\n'
    prompt += f'The text is: "{question}"'

    response = gemini.AskGoogleGemini(prompt)
    if('yes' in response.lower()):
        return True
    else:
        return False