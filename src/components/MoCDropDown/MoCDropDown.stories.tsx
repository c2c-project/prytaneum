import React from 'react';
import Container from '@material-ui/core/Container';

import Component from './MoCDropDown';

export default { title: 'Components/MoC Dropdown' };

export function Basic() {
    return (
        <Container maxWidth='sm' disableGutters>
            <Component />
        </Container>
    );
}
