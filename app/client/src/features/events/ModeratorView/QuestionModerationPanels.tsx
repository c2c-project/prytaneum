import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { QuestionListContainer } from './QuestionListContainer';
import { SelectChangeEvent, Stack, Tab, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LinkIcon from '@mui/icons-material/Link';

import { Node } from './EventLiveNewModeratorView';
import type { Topic } from './types';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { QuestionQueueContainer } from './QuestionQueueContainer';
import { CurrentQuestionCard } from '../Moderation/ManageQuestions/CurrentQuestionCard';
import { EventTopicContext } from './EventTopicContext';
import { StyledTabs } from '@local/components/StyledTabs';
import { OnDeckContainer } from './OnDeckContainer';
import { Loader } from '@local/components';
import { QuestionListSkeleton } from '@local/components/QuestionListSkeleton/QuestionListSkeleton';
import { VerticalPanelResizeHandle } from '@local/components/PanelHandle';
import EventQuestion from './EventQuestion';
import { useDndLists } from './hooks/useDndLists';
import { getHashedColor } from '@local/core/getHashedColor';

interface QuestionModerationPanelsProps {
    node: Node;
    topics: readonly Topic[];
    refresh: () => void;
}

export function QuestionModerationPanels({ node, topics }: QuestionModerationPanelsProps) {
    const theme = useTheme();
    const xlUpBreakpoint = useMediaQuery(theme.breakpoints.up('xl'));
    const selectedTopicFromSession = sessionStorage.getItem(`${node.id}-topic`);
    const [topic, setTopic] = useState<string>(selectedTopicFromSession ?? 'default');
    const {
        activeId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        heldQuestion,
        onDeckQuestions,
        topicQueueQuestions,
        questionRecord,
        connections,
        sensors,
    } = useDndLists({ node, topic, topics });

    function handleChangeTopic(event: SelectChangeEvent<string>) {
        event.preventDefault();
        setTopic(event.target.value);
        sessionStorage.setItem(`${node.id}-topic`, event.target.value);
    }

    const isTopicSelected = React.useMemo(() => {
        return topic !== 'default' && topic !== '';
    }, [topic]);

    const questionQueueLabel = React.useMemo(() => {
        return isTopicSelected ? 'Topic Workspace' : 'Question Queue';
    }, [isTopicSelected]);

    const topicColor = getHashedColor(topic);

    if (!topics) return <Loader />;

    return (
        <EventTopicContext.Provider value={{ topic, topics }}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                autoScroll={{ layoutShiftCompensation: false }}
            >
                <DragOverlay>
                    {activeId && heldQuestion ? (
                        <EventQuestion
                            question={heldQuestion}
                            connections={[]}
                            queueEnabled={false}
                            heldQuestion={true}
                        />
                    ) : null}
                </DragOverlay>
                <PanelGroup autoSaveId='question-mod-panels' direction='horizontal'>
                    <Panel defaultSize={33} minSize={25} maxSize={50}>
                        <Stack direction='column' alignItems='center' height='100%' width='100%'>
                            <StyledTabs value='Question List' color={isTopicSelected ? topicColor : undefined}>
                                <Tab label='Question List' value='Question List' />
                            </StyledTabs>
                            <StyledColumnGrid
                                props={{
                                    id: 'scrollable-tab',
                                    display: 'flex',
                                    flexGrow: 1,
                                    width: '100%',
                                    height: '100%',
                                    padding: 0,
                                }}
                                scrollable={false}
                                color={isTopicSelected ? topicColor : theme.palette.custom.creamCan}
                                alphaValue={isTopicSelected ? 0.25 : 0.15}
                            >
                                <React.Suspense fallback={<QuestionListSkeleton xlUpBreakpoint={xlUpBreakpoint} />}>
                                    <QuestionListContainer
                                        fragmentRef={node}
                                        isVisible={true}
                                        topic={topic}
                                        handleTopicChange={handleChangeTopic}
                                        connections={connections}
                                        topics={topics}
                                    />
                                </React.Suspense>
                            </StyledColumnGrid>
                        </Stack>
                    </Panel>
                    <VerticalPanelResizeHandle
                        alternateIcon={
                            <Tooltip title='These lists are linked, changing the topic updates both the question list and queue!'>
                                <LinkIcon
                                    sx={{ color: isTopicSelected ? topicColor : theme.palette.custom.creamCan }}
                                />
                            </Tooltip>
                        }
                    />
                    <Panel defaultSize={33} minSize={25} maxSize={50}>
                        <Stack direction='column' alignItems='center' height='100%' width='100%'>
                            <StyledTabs value={questionQueueLabel} color={isTopicSelected ? topicColor : undefined}>
                                <Tab label={questionQueueLabel} value={questionQueueLabel} />
                            </StyledTabs>
                            <StyledColumnGrid
                                props={{
                                    id: 'scrollable-tab',
                                    display: 'flex',
                                    flexGrow: 1,
                                    width: '100%',
                                    height: '100%',
                                    padding: 0,
                                }}
                                scrollable={true}
                                color={isTopicSelected ? topicColor : theme.palette.custom.creamCan}
                                alphaValue={isTopicSelected ? 0.25 : 0.15}
                            >
                                <React.Suspense fallback={<Loader />}>
                                    <QuestionQueueContainer
                                        id='topicQueue'
                                        questions={topicQueueQuestions}
                                        topic={topic}
                                    />
                                </React.Suspense>
                            </StyledColumnGrid>
                        </Stack>
                    </Panel>
                    <VerticalPanelResizeHandle />
                    <Panel defaultSize={33} minSize={25} maxSize={50}>
                        <Stack direction='column' alignItems='center' height='100%' width='100%'>
                            <CurrentQuestionCard isViewerModerator={true} fragmentRef={node} />
                            <StyledTabs value='On Deck'>
                                <Tab label='On Deck' value='On Deck' />
                            </StyledTabs>
                            <StyledColumnGrid
                                props={{
                                    id: 'scrollable-tab',
                                    display: 'flex',
                                    flexGrow: 1,
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: '100%',
                                    padding: 0,
                                }}
                                scrollable={true}
                            >
                                <React.Suspense fallback={<Loader />}>
                                    <OnDeckContainer
                                        id='onDeck'
                                        questions={onDeckQuestions}
                                        questionRecord={questionRecord}
                                        connections={connections}
                                        topic={topic}
                                    />
                                </React.Suspense>
                            </StyledColumnGrid>
                        </Stack>
                    </Panel>
                </PanelGroup>
            </DndContext>
        </EventTopicContext.Provider>
    );
}
