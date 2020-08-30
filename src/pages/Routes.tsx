/* eslint-disable react/no-children-prop */
import React from 'react';
import { Route } from 'react-router-dom';

import Nav from 'layout/Nav';
import Auth from './Auth';
import Townhalls from './Townhall';

export default function Routes() {
    return (
        <Route path='/'>
            <Route path='/' exact>
                {({ match }) => <Nav isVisible={Boolean(match)} />}
            </Route>
            <Route
                path='/auth'
                children={({ match }) => <Auth match={match} />}
            />
            <Route path='/townhalls' children={({ match }) => <Townhalls />} />
        </Route>
    );
}
