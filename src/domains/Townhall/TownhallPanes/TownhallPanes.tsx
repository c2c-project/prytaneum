/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { Townhall, TownhallSettings } from 'prytaneum-typings';
import { connect } from 'react-redux';

import TabPanel, { TabPanels } from 'components/TabPanel';
import QuestionFeed from 'domains/Questions/QuestionFeed';
import AskQuestion from 'domains/Questions/AskQuestion';
import QuestionQueue from 'domains/Questions/QuestionQueue';
import useTownhall from 'hooks/useTownhall';
import TownhallChat from '../TownhallChat';
import Information from '../TownhallPane';
import StyledTab, { Props as StyledTabProps } from './StyledTab';

type CustomTabProps = Omit<StyledTabProps, 'label' | 'badgeContent'>;

const QuestionFeedTab = connect((store) => ({ badgeContent: store.questions.length, label: 'Question Feed' }))(
    StyledTab
);
const ChatTab = connect((store) => ({ badgeContent: store.chat.length, label: 'Chat' }))(StyledTab);
const QuestionQueueTab = connect((store) => ({
    badgeContent: store.queue.buffer.suggested.length,
    label: 'Question Queue',
}))(StyledTab);
const InformationTab = (props: CustomTabProps) => <StyledTab {...props} badgeContent={0} label='Information' />;

const getTabVisibility = (settings: TownhallSettings, isModerator: boolean) => ({
    isQuestionFeedVisible: settings.questionQueue.transparent,
    isChatVisible: settings.chat.enabled,
    isQueueVisible: isModerator,
});

type TabTuple = [React.JSXElementConstructor<CustomTabProps>, JSX.Element][];
const buildTabs = (tabVisibility: ReturnType<typeof getTabVisibility>): TabTuple => {
    // information is always present
    const tabs: TabTuple = [[InformationTab, <Information />]];

    // conditional tabs
    // NOTE: order corresponds to order seen on screen
    if (tabVisibility.isQueueVisible) tabs.push([QuestionQueueTab, <QuestionQueue />]);
    if (tabVisibility.isQuestionFeedVisible) tabs.push([QuestionFeedTab, <QuestionFeed />]);
    if (tabVisibility.isChatVisible) tabs.push([ChatTab, <TownhallChat />]);

    return tabs;
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        maxWidth: 600,
    },
    paneContainer: {
        flexBasis: '100%',
        paddingbottom: theme.spacing(2),
    },
    item: {
        marginBottom: theme.spacing(2),
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
            <AskQuestion className={classes.item} />
            {tabs.length > 1 && (
                <Grid item xs='auto'>
                    {tabs.map(([Option], idx) => (
                        <Option selected={state === idx} key={idx} onClick={() => setState(idx)} />
                    ))}
                </Grid>
            )}

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
