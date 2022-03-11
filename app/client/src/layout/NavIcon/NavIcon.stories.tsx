import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';

import Component from './NavIcon';

export default { title: 'Layout/Nav Icon' };

export function Basic() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Component open={open} onClick={() => setOpen(!open)} />
            <MenuIcon fontSize='large' />
        </>
    );
}
