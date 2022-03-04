import { Button, ButtonProps } from '@mui/material';
import { graphql, useMutation } from 'react-relay';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import type { NextQuestionButtonMutation } from '@local/__generated__/NextQuestionButtonMutation.graphql';
import { useEvent } from '../../useEvent';

export const NEXT_QUESTION_BUTTON_MUTATION = graphql`
    mutation NextQuestionButtonMutation($eventId: ID!) {
        nextQuestion(eventId: $eventId) {
            id
            currentQuestion
        }
    }
`;

export function NextQuestionButton(props: ButtonProps) {
    const { eventId } = useEvent();
    const [commit] = useMutation<NextQuestionButtonMutation>(NEXT_QUESTION_BUTTON_MUTATION);
    const handleClick = () => {
        commit({
            variables: {
                eventId,
            },
        });
    };

    return (
        <Button {...props} onClick={handleClick} startIcon={<SkipNextIcon />}>
            Next Question
        </Button>
    );
}
