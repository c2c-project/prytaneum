import React from 'react';
import { Meta } from '@storybook/react';
import { makeSpeaker } from 'prytaneum-typings';

import Component from './SpeakerCard';

export default { title: 'Domains/Speaker/Speaker Card', parameters: { layout: 'centered' } } as Meta;

export function Basic() {
    const { name, title, description, picture } = makeSpeaker();
    return <Component title={name} subtitle={title} description={description} image={picture} />;
}
