import * as React from 'react';
import { Grid, MenuItem, FormControl, InputLabel, Select, Typography, Button } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';

import { VideoEventSettingsFragment$key } from '@local/__generated__/VideoEventSettingsFragment.graphql';
import { YoutubeSettings } from './YoutubeSettings';
import { GoogleMeetSettings } from './GoogleMeetSettings';
import { useEventType } from './useEventType';
import type { EventType } from '@local/graphql-types';

export const VIDEO_EVENT_SETTINGS_FRAGMENT = graphql`
    fragment VideoEventSettingsFragment on Event @refetchable(queryName: "VideoEventSettingsFragmentRefresh") {
        eventType
        ...YoutubeSettingsFragment
        ...GoogleMeetSettingsFragment
    }
`;

// TODO: Add a mutation to change the EventType

interface EventSettingsProps {
    fragmentRef: VideoEventSettingsFragment$key;
}

export const VideoEventSettings = ({ fragmentRef }: EventSettingsProps) => {
    const data = useFragment(VIDEO_EVENT_SETTINGS_FRAGMENT, fragmentRef);
    const defaultEventType: EventType =
        data.eventType === null ? ('NO_VIDEO' as EventType) : (data.eventType as EventType);
    const [videoType, setVideoType] = React.useState<EventType>(defaultEventType);
    const { updateEventType } = useEventType();

    const handleVideoTypeChange = (event: SelectChangeEvent<EventType>) => {
        const newEventType = event.target.value as EventType;
        setVideoType(newEventType);
    };

    const updateVideoType = () => {
        const onSuccess = () => {
            console.log('Success');
        };
        const onFailure = () => {
            console.error('Failed to update video type');
        };
        updateEventType(videoType, onSuccess, onFailure);
    };

    return (
        <Grid container justifyContent='center' alignItems='center'>
            <Grid item>
                <FormControl>
                    <InputLabel id='video-type-input'>Video Type</InputLabel>
                    <Select
                        labelId='video-type-input'
                        id='video-type'
                        value={videoType}
                        label='videoType'
                        onChange={handleVideoTypeChange}
                    >
                        <MenuItem value='NO_VIDEO'>No video</MenuItem>
                        <MenuItem value='YOUTUBE_STREAM'>Youtube</MenuItem>
                        <MenuItem value='GOOGLE_MEET'>Google Meet</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <Button variant='contained' color='primary' onClick={updateVideoType}>
                    Set Event Video Type
                </Button>
            </Grid>
            {videoType === 'NO_VIDEO' ? (
                <Grid container justifyContent='center'>
                    <Typography>{'No video will play for this event (good for in person events)'}</Typography>
                </Grid>
            ) : null}
            {videoType === 'GOOGLE_MEET' ? <GoogleMeetSettings fragmentRef={data} /> : null}
            {videoType === 'YOUTUBE_STREAM' ? <YoutubeSettings fragmentRef={data} /> : null}
        </Grid>
    );
};
