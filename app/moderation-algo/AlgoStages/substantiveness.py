import GoogleGemini as gemini

def IsSubstantive(text: str) -> bool:
    "Determines whether the given text is substantive or not, returning True or False."
    prompt = 'I will give you a comment that a user posted in an online meeting. You will tell me if '
    prompt += 'the comment is unnecessary. unnecessary comments are comments that contribute nothing to the '
    prompt += 'conversation, such as asking technical questions (example: "Help me log in" or "Please unmute"), '
    prompt += 'or simple greetings (example: "Good morning" or "Hello from Georgia"), or saying unintelligible words. '
    prompt += 'Output your answer as either "true" or "false".\n'
    prompt += 'Comment: {}\n'.format(text)
    prompt += 'Is it unnecessary? (true or false): '
    
    response = gemini.AskGoogleGemini(prompt)
    
    if('true' in response.lower()):
        return False
    return True