import * as React from 'react';
import Container from '@mui/material/Container';

import Component from './MoCDropDown';

export default { title: '@local/components/MoC Dropdown' };

export function Basic() {
    return (
        <Container maxWidth='sm' disableGutters>
            <Component />
        </Container>
    );
}
