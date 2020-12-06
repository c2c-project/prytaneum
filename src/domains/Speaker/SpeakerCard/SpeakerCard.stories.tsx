import React from 'react';
import { makeSpeaker } from 'prytaneum-typings';

import Component from './SpeakerCard';

export default { title: 'Domains/Speaker/Speaker Card' };

export function Basic() {
    const { name, title, description, picture } = makeSpeaker();
    return (
        <div
            style={{
                marginLeft: '30px',
                marginTop: '30px',
            }}
        >
            <Component
                title={name}
                subtitle={title}
                description={description}
                image={picture}
            />
        </div>
    );
}
