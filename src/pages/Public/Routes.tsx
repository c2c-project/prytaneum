import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Err from './404';
import routes from './routes';

export default function PublicRoutes() {
    return (
        <Switch>
            <Route path={routes.home}>
                <Home />
            </Route>
            <Route path={routes.about}>
                <About />
            </Route>
            <Route path={routes.err}>
                <Err />
            </Route>
            <Route path='/'>
                <Redirect to={routes.home} />
            </Route>
        </Switch>
    );
}
