import React from 'react';
import { MemoryRouter } from 'react-router-dom'

import Fab from '.';

export default { title: 'Components/Fab' };

const onClick = () => {
    alert("onClick works");
};

export function FabButton() {
    return (
        <MemoryRouter initialEntries={['/']}>
            <Fab onClick={onClick} />
        </MemoryRouter>
    );
}