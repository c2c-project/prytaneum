import * as React from 'react';
import { Button, DialogContent, Card } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { graphql, useMutation, useFragment } from 'react-relay';

import type { QuoteFragment$key } from '@local/__generated__/QuoteFragment.graphql';
import type { QuoteMutation } from '@local/__generated__/QuoteMutation.graphql';
import { useEvent } from '@local/features/events';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { QuestionForm, QuestionFormProps } from '../QuestionForm';
import { QuestionAuthor, QuestionContent } from '@local/components/ui/Question';
import * as ga from '@local/utils/ga/index';
import { isURL } from '@local/utils';
import { QUESTIONS_MAX_LENGTH } from '@local/utils/rules';
import { useSnack } from '@local/core';
import { useUser } from '@local/features/accounts';

const QUOTE_MUTATION = graphql`
    mutation QuoteMutation($input: CreateQuestion!, $connections: [ID!]!, $lang: String!) @raw_response_type {
        createQuestion(input: $input) {
            isError
            message
            body @prependEdge(connections: $connections) {
                cursor
                node {
                    id
                    question
                    position
                    onDeckPosition
                    topics {
                        topic
                        description
                        position
                    }
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $lang)
                    }
                    ...QuestionActionsFragment @arguments(lang: $lang)
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

export const QUOTE_FRAGMENT = graphql`
    fragment QuoteFragment on EventQuestion @argumentDefinitions(lang: { type: "String!" }) {
        id
        ...QuestionAuthorFragment
        ...QuestionContentFragment @arguments(lang: $lang)
    }
`;

interface QuoteProps {
    className?: string;
    fragmentRef: QuoteFragment$key;
    connections: string[];
}

export function Quote({ className, fragmentRef, connections }: QuoteProps) {
    const [isOpen, open, close] = useResponsiveDialog(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const { eventId } = useEvent();
    const { user } = useUser();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<QuoteMutation>(QUOTE_MUTATION);
    const data = useFragment(QUOTE_FRAGMENT, fragmentRef);

    // TODO: Try to get optimistic update working for this (issue with id clashing on the reference question)
    // Might just have to have a loader for quoted questions for now since they are more complex
    const handleSubmit: QuestionFormProps['onSubmit'] = (form) => {
        try {
            // Used for optimistic update
            // const generatedId = toGlobalId('EventQuestion', generateUUID());
            // Validate length and url presence before submitting to avoid unessisary serverside validation
            if (form.question.length > QUESTIONS_MAX_LENGTH) throw new Error('Question is too long!');
            if (isURL(form.question)) throw new Error('no links are allowed!');
            setIsLoading(true);
            commit({
                variables: {
                    input: {
                        ...form,
                        eventId,
                        isQuote: true,
                        refQuestion: data.id,
                    },
                    connections,
                    lang: user?.preferredLang || 'EN',
                },
                onCompleted(payload) {
                    try {
                        if (payload.createQuestion.isError) throw new Error(payload.createQuestion.message);
                        ga.event({
                            action: 'submit_question',
                            category: 'questions',
                            label: 'live event',
                            value: form.question,
                        });
                        setIsLoading(false);
                        close();
                        displaySnack('Question submitted!', { variant: 'success' });
                    } catch (err) {
                        setIsLoading(false);
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!');
                    }
                },
                onError(err) {
                    setIsLoading(false);
                    setIsLoading(false);
                    displaySnack(err.message, { variant: 'error' });
                },
                // optimisticUpdater: (store) => {
                //     // Get the record for the Feedback object
                //     const eventRecord = store.get(eventId);
                //     if (!eventRecord) return console.error('Optimistic update failed: Event record not found!');
                //     // Get the connection for the question list
                //     const connection = ConnectionHandler.getConnectionID(
                //         eventRecord.getDataID(),
                //         'useQuestionListFragment_questions'
                //     );
                //     // Need to do this workaround because the compiler in current version doesn't allow correctly naming the connection with _connection at the end.
                //     const connectionId = connection + '(topic:"default")';
                //     const connectionRecord = store.get(connectionId);
                //     if (!connectionRecord)
                //         return console.error('Optimistic update failed: Connection record not found!');

                //     const quotedQuestionRecord = store.get(data.id);
                //     if (!quotedQuestionRecord)
                //         return console.error('Optimistic update failed: Quoted question record not found!');

                //     // Create a new local EventQuestion from scratch
                //     const id = `client:createQuestion:${generatedId}`;
                //     const newQuestionRecord = store.create(id, 'EventQuestion');
                //     const userRecord = store.get(user?.id || '');
                //     if (!userRecord) return console.error('Optimistic update failed: User record not found!');
                //     // Set the values for the new question (doesn't display values otherwise even though they are in the optimistic response for some reason)
                //     newQuestionRecord.setValue(form.question, 'question');
                //     newQuestionRecord.setValue(new Date().toISOString(), 'createdAt');
                //     newQuestionRecord.setLinkedRecord(userRecord, 'createdBy');
                //     newQuestionRecord.setLinkedRecord(quotedQuestionRecord, 'refQuestion');

                //     // Create new edge from scratch
                //     const newEdge = ConnectionHandler.createEdge(
                //         store,
                //         connectionRecord,
                //         newQuestionRecord,
                //         'EventQuestionEdge' /* GraphQl Type for edge */
                //     );

                //     // Add edge to the start of the connection (top of the list)
                //     ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
                //     // Should be safe to close the dialog now that the optimistic question should be visible
                //     if (isOpen) close();
                // },
                // optimisticResponse: {
                //     createQuestion: {
                //         isError: false,
                //         message: '',
                //         body: {
                //             cursor: new Date().getTime().toString(),
                //             node: {
                //                 id: generatedId,
                //                 createdAt: null,
                //                 question: form.question,
                //                 createdBy: {
                //                     id: user?.id || '',
                //                     firstName: user?.firstName || '',
                //                     lastName: user?.lastName || '',
                //                     avatar: user?.avatar || '',
                //                 },
                //                 refQuestion: {
                //                     id: data.id,
                //                     createdAt: new Date(),
                //                     question: '',
                //                     createdBy: {
                //                         id: data.createdBy?.id || '',
                //                         firstName: '',
                //                         lastName: '',
                //                         avatar: '',
                //                     },
                //                 },
                //             },
                //         },
                //     },
                // },
            });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!');
        }
    };

    const quote = React.useMemo(
        () => (
            <Card sx={{ width: '100%', marginBottom: (theme) => theme.spacing(3) }}>
                <QuestionAuthor fragmentRef={data} />
                <QuestionContent fragmentRef={data} />
            </Card>
        ),
        [data]
    );

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <QuestionForm onSubmit={handleSubmit} quote={quote} onCancel={close} isLoading={isLoading} />
                </DialogContent>
            </ResponsiveDialog>
            <Button
                color='inherit'
                onClick={open}
                endIcon={<FormatQuoteIcon fontSize='small' />}
                fullWidth
                className={className}
            >
                Quote
            </Button>
        </React.Fragment>
    );
}
