/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { graphql, useFragment } from 'react-relay';

import {
    EventSidebarFragment$key,
    EventSidebarFragment,
    EventSidebarFragment$data,
} from '@local/__generated__/EventSidebarFragment.graphql';
import TabPanel, { TabPanels } from '@local/components/TabPanel';
import { QuestionList } from '@local/features/events/Questions/QuestionList';
import QuestionQueue from '@local/features/events/Moderation/ManageQuestions';
import AskQuestion from '@local/features/events/Questions/AskQuestion';
import QuestionCarousel from '@local/features/events/Questions/QuestionCarousel';
import StyledTab, { Props as StyledTabProps } from './StyledTab';
import { EventDetailsCard } from '../EventDetailsCard';
import { SpeakerList } from '../Speakers';

type CustomTabProps = Omit<StyledTabProps, 'label' | 'badgeContent'>;

const QuestionFeedTab = connect((store) => ({ badgeContent: store.questions.buffer.length, label: 'Question Feed' }))(
    StyledTab
);
// const BreakoutTab = connect((store) => ({ badgeContent: store.chat.unread.length, label: 'Breakout Room' }))(StyledTab);
const QuestionQueueTab = connect(() => ({
    badgeContent: 0,
    label: 'Question Queue',
}))(StyledTab);

const getTabVisibility = (settings: EventSidebarFragment) => ({
    isQuestionFeedVisible: settings.isQuestionFeedVisible || settings.isViewerModerator,
    // isChatVisible: settings,
    isQueueVisible: settings.isViewerModerator,
});

type TabTuple = [
    React.JSXElementConstructor<CustomTabProps>,
    React.JSXElementConstructor<{ fragmentRef: EventSidebarFragment$data }>
][];
const buildTabs = (tabVisibility: ReturnType<typeof getTabVisibility>): TabTuple => {
    const tabs: TabTuple = [];

    console.log(tabVisibility);

    // conditional tabs
    // NOTE: order corresponds to order seen on screen
    if (tabVisibility.isQueueVisible) tabs.push([QuestionQueueTab, QuestionQueue]);
    if (tabVisibility.isQuestionFeedVisible) tabs.push([QuestionFeedTab, QuestionList]);
    // if (tabVisibility.isChatVisible) tabs.push([BreakoutTab, <Breakout />]);

    return tabs;
};

export const EVENT_SIDEBAR_FRAGMENT = graphql`
    fragment EventSidebarFragment on Event {
        id
        isQuestionFeedVisible
        isViewerModerator
        ...EventDetailsCardFragment
        ...SpeakerListFragment
        ...useQuestionListFragment
        ...QuestionQueueFragment
    }
`;

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

export function EventSidebarLoader() {
    return <Skeleton variant='rect' height={500} width={200} />;
}
export interface EventSidebarProps {
    fragmentRef: EventSidebarFragment$key;
}
export const EventSidebar = ({ fragmentRef }: EventSidebarProps) => {
    const classes = useStyles();
    const [state, setState] = React.useState<number>(0);
    const data = useFragment(EVENT_SIDEBAR_FRAGMENT, fragmentRef);

    const tabVisibility = React.useMemo(() => getTabVisibility(data), [data]);
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
                <EventDetailsCard fragmentRef={data} />
                <SpeakerList className={clsx(classes.item, classes.fullWidth)} fragmentRef={data} />
                <AskQuestion
                    className={classes.fullWidth}
                    eventId={data.id}
                    connectionKey='useQuestionListFragment_questions'
                />
            </Grid>

            {!data.isViewerModerator && (
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
                {tabs.map(([, Panel], idx) => (
                    <TabPanel key={idx} visible={state === idx}>
                        <Panel fragmentRef={data} />
                    </TabPanel>
                ))}
            </Grid>
        </Grid>
    );
};
