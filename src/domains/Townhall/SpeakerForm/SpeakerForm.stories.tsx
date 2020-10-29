import React from 'react';

import SpeakerForm from './SpeakerForm';

export default { title: 'Domains/Townhall/Speaker Form' };

export function Basic() {
    return <SpeakerForm />;
}

export function WithCancel() {
    return <SpeakerForm onCancel={() => {}} />;
}
