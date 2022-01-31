/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { graphql, useFragment } from 'react-relay';

import { EventSidebarFragment$key } from '@local/__generated__/EventSidebarFragment.graphql';
import TabPanel, { TabPanels } from '@local/components/TabPanel';
import { QuestionList } from '@local/features/events/Questions/QuestionList';
import { QuestionQueue } from '@local/features/events/Moderation/ManageQuestions';
import AskQuestion from '@local/features/events/Questions/AskQuestion';
import { QuestionCarousel } from '@local/features/events/Questions/QuestionCarousel';
import { LiveFeedbackList } from '@local/features/events/LiveFeedback/LiveFeedbackList';
import { SubmitLiveFeedback } from '@local/features/events/LiveFeedback/SubmitLiveFeedback';
import { EventDetailsCard } from '../EventDetailsCard';
import { SpeakerList } from '../Speakers';
import { useLinkedResponsiveDialog } from '@local/components/ResponsiveDialog';
import { LiveFeedbackDialog } from '../LiveFeedback/LiveFeedbackDialog';
import { QuestionDialog } from '../Questions/AskQuestion/QuestionDialog';

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
    item: {
        // flex: 1,
        // marginBottom: theme.spacing(1.5),
    },
    fullWidth: {
        // width: '100%',
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
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const [displayFeedbackButton, setDisplayFeedbackButton] = React.useState<boolean>(false);
    const data = useFragment(EVENT_SIDEBAR_FRAGMENT, fragmentRef);
    const [openDialog, open, close] = useLinkedResponsiveDialog();

    // create dialog ids using a combination of the eventId and actual dialog title
    const feedbackDialogId = data.id + '-feedback';
    const questionDialogId = data.id + '-question';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTabChange = (e: React.ChangeEvent<any>, newTabIndex: number) => {
        e.preventDefault();
        setTabIndex(newTabIndex);
    };

    // helper functions to open linked dialog within initially opened dialog
    const handleOpenLinkedFeedbackDialog = () => {
        // open feedback dialog from question dialog
        open(feedbackDialogId);
        // switch to feedback tab (conditionally determined by user role)
        setTabIndex(data.isViewerModerator ? 2 : 1);
    }
    const handleOpenLinkedQuestionDialog = () => {
        // open question dialog from feedback dialog
        open(questionDialogId);
        // switch to question list tab (conditionally determined by user role)
        setTabIndex(data.isViewerModerator ? 1 : 0);
    }

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
                            open={() => open(feedbackDialogId)}
                            // eventId={data.id}
                            // connectionKey='useLiveFeedbackListFragment_liveFeedback'
                        />
                    ) : (
                        <AskQuestion
                            className={classes.fullWidth}
                            open={() => open(questionDialogId)}
                            // eventId={data.id}
                            // connectionKey='useQuestionListFragment_questions'
                        />
                    )
                }
            </Grid>

            {!data.isViewerModerator && <QuestionCarousel fragmentRef={data} />}

            {data.isViewerModerator && (
                <Tabs variant='scrollable' scrollButtons='auto' value={tabIndex} onChange={handleTabChange}>
                    <Tab label='Question Queue' />
                    <Tab label='Question List' />
                    <Tab label='Live Feedback' />
                </Tabs>
            )}
            {!data.isViewerModerator && (
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label='Question List' />
                    <Tab label='Live Feedback' />
                </Tabs>
            )}
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

            {/* relocate dialogs to allow one to open another */}
            <LiveFeedbackDialog
                isOpen={openDialog === feedbackDialogId}
                openDialog={openDialog}
                openLinked={handleOpenLinkedQuestionDialog}
                close={close}
                eventId={data.id}
            />
            <QuestionDialog
                isOpen={openDialog === questionDialogId}
                openDialog={openDialog}
                openLinked={handleOpenLinkedFeedbackDialog}
                close={close}
                eventId={data.id}
            />
        </Grid>
    );
};
