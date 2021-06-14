import * as React from 'react';
import { Button, DialogContent } from '@material-ui/core';
import QuoteIcon from '@material-ui/icons/FormatQuoteOutlined';
import { graphql, useMutation, useFragment } from 'react-relay';

import type { QuoteFragment$key } from '@local/__generated__/QuoteFragment.graphql';
import type { QuoteMutation } from '@local/__generated__/QuoteMutation.graphql';
import { useEvent } from '@local/features/events';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { QuestionForm, QuestionFormProps } from '../QuestionForm';
import { QuestionCard } from '../QuestionCard';

interface QuoteProps {
    className?: string;
    connections: string[];
    fragmentRef: QuoteFragment$key;
}

const QUOTE_MUTATION = graphql`
    mutation QuoteMutation($input: CreateQuestion!, $connections: [ID!]!) {
        createQuestion(input: $input) {
            isError
            message
            body @appendEdge(connections: $connections) {
                cursor
                node {
                    id
                    ...QuestionCardFragment
                }
            }
        }
    }
`;

export const QUOTE_FRAGMENT = graphql`
    fragment QuoteFragment on EventQuestion {
        id
        ...QuestionCardFragment
    }
`;

export function Quote({ className, connections, fragmentRef }: QuoteProps) {
    const [isOpen, open, close] = useResponsiveDialog(false);
    const { eventId } = useEvent();

    const [commit] = useMutation<QuoteMutation>(QUOTE_MUTATION);
    const data = useFragment(QUOTE_FRAGMENT, fragmentRef);

    const handleSubmit: QuestionFormProps['onSubmit'] = (submittedForm) => {
        commit({
            variables: {
                input: {
                    ...submittedForm,
                    eventId,
                    refQuestion: data.id,
                },
                connections,
            },
        });
        close();
    };

    const quote = React.useMemo(() => <QuestionCard fragmentRef={data} />, [data]);

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <QuestionForm onSubmit={handleSubmit} quote={quote} onCancel={close} />
                </DialogContent>
            </ResponsiveDialog>
            <Button
                color='inherit'
                onClick={open}
                endIcon={<QuoteIcon fontSize='small' />}
                fullWidth
                className={className}
            >
                Quote
            </Button>
        </>
    );
}
