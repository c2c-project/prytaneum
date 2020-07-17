import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import LoginTemp from './LoginTemp';
import Logout from './Logout';
import ForgotPassReset from './ForgotPassReset';
import ForgotPassRequest from './ForgotPassRequest';
import routes from './route-names';

export default function Routes() {
    return (
        <Switch>
            <Route exact path={routes.login}>
                <Login />
            </Route>
            <Route exact path={routes.register}>
                <Register />
            </Route>
            <Route exact path={routes.loginTemp}>
                <LoginTemp />
            </Route>
            <Route exact path={routes.logout}>
                <Logout />
            </Route>
            <Route path={routes.forgotPassRequest}>
                <ForgotPassRequest />
            </Route>
            <Route path={routes.forgotPasswordReset}>
                <ForgotPassReset />
            </Route>
            <Route path='/'>
                <Redirect to={routes.login} />
            </Route>
        </Switch>
    );
}
