import React from 'react';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useEvent } from '../useEvent';
import { graphql, useFragment, useMutation } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, DialogContent, Typography } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import { LiveFeedbackForm, LiveFeedbackFormProps } from './LiveFeedbackForm';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';
import { LiveFeedbackReplyFragment$key } from '@local/__generated__/LiveFeedbackReplyFragment.graphql';
import { LIVE_FEEDBACK_REPLY_FRAGMENT } from './LiveFeedbackReply';
import { LiveFeedbackReplyActionMutation } from '@local/__generated__/LiveFeedbackReplyActionMutation.graphql';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        marginBottom: theme.spacing(3),
    },
}));

const LIVE_FEEDBACK_REPLY_ACTION_MUTATION = graphql`
    mutation LiveFeedbackReplyActionMutation($input: CreateFeedback!) {
        createFeedback(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    message
                    ...LiveFeedbackAuthorFragment
                }
            }
        }
    }
`;

interface Props {
    fragmentRef: LiveFeedbackReplyFragment$key
}

export function LiveFeedbackReplyAction({ fragmentRef }: Props) {
    const [isOpen, open, close] = useResponsiveDialog(false);
    const { eventId } = useEvent();
    const classes = useStyles();

    const [commit] = useMutation<LiveFeedbackReplyActionMutation>(LIVE_FEEDBACK_REPLY_ACTION_MUTATION);
    const data = useFragment(LIVE_FEEDBACK_REPLY_FRAGMENT, fragmentRef);

    const handleSubmit: LiveFeedbackFormProps['onSubmit'] = (submittedForm) => {
        commit({
            variables: {
                input: {
                    ...submittedForm,
                    eventId,
                    isReply: true,
                    refFeedbackId: data.id,
                },
            },
        });
        close();
    };

    const reply = React.useMemo(
        () => (
            <Card className={classes.card}>
                <LiveFeedbackAuthor fragmentRef={data} />
                <CardContent>
                    <Typography style={{ wordBreak: 'break-word'}}>{data.message}</Typography>
                </CardContent>
            </Card>
        ),
        [data, classes]
    );

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <LiveFeedbackForm onSubmit={handleSubmit} reply={reply} onCancel={close} />
                </DialogContent>
            </ResponsiveDialog>
            <Button
                color='inherit'
                onClick={open}
                startIcon={<ReplyIcon fontSize='small' />}
                fullWidth
            >
                Reply
            </Button>
        </>
    );
}
