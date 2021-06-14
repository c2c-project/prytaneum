import * as React from 'react';
import { Meta } from '@storybook/react';
import Container from '@material-ui/core/Container';

import Component from './EditableText';

export default { title: '@local/components/Editable Text', parameters: { layout: 'centered' } } as Meta;

export function Basic() {
    const [state, setState] = React.useState('email@email.com');
    return (
        <Container maxWidth='md'>
            <Component
                value={state}
                onChange={(str) => setState(str)}
                label='Storybook Field'
                inputProps={{
                    type: 'email',
                }}
            />
            <Component
                value={state}
                onChange={(str) => setState(str)}
                label='Storybook Field'
                inputProps={{
                    type: 'email',
                }}
            />
            <Component
                value={state}
                onChange={(str) => setState(str)}
                label='Storybook Field'
                inputProps={{
                    type: 'email',
                }}
            />
        </Container>
    );
}
