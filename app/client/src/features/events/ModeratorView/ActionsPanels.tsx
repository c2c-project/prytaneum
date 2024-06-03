/* eslint-disable react/prop-types */
import * as React from 'react';
import { Grid, Tab, Tooltip } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HandymanIcon from '@mui/icons-material/Handyman';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Panel, PanelGroup } from 'react-resizable-panels';

import { EventVideo } from '@local/features/events';
import { EventDetailsCard } from '../EventDetailsCard';
import { SpeakerList } from '../Speakers';

import { ModeratorActions } from '@local/features/events/Moderation/ModeratorActions';
import { PreloadedParticipantsList } from '../Participants/ParticipantsList';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { StyledTabs } from '@local/components/StyledTabs';
import { LiveFeedbackList } from '../LiveFeedback';
import { BroadcastMessageList } from '../BroadcastMessages/BroadcastMessageList';
import { Node } from './EventLiveNewModeratorView';
import { useEventDetailsFragment$data } from '@local/__generated__/useEventDetailsFragment.graphql';
import { HorizontalResizeHandle } from '@local/components/PanelHandle';

interface ActionsPanelProps {
    node: Node;
    eventData: useEventDetailsFragment$data;
    isLive: boolean;
    setIsLive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ActionsPanels({ node, eventData, isLive, setIsLive }: ActionsPanelProps) {
    type Tabs = 'Moderator' | 'Feedback' | 'Broadcast' | 'Participants';
    const [tab, setTab] = React.useState<Tabs>('Moderator');

    const handleTabChange = (e: React.SyntheticEvent, newTab: Tabs) => {
        e.preventDefault();
        setTab(newTab);
    };

    return (
        <PanelGroup autoSaveId='mod-panels-child-persistence' direction='vertical'>
            <Panel defaultSize={25} minSize={10}>
                <Grid
                    sx={{
                        overflow: 'auto',
                        height: '100%',
                    }}
                >
                    <EventVideo fragmentRef={node} />
                    <EventDetailsCard eventData={eventData} />
                    <SpeakerList fragmentRef={node} />
                </Grid>
            </Panel>
            <HorizontalResizeHandle />
            <Panel defaultSize={50} minSize={20}>
                <Grid
                    item
                    container
                    direction='column'
                    flex={1}
                    justifyContent='center'
                    alignContent='center'
                    height='100%'
                >
                    <StyledTabs value={tab} props={{ onChange: handleTabChange, 'aria-label': 'moderator tabs' }}>
                        <Tab
                            label={
                                <Tooltip
                                    title='Participants'
                                    placement='top'
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, +2],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <PeopleAltIcon />
                                </Tooltip>
                            }
                            value='Participants'
                            sx={{
                                minWidth: '0rem',
                                maxWidth: '250px',
                                dislay: 'flex',
                                flex: 1,
                                padding: '0.5rem',
                            }}
                        />
                        <Tab
                            label={
                                <Tooltip
                                    title='Moderator Tools'
                                    placement='top'
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, +2],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <HandymanIcon />
                                </Tooltip>
                            }
                            value='Moderator'
                            sx={{
                                minWidth: '0rem',
                                maxWidth: '250px',
                                dislay: 'flex',
                                flex: 1,
                                padding: '0.5rem',
                            }}
                        />
                        <Tab
                            label={
                                <Tooltip
                                    title='Broadcast Messages'
                                    placement='top'
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, +2],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <PodcastsIcon />
                                </Tooltip>
                            }
                            value='Broadcast'
                            sx={{
                                minWidth: '0rem',
                                maxWidth: '250px',
                                dislay: 'flex',
                                flex: 1,
                                padding: '0.5rem',
                            }}
                        />
                        <Tab
                            label={
                                <Tooltip
                                    title='Feedback'
                                    placement='top'
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, +2],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <FeedbackIcon />
                                </Tooltip>
                            }
                            value='Feedback'
                            sx={{
                                minWidth: '0rem',
                                maxWidth: '250px',
                                dislay: 'flex',
                                flex: 1,
                                padding: '0.5rem',
                            }}
                        />
                    </StyledTabs>
                    <StyledColumnGrid
                        props={{ width: '100%', display: 'flex', flexGrow: 1, padding: 0 }}
                        scrollable={tab == 'Participants'}
                    >
                        {tab === 'Participants' && <PreloadedParticipantsList eventId={eventData.id} />}
                        {tab === 'Moderator' && (
                            <ModeratorActions isLive={isLive} setIsLive={setIsLive} eventId={eventData.id} />
                        )}
                        <BroadcastMessageList fragmentRef={node} isVisible={tab === 'Broadcast'} />
                        <LiveFeedbackList fragmentRef={node} isVisible={tab === 'Feedback'} />
                    </StyledColumnGrid>
                </Grid>
            </Panel>
        </PanelGroup>
    );
}
