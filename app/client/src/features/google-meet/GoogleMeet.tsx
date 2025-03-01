import React from 'react';
import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useRouter } from 'next/router';

import { useGoogleMeet } from './useGoogleMeet';
import { useGoogleMeetFragment$key } from '@local/__generated__/useGoogleMeetFragment.graphql';
import BackgroundOverlay from '@local/components/BackgroundOverlay';

const ReloadButton = ({ onReload }: { onReload: () => void }) => (
    <Button variant='contained' startIcon={<RefreshIcon />} onClick={onReload} sx={{ mt: 2, px: 0.5, padding: 1 }}>
        Reload
    </Button>
);

const GoogleMeetEndedMessageWithReloadButton = ({ onReload }: { onReload: () => void }) => (
    <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
        <Typography variant='h4' color='grey.600' sx={{ mx: 5 }} align='center'>
            The call has ended.
        </Typography>
        <Typography variant='body2' sx={{ mt: 1, px: 0.5, mx: 5 }} align='center'>
            If you would like to re-join the call click on RELOAD or refresh the page.
        </Typography>
        <ReloadButton onReload={onReload} />
    </Grid>
);

const GoogleMeetErrorMessage = ({ onReload }: { onReload: () => void }) => (
    <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
        <Typography variant='h4' sx={(theme) => ({ color: theme.palette.error.main, mx: 5 })} align='center'>
            Error connecting to Google Meet!
        </Typography>
        <Typography variant='body1' sx={{ mt: 1, px: 0.5, mx: 5 }} color='grey.800' align='center'>
            Please reload the page to try again.
        </Typography>
        <ReloadButton onReload={onReload} />
        <Typography variant='body1' sx={{ mt: 1, px: 0.5, mx: 5 }} color='grey.800' align='center'>
            If you continue to have issues, please try whitelisting Prytaneum on any ad/tracker blockers you may have
            installed.
        </Typography>
    </Grid>
);

interface GoogleMeetProps {
    fragmentRef: useGoogleMeetFragment$key;
}

function GoogleMeet({ fragmentRef }: GoogleMeetProps) {
    const router = useRouter();
    const { connectToMeeting, displayReloadButton, isLoading, isCallEnded, isError } = useGoogleMeet({
        fragmentRef,
    });

    React.useEffect(() => {
        connectToMeeting();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const BackgroundText = () => {
        if (displayReloadButton || isCallEnded || isError) return null;
        return (
            <Typography variant='h4' color='grey.600' marginX='5rem' align='center'>
                Connecting to Google Meet...
            </Typography>
        );
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <BackgroundOverlay bgColor='white'>
                <BackgroundText />
            </BackgroundOverlay>
            {isLoading ? <LinearProgress /> : null}
            <Box sx={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
                <div id='meet-frame-dialog' />
                <div id='meet-frame-docked' className='meet-frame-docked' style={{ height: '100%', width: '100%' }}>
                    {displayReloadButton ? (
                        <GoogleMeetEndedMessageWithReloadButton onReload={() => router.reload()} />
                    ) : null}
                    {isError ? <GoogleMeetErrorMessage onReload={() => router.reload()} /> : null}
                </div>
                <div id='meet-frame-pip' className='meet-frame-pip' />
            </Box>
        </Box>
    );
}

export default GoogleMeet;
