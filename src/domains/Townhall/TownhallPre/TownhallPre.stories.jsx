import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';

export default { title: 'Domains/Townhall' };

const townhall = {
    speaker: 'Darth Vader',
    moderator: 'Luke Skywalker',
    topic: 'Death Star Design & Imperial Unions',
    picture: 'https://i.imgur.com/3beQH5s.jpeg',
    readingMaterials: '',
    date: new Date(),
};

export function TownhallPre() {
    return (
        <Container maxWidth='sm'>
            <Component townhall={townhall} />
        </Container>
    );
}
