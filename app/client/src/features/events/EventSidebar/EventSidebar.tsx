/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { graphql, useFragment } from 'react-relay';

import { EventSidebarFragment$key } from '@local/__generated__/EventSidebarFragment.graphql';
import TabPanel, { TabPanels } from '@local/components/TabPanel';
import { QuestionList } from '@local/features/events/Questions/QuestionList';
import { QuestionQueue } from '@local/features/events/Moderation/ManageQuestions';
import AskQuestion from '@local/features/events/Questions/AskQuestion';
import { LiveFeedbackList } from '@local/features/events/LiveFeedback/LiveFeedbackList';
import { SubmitLiveFeedback } from '@local/features/events/LiveFeedback/SubmitLiveFeedback';
import { EventDetailsCard } from '../EventDetailsCard';
import { SpeakerList } from '../Speakers';
import { Tabs } from '@local/components/Tabs'
import { QuestionCarousel } from '../Questions/QuestionCarousel';

export const EVENT_SIDEBAR_FRAGMENT = graphql`
    fragment EventSidebarFragment on Event {
        id
        isQuestionFeedVisible
        isViewerModerator
        ...EventDetailsCardFragment
        ...SpeakerListFragment
        ...useQuestionListFragment
        ...useQuestionQueueFragment
        ...QuestionCarouselFragment
        ...useLiveFeedbackListFragment
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',

        padding: theme.spacing(0, 1, 1, 1),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: 600,
        },
        '& > *': {
            marginBottom: theme.spacing(2.5),
            width: '100%',
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
    fullWidth: {
        // width: '100%',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        boxShadow: theme.shadows[1],
    },
    item: {},
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
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const [displayFeedbackButton, setDisplayFeedbackButton] = React.useState<boolean>(false);
    const data = useFragment(EVENT_SIDEBAR_FRAGMENT, fragmentRef);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTabChange = (e: React.ChangeEvent<any>, newTabIndex: number) => {
        e.preventDefault();
        setTabIndex(newTabIndex);
    };

    const moderatorTabs = ['Queue', 'Questions', 'Feedback']
    const participantTabs = ['Questions', 'Feedback']

    // const tabVisibility = React.useMemo(() => getTabVisibility(data), [data]);
    // const tabs = React.useMemo(() => buildTabs(tabVisibility), [tabVisibility]);

    React.useEffect(() => {
        if (data.isViewerModerator && tabIndex === 2) {
            setDisplayFeedbackButton(true);
        } else if (!data.isViewerModerator && tabIndex === 1) {
            setDisplayFeedbackButton(true);
        } else {
            setDisplayFeedbackButton(false);
        }
    }, [tabIndex, data]);

    return (
        <Grid
            container
            className={classes.root}
            direction='column'
            alignContent='flex-start'
            alignItems='flex-start'
            wrap='nowrap'
        >
            <Grid item>
                {!data.isViewerModerator && <QuestionCarousel fragmentRef={data} />}
                {/* <CurrentQuestionCard
                    isViewerModerator={Boolean(data.isViewerModerator)}
                    fragmentRef={data}
                /> */}
            </Grid>
            <Grid
                container
                direction='column'
                wrap='nowrap'
                className={clsx(classes.item, classes.paper, classes.fullWidth)}
            >
                <EventDetailsCard fragmentRef={data} />
                <SpeakerList className={clsx(classes.item, classes.fullWidth)} fragmentRef={data} />
                {
                    // Moderator feedback state = 2, Participant feedback state = 1
                    displayFeedbackButton ? (
                        <SubmitLiveFeedback
                            className={classes.fullWidth}
                            eventId={data.id}
                            // connectionKey='useLiveFeedbackListFragment_liveFeedback'
                        />
                    ) : (
                        <AskQuestion
                            className={classes.fullWidth}
                            eventId={data.id}
                            // connectionKey='useQuestionListFragment_questions'
                        />
                    )
                }
            </Grid>

            <Tabs 
                tabIndex={tabIndex}
                onChange={handleTabChange}
                // conditionally set which tabs are viewable to a moderator/participant
                tabs={data.isViewerModerator ? moderatorTabs : participantTabs}
            />

            <Grid component={TabPanels} container item xs='auto' className={classes.paneContainer}>
                <TabPanel visible={data.isViewerModerator ? tabIndex === 0 : false}>
                    <QuestionQueue fragmentRef={data} />
                </TabPanel>
                <TabPanel visible={data.isViewerModerator ? tabIndex === 1 : tabIndex === 0}>
                    <QuestionList fragmentRef={data} />
                </TabPanel>
                <TabPanel visible={data.isViewerModerator ? tabIndex === 2 : tabIndex === 1}>
                    <LiveFeedbackList fragmentRef={data} />
                </TabPanel>
            </Grid>
        </Grid>
    );
};