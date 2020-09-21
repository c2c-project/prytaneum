import React from 'react';
import Container from '@material-ui/core/Container';

import Component from './MoCDropDown';

export default { title: 'Domains/Townhall' };

export function MoCDropdown() {
 
    return (
        <Container maxWidth='sm' disableGutters>
            <Component />
        </Container>
    );
}
