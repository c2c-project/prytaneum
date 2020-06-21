import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';

export default { title: 'Domains/townhall' };

const session = {
    speaker: 'Darth Vader',
    moderator: 'Luke Skywalker',
    topic: 'Death Star Design & Imperial Unions',
    picture: 'https://i.imgur.com/3beQH5s.jpeg',
    readingMaterials: '',
};

export function TownhallPre() {
    return (
        <Container maxWidth='sm'>
            <Component data={session} />
        </Container>
    );
}
