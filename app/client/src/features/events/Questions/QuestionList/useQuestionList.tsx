import * as React from 'react';
import { GraphQLSubscriptionConfig, ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';
import { useSubscription, graphql, useFragment } from 'react-relay';

import type { useQuestionListSubscription } from '@local/__generated__/useQuestionListSubscription.graphql';
import type { useQuestionListFragment$key } from '@local/__generated__/useQuestionListFragment.graphql';

export const USE_QUESTION_LIST_SUBSCRIPTION = graphql`
    subscription useQuestionListSubscription($eventId: ID!) {
        questionCRUD(eventId: $eventId) {
            operationType
            edge {
                cursor
                node {
                    id
                    position
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

// TODO: make the pagination here better
export const USE_QUESTION_LIST_FRAGMENT = graphql`
    fragment useQuestionListFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        id
        questions(first: $first, after: $after) @connection(key: "useQuestionListFragment_questions") {
            __id
            edges {
                cursor
                node {
                    id
                    question
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment
                    }
                    ...QuestionActionsFragment
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

interface TArgs {
    fragmentRef: useQuestionListFragment$key;
}

type TSubscriptionStore = RecordSourceSelectorProxy<useQuestionListSubscription['response']>;
type TSubscriptionData = useQuestionListSubscription['response'];
function createQuestion(store: TSubscriptionStore, data: TSubscriptionData, eventId: string) {
    // get the root event record based on the eventId
    const eventRecord = store.get(eventId);

    // if not found then don't continue -- this component shouldn't be rendered in this case/other issues are present
    if (!eventRecord) return;

    // get the connection for event -> questions (defined towards top of file)
    // CR = connection record
    const eventQuestionCR = ConnectionHandler.getConnection(
        eventRecord,
        'useQuestionListFragment_questions' // (defined towards top of file)
    );

    // if no connection is found, then there's nothing to connect
    if (!eventQuestionCR) return;

    // // check if the connection record already exists on the edges
    // // if it does, then don't do anything
    // const connectionEdges = eventQuestionCR.getLinkedRecords('edges');
    // const found = connectionEdges?.find((record) => {
    //     const value = record.getLinkedRecord('node')?.getDataID();
    //     return value === data.questionCRUD.edge.node.id;
    // });
    // if (found) return;

    // the edge is the payload itself from the subscription
    const payload = store.getRootField('questionCRUD');
    const edge = payload.getLinkedRecord('edge');
    if (!edge) return;

    // build the edge
    const newEdge = ConnectionHandler.buildConnectionEdge(store, eventQuestionCR, edge);

    // if there's no edge built for some reason then don't do anything
    if (!newEdge) return;

    // insert the edge inside of the connection
    ConnectionHandler.insertEdgeBefore(eventQuestionCR, newEdge);
}

/** no implementation needed, relay does this for us */
function updateQuestion() {}

/** unimplemented for now since users may not delete questions at the moment */
function deleteQuestion() {}

export function useQuestionList({ fragmentRef }: TArgs) {
    // const [state, dispatch] = React.useReducer(reducer, initialState);
    const { questions, id: eventId } = useFragment(USE_QUESTION_LIST_FRAGMENT, fragmentRef);
    const questionList = React.useMemo(
        () => (questions?.edges ? questions.edges.map(({ node }) => node) : []),
        [questions]
    );

    const config = React.useMemo<GraphQLSubscriptionConfig<useQuestionListSubscription>>(
        () => ({
            variables: { eventId },
            subscription: USE_QUESTION_LIST_SUBSCRIPTION,
            // onCompleted() {},
            // https://relay.dev/docs/guided-tour/updating-data/graphql-subscriptions/
            updater(store, data) {
                if (data.questionCRUD.operationType === 'CREATE') createQuestion(store, data, eventId);
                if (data.questionCRUD.operationType === 'UPDATE') updateQuestion();
                if (data.questionCRUD.operationType === 'DELETE') deleteQuestion();
            },
        }),
        [eventId]
    );

    useSubscription(config);

    return { questions: questionList, eventId, connections: questions?.__id ? [questions.__id] : [] };
}
