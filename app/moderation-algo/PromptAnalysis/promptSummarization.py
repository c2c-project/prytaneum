import sys
sys.path.append('../')
import GoogleGemini as gemini
from AlgoStages.substantiveness import IsSubstantive

def SummarizePosts(topic: str, posts: list, substantive=False, subtopic='', force=False) -> list[str]:
    "Return a list of the viewpoints discussed by the given posts on the given topic, or its subtopic if provided"
    if(len(posts) < 1):
        return []
    
    if(substantive):
        posts_ = []
        for post in posts:
            if(IsSubstantive(post)):
                posts_.append(post)
        posts = posts_

    prompt = ''

    # if(len(subtopic) > 0):
    #     prompt += f'Summarize the viewpoints on "{subtopic}", within the broad topic of "{topic}", '
    # else:
    #     prompt += f'Summarize the viewpoints on "{topic}" '
    
    if(len(posts) == 1):
        prompt += f'Summarize the following statements as exactly one concise '
    else:
        prompt += f'Summarize the following statements as only one to five concise '

    if(len(posts) == 1):
        prompt += 'single summary. Your summary should be worded as passive tone viewpoints, so that it captures '
    else:
        prompt += 'summaries. Your summaries should be worded as passive tone viewpoints, so that they capture '
    prompt += 'as many viewpoints presented in the given statements as possible. '
    prompt += 'Use as few summaries as possible to achieve this. '

    if(len(posts) == 1):
        prompt += 'Start the summary on a new line with a dash. '
    else:
        prompt += 'Start each summary on a new line with a dash. '

    prompt += 'The statements are:\n'
    for i, post in enumerate(posts):
        prompt += f'Statement {i+1}: "{post}"\n'
        
    prompt += 'Your summarized viewpoints:\n'

    response = gemini.AskGoogleGemini(prompt, force=force)
    response = response.replace('\n', '')
    response = response.split('- ')
    response = response[1:]
    return response