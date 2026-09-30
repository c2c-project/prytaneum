import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';
import { Question, Topic } from '../../types';

// NOTE: Should always order the onDeck list from lowest to highest
// That way, whenever the list is empty and a new one is added (which is set to the time in ms),
// it will always be after the current question.
export interface CalculateOnDeckDequeuePositionProps {
    list: Question[];
    movedQuestionIndex: number;
    currentTopic: string;
}

export const calculateOnDeckDequeuePosition = ({
    list,
    movedQuestionIndex,
    currentTopic,
}: CalculateOnDeckDequeuePositionProps) => {
    // If the list is length 1 then it is likely the first item added to the list, calculate a new position
    if (!list || list.length <= 1) {
        const currentTimeMs = new Date().getTime();
        const currentTimeMsStr = currentTimeMs.toString();
        const calculatedPosition = parseInt(currentTimeMsStr);
        return calculatedPosition;
    }

    // The source indx is useless here since we are moving from a different list, can only use destination index
    // The destination index will be where the moved quesiton is as the list is updated while moving it.
    // Should check if there at the end of the list or the start of the list
    // If not, then calculate the position based on the two questions around it
    // Already handled case with it being the first, so if the index is 0 then there should be at least one question below it
    if (movedQuestionIndex === 0) {
        // If the index is 0 then the new position should be less than the next question in the list
        const nextQuestion = list[movedQuestionIndex + 1];
        const nextQuestionTopic = nextQuestion?.topics?.find((t) => t.topic === currentTopic);
        const nextQuestionPosition = !nextQuestionTopic
            ? parseInt(nextQuestion.position)
            : parseInt(nextQuestionTopic.position);
        // NOTE: race condition, since we're using time for ordering, then adding 1000 ms (1s) will mean that the order
        // at the very end may be messed up, but that's okay, the start is what's important
        return nextQuestionPosition - 1000;
    }

    // In this case we should have at least one question above it to reference and calculate the new position
    const prevQuestion = list[movedQuestionIndex - 1];
    const previousQuestionTopic = prevQuestion?.topics?.find((t) => t.topic === currentTopic);
    const prevQuestionPosition = !previousQuestionTopic
        ? parseInt(prevQuestion.position)
        : parseInt(previousQuestionTopic.position);
    const nextQuestion = list[movedQuestionIndex + 1];
    if (!nextQuestion) {
        // If there is no next question then the new position should be greater than the previous question
        return prevQuestionPosition + 1000;
    }
    // If there is a next question then the new position should be between the previous and next question
    const nextQuestionTopic = nextQuestion?.topics?.find((t) => t.topic === currentTopic);
    const nextQuestionPosition = !nextQuestionTopic
        ? parseInt(nextQuestion.position)
        : parseInt(nextQuestionTopic.position);
    const position = Math.round((prevQuestionPosition + nextQuestionPosition) / 2);
    if (position < -1) throw new Error('Invalid position');
    return position;
};

export interface CalculateOnDeckEnqueuePositionProps {
    list: Question[];
    movedQuestionIndex: number;
    currentQuestionPosition: number;
}

// TODO: Still an issue with adding it to places other than the top of the list (issue on subscriptoin side)
// NOTE: Should always order the onDeck list from lowest to highest
// That way, whenever the list is empty and a new one is added (which is set to the time in ms),
// it will always be after the current question.
export const calculateOnDeckEnqueuePosition = ({
    list,
    movedQuestionIndex,
    currentQuestionPosition,
}: CalculateOnDeckEnqueuePositionProps) => {
    // If the list is length 1 then it is likely the first item added to the list, calculate a new position
    if (!list || (list.length <= 1 && currentQuestionPosition === -1)) {
        const currentTimeMs = new Date().getTime();
        const currentTimeMsStr = currentTimeMs.toString();
        const calculatedPosition = parseInt(currentTimeMsStr);
        return calculatedPosition;
    } else if (!list || list.length <= 1) {
        // If the list is length 1 and the current question position is not -1 then there is a curr question and an empty on Deck queue
        // so we can use the current question position to calculate the new position or just use time since it will be later
        const currentTimeMs = new Date().getTime();
        const currentTimeMsStr = currentTimeMs.toString();
        const calculatedPosition = parseInt(currentTimeMsStr);
        if (calculatedPosition < currentQuestionPosition) throw new Error('Invalid position');
        return calculatedPosition;
    }

    // The source indx is useless here since we are moving from a different list, can only use destination index
    // The destination index will be where the moved quesiton is as the list is updated while moving it.
    // Should check if there at the end of the list or the start of the list
    // If not, then calculate the position based on the two questions around it
    // Already handled case with it being the first, so if the index is 0 then there should be at least one question below it
    if (movedQuestionIndex === 0) {
        // If the index is 0 then the new position should be less than the next question in the list
        const nextQuestion = list[movedQuestionIndex + 1];
        if (nextQuestion.onDeckPosition === '-1') throw new Error('Invalid next question position');
        const nextQuestionPosition = parseInt(nextQuestion.onDeckPosition);
        // NOTE: race condition, since we're using time for ordering, then adding 1000 ms (1s) will mean that the order
        // at the very end may be messed up, but that's okay, the start is what's important

        // If there is no next question then the new position just needs to be less than the current question
        if (currentQuestionPosition === -1) return nextQuestionPosition - 1000;
        const diff = Math.abs(nextQuestionPosition - currentQuestionPosition);
        return Math.round(currentQuestionPosition + diff / 2);
    }

    // In this case we should have at least one question above it to reference and calculate the new position
    const prevQuestion = list[movedQuestionIndex - 1];
    const prevQuestionPosition = parseInt(prevQuestion.onDeckPosition);
    if (prevQuestionPosition === -1) throw new Error('Invalid previous question position');
    const nextQuestion = list[movedQuestionIndex + 1];
    // If there is no next question then we should be at the end of the list
    if (!nextQuestion) {
        // If there is no next question then the new position should be greater than the previous question
        return prevQuestionPosition + 1000;
    }
    const nextQuestionPosition = parseInt(nextQuestion.onDeckPosition);
    // If there is a next question then the new position should be between the previous and next question
    // Since the numbers are so large (time in ms) then we can just find the difference and add half of it to the previous question
    const diff = Math.abs(nextQuestionPosition - prevQuestionPosition);
    if (diff <= 0) throw new Error('Invalid difference');
    const position = Math.round(prevQuestionPosition + diff / 2);
    if (position < -1) throw new Error('Invalid position');
    return position;
};

export interface OnDeckEnqueuedMutationUpdaterProps {
    store: RecordSourceSelectorProxy<{}>;
    connections: string[];
    eventId: string;
    questionId: string;
    topics: readonly Topic[];
}

export const onDeckEnqueuedMutationUpdater = ({
    store,
    connections,
    eventId,
    questionId,
    topics,
}: OnDeckEnqueuedMutationUpdaterProps) => {
    const eventRecord = store.get(eventId);
    if (!eventRecord) return console.error('Event Record not found');

    // Remove from modQueue
    const modQueueConnectionRecord = ConnectionHandler.getConnection(
        eventRecord,
        'useQuestionModQueueFragment_questionModQueue'
    );
    if (modQueueConnectionRecord) {
        ConnectionHandler.deleteNode(modQueueConnectionRecord, questionId);
    }

    // Add to onDeck
    const onDeckConnection = store.get(connections[0]);
    if (!onDeckConnection) return console.error('Update failed: On Deck connection not found!');
    const payload = store.getRootField('addQuestionToOnDeck');
    if (!payload) return console.error('Update failed: No payload found!');
    const questionEdge = payload.getLinkedRecord('body');
    if (!questionEdge) return console.error('Update failed: Question not found!');
    ConnectionHandler.insertEdgeAfter(onDeckConnection, questionEdge);

    // Start with default, then remove the question from all question lists
    const defaultConnectionRecord = ConnectionHandler.getConnection(
        eventRecord,
        'useQuestionsByTopicFragment_questionsByTopic',
        { topic: 'default' }
    );
    if (defaultConnectionRecord) {
        ConnectionHandler.deleteNode(defaultConnectionRecord, questionId);
    }

    topics.forEach(({ topic }) => {
        const connectionRecord = ConnectionHandler.getConnection(
            eventRecord,
            'useQuestionsByTopicFragment_questionsByTopic',
            { topic }
        );
        if (connectionRecord) {
            ConnectionHandler.deleteNode(connectionRecord, questionId);
        }
    });
};

// NOTE: At this point the list is already updated on client
// So the destIndex is the list should give us the moved question (but pos is not updated yet)
// Can use this index to find relative question's positions

export const calculateUpdateOnDeckPosition = (
    list: Question[],
    destIndex: number, // Destination index is where the question is going to
    currentQuestionPosition: number // The current question's position (new pos never smaller than this)
) => {
    // Since we are re-ordering, we can assume there are at least 2 questions to work with.
    // First handle if being moved to the top of the list
    if (destIndex === 0) {
        // Should be a question after this, but need to check if a current question exists first
        const nextQuestion = list[1];
        const nextQuestionPosition = parseInt(nextQuestion.onDeckPosition);
        if (currentQuestionPosition === -1) {
            return nextQuestionPosition - 1000;
        } else {
            // Can use both positions to calculate new position in between
            const diff = Math.abs(nextQuestionPosition - currentQuestionPosition);
            const halfDiff = Math.round(diff / 2);
            return currentQuestionPosition + halfDiff;
        }
    }

    // Handle if being moved to the bottom of the list
    if (destIndex === list.length - 1) {
        // Should be a question before this, can use that to calculate new position
        const prevQuestion = list[list.length - 2];
        const prevQuestionPosition = parseInt(prevQuestion.onDeckPosition);
        return prevQuestionPosition + 1000;
    }

    // Handle if being moved to the middle of the list
    const nextQuestion = list[destIndex + 1];
    const prevQuestion = list[destIndex - 1];
    const nextQuestionPosition = parseInt(nextQuestion.onDeckPosition);
    const prevQuestionPosition = parseInt(prevQuestion.onDeckPosition);
    const diff = Math.abs(nextQuestionPosition - prevQuestionPosition);
    const halfDiff = Math.round(diff / 2);
    return prevQuestionPosition + halfDiff;
};
