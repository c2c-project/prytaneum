import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Err from './404';
import routeNames from './route-names';

export default function PublicRoutes() {
    return (
        <Switch>
            <Route path={routeNames.home}>
                <Home />
            </Route>
            <Route path={routeNames.about}>
                <About />
            </Route>
            <Route path={routeNames.err}>
                <Err />
            </Route>
            <Route path='/'>
                <Redirect to={routeNames.home} />
            </Route>
        </Switch>
    );
}
