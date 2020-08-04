import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TimeLineItem from './TimeLineItem';
import ClipDialog from './ClipDialog';
import Fab from '../Fab/Fab';
import './TimeLineItem.css';
import useJwt from '../../hooks/useJwt';

export default function TimeLine({ url }) {
    const player = useRef();
    const location = useLocation();
    const quickScroll = React.useRef(null);
    const [jwt] = useJwt();
    const [currUrl, setUrl] = useState(url);
    const [playVideo, setPlayVideo] = useState(true);
    const [addMode, setAddMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currClip, setCurrClip] = React.useState({
        question: '',
        start: 0,
        end: 0
    });
    const [clips, setClipState] = useState([]);
    useEffect(() => {
        // initialize our set of clips
        fetch(`/api/sessions/find/${location.state.id}`, {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        }).then(res => {
            res.json().then(r => {
                console.log(r);
                if (r.clips !== undefined) {
                    setClipState(r.clips);
                }
                if (r.url !== undefined) {
                    setUrl(r.url);
                }
            });
        });
    }, []);

    const postData = newClips => {
        console.log(newClips);
        fetch('/api/sessions/updateClips', {
            method: 'POST',
            headers: {
                Authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId: location.state.id,
                changes: [...newClips]
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Success:', data);
                setClipState(newClips);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const addToClips = () => {
        const newClips = [...clips, { ...currClip, id: clips.length }];
        postData(newClips);
    };

    function handleTimeStamp({ playedSeconds }) {
        document.getElementById('header').innerHTML = playedSeconds;
    }

    function editClips() {
        const newClips = [...clips];
        newClips[currClip.id] = currClip;
        postData(newClips);
    }

    function editCurrentClip(item) {
        setCurrClip(item);
    }

    return (
        <div>
            <div ref={quickScroll} />
            <ReactPlayer
                ref={player}
                url={currUrl}
                playing={playVideo}
                width='100%'
                playsinline
                onProgress={handleTimeStamp}
            />
            <Grid container>
                
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        const [beforeUrl] = currUrl.split('?');
                        setUrl(beforeUrl);
                        setPlayVideo(true);
                    }}
                >
                Reset Video
                </Button>
                <h1 id='header'>CurrentTime</h1>
            </Grid>
            
            <Fab
                onClick={() => {
                    // create new initial clip.
                    setPlayVideo(false);
                    setCurrClip({
                        question: '',
                        start: player.current.getCurrentTime(),
                        end: player.current.getCurrentTime() + 15,
                        category: {
                            tag: 'medium',
                            color: '#018f69'
                        },
                        link: {
                            text: 'Click Here'
                        }
                    });
                    setEditMode(false);
                    setAddMode(true);
                }}
            />

            <ClipDialog
                currentClip={currClip}
                confirm={editClips}
                openState={false || editMode}
                edit={editCurrentClip}
                modeOff={() => {
                    setEditMode(false);
                }}
            />

            <ClipDialog
                currentClip={currClip}
                confirm={addToClips}
                edit={editCurrentClip}
                openState={false || addMode}
                modeOff={() => {
                    setAddMode(false);
                }}
            />

            <div className='timeline-container'>
                {clips.map((x, index) => (
                    <TimeLineItem
                        data={x}
                        key={index}
                        onClickPlay={() => {
                            // console.log(`TimeFrame: ${x.start} ${x.end}`);
                            const [beforeUrl] = currUrl.split('?');
                            setUrl(
                                `${beforeUrl}?start=${x.start}&end=${x.end}`
                            );
                            setPlayVideo(true);
                            quickScroll.current.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}
                        onClickEdit={() => {
                            setCurrClip({ ...x });
                            setEditMode(true);
                        }}
                        onClickDelete={() => {
                            console.log(`Deleting Clip ${x.question}`);
                            const temp = [];
                            for (let i = 0; i < clips.length; i += 1) {
                                if (i !== index) {
                                    temp.push(clips[i]);
                                }
                            }
                            postData(temp);
                            // setClipState(temp);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

TimeLine.defaultProps = {
    url: ''
};

TimeLine.propTypes = {
    url: PropTypes.string
};
