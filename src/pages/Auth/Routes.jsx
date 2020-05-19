import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import LoginTemp from './LoginTemp';
import Logout from './Logout';
import ForgotPassConsume from './ForgotPassConsume';
import ForgotPassRequest from './ForgotPassRequest';
import ResetPassword from './ResetPassword';

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/auth/login'>
                <Login />
            </Route>
            <Route exact path='/auth/register'>
                <Register />
            </Route>
            <Route exact path='/auth/login-temporary'>
                <LoginTemp />
            </Route>
            <Route exact path='/auth/logout'>
                <Logout />
            </Route>
            <Route path='/auth/forgot-password/consume-token/:userId'>
                <ForgotPassConsume />
            </Route>
            <Route path='/auth/forgot-password/request'>
                <ForgotPassRequest />
            </Route>
            <Route path='/auth/forgot-password/reset/:token'>
                <ResetPassword />
            </Route>
            <Route path='/'>
                <Redirect to='/auth/login' />
            </Route>
        </Switch>
    );
}
