import React from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProfileIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { MemoryRouter, Route, Link } from 'react-router-dom';

import Component from '.';

export default { title: 'layout' };

export function AppBar() {
    return (
        <div>
            <MemoryRouter initialEntries={['/With a Title Only']}>
                <Route path='/:title'>
                    <Component />
                </Route>
            </MemoryRouter>
            <div style={{ height: '16px' }} />
            <MemoryRouter initialEntries={['/With a Title and Back Button']}>
                <Route path='/:title'>
                    <Component back />
                </Route>
            </MemoryRouter>
            <div style={{ height: '16px' }} />
            <MemoryRouter initialEntries={['/With a Title and Menu']}>
                <Route path='/:title'>
                    <Component back>
                        <IconButton style={{ color: 'white' }}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton style={{ color: 'white' }}>
                            <ProfileIcon />
                        </IconButton>
                        <IconButton style={{ color: 'white' }}>
                            <AddIcon />
                        </IconButton>
                    </Component>
                </Route>
            </MemoryRouter>
        </div>
    );
}
