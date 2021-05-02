/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Grid, Typography, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { Townhall, TownhallSettings } from 'prytaneum-typings';
import { connect } from 'react-redux';
import clsx from 'clsx';

import TabPanel, { TabPanels } from 'components/TabPanel';
import QuestionFeed from 'domains/Questions/QuestionFeed';
import QuestionQueue from 'domains/Questions/QuestionQueue';
import AskQuestion from 'domains/Questions/AskQuestion';
import QuestionCarousel from 'domains/Questions/QuestionCarousel';
import useTownhall from 'hooks/useTownhall';
import Breakout from '../Breakout';
import StyledTab, { Props as StyledTabProps } from './StyledTab';
import InfoCard from '../InfoCard';
import SpeakerItem from './SpeakerItem';

type CustomTabProps = Omit<StyledTabProps, 'label' | 'badgeContent'>;

const QuestionFeedTab = connect((store) => ({ badgeContent: store.questions.buffer.length, label: 'Question Feed' }))(
    StyledTab
);
const BreakoutTab = connect((store) => ({ badgeContent: store.chat.unread.length, label: 'Breakout Room' }))(StyledTab);
const QuestionQueueTab = connect(() => ({
    badgeContent: 0,
    label: 'Question Queue',
}))(StyledTab);

const getTabVisibility = (settings: TownhallSettings, isModerator: boolean) => ({
    isQuestionFeedVisible: settings.questionQueue.transparent || isModerator,
    isChatVisible: settings.chat.enabled,
    isQueueVisible: isModerator,
});

type TabTuple = [React.JSXElementConstructor<CustomTabProps>, JSX.Element][];
const buildTabs = (tabVisibility: ReturnType<typeof getTabVisibility>): TabTuple => {
    const tabs: TabTuple = [];

    // conditional tabs
    // NOTE: order corresponds to order seen on screen
    if (tabVisibility.isQueueVisible) tabs.push([QuestionQueueTab, <QuestionQueue />]);
    if (tabVisibility.isQuestionFeedVisible) tabs.push([QuestionFeedTab, <QuestionFeed />]);
    if (tabVisibility.isChatVisible) tabs.push([BreakoutTab, <Breakout />]);

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
    townhall: Townhall;
    isModerator: boolean;
}
const TownhallPanes = React.memo(({ classes, townhall, isModerator }: Props) => {
    const [state, setState] = React.useState<number>(0);

    const tabVisibility = React.useMemo(() => getTabVisibility(townhall.settings, isModerator), [
        townhall.settings,
        isModerator,
    ]);
    const speakers = React.useMemo(() => townhall.settings.speakers.list, [townhall]);
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
                <InfoCard />
                <List className={clsx(classes.item, classes.fullWidth)}>
                    {speakers.map((speaker) => (
                        <SpeakerItem speaker={speaker} key={speaker.picture} />
                    ))}
                </List>
                <AskQuestion className={classes.rightJustify} />
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

function ContextSubscriber() {
    const classes = useStyles();
    const [townhall, isModerator] = useTownhall();
    return <TownhallPanes classes={classes} townhall={townhall} isModerator={isModerator} />;
}

export default ContextSubscriber;
