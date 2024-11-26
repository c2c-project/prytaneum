import * as React from 'react';
import { useFragment } from 'react-relay';
import { Stack, Menu, MenuItem, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
    QuestionAuthor,
    QuestionStats,
    QuestionContent,
    QuestionQuote,
    QuestionTopics,
    QuestionCard,
} from '@local/components/ui/Question';
import { QUESTION_ACTIONS_FRAGMENT } from '../Questions/QuestionActions';
import { Question } from './types';
import { QueueButton } from '../Questions/QuestionActions/QueueButton';
import { QuestionActionsFragment$key } from '@local/__generated__/QuestionActionsFragment.graphql';
import { useHideQuestion } from '../Questions/QuestionActions/useHideQuestion';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    question: Question;
    connections: string[];
    deleteEnabled?: boolean;
    queueEnabled?: boolean;
    heldQuestion?: boolean;
    measure?: () => void;
}

/**
 * @description EventQuestion component that displays only on the moderator view
 */
export default function EventQuestion({
    question,
    deleteEnabled = true,
    queueEnabled = true,
    heldQuestion = false,
    measure,
}: Props) {
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('xl'));
    const data = useFragment<QuestionActionsFragment$key>(QUESTION_ACTIONS_FRAGMENT, question);
    const [anchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const anchored = Boolean(anchorEl);
    const { handleClick } = useHideQuestion({ questionId: question.id.toString() });

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setMenuAnchorEl(null);
    };

    const handleDelete = () => {
        handleClick();
        handleClose();
    };

    return (
        <QuestionCard
            sx={{
                opacity: heldQuestion ? 0.9 : 1,
                backdropFilter: heldQuestion ? 'blur(20px)' : 'none',
            }}
        >
            <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1}>
                <QuestionAuthor fragmentRef={question} />
                <Stack
                    direction={lgDownBreakpoint ? 'column-reverse' : 'row'}
                    alignItems='center'
                    sx={{ paddingRight: '0.25rem' }}
                >
                    <QuestionStats fragmentRef={question} />
                    {queueEnabled && <QueueButton fragmentRef={data} />}
                    {deleteEnabled && (
                        <div>
                            <IconButton onClick={handleOpen}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={anchored} onClick={handleClose}>
                                <MenuItem onClick={handleDelete}>
                                    <DeleteIcon color='error' />
                                    <Typography color='error'>Delete</Typography>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Stack>
            </Stack>
            {question?.refQuestion && <QuestionQuote fragmentRef={question.refQuestion} />}
            <QuestionContent fragmentRef={question} measure={measure} />
            <QuestionTopics fragmentRef={question} />
        </QuestionCard>
    );
}
