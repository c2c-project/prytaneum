import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { Townhall } from 'prytaneum-typings';

import TabPanel from 'components/TabPanel';
import QuestionFeed from 'domains/Questions/QuestionFeed';
import AskQuestion from 'domains/Questions/AskQuestion';
import QuestionQueue from 'domains/Questions/QuestionQueue';
import useTownhall from 'hooks/useTownhall';
import TownhallChat from '../TownhallChat';
import Information from '../TownhallPane';
import { Panes } from '../types';
import StyledTabPanels from './StyledTabPanels';
import StyledTab from './StyledTab';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    chipContainer: {
        marginBottom: theme.spacing(2),
    },
    hidden: {
        display: 'none',
    },
    paneContainer: {
        width: '100%',
        flexBasis: '100%',
    },
    animContainer: {
        width: '100%',
        height: '100%',
    },
}));

function buildPanes(townhall: Townhall, isModerator: boolean) {
    const panes: Partial<Record<Panes, JSX.Element>> = {
        Information: <Information />,
    };
    if (isModerator) {
        panes['Question Queue'] = <QuestionQueue />;
    }
    if (townhall.settings.questionQueue.transparent || isModerator)
        panes['Question Feed'] = (
            <>
                <AskQuestion />
                <QuestionFeed style={{ padding: 0 }} />
            </>
        );

    if (townhall.settings.chat.enabled) panes.Chat = <TownhallChat />;
    return panes;
}

interface Props {
    classes: ReturnType<typeof useStyles>;
    townhall: Townhall;
    isModerator: boolean;
}

const TownhallPanes = React.memo(
    ({ classes, townhall, isModerator }: Props) => {
        const panes = React.useMemo(() => buildPanes(townhall, isModerator), [
            townhall,
            isModerator,
        ]);
        type PaneKey = keyof typeof panes;

        const [state, setState] = React.useState<PaneKey>('Information');

        const options = Object.keys(panes) as PaneKey[];

        return (
            <Grid
                container
                className={classes.root}
                direction='column'
                alignContent='flex-start'
                alignItems='flex-start'
                wrap='nowrap'
            >
                {options.length > 1 && (
                    <Grid item xs='auto' className={classes.chipContainer}>
                        {options.map((option, idx) => (
                            <StyledTab
                                key={option}
                                label={option}
                                index={idx}
                                value={option}
                                onClick={() => setState(option)}
                                selected={option === state}
                            />
                        ))}
                    </Grid>
                )}
                <Grid item xs='auto' className={classes.paneContainer}>
                    <StyledTabPanels>
                        {Object.entries(panes).map(([key, value]) => (
                            <TabPanel key={key} visible={key === state}>
                                {value}
                            </TabPanel>
                        ))}
                    </StyledTabPanels>
                </Grid>
            </Grid>
        );
    }
);

function ContextSubscriber() {
    const classes = useStyles();
    const [townhall, isModerator] = useTownhall();
    return (
        <TownhallPanes
            classes={classes}
            townhall={townhall}
            isModerator={isModerator}
        />
    );
}

export default ContextSubscriber;
