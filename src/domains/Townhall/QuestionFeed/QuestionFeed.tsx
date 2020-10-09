import React from 'react';
import {
    IconButton,
    Grid,
    Badge,
    Collapse,
    Button,
    Tooltip,
    Typography,
    Grow,
    DialogContent,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

import useSocketio from 'hooks/useSocketio';
import ListFilter from 'components/ListFilter';
import Dialog from 'components/Dialog';
import { UserContext } from 'contexts/User';
import { TownhallContext } from '../Contexts/Townhall';
import { Question as QuestionType } from '../types';
import {
    search,
    applyFilters,
    filters as filterFuncs,
    questionReducer,
    Actions,
    QuestionFilterFunc,
} from './utils';
import {
    CurrentQuestion,
    Question,
    UserBar,
    QuestionForm,
    EmptyMessage,
    UserActionTypes,
    ReplyForm,
    ModBar,
    ModActionTypes,
} from './components';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        paddingTop: theme.spacing(1),
    },
}));

function QuestionFeed() {
    const classes = useStyles();
    const townhall = React.useContext(TownhallContext);
    const user = React.useContext(UserContext);
    const [
        dialogContent,
        setDialogContent,
    ] = React.useState<JSX.Element | null>(null);

    // full question feed from socketio
    const [questions] = useSocketio<QuestionType[], Actions>({
        url: '/moderator/questions', // FIXME: update the url when I know what it should it should be
        event: 'townhall-question-state',
        reducer: questionReducer,
        initialState: [],
    });

    // displayed questions, which differs from the full feed
    const [displayed, setDisplayed] = React.useState<QuestionType[]>([]);

    // difference between displayed count and full question feed count
    const [difference, setDifference] = React.useState(0);

    // the first filter will always be the "search" filter, which initially just returns the full question list
    const [filters, setFilters] = React.useState([(q: QuestionType[]) => q]);

    // list of questions with all filters applied
    const filteredList = React.useMemo(() => applyFilters(displayed, filters), [
        displayed,
        filters,
    ]);

    // there should never be more than 1 current question, so we can stop at the first one found
    const currentQuestion = React.useMemo(
        () => displayed.find((q) => q.state === 'CURRENT'),
        [displayed]
    );

    const isModerator = React.useMemo(
        () => user && townhall.settings.moderators.list.includes(user._id),
        [townhall.settings.moderators.list, user]
    );

    // updating difference when one of the boundaries change
    React.useEffect(() => {
        setDifference(questions.length - displayed.length);
    }, [questions.length, displayed.length]);

    // onClick refresh button
    function handleRefresh() {
        setDisplayed(questions);
    }

    function handleFilterChange(newFilters: QuestionFilterFunc[]) {
        // replace everything BUT the first index
        const updateFilters = ([prevSearch]: QuestionFilterFunc[]) => [
            prevSearch,
            ...newFilters,
        ];
        setFilters(updateFilters);
    }

    function handleSearch(searchText: string) {
        // replace ONLY the search filter -- the first index
        const updateSearch = (filtersWithOldSearch: QuestionFilterFunc[]) => {
            const [, ...currentFilters] = filtersWithOldSearch;
            const newSearch: QuestionFilterFunc = (data) =>
                search(searchText, data);
            return [newSearch, ...currentFilters];
        };
        setFilters(updateSearch);
    }

    function closeDialog() {
        setDialogContent(null);
    }

    function handleAskQuestion() {
        setDialogContent(
            <QuestionForm
                onSubmit={console.log} // FIXME:
                onCancel={closeDialog}
            />
        );
    }

    interface UserAction {
        type: UserActionTypes;
        payload: string; // question id
    }
    function handleUserAction(action: UserAction) {
        const target = questions.find(({ _id }) => _id === action.payload);

        // this should never happen, but to keep ts happy I have to
        if (!target) return;

        switch (action.type) {
            case 'Like': {
                // TODO: socket stuff here
                console.log('liked');
                break;
            }
            case 'Quote': {
                // open dialog with the quoted question
                // TODO: onSubmit
                setDialogContent(
                    <QuestionForm
                        quote={target}
                        onCancel={closeDialog}
                        onSubmit={console.log}
                    />
                );
                break;
            }
            case 'Reply': {
                // open dialog with the replied quote
                // TODO: onSubmit
                setDialogContent(
                    <ReplyForm
                        reply={target}
                        onSubmit={console.log}
                        onCancel={closeDialog}
                    />
                );
                break;
            }
            default: {
                // do nothing
                break;
            }
        }
    }
    type ModAction = { type: ModActionTypes; payload: string };
    function handleModAction(action: ModAction) {
        const target = questions.find(({ _id }) => _id === action.payload);

        // this should never happen, but to keep ts happy I have to
        if (!target) return;

        switch (action.type) {
            case 'Queue Question': {
                // TODO: queue question
                break;
            }
            case 'Remove From Queue': {
                // TODO: remove question from queue
                break;
            }
            case 'Set Current': {
                // TODO: set as current question
                break;
            }
            default: {
                // do nothing
                break;
            }
        }
    }

    return (
        <div className={classes.root}>
            <Dialog open={Boolean(dialogContent)} onClose={closeDialog}>
                <DialogContent>{dialogContent || <div />}</DialogContent>
            </Dialog>
            <Button
                variant='contained'
                color='primary'
                fullWidth
                disableElevation
                onClick={handleAskQuestion}
            >
                Ask A Question
            </Button>
            <ListFilter
                filterMap={filterFuncs}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                length={filteredList.length}
                menuIcons={[
                    <Tooltip title='Load New'>
                        <span>
                            <IconButton
                                onClick={handleRefresh}
                                color='inherit'
                                disabled={difference === 0}
                            >
                                <Badge
                                    badgeContent={difference}
                                    color='secondary'
                                >
                                    <RefreshIcon />
                                </Badge>
                            </IconButton>
                        </span>
                    </Tooltip>,
                ]}
            />
            <Grid container>
                <Grid container item xs={12} justify='center'>
                    <Collapse
                        key={currentQuestion?._id}
                        in={Boolean(currentQuestion)}
                    >
                        {currentQuestion && (
                            <CurrentQuestion>
                                <Question
                                    user={currentQuestion.meta.user.name}
                                    timestamp={currentQuestion.meta.timestamp}
                                    isModerator={isModerator}
                                    actionBar={
                                        isModerator ? (
                                            <div />
                                        ) : (
                                            <UserBar
                                                onClick={(action) =>
                                                    handleUserAction({
                                                        type: action,
                                                        payload:
                                                            currentQuestion._id,
                                                    })
                                                }
                                            />
                                        )
                                    }
                                >
                                    {currentQuestion.question}
                                </Question>
                            </CurrentQuestion>
                        )}
                    </Collapse>
                    {displayed.length === 0 && <EmptyMessage />}
                    {difference > 0 && difference === questions.length && (
                        <Grow in>
                            <Typography align='center'>
                                Click the Refresh Button Above!
                            </Typography>
                        </Grow>
                    )}
                    {filteredList.map(
                        ({ question, _id, meta, aiml, state }) => (
                            <Question
                                key={_id}
                                user={meta.user.name}
                                timestamp={meta.timestamp}
                                isModerator={isModerator}
                                divider
                                actionBar={
                                    isModerator ? (
                                        <ModBar
                                            labels={aiml.labels}
                                            questionState={state}
                                            onClick={(action) =>
                                                handleModAction({
                                                    type: action,
                                                    payload: _id,
                                                })
                                            }
                                        />
                                    ) : (
                                        <UserBar
                                            onClick={(action) =>
                                                handleUserAction({
                                                    type: action,
                                                    payload: _id,
                                                })
                                            }
                                        />
                                    )
                                }
                            >
                                {question}
                            </Question>
                        )
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default React.memo(QuestionFeed);
