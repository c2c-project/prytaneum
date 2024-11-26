import { useMemo } from 'react';
import { graphql, useFragment } from 'react-relay';
import { Grid, Tooltip, Chip } from '@mui/material';
import type { GridProps, ChipProps } from '@mui/material';

import { QuestionTopicsFragment$key } from '@local/__generated__/QuestionTopicsFragment.graphql';
import { getHashedColor } from '@local/core/getHashedColor';

export const QUESTION_TOPICS_FRAGMENT = graphql`
    fragment QuestionTopicsFragment on EventQuestion {
        topics {
            topic
            description
            position
        }
    }
`;

interface QuestionTopicProps {
    fragmentRef: QuestionTopicsFragment$key;
    gridProps?: GridProps;
    chipProps?: ChipProps;
}

export function QuestionTopics({ fragmentRef, gridProps = {}, chipProps = {} }: QuestionTopicProps) {
    const { topics: questionTopics } = useFragment(QUESTION_TOPICS_FRAGMENT, fragmentRef);

    // Ensure consistent topic chip ordquestionTopicser
    const sortedTopics = useMemo(() => {
        const topics: { topic: string; description: string; position: string }[] = [];
        if (!questionTopics) return topics;
        questionTopics.forEach((topic) => {
            topics.push({ topic: topic.topic, description: topic.description, position: topic.position });
        });
        return topics.sort((a, b) => (a.topic > b.topic ? 1 : -1));
    }, [questionTopics]);

    const topicColor = (topic?: string) => {
        if (!topic) return 'grey';
        return getHashedColor(topic);
    };

    return (
        <Grid
            container
            sx={{
                display: 'flex',
                justifyContent: 'left',
                flexWrap: 'nowrap',
                listStyle: 'none',
                padding: (theme) => theme.spacing(0.5),
                margin: 0,
                overflow: 'auto',
                maxWidth: '100%',
                width: '100%',
                backgroundColor: 'transparent',
                '::-webkit-scrollbar': {
                    height: '0.35rem',
                },
            }}
            {...gridProps}
        >
            {sortedTopics.map((_topic) => (
                <Tooltip key={_topic.topic} title={_topic.description} placement='bottom'>
                    <Chip
                        label={_topic.topic}
                        sx={{
                            color: 'white',
                            backgroundColor: topicColor(_topic.topic),
                            margin: '0.25rem',
                        }}
                        {...chipProps}
                    />
                </Tooltip>
            ))}
        </Grid>
    );
}
