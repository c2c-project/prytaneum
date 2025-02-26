import sys
sys.path.append('../')
import GoogleGemini as gemini
import json

def ExtractIssueFromReadingMaterials(reading_materials: str, force=False) -> str:
    "Use Google Gemini to extract the overall topic that the given reading material discusses"
    prompt = 'Write the overall topic that the following article deals with as a short phrase. '
    prompt += 'If it is impossible to find the overall topic, output "none":\n'
    prompt += 'Article: """' + reading_materials.replace('\n', ' ') + '"""\n'
    prompt += 'Topic:'
    
    response = gemini.AskGoogleGemini(prompt, force=force)
    
    return response

def ExtractTopicsDescriptions(reading_materials: str, force=False) -> dict:
    """Returns a list of topics and their descriptions gathered from given reading materials

    Args:
        infile: The input reading materials from which to extract topics.

    Returns:
        allTopicsDesc: {'topic':'description', ...}
    """
    prompt = 'I am giving you a political article, give me the broader topics discussed in the article '
    prompt += 'and a definition of them in a '
    prompt += 'JSON format like so: {"the first topic":"the first definition","second topic":"second definition", ...}. '
    prompt += 'Only provide high level topics that are not similar to one another. '
    prompt += 'Condense the provided topics into a maximum of 7 broad topics. '
    prompt += 'The political article to extract topics from is as follows:\n"'
    prompt += reading_materials.replace('\n', ' ')
    prompt += '"\n'
    prompt += 'Topics and definitions: '
    
    response = gemini.AskGoogleGemini(prompt, force=force)
    
    # Convert the response to python dict and return
    try:
        startIndex = response.find('{')
        endIndex = response.rfind('}')
        response = response[startIndex:endIndex+1]
        allTopicsDesc = json.loads(response)
    # If no topics were found, return an empty list
    except:
        allTopicsDesc = {}
    return allTopicsDesc

def RegenerateTopicsDescriptions(reading_materials: str, lockedTopics: set, force=False) -> dict:
    """Returns a list of topics and their descriptions gathered from given reading materials that
    are not similar to the provided set of locked topics.

    Args:
        infile: The input reading materials from which to extract topics.

    Returns:
        allTopicsDesc: {'topic':'description', ...}
    """
    prompt = 'I am giving you a political article'
    if(len(lockedTopics) > 0):
        prompt += 'and a list of topics'
    prompt += ', give me the broader topics discussed in the article '
    if(len(lockedTopics) > 0):
        prompt += 'that are not similar to any topic in the given list '
    prompt += 'and a definition of them in a '
    prompt += 'JSON format like so: {"the first topic":"the first definition","second topic":"second definition", ...}. '
    prompt += 'Only provide high level topics that are not similar to one another. '
    prompt += 'Condense the provided topics into a maximum of 7 broad topics. '
    if(len(lockedTopics) > 0):
        prompt += 'The given list of topics is: '
        for topic in lockedTopics:
            prompt += topic + ', '
        prompt = prompt[:-2]
        prompt += '. '
    prompt += 'The political article to extract topics from is as follows '
    prompt += '(make sure the provided topics are not similar to the previously given list of topics):\n"'
    prompt += reading_materials.replace('\n', ' ')
    prompt += '"\n'
    prompt += 'Topics and definitions: '
    
    response = gemini.AskGoogleGemini(prompt, force=force)
    
    # Convert the response to python dict and return
    try:
        allTopicsDesc = json.loads(response)
    # If no topics were found, return an empty list
    except:
        allTopicsDesc = {}
    return allTopicsDesc