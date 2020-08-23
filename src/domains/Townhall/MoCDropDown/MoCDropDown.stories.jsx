import React from 'react';
import Container from '@material-ui/core/Container';

import Component from './MoCDropDown';
import axios from 'axios';

export default { title: 'Domains/Townhall' };

export function MoCDropdown() {
 
    return (
        <Container maxWidth='sm' disableGutters>
            <Component />
        </Container>
    );
}
