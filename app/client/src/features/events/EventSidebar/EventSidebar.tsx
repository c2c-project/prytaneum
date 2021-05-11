/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { useEvent } from '@local/hooks';
import { Event, EventSettingsFragment } from '@local/graphql-types';
import TabPanel, { TabPanels } from '@local/components/TabPanel';
import { QuestionList } from '@local/features/events/Questions/QuestionList';
import QuestionQueue from '@local/features/events/Moderation/ManageQuestions';
import AskQuestion from '@local/features/events/Questions/AskQuestion';
import QuestionCarousel from '@local/features/events/Questions/QuestionCarousel';
import StyledTab, { Props as StyledTabProps } from './StyledTab';
import { EventDetailsCard } from '../EventDetailsCard';
import { SpeakerList } from '../Speaker';

type CustomTabProps = Omit<StyledTabProps, 'label' | 'badgeContent'>;

const QuestionFeedTab = connect((store) => ({ badgeContent: store.questions.buffer.length, label: 'Question Feed' }))(
    StyledTab
);
// const BreakoutTab = connect((store) => ({ badgeContent: store.chat.unread.length, label: 'Breakout Room' }))(StyledTab);
const QuestionQueueTab = connect(() => ({
    badgeContent: 0,
    label: 'Question Queue',
}))(StyledTab);

const getTabVisibility = (settings: EventSettingsFragment, isModerator: boolean) => ({
    isQuestionFeedVisible: settings.isQuestionFeedVisible || isModerator,
    // isChatVisible: settings,
    isQueueVisible: isModerator,
});

type TabTuple = [React.JSXElementConstructor<CustomTabProps>, JSX.Element][];
const buildTabs = (tabVisibility: ReturnType<typeof getTabVisibility>): TabTuple => {
    const tabs: TabTuple = [];

    // conditional tabs
    // NOTE: order corresponds to order seen on screen
    if (tabVisibility.isQueueVisible) tabs.push([QuestionQueueTab, <QuestionQueue />]);
    if (tabVisibility.isQuestionFeedVisible) tabs.push([QuestionFeedTab, <QuestionList />]);
    // if (tabVisibility.isChatVisible) tabs.push([BreakoutTab, <Breakout />]);

    return tabs;
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        maxWidth: 600,
        padding: theme.spacing(0, 1, 1, 1),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },
    paneContainer: {
        flexBasis: '100%',
        paddingbottom: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    rightJustify: {
        alignSelf: 'flex-end',
    },
    item: {
        flex: 1,
        marginBottom: theme.spacing(1.5),
    },
    fullWidth: {
        width: '100%',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        boxShadow: theme.shadows[1],
        // border: `1px solid ${theme.palette.secondary.main}`,
    },
    pl: {
        paddingLeft: theme.spacing(2),
    },
    pb: {
        paddingBottom: theme.spacing(2),
    },
}));
interface Props {
    classes: ReturnType<typeof useStyles>;
    event: Event;
    isModerator: boolean;
}
const MemoizedEventSidbar = React.memo(({ classes, event, isModerator }: Props) => {
    const [state, setState] = React.useState<number>(0);

    const tabVisibility = React.useMemo(() => getTabVisibility(event, isModerator), [event, isModerator]);
    const speakers = React.useMemo(() => event.speakers, [event]);
    const tabs = React.useMemo(() => buildTabs(tabVisibility), [tabVisibility]);

    return (
        <Grid
            container
            className={classes.root}
            direction='column'
            alignContent='flex-start'
            alignItems='flex-start'
            wrap='nowrap'
        >
            <Grid
                container
                direction='column'
                wrap='nowrap'
                className={clsx(classes.item, classes.paper, classes.fullWidth)}
            >
                <EventDetailsCard />
                <SpeakerList className={clsx(classes.item, classes.fullWidth)} speakers={speakers} />
                <AskQuestion className={classes.fullWidth} />
            </Grid>

            {!isModerator && (
                <Grid container direction='column' className={clsx(classes.item, classes.paper, classes.fullWidth)}>
                    <Typography className={clsx(classes.pl, classes.pb)} variant='h5'>
                        Current Question
                    </Typography>
                    <QuestionCarousel />
                </Grid>
            )}

            <div className={clsx(classes.item, classes.fullWidth)}>
                {tabs.length > 1 && (
                    <Grid item xs='auto'>
                        {tabs.map(([Option], idx) => (
                            <Option selected={state === idx} key={idx} onClick={() => setState(idx)} />
                        ))}
                    </Grid>
                )}
            </div>

            <Grid component={TabPanels} container item xs='auto' className={classes.paneContainer}>
                {tabs.map(([, tabPanel], idx) => (
                    <TabPanel key={idx} visible={state === idx}>
                        {tabPanel}
                    </TabPanel>
                ))}
            </Grid>
        </Grid>
    );
});

export function EventSidebar() {
    const classes = useStyles();
    const [event, isModerator] = useEvent();
    return <MemoizedEventSidbar classes={classes} event={event} isModerator={isModerator} />;
}
