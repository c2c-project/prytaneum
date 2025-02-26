from flask import Flask, request, jsonify
from waitress import serve
from TopicExtraction.analyzeReadingMaterials import ExtractIssueFromReadingMaterials, ExtractTopicsDescriptions
from TopicExtraction.extractTopicsInteractive import Lock, LockMany, Unlock, UnlockMany, Rename, Add, Remove, RemoveMany, Regenerate
from AlgoStages.substantiveness import IsSubstantive
from AlgoStages.offensiveness import IsOffensive
from AlgoStages.relevance import IsRelevant
from AlgoStages.classifyQuestion import DoesQuestionFitCategory
from PromptAnalysis.promptSummarization import SummarizePosts
from PromptAnalysis.analyzeStakeholders import ExtractShareholders
from Translation.translation import TranslateText
from PerspectiveAPI import InitPerspectiveAPI
from Utilities.logEvents import LogEventConsole
from redis.cluster import RedisCluster, ClusterNode
import redis
import json
import os

app = Flask(__name__)

def ProcessQuestion(issue: str, topics: dict, question: str) -> dict:
    """Process a question through the algorithm and return the results from each stage as a dict.
    @Param: issue = Broad issue that the town hall is about (Ex: 'modernizing congress')
    @Param: question = User question or comment to process
    @Return: response = {'substantive': bool, 'offensive': bool, 'relevant': bool, 'topics': {'topic0': bool, 'topic1': bool, ...}}"""
    # Make sure Google API is initialized

    # First translate the question into English and Spanish. The algorithm is built to process on English questions
    question_en, question_es, original_lang = TranslateText(question)

    # Process the question through the algo and return the following fields
    response = {
        'question_en': question_en,
        'question_es': question_es,
        'original_lang': original_lang,
        'substantive': False,
        'offensive': False,
        'relevant': False,
        'topics': {},
    }

    # Check for substantiveness
    response['substantive'] = IsSubstantive(question_en)

    # Check for offensiveness
    response['offensive'] = IsOffensive(question_en)

    # Don't bother with further processing if the question is unsubstantive or offensive
    if(response['offensive'] or not response['substantive']):
        return response

    # Check for relevancy if an issue was provided
    if(issue):
        response['relevant'] = IsRelevant(question_en, issue)

    # Classify into topics if any were provided
    if(topics):
        for topic, description in topics.items():
            response['topics'][topic] = DoesQuestionFitCategory(question_en, topic, description)

    return response

def ConnectToRedis() -> redis.Redis:
    "Establish a connection to Redis for temporary persistent memory. Returns the connection object."
    # Get connection details from environment variables
    REDIS_HOST = os.environ.get('REDIS_HOST', 'localhost')
    REDIS_PORT = os.environ.get('REDIS_PORT', 6379)
    REDIS_USERNAME = os.environ.get('REDIS_USERNAME', None)
    REDIS_PASSWORD = os.environ.get('REDIS_PASSWORD', None)
    NODE_ENV = os.environ.get('NODE_ENV')
    if NODE_ENV == 'production':
        return redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, charset='utf-8', decode_responses=True)
    return redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, username=REDIS_USERNAME, password=REDIS_PASSWORD,
                            charset='utf-8', decode_responses=True)

def PrintRedisConnectionStatus():
    "Print whether or not the app is able to connect to Redis"
    r = ConnectToRedis()
    try:
        r.ping()
        LogEventConsole('Connection to redis successful.')
    except:
        LogEventConsole('Connection to redis failed.', 'ERROR')

@app.route('/', methods=['POST'])
def HandleUserInput():
    # Check if the request contains JSON data
    if request.is_json:
        # NOTE: Make sure Google API is initialized at this point

        # Connect to Redis with 12 weeks expiration time for stored data
        secInAWeek = 7257600
        r = ConnectToRedis()

        # Get the event ID
        eventId = request.get_json().get('eventId')
        if(not eventId):
            LogEventConsole('Missing or invalid field "eventId" in request data', 'ERROR')
            return jsonify({'ERROR': 'Missing or invalid field "eventId" in request data'}), 422 # HTTP unprocessable Entity

        # Decode which stage the request is going to
        stage = request.get_json().get('stage')

        # Stage 1: Extract the overall issue and the topics and definitions from reading materials
        if(stage == 'extraction'):
            # Extract and issue and topics for later use
            reading_materials = request.get_json().get('reading_materials')
            if(not reading_materials):
                LogEventConsole('Missing field "reading_materials" in request data', 'ERROR')
                return jsonify({'ERROR': 'Missing field "reading_materials" in request data'}), 422 # HTTP unprocessable Entity
            issue = ExtractIssueFromReadingMaterials(reading_materials)
            topics = ExtractTopicsDescriptions(reading_materials)

            # Save them for later use, expiring in a week
            r.set('moderation_issue_{}'.format(eventId), issue, ex=secInAWeek)
            r.set('moderation_topics_{}'.format(eventId), json.dumps(topics), ex=secInAWeek)
            r.set('moderation_lockedTopics_{}'.format(eventId), json.dumps([]), ex=secInAWeek)
            r.set('moderation_reading_materials_{}'.format(eventId), reading_materials, ex=secInAWeek)

            # Issue a warning if no topics were returned
            if(len(topics) == 0):
                LogEventConsole('Could not extract any topics from the provided reading materials', 'WARNING')

            # Construct and return the response
            response = {
                'issue': issue,
                'topics': topics
            }
            LogEventConsole('Successful run of Stage 1 "Extraction"')
            return jsonify(response), 200 # HTTP success

        # Stage 2: Interactively finalize the set of topics and definitions.
        elif(stage == 'interactive'):
            # At this point, the extracted topics and list of locked topics should already be available in Redis
            # If lockedTopics does not exist, create a new empty list for it
            lockedTopics = r.get('moderation_lockedTopics_{}'.format(eventId))
            if(lockedTopics):
                lockedTopics = json.loads(lockedTopics)
            else:
                lockedTopics = []
                r.set('moderation_lockedTopics_{}'.format(eventId), json.dumps(lockedTopics), ex=secInAWeek)
            
            # If the list of topics does not exist then we have an error and need to rerun stage 1
            topics = r.get('moderation_topics_{}'.format(eventId))
            if(not topics):
                LogEventConsole('Unable to find topics in stored data for event with ID "{}". Please rerun Stages 1 and 2.'.format(eventId), 'ERROR')
                return jsonify({'ERROR': 'Unable to find topics in stored data for event with ID "{}". Please rerun Stages 1 and 2.'.format(eventId)}), 400 # HTTP bad request
            topics = json.loads(topics)
            
            # Perform the user designated action
            action = request.get_json().get('action')
            if(not action):
                LogEventConsole('Missing field "action" in request data', 'ERROR')
                return jsonify({'ERROR': 'Missing field "action" in request data'}), 422 # HTTP unprocessable Entity
            action = action.lower()
            
            if(action == 'lock'):
                selectedTopic = request.get_json().get('selected_topic')
                if(not selectedTopic):
                    LogEventConsole('Missing field(s) in request data', 'ERROR')
                    return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity
                topics, lockedTopics, error = Lock(topics, lockedTopics, selectedTopic)
            
            elif(action == 'lock_many'):
                selectedTopics = request.get_json().get('selected_topics')
                if(not selectedTopics):
                    LogEventConsole('Missing field(s) in request data', 'ERROR')
                    return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity
                topics, lockedTopics, error = LockMany(topics, lockedTopics, selectedTopics)

            elif(action == 'unlock'):
                selectedTopic = request.get_json().get('selected_topic')
                if(not selectedTopic):
                    LogEventConsole('Missing field(s) in request data', 'ERROR')
                    return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity
                topics, lockedTopics, error = Unlock(topics, lockedTopics, selectedTopic)

            elif(action == 'unlock_many'):
                selectedTopics = request.get_json().get('selected_topics')
                if(not selectedTopics):
                    LogEventConsole('Missing field(s) in request data', 'ERROR')
                    return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity
                topics, lockedTopics, error = UnlockMany(topics, lockedTopics, selectedTopics)

            elif(action == 'rename'):
                selectedTopic = request.get_json().get('selected_topic')
                newTopic = request.get_json().get('new_topic')
                newDefinition = request.get_json().get('new_definition')
                if(not selectedTopic or not newTopic or not newDefinition):
                    LogEventConsole('Missing field(s) in request data', 'ERROR')
                    return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity
                topics, lockedTopics, error = Rename(topics, lockedTopics, selectedTopic, newTopic, newDefinition)

            elif(action == 'add'):
                newTopic = request.get_json().get('new_topic')
                newDefinition = request.get_json().get('new_definition')
                if(not newTopic or not newDefinition):
                    LogEventConsole('Missing field(s) in request data', 'ERROR')
                    return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity
                topics, lockedTopics, error = Add(topics, lockedTopics, newTopic, newDefinition)

            elif(action == 'remove'):
                selectedTopic = request.get_json().get('selected_topic')
                if(not selectedTopic):
                    LogEventConsole('Missing field(s) in request data', 'ERROR')
                    return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity
                topics, lockedTopics, error = Remove(topics, lockedTopics, selectedTopic)

            elif(action == 'remove_many'):
                selectedTopics = request.get_json().get('selected_topics')
                if(not selectedTopics):
                    LogEventConsole('Missing field(s) in request data', 'ERROR')
                    return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity
                topics, lockedTopics, error = RemoveMany(topics, lockedTopics, selectedTopics)

            elif(action == 'regenerate'):
                LogEventConsole('Entered regeneration action. Fetching reading materials from redis storage...', 'DEBUG') # DELETE THIS
                reading_materials = r.get('moderation_reading_materials_{}'.format(eventId))
                LogEventConsole('Done. Reading materials data type is:{}'.format(type(reading_materials)), 'DEBUG') # DELETE THIS
                LogEventConsole('The reading materials start with:{}'.format(reading_materials[:50]), 'DEBUG') # DELETE THIS
                if(not reading_materials):
                    LogEventConsole('Unable to regenerate due to reading materials not existing in stored data.', 'ERROR')
                    return jsonify({'ERROR': 'Unable to regenerate due to reading materials not existing in stored data.'}), 400 # HTTP bad request
                if(type(reading_materials) == bytes):
                    reading_materials = reading_materials.decode()
                topics, lockedTopics, error = Regenerate(topics, lockedTopics, reading_materials)

                # Issue a warning if no topics were returned
                if(len(topics) == 0):
                    LogEventConsole('Could not regenerate any topics from the provided reading materials', 'WARNING')
            
            else:
                LogEventConsole('Invalid field "action" in request data', 'ERROR')
                return jsonify({'ERROR': 'Invalid field "action" in request data'}), 422 # HTTP unprocessable Entity

            # Check if there were any errors
            if(error == 'input'):
                LogEventConsole('Invalid input: Selected topic does not exist', 'ERROR')
                return jsonify({'ERROR': 'Invalid input: Selected topic does not exist'}), 422 # HTTP unprocessable Entity
            elif(error == 'duplicate'):
                LogEventConsole('Invalid input: Provided topic already exists', 'ERROR')
                return jsonify({'ERROR': 'Invalid input: Provided topic already exists'}), 422 # HTTP unprocessable Entity

            # Save the topics and locked topics to redis
            r.set('moderation_topics_{}'.format(eventId), json.dumps(topics), ex=secInAWeek)
            r.set('moderation_lockedTopics_{}'.format(eventId), json.dumps(lockedTopics), ex=secInAWeek)

            # Construct and return the response
            response = {
                'topics': topics,
                'locked_topics': lockedTopics
            }
            LogEventConsole('Successful run of Stage 2 "Interactive" with action: {}'.format(action))
            return jsonify(response), 200 # HTTP success

        # Stage 3: Process a question through the moderation algorithm
        elif(stage == 'moderation'):
            # At this point, the issue and topics should already be available in Redis
            issue = r.get('moderation_issue_{}'.format(eventId))
            topics = r.get('moderation_topics_{}'.format(eventId))
            if(not issue or not topics):
                LogEventConsole('Unable to find value(s) in stored data. Please rerun Stages 1 and 2', 'ERROR')
                return jsonify({'ERROR': 'Unable to find value(s) in stored data. Please rerun Stages 1 and 2'}), 400 # HTTP bad request
            topics = json.loads(topics)

            # Process the question and return the response
            question = request.get_json().get("question") # Get the user question/comment
            if(not question):
                LogEventConsole('Missing or invalid field "question" in request data', 'ERROR')
                return jsonify({'ERROR': 'Missing or invalid field "question" in request data'}), 422 # HTTP unprocessable Entity
            LogEventConsole('Successful run of Stage 3 "Moderation"')
            return jsonify(ProcessQuestion(issue, topics, question)), 200 # HTTP success

        else:
            LogEventConsole('Missing or invalid field "stage" in request data', 'ERROR')
            return jsonify({'ERROR': 'Missing or invalid field "stage" in request data'}), 422 # HTTP unprocessable Entity
    else:
        LogEventConsole('Request must be in JSON format', 'ERROR')
        return jsonify({'ERROR': 'Request must be in JSON format'}), 415 # HTTP unsupported media type

@app.route('/promptsummary', methods=['POST'])
def PromptSummarization():
    # Check if the request contains JSON data
    if request.is_json:
        # NOTE: Make sure Google API is initialized at this point

        # Connect to Redis with 12 weeks expiration time for stored data
        secInAWeek = 7257600
        r = ConnectToRedis()

        # Get the event ID
        eventId = request.get_json().get('eventId')
        if(not eventId):
            LogEventConsole('Missing or invalid field "eventId" in request data', 'ERROR')
            return jsonify({'ERROR': 'Missing or invalid field "eventId" in request data'}), 422 # HTTP unprocessable Entity

        # At this point, the issue should already be available in Redis
        issue = r.get('moderation_issue_{}'.format(eventId))

        # If issue was provided as parameter, overwrite the stored issue
        issue_override = request.get_json().get('issue_override')
        if(issue_override):
            LogEventConsole(f'Overriding previous issue of "{issue}" with "{issue_override}"', 'INFO')
            issue = issue_override

        if(issue == 'None'):
            LogEventConsole('Running prompt summarization with issue set to "None". Please rerun Stage 1 or provide the issue as API parameter "issue_override".', 'WARNING')

        # Get the list of user prompt responses
        promptResponses = request.get_json().get('prompt_responses')
        if(not promptResponses):
            LogEventConsole('Missing field(s) in request data', 'ERROR')
            return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity
        
        # If subtopic is given, specify to get viewpoints around this subtopic
        subtopic = request.get_json().get('subtopic')
        if(not subtopic):
            subtopic = ''

        # If force is provided, overwrite previously saved response
        force = request.get_json().get('force')
        if(not force):
            force = False
            
        # Summarize the viewpoints from the prompt responses
        viewpoints = SummarizePosts(issue, promptResponses, subtopic, force) # [viewpoint1, viewpoint2, ...]

        # Return the viewpoints with success log message
        LogEventConsole('Successful run of prompt summarization')
        return jsonify(viewpoints), 200 # HTTP success

@app.route('/stakeholders', methods=['POST'])
def StakeholderExtraction():
    # Check if the request contains JSON data
    if request.is_json:
        # NOTE: Make sure Google API is initialized at this point

        # Get the list of user prompt responses
        promptResponses = request.get_json().get('prompt_responses')
        if(not promptResponses):
            LogEventConsole('Missing field(s) in request data', 'ERROR')
            return jsonify({'ERROR': 'Missing field(s) in request data'}), 422 # HTTP unprocessable Entity

        # Identify the stakeholders from the prompt responses
        stakeholders = ExtractShareholders(promptResponses) # [stakeholder1, stakeholder2, ...]

        # Return the stakeholders with success log message
        LogEventConsole('Successful run of stakeholder extraction')
        return jsonify(stakeholders), 200 # HTTP success

if __name__ == '__main__':
    # Initialize Google API before starting the app
    InitPerspectiveAPI()
    PrintRedisConnectionStatus()
    serve(app, host='0.0.0.0', port=5000)
