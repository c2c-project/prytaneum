import React from 'react';
import Thumbnail from '../../assets/default-thumbnail.jpg';
import './style.css';

export default function EditClip() {
    const player = document.getElementById('video_player');

    const handlePlayPause = (type: string) => {};

    return (
        <div id='player_wrapper'>
            <video id='video_player'>
                <source src={Thumbnail} type='video/mp4' />
                <track kind='captio ns' label='English captions' />
            </video>
            <div
                className='player_controls_top'
                data-state='visible'
            >
                <button id='expand_button' type='button'>
                    Expand
                </button>
                <button id='volume' type='button'>
                    Volume
                </button>
            </div>
            <div className='player_controls_bottom'>
                <button type='button' id='playpause'>Play/Pause</button>
                <button type='button' id='stop'>Stop</button>
                <div className='progress'>
                    <progress id='progress' value='40' max='100'>
                        <span id='progress-bar' />
                    </progress>
                </div>
                <button type='button' id='cc'>CC</button>
                <button type='button' id='fullscreen'>FF</button>
            </div>

        </div>
    );
}
