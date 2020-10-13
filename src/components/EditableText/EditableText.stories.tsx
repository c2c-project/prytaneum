import React from 'react';
import Container from '@material-ui/core/Container';

import Component from './EditableText';

export default { title: 'Components/Editable Text' };

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
