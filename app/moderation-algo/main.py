from flask import Flask, request, jsonify
from waitress import serve
from TopicExtraction.analyzeReadingMaterials import ExtractIssueFromReadingMaterials, ExtractTopicsDescriptions
from TopicExtraction.extractTopicsInteractive import Lock, LockMany, Unlock, UnlockMany, Rename, Add, Remove, RemoveMany, Regenerate
from AlgoStages.substantiveness import IsSubstantive
from AlgoStages.offensiveness import IsOffensive
from AlgoStages.relevance import IsRelevant
from AlgoStages.classifyQuestion import DoesQuestionFitCategory
from Translation.translation import TranslateText
from PerspectiveAPI import InitPerspectiveAPI
from Utilities.logEvents import LogEventConsole
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
    model = 'gemini-pro'

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
    response['substantive'] = IsSubstantive(model, question_en)

    # Check for offensiveness
    response['offensive'] = IsOffensive(question_en)

    # Don't bother with further processing if the question is unsubstantive or offensive
    if(response['offensive'] or not response['substantive']):
        return response

    # Check for relevancy if an issue was provided
    if(issue):
        response['relevant'] = IsRelevant(model, question_en, issue)

    # Classify into topics if any were provided
    if(topics):
        for topic, description in topics.items():
            response['topics'][topic] = DoesQuestionFitCategory(model, question_en, topic, description)

    return response

def ConnectToRedis() -> redis.Redis:
    "Establish a connection to Redis for temporary persistent memory. Returns the connection object."
    # Get connection details from environment variables
    REDIS_HOST = os.environ.get('REDIS_HOST')
    REDIS_PORT = os.environ.get('REDIS_PORT')
    REDIS_USERNAME = os.environ.get('REDIS_USERNAME')
    REDIS_PASSWORD = os.environ.get('REDIS_PASSWORD')
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
        model = 'gemini-pro'

        # Connect to Redis with a week expiration time
        secInAWeek = 604800
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
            issue = ExtractIssueFromReadingMaterials(model, reading_materials)
            topics = ExtractTopicsDescriptions(model, reading_materials)

            # Save them for later use, expiring in a week
            r.set('moderation_issue_{}'.format(eventId), issue, ex=secInAWeek)
            r.set('moderation_topics_{}'.format(eventId), json.dumps(topics), ex=secInAWeek)
            r.set('moderation_reading_materials_{}'.format(eventId), reading_materials, ex=secInAWeek)

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
                r.set('moderation_lockedTopics_{}'.format(eventId), json.dumps(lockedTopics))
            topics = json.loads(r.get('moderation_topics_{}'.format(eventId)))
            if(not topics):
                LogEventConsole('Unable to find value(s) in stored data. Please rerun Stages 1 and 2.', 'ERROR')
                return jsonify({'ERROR': 'Unable to find value(s) in stored data. Please rerun Stages 1 and 2.'}), 400 # HTTP bad request
            
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
                reading_materials = r.get('moderation_reading_materials_{}'.format(eventId))
                if(not reading_materials):
                    LogEventConsole('Unable to find value(s) in stored data. Please rerun Stages 1 and 2.', 'ERROR')
                    return jsonify({'ERROR': 'Unable to find value(s) in stored data. Please rerun Stages 1 and 2.'}), 400 # HTTP bad request
                topics, lockedTopics, error = Regenerate(topics, lockedTopics, reading_materials)
            
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
            topics = json.loads(r.get('moderation_topics_{}'.format(eventId)))
            if(not issue or not topics):
                LogEventConsole('Unable to find value(s) in stored data. Please rerun Stages 1 and 2', 'ERROR')
                return jsonify({'ERROR': 'Unable to find value(s) in stored data. Please rerun Stages 1 and 2'}), 400 # HTTP bad request

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

if __name__ == '__main__':
    # Initialize Google API before starting the app
    InitPerspectiveAPI()
    PrintRedisConnectionStatus()
    serve(app, host='0.0.0.0', port=5000)