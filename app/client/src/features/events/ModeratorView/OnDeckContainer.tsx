import * as React from 'react';
import {
    Typography,
    Stack,
    Box,
    Grid,
    Select,
    MenuItem,
    Paper,
    Tooltip,
    SelectChangeEvent,
    List,
    ListItem,
} from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import InfoIcon from '@mui/icons-material/Info';

import { Question } from './types';
import { SortableQuestion } from './SortableQuestion';
import EventQuestion from './EventQuestion';

interface Props {
    id: UniqueIdentifier;
    questions: Question[];
    questionRecord: Question[];
    connections: string[];
}

// TODO: Fix the workaround height issue
export function OnDeckContainer({ id, questions, questionRecord, connections }: Props) {
    const { setNodeRef } = useDroppable({ id });
    const [onDeckSelection, setOnDeckSelection] = React.useState<'upcoming' | 'previous'>('upcoming');

    const handleSelectionChange = (event: SelectChangeEvent<'upcoming' | 'previous'>) => {
        setOnDeckSelection(event.target.value as 'upcoming' | 'previous');
    };

    const prevQuestions = React.useMemo(
        () => (questionRecord.length > 0 ? questionRecord.slice(0, -1).reverse() : []), // removes current question from display in tab for previous questions
        [questionRecord]
    );

    const OnDeckEmptyBox = () => {
        return (
            <Grid container paddingRight={1}>
                <Box
                    ref={setNodeRef}
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        width: '100%',
                        minHeight: '250px',
                        maxHeight: '100%',
                        borderRadius: 1,
                        bgcolor: (theme) => theme.palette.grey[300],
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                        borderWidth: 3,
                        borderColor: (theme) => theme.palette.grey[500],
                        borderStyle: 'dashed',
                        marginLeft: '0.5rem',
                        marginTop: '0.5rem',
                    }}
                >
                    <Typography align='center' variant='body1' marginTop='1rem'>
                        Drag and drop questions from the question queue to here to start the On Deck Queue.
                    </Typography>
                </Box>
            </Grid>
        );
    };

    const ListHeader = () => {
        if (onDeckSelection === 'upcoming' && questions.length === 0) {
            return <OnDeckEmptyBox />;
        }
        if (onDeckSelection === 'upcoming') {
            return (
                <Grid
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        color: '#B5B5B5',
                    }}
                >
                    <Typography variant='caption'>Drag and drop questions to re-order on deck</Typography>
                </Grid>
            );
        }
        return <div style={{ paddingBlock: '0.5rem' }} />;
    };

    return (
        <Stack direction='column' maxHeight={0} width='100%'>
            <Paper sx={{ padding: 1 }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Select
                        value={onDeckSelection}
                        onChange={handleSelectionChange}
                        fullWidth
                        sx={{
                            height: 'min-content',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: 'small',
                            fontWeight: 600,
                        }}
                    >
                        <MenuItem
                            value='upcoming'
                            sx={{ textTransform: 'uppercase', fontSize: 'small', fontWeight: 600, borderRadius: '5px' }}
                        >
                            Upcoming
                        </MenuItem>
                        <MenuItem
                            value='previous'
                            sx={{ textTransform: 'uppercase', fontSize: 'small', fontWeight: 600, borderRadius: '5px' }}
                        >
                            Previous
                        </MenuItem>
                    </Select>
                    <Tooltip
                        title='On Deck contains the questions that are upcoming to be asked. 
                        The top questions is the next one to be asked. 
                        To remove a question simply drag it back to the question queue'
                    >
                        <InfoIcon sx={{ color: (theme) => theme.palette.primary.main }} />
                    </Tooltip>
                </Stack>
            </Paper>
            <ListHeader />
            {onDeckSelection === 'upcoming' ? (
                <SortableContext id={id as string} items={questions} strategy={verticalListSortingStrategy}>
                    {questions.length > 0 &&
                        questions.map((question) => (
                            <SortableQuestion
                                key={question.id}
                                question={question}
                                connections={connections}
                                queueEnabled={false}
                            />
                        ))}
                </SortableContext>
            ) : (
                <List>
                    {prevQuestions.map((question) => (
                        <ListItem key={question.id}>
                            <EventQuestion question={question} connections={connections} queueEnabled={false} />
                        </ListItem>
                    )) ?? []}
                </List>
            )}
        </Stack>
    );
}
