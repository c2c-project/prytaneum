import React from 'react';
import { Meta } from '@storybook/react';
import Component from './CopyText';

export default { title: 'Components/Copy', parameters: { layout: 'centered' } } as Meta;

export function Basic() {
    return <Component text='storybook data' />;
}
