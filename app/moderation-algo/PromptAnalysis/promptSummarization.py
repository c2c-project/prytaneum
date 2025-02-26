import sys
sys.path.append('../')
import GoogleGemini as gemini

def GetPostViewpoint(topic: str, post: str, subtopic='', force=False) -> list[str]:
    "Return the viewpoint of the given post on the given topic and optionally the given subtopic"
    prompt = 'Rephrase the following statement concisely:\n'
    prompt += f'"{post}"\n'

    response = gemini.AskGoogleGemini(prompt, force=force)
    return response

# TODO: DELETE THIS remove anything with fixNum
def SummarizePosts(topic: str, posts: list, subtopic='', force=False) -> list[str]:
    "Return a list of the viewpoints discussed by the given posts on the given topic, or its subtopic if provided"
    # If 5 or less posts are provided simply return reworded versions of them
    if(len(posts) <= 5):
        viewpoints = []
        for post in posts:
            viewpoint = GetPostViewpoint(topic, post, subtopic, force)
            viewpoints.append(viewpoint)
        return viewpoints

    if(len(subtopic) > 0):
        prompt = f'Summarize the viewpoints on "{subtopic}", within the broad topic of "{topic}",'
    else:
        prompt = f'Summarize the viewpoints on "{topic}" '
    prompt += 'in the following statements in one to five concise sentences. '
    prompt += 'Start each sentence on a new line with a dash. '
    prompt += 'The statements are:\n'
    for i, post in enumerate(posts):
        prompt += f'Statement {i+1}: "{post}"\n'
    prompt += 'The viewpoints are:\n'

    # Get response and change it to list format
    response = gemini.AskGoogleGemini(prompt, force=force)
    response = response.replace('\n', '')
    response = response.split('- ')
    response = response[1:]
    return response