import * as React from 'react';
import { Button, DialogContent, Card } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { graphql, useMutation, useFragment } from 'react-relay';

import type { QuoteFragment$key } from '@local/__generated__/QuoteFragment.graphql';
import type { QuoteMutation } from '@local/__generated__/QuoteMutation.graphql';
import { useEvent } from '@local/features/events';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { QuestionForm, QuestionFormProps } from '../QuestionForm';
import { QuestionAuthor } from '../QuestionAuthor';
import { QuestionContent } from '../QuestionContent';
import * as ga from '@local/utils/ga/index';
import { isURL } from '@local/utils';
import { QUESTIONS_MAX_LENGTH } from '@local/utils/rules';
import { useSnack } from '@local/core';

interface QuoteProps {
    className?: string;
    fragmentRef: QuoteFragment$key;
}

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        marginBottom: theme.spacing(3),
    },
}));

const QUOTE_MUTATION = graphql`
    mutation QuoteMutation($input: CreateQuestion!) {
        createQuestion(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                }
            }
        }
    }
`;

export const QUOTE_FRAGMENT = graphql`
    fragment QuoteFragment on EventQuestion {
        id
        ...QuestionAuthorFragment
        ...QuestionContentFragment
    }
`;

export function Quote({ className, fragmentRef }: QuoteProps) {
    const [isOpen, open, close] = useResponsiveDialog(false);
    const { eventId } = useEvent();
    const classes = useStyles();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<QuoteMutation>(QUOTE_MUTATION);
    const data = useFragment(QUOTE_FRAGMENT, fragmentRef);

    const handleSubmit: QuestionFormProps['onSubmit'] = (form) => {
        try {
            // Validate length and url presence before submitting to avoid unessisary serverside validation
            if (form.question.length > QUESTIONS_MAX_LENGTH) throw new Error('Question is too long!');
            if (isURL(form.question)) throw new Error('no links are allowed!');
            commit({
                variables: {
                    input: {
                        ...form,
                        eventId,
                        isQuote: true,
                        refQuestion: data.id,
                    },
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
                        close();
                        displaySnack('Question submitted!', { variant: 'success' });
                    } catch (err) {
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!');
                    }
                },
            });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!');
        }
    };

    const quote = React.useMemo(
        () => (
            <Card className={classes.card}>
                <QuestionAuthor fragmentRef={data} />
                <QuestionContent fragmentRef={data} />
            </Card>
        ),
        [data, classes]
    );

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <QuestionForm onSubmit={handleSubmit} quote={quote} onCancel={close} />
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
