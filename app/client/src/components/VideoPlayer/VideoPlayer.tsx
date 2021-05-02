import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
});

/** Displays the video stream that plays during the townhall
 *  @category Component
 *  @constructor VideoPlayer
 *  @param ReactPlayerProps
 *  @param {string | string[] | SourceProps[] | MediaStream} ReactPlayerProps.url URL
 *  @param {any} ReactPlayerProps.rest rest of props to pass to ReactPlayer
 */
function VideoPlayer({ url, rest }: ReactPlayerProps) {
    const classes = useStyles();
    return (
        <div className={classes.outerContainer}>
            <div className={classes.innerContainer}>
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
            </div>
        </div>
    );
}

VideoPlayer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default VideoPlayer;
