import TopicExtraction.analyzeReadingMaterials as RM

def Lock(allTopics: dict, lockedTopics: list, topic: str) -> dict | set | str:
    """Lock the given topic to prevent it from being regenerated. Returns all topics, locked topics, and error.
    @Param allTopics = {
        'topic1': 'definition1',
        'topic2': 'definition2',
        ...
    }
    @Param lockedTopics = [
        'topic1',
        'topic2',
        ...
    ]
    @Param topic = Name of the topic to lock.
    @Return allTopics = Dictionary of all available topics and their definitions.
    @Return lockedTopics = List of topic names that have been locked.
    @Return error = Either '', 'input', or 'duplicate', where:
        '' = Empty string, meaning no error.
        'input' = Invalid input, meaning selecting a topic that does not exist.
        'duplicate' = Duplicate input, meaning adding a topic that already exists.
    """
    # Validate user input before performing action
    if(topic not in allTopics):
        return allTopics, lockedTopics, 'input'
    if(topic not in lockedTopics):
        lockedTopics.append(topic)
    return allTopics, lockedTopics, ''

def LockMany(allTopics: dict, lockedTopics: set, topics: set) -> dict | set | str:
    """Lock the given topics to prevent them from being regenerated. Returns all topics, locked topics, and error.
    @Param allTopics = {
        'topic1': 'definition1',
        'topic2': 'definition2',
        ...
    }
    @Param lockedTopics = [
        'topic1',
        'topic2',
        ...
    ]
    @Param topics # Names of the topics to lock.
    @Return allTopics = Dictionary of all available topics and their definitions.
    @Return lockedTopics = List of topic names that have been locked.
    @Return error = Either '', 'input', or 'duplicate', where:
        '' = Empty string, meaning no error.
        'input' = Invalid input, meaning selecting a topic that does not exist.
        'duplicate' = Duplicate input, meaning adding a topic that already exists.
    """
    # Simply send all topics to Lock, and if any of them fail then return without applying changes
    temp_allTopics = allTopics
    temp_lockedTopics = lockedTopics
    for topic in topics:
        temp_allTopics, temp_lockedTopics, error = Lock(temp_allTopics, temp_lockedTopics, topic)
        if(len(error) > 0):
            return allTopics, lockedTopics, error
    return temp_allTopics, temp_lockedTopics, ''

def Unlock(allTopics: dict, lockedTopics: list, topic: str) -> dict | set | str:
    """Unlock the given topic to alow it to be regenerated again. Returns all topics, locked topics, and error.
    @Param allTopics = {
        'topic1': 'definition1',
        'topic2': 'definition2',
        ...
    }
    @Param lockedTopics = [
        'topic1',
        'topic2',
        ...
    ]
    @Param topic = Name of the topic to unlock.
    @Return allTopics = Dictionary of all available topics and their definitions.
    @Return lockedTopics = List of topic names that have been locked.
    @Return error = Either '', 'input', or 'duplicate', where:
        '' = Empty string, meaning no error.
        'input' = Invalid input, meaning selecting a topic that does not exist.
        'duplicate' = Duplicate input, meaning adding a topic that already exists.
    """
    # Validate user input before performing action
    if(topic not in allTopics):
        return allTopics, lockedTopics, 'input'
    lockedTopics.remove(topic)
    return allTopics, lockedTopics, ''

def UnlockMany(allTopics: dict, lockedTopics: list, topics: list) -> dict | set | str:
    """Unlock the given topics to prevent them from being regenerated. Returns all topics, locked topics, and error.
    @Param allTopics = {
        'topic1': 'definition1',
        'topic2': 'definition2',
        ...
    }
    @Param lockedTopics = [
        'topic1',
        'topic2',
        ...
    ]
    @Param topics # Names of the topics to unlock.
    @Return allTopics = Dictionary of all available topics and their definitions.
    @Return lockedTopics = List of topic names that have been locked.
    @Return error = Either '', 'input', or 'duplicate', where:
        '' = Empty string, meaning no error.
        'input' = Invalid input, meaning selecting a topic that does not exist.
        'duplicate' = Duplicate input, meaning adding a topic that already exists.
    """
    # Simply send all topics to Unlock, and if any of them fail then return without applying changes
    temp_allTopics = allTopics
    temp_lockedTopics = lockedTopics
    for topic in topics:
        temp_allTopics, temp_lockedTopics, error = Unlock(temp_allTopics, temp_lockedTopics, topic)
        if(len(error) > 0):
            return allTopics, lockedTopics, error
    return temp_allTopics, temp_lockedTopics, ''

def Rename(allTopics: dict, lockedTopics: list, topic: str, newTopic: str, newDefn: str) -> dict | set | str:
    """Rename the given topic with a new name and definition. Returns all topics, locked topics, and error.
    @Param allTopics = {
        'topic1': 'definition1',
        'topic2': 'definition2',
        ...
    }
    @Param lockedTopics = [
        'topic1',
        'topic2',
        ...
    ]
    @Param topic = Name of the topic to rename.
    @Param: newTopic = Name of the new topic to add.
    @Param: newDefn = Definition of the new topic.
    @Return allTopics = Dictionary of all available topics and their definitions.
    @Return lockedTopics = List of topic names that have been locked.
    @Return error = Either '', 'input', or 'duplicate', where:
        '' = Empty string, meaning no error.
        'input' = Invalid input, meaning selecting a topic that does not exist.
        'duplicate' = Duplicate input, meaning adding a topic that already exists.
    """
    # Validate user input before performing action
    if(topic not in allTopics): # Selected topic does not exist
        return allTopics, lockedTopics, 'input'
    if(newTopic in allTopics and newDefn == allTopics[newTopic]): # Exact topic and definition already exists
        return allTopics, lockedTopics, 'duplicate'
    allTopics, lockedTopics, error = Remove(allTopics, lockedTopics, topic)
    allTopics[newTopic] = newDefn
    if(newTopic not in lockedTopics):
        lockedTopics.append(newTopic)
    return allTopics, lockedTopics, ''

def Add(allTopics: dict, lockedTopics: list, newTopic: str, newDefn: str) -> dict | set | str:
    """Add a new topic with a the given name and definition. Returns all topics, locked topics, and error.
    @Param allTopics = {
        'topic1': 'definition1',
        'topic2': 'definition2',
        ...
    }
    @Param lockedTopics = [
        'topic1',
        'topic2',
        ...
    ]
    @Param topic = Name of the topic to rename.
    @Param: newTopic = Name of the new topic to add.
    @Param: newDefn = Definition of the new topic.
    @Return allTopics = Dictionary of all available topics and their definitions.
    @Return lockedTopics = List of topic names that have been locked.
    @Return error = Either '', 'input', or 'duplicate', where:
        '' = Empty string, meaning no error.
        'input' = Invalid input, meaning selecting a topic that does not exist.
        'duplicate' = Duplicate input, meaning adding a topic that already exists.
    """
    # Validate user input before performing action
    if(newTopic in allTopics):
        return allTopics, lockedTopics, 'duplicate'
    allTopics[newTopic] = newDefn
    if(newTopic not in lockedTopics):
        lockedTopics.append(newTopic)
    return allTopics, lockedTopics, ''

def Remove(allTopics: dict, lockedTopics: list, topic: str) -> dict | set | str:
    """Remove the given topic from the list of topics. Returns all topics, locked topics, and error.
    @Param allTopics = {
        'topic1': 'definition1',
        'topic2': 'definition2',
        ...
    }
    @Param lockedTopics = [
        'topic1',
        'topic2',
        ...
    ]
    @Param topic = Name of the topic to remove.
    @Return allTopics = Dictionary of all available topics and their definitions.
    @Return lockedTopics = List of topic names that have been locked.
    @Return error = Either '', 'input', or 'duplicate', where:
        '' = Empty string, meaning no error.
        'input' = Invalid input, meaning selecting a topic that does not exist.
        'duplicate' = Duplicate input, meaning adding a topic that already exists.
    """
    # Validate user input before performing action
    if(topic not in allTopics):
        return allTopics, lockedTopics, 'input'
    if(topic in lockedTopics):
        lockedTopics.remove(topic)
    del allTopics[topic]
    return allTopics, lockedTopics, ''

def RemoveMany(allTopics: dict, lockedTopics: list, topics: list) -> dict | set | str:
    """Remove the given topics from the list of topics. Returns all topics, locked topics, and error.
    @Param allTopics = {
        'topic1': 'definition1',
        'topic2': 'definition2',
        ...
    }
    @Param lockedTopics = [
        'topic1',
        'topic2',
        ...
    ]
    @Param topics # Names of the topics to remove.
    @Return allTopics = Dictionary of all available topics and their definitions.
    @Return lockedTopics = List of topic names that have been locked.
    @Return error = Either '', 'input', or 'duplicate', where:
        '' = Empty string, meaning no error.
        'input' = Invalid input, meaning selecting a topic that does not exist.
        'duplicate' = Duplicate input, meaning adding a topic that already exists.
    """
    # Simply send all topics to Remove, and if any of them fail then return without applying changes
    temp_allTopics = allTopics
    temp_lockedTopics = lockedTopics
    for topic in topics:
        temp_allTopics, temp_lockedTopics, error = Remove(temp_allTopics, temp_lockedTopics, topic)
        if(len(error) > 0):
            return allTopics, lockedTopics, error
    return temp_allTopics, temp_lockedTopics, ''

def Regenerate(allTopics: dict, lockedTopics: list, reading_materials: str) -> dict | set | str:
    """Regenerate all unlocked topics from the given reading materials. Returns all topics, locked topics, and error.
    @Param allTopics = {
        'topic1': 'definition1',
        'topic2': 'definition2',
        ...
    }
    @Param lockedTopics = [
        'topic1',
        'topic2',
        ...
    ]
    @Param reading_materials = A single string of the reading materials.
    @Return allTopics = Dictionary of all available topics and their definitions.
    @Return lockedTopics = List of topic names that have been locked.
    @Return error = Either '', 'input', or 'duplicate', where:
        '' = Empty string, meaning no error.
        'input' = Invalid input, meaning selecting a topic that does not exist.
        'duplicate' = Duplicate input, meaning adding a topic that already exists.
    """
    # Remove all unlocked topics
    topicsToRemove = []
    for topic in allTopics.keys():
        if(topic not in lockedTopics):
            topicsToRemove.append(topic)
    for topic in topicsToRemove:
        del allTopics[topic]

    # Add the newly generated topics
    newTopicsDesc = RM.RegenerateTopicsDescriptions(reading_materials, lockedTopics, force=True)
    for topic, desc in newTopicsDesc.items():
        allTopics[topic] = desc
    return allTopics, lockedTopics, ''