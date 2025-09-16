import React from 'react';
import { PreloadedQuery, useQueryLoader } from 'react-relay';
import {
    Typography,
    Grid,
    Stack,
    Chip,
    Skeleton,
    Box,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Fab,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { getHashedColor } from '@local/core/getHashedColor';
import { useEvent } from '../useEvent';
import { useTopicList, USE_TOPIC_LIST } from './hooks/useTopicList';
import { useAddTopic } from './hooks/useAddTopic';
import { useUpdateTopic } from './hooks/useUpdateTopic';
import { useDeleteTopic } from './hooks/useDeleteTopic';
import { Loader } from '@local/components';
import { useTopicListQuery } from '@local/__generated__/useTopicListQuery.graphql';
import { Topic } from './types';

const TopicListSkeleton = () => (
    <Stack direction='column' spacing={2} alignItems='center'>
        <Grid item xs={12}>
            <Typography variant='body1'>
                Current Event Topics
                <IconButton disabled={true} size='small'>
                    <RefreshIcon />
                </IconButton>
            </Typography>
        </Grid>
        <Box sx={{ width: 800 }}>
            <Skeleton animation='wave' height='32px' />
            <Skeleton animation='wave' height='32px' />
            <div style={{ height: '16px' }} />
        </Box>
    </Stack>
);

interface Props {
    queryRef: PreloadedQuery<useTopicListQuery>;
    refresh: () => void;
}

// TODO: Add ability to click on chip and view a card with the description (allow editing of topic/description)
// TODO Add ability to delete a topic
export function TopicList({ queryRef, refresh }: Props) {
    const { eventTopics } = useTopicList({ queryRef });
    const topicColor = React.useCallback((topic: string) => getHashedColor(topic), []);
    const { addTopic } = useAddTopic();
    const { updateTopic } = useUpdateTopic();
    const { deleteTopic } = useDeleteTopic();

    // Dialog states
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogMode, setDialogMode] = React.useState<'add' | 'edit'>('add');
    const [editingTopic, setEditingTopic] = React.useState<Topic | null>(null);

    // Form states
    const [topicText, setTopicText] = React.useState('');
    const [descriptionText, setDescriptionText] = React.useState('');

    const handleAddClick = () => {
        setDialogMode('add');
        setTopicText('');
        setDescriptionText('');
        setEditingTopic(null);
        setDialogOpen(true);
    };

    const handleEditClick = (topic: Topic) => {
        setDialogMode('edit');
        setEditingTopic(topic);
        setTopicText(topic.topic);
        setDescriptionText(topic.description);
        setDialogOpen(true);
    };

    const handleDeleteClick = (topic: Topic) => {
        if (window.confirm(`Are you sure you want to delete the topic "${topic.topic}"?`)) {
            deleteTopic(
                topic,
                () => {
                    refresh();
                },
                undefined,
                true
            );
        }
    };

    const handleSubmit = () => {
        if (!topicText.trim() || !descriptionText.trim()) return;

        const topicData: Topic = {
            topic: topicText.trim(),
            description: descriptionText.trim(),
        };

        if (dialogMode === 'add') {
            addTopic(
                topicData,
                () => {
                    setDialogOpen(false);
                    refresh();
                },
                undefined,
                true
            );
        } else if (dialogMode === 'edit' && editingTopic) {
            updateTopic(
                editingTopic,
                topicData,
                () => {
                    setDialogOpen(false);
                    setEditingTopic(null);
                    refresh();
                },
                undefined,
                true
            );
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditingTopic(null);
        setTopicText('');
        setDescriptionText('');
    };

    if (eventTopics.length === 0) return null;

    return (
        <Grid container justifyContent='center'>
            <Stack direction='column' spacing={2} alignItems='center' maxWidth='md'>
                <Grid item xs={12}>
                    <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                        <Typography variant='body1'>
                            Current Event Topics{' '}
                            <Tooltip title='Refresh Topic List' placement='top'>
                                <IconButton onClick={refresh} size='small'>
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Typography>
                    </Box>
                </Grid>
                <Grid container justifyContent='center'>
                    {eventTopics.map((topic, index) => (
                        <Box key={index} sx={{ position: 'relative', m: 0.5 }}>
                            <Tooltip title={topic.description} placement='bottom'>
                                <Chip
                                    label={topic.topic}
                                    sx={{ color: 'white', backgroundColor: topicColor(topic.topic) }}
                                />
                            </Tooltip>
                            <Box sx={{ position: 'absolute', top: -8, right: -8, display: 'flex', gap: 0.5 }}>
                                <Tooltip title='Edit Topic' placement='top'>
                                    <IconButton
                                        size='small'
                                        onClick={() => handleEditClick(topic)}
                                        sx={{
                                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                                            width: 20,
                                            height: 20,
                                        }}
                                    >
                                        <EditIcon sx={{ fontSize: 14 }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Delete Topic' placement='top'>
                                    <IconButton
                                        size='small'
                                        onClick={() => handleDeleteClick(topic)}
                                        sx={{
                                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                                            width: 20,
                                            height: 20,
                                        }}
                                    >
                                        <DeleteIcon sx={{ fontSize: 14 }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    ))}
                    <Tooltip title='Add New Topic' placement='top'>
                        <Fab color='primary' size='small' onClick={handleAddClick} sx={{ ml: 2 }}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Grid>

                {/* Dynamic Topic Dialog */}
                <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth='sm' fullWidth>
                    <DialogTitle>{dialogMode === 'add' ? 'Add New Topic' : 'Edit Topic'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Topic'
                            fullWidth
                            variant='outlined'
                            value={topicText}
                            onChange={(e) => setTopicText(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin='dense'
                            label='Description'
                            fullWidth
                            multiline
                            rows={3}
                            variant='outlined'
                            value={descriptionText}
                            onChange={(e) => setDescriptionText(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button
                            onClick={handleSubmit}
                            variant='contained'
                            disabled={!topicText.trim() || !descriptionText.trim()}
                        >
                            {dialogMode === 'add' ? 'Add Topic' : 'Update Topic'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Grid>
    );
}

export function PreloadedTopicList() {
    const { eventId } = useEvent();
    const [query, loadQuery, disposeQuery] = useQueryLoader<useTopicListQuery>(USE_TOPIC_LIST);

    const refresh = React.useCallback(() => {
        loadQuery({ eventId }, { fetchPolicy: 'network-only' });
    }, [eventId, loadQuery]);

    React.useEffect(() => {
        if (!query) loadQuery({ eventId });
    }, [query, loadQuery, eventId]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!query) return <Loader />;
    return (
        <React.Suspense fallback={<TopicListSkeleton />}>
            <TopicList queryRef={query} refresh={refresh} />
        </React.Suspense>
    );
}
