import * as React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { Typography, Grid } from '@mui/material';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

const useStyles = makeStyles({
    outerContainer: {
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
    },
    innerContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: 'lightGrey',
    },
});

export type VideoPlayerProps = ReactPlayerProps;

/** Displays the video stream that plays during the townhall
 *  @category Component
 *  @constructor VideoPlayer
 *  @param ReactPlayerProps
 *  @param {string | string[] | SourceProps[] | MediaStream} ReactPlayerProps.url URL
 *  @param {any} ReactPlayerProps.rest rest of props to pass to ReactPlayer
 */
export function VideoPlayer({ url, rest }: ReactPlayerProps) {
    const classes = useStyles();
    return (
        <div className={classes.outerContainer}>
            <div className={classes.innerContainer}>
                {url !== '' ? (
                    <ReactPlayer
                        url={url}
                        playing={process.env.NODE_ENV === 'production'}
                        width='100%'
                        height='100%'
                        playsinline
                        controls
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...rest}
                    />
                ) : (
                    <Grid container justifyContent='center' alignContent='center' className={classes.placeholder}>
                        <Typography>At the start time of the event refresh your browser to see the video</Typography>
                    </Grid>
                )}
            </div>
        </div>
    );
}

VideoPlayer.propTypes = {
    url: PropTypes.string.isRequired,
};
