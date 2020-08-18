import React from 'react';
import { MemoryRouter } from 'react-router-dom'

import Component from './Fab';
import theme from 'theme';

export default { 
    title: 'Components/Fab',
    component: Component 
};

const onClick = () => {
    alert("onClick works");
};

export function FabButton() {
    return (
        <MemoryRouter initialEntries={['/']}>
            <Component onClick={onClick} />
        </MemoryRouter>
    );
}
