import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
// import Clipper from '../Clipper';

/** Displays the video stream that plays during the townhall
 *  @category Component
 *  @constructor VideoPlayer
 *  @param ReactPlayerProps
 *  @param {string | string[] | SourceProps[] | MediaStream} ReactPlayerProps.url URL
 *  @param {any} ReactPlayerProps.rest rest of props to pass to ReactPlayer
 */
function VideoPlayer({ url, rest }: ReactPlayerProps) {
    return (
        <ReactPlayer
            url={url}
            playing={process.env.NODE_ENV === 'production'}
            width='100%'
            height='720px'
            playsinline
            controls
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    );
}

VideoPlayer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default VideoPlayer;
