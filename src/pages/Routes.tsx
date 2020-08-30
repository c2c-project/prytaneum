/* eslint-disable react/no-children-prop */
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Button, Zoom, IconButton, Drawer } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import Nav from 'layout/Nav';
import Auth from './Auth';

export default function Routes() {
    return (
        <Route path='/'>
            <Route path='/' exact>
                {({ match }) => (
                    <div>
                        <Zoom in={Boolean(match)} timeout={300}>
                            <div>
                                <Nav>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <IconButton>
                                            <MenuIcon
                                                style={{ color: 'white' }}
                                            />
                                        </IconButton>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <Button
                                            color='inherit'
                                            component={Link}
                                            to='/auth/login'
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </Nav>
                            </div>
                        </Zoom>
                    </div>
                )}
            </Route>
            <Route
                path='/auth'
                children={({ match }) => <Auth match={match} />}
            />
        </Route>
    );
}
