/* eslint-disable no-console */
import React from 'react';

import SpeakerForm from './SpeakerForm';

export default { title: 'Domains/Speaker/Speaker Form' };

export function Basic() {
    return <SpeakerForm onSubmit={console.log} />;
}

export function WithCancel() {
    return <SpeakerForm onCancel={() => {}} onSubmit={console.log} />;
}
