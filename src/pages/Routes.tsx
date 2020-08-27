/* eslint-disable react/no-children-prop */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Nav from 'layout/Nav';
import Auth from './Auth';

const DefaultPage = () => <Redirect to='/auth/login' />;
const AppHomePage = () => <Redirect to='/app/townhalls' />;

export default function Routes() {
    return (
        <Route path='/'>
            <Route path='/' exact>
                <Nav />
            </Route>
            <Route
                path='/auth'
                children={({ match }) => <Auth match={match} />}
            />
        </Route>
    );
}
