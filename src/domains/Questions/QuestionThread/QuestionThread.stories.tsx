import React from 'react';
import { makeQuestion } from 'prytaneum-typings';
import Container from '@material-ui/core/Container';

import Component from '.';

export default { title: 'Domains/Questions/Question Thread' };

export function Basic() {
    return (
        <Container disableGutters style={{ height: '100%' }}>
            <Component question={makeQuestion()} />
        </Container>
    );
}
