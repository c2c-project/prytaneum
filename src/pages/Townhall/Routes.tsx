import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TownhallList from './TownhallList';
import routeNames from './route-names';

export default function Routes() {
    return (
        <Switch>
            <Route path={routeNames.list}>
                <TownhallList />
            </Route>
        </Switch>
    );
}
