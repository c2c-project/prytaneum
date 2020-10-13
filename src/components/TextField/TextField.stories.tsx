import React from 'react';

import Page from 'layout/Page';
import Component from './TextField';

export default {
    title: 'Components/TextField',
    component: Component,
};

export function TextField() {
    return (
        <Page>
            <Component
                required
                label='Storybook Label'
                value='start typing here, or change it and it will `alert(1)`'
                /* eslint-disable-next-line no-alert */
                onChange={() => alert('onChange alert')}
            />
        </Page>
    );
}
