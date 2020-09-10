/* eslint-disable react/no-children-prop */
import React from 'react';
import Slide from '@material-ui/core/Slide';
import { Route, useHistory } from 'react-router-dom';

import Page from 'layout/Page';
import Nav from 'layout/Nav';
import Auth from './Auth';
import Townhalls from './Townhall';

export default function MyRoutes() {
    return (
        <Route path='/'>
            <Nav />
            <Route path='/townhalls' children={<Townhalls />} />
            <Route path='/auth' children={<Auth />} />
        </Route>
    );
}
