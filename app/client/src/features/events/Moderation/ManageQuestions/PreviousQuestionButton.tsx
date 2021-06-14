import { Button, ButtonProps } from '@material-ui/core';
import { graphql, useMutation } from 'react-relay';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import type { PreviousQuestionButtonMutation } from '@local/__generated__/PreviousQuestionButtonMutation.graphql';
import { useEvent } from '../../useEvent';

export const PREVIOUS_QUESTION_BUTTON_MUTATION = graphql`
    mutation PreviousQuestionButtonMutation($eventId: ID!) {
        prevQuestion(eventId: $eventId)
    }
`;

export function PreviousQuestionButton(props: ButtonProps) {
    const { eventId } = useEvent();
    const [commit] = useMutation<PreviousQuestionButtonMutation>(PREVIOUS_QUESTION_BUTTON_MUTATION);
    const handleClick = () => {
        commit({
            variables: {
                eventId,
            },
        });
    };

    return (
        <Button {...props} onClick={handleClick} startIcon={<SkipPreviousIcon />}>
            Previous Question
        </Button>
    );
}
