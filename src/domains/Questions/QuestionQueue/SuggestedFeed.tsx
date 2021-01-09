import React from 'react';
import {
    makeStyles,
    Grid,
    Badge,
    IconButton,
    Card,
    CardContent,
    Typography,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import type { Question } from 'prytaneum-typings';

import ListFilter, { useFilters, Accessors } from 'components/ListFilter';
import QuestionCard from '../QuestionCard';

interface Props {
    questions: Question[];
    bufferSize: number;
    onFlushBuffer: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    item: {
        marginBottom: theme.spacing(3),
    },
}));

export default function SuggestedFeed({
    questions,
    bufferSize,
    onFlushBuffer,
}: Props) {
    const classes = useStyles();
    const accessors = React.useMemo<Accessors<Question>[]>(
        () => [
            (q) => q.question,
            (q) => q.meta.createdBy.name.first,
            (q) => q.meta.createdBy.name.last,
        ],
        []
    );
    const [filteredQuestions, handleSearch, handleFilterChange] = useFilters(
        questions,
        accessors
    );

    return (
        <Grid container className={classes.root} alignContent='flex-start'>
            <Grid item xs={12}>
                <ListFilter
                    length={questions.length}
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    menuIcons={[
                        <IconButton
                            disabled={bufferSize === 0}
                            onClick={onFlushBuffer}
                        >
                            <Badge color='secondary' badgeContent={bufferSize}>
                                <RefreshIcon />
                            </Badge>
                        </IconButton>,
                    ]}
                />
            </Grid>
            {filteredQuestions.length === 0 && bufferSize > 0 && (
                <Grid item xs={12}>
                    <Card className={classes.item}>
                        <CardContent>
                            <Typography variant='h5' align='center'>
                                Click the refresh icon above to see suggested
                                questions!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
            {questions.length === 0 && (
                <Grid item xs={12}>
                    <Card className={classes.item}>
                        <CardContent>
                            <Typography variant='h5' align='center'>
                                No Questions to display!
                            </Typography>
                            <Typography align='center'>
                                Look through the question feed and suggest them
                                to add questions here
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
            <Grid item xs={12}>
                {filteredQuestions.map((question) => (
                    <QuestionCard
                        key={question._id}
                        question={question}
                        className={classes.item}
                    />
                ))}
            </Grid>
        </Grid>
    );
}
