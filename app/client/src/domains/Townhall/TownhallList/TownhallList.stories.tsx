/* eslint-disable no-console */
import * as React from 'react';
import { Meta } from '@storybook/react';
import Component from '.';

export default {
    title: '@local/domains/Townhall/Townhall List',
    decorators: [
        (MyStory) => (
            <div style={{ flex: 1, padding: 60 }}>
                <MyStory />
            </div>
        ),
    ],
} as Meta;

export function Basic() {
    return <Component title='Test Title here' onClickTownhall={console.log} />;
}
