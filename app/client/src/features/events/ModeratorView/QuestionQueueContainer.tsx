import * as React from 'react';
import { Typography, Stack, Grid, Divider } from '@mui/material';
import { Question } from './types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { SortableQuestion } from './SortableQuestion';

interface Props {
    id: UniqueIdentifier;
    questions: Question[];
    topic: string;
}

//TODO: Fix height issue (currently a workaround)
export function QuestionQueueContainer({ id, questions, topic }: Props) {
    const { setNodeRef } = useDroppable({ id });

    const topicSelected = React.useMemo(() => {
        return topic !== 'default';
    }, [topic]);

    return (
        <Stack direction='column' maxHeight={0} width='100%'>
            <Grid sx={{ textAlign: 'center' }}>
                {topicSelected && (
                    <Typography variant='h5' marginTop='1rem' fontWeight='bold'>
                        Topic: {topic}
                    </Typography>
                )}
            </Grid>
            {topicSelected && <Divider sx={{ marginTop: '0.5rem' }} />}
            {questions.length === 0 && (
                <Grid container justifyContent='center' padding='1rem'>
                    <Typography align='center' variant='body1' marginTop='1rem'>
                        No questions enqueued yet.
                    </Typography>
                    <div ref={setNodeRef} />
                </Grid>
            )}
            <Grid
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    color: '#B5B5B5',
                }}
            >
                {questions.length > 0 && (
                    <Typography variant='caption' fontWeight={'bold'} color='textPrimary'>
                        Drag and drop questions to re-order {topicSelected ? 'topic workspace' : 'queue'} or add to on
                        deck
                    </Typography>
                )}
            </Grid>
            <SortableContext id={id as string} items={questions} strategy={verticalListSortingStrategy}>
                {questions.length > 0 &&
                    questions.map((question) => (
                        <SortableQuestion key={question.id} question={question} connections={[]} />
                    ))}
            </SortableContext>
        </Stack>
    );
}
