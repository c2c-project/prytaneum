import React from 'react';
import Video from './D4NNY.mp4';


export default function EditClip() {
    return (
        <div>
            <h1>Edit Video page</h1>
            <video controls>
                <source src={Video} type='video/mp4' />
            </video>
        </div>
    );
}
