import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
// import Clipper from '../Clipper';

function VideoPlayer({ url, rest }: ReactPlayerProps) {
    return (
        <ReactPlayer
            url={url}
            playing={process.env.NODE_ENV === 'production'}
            width='100%'
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
