import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Auth from './Auth';
import LoggedIn from '../components/LoggedIn';
// import TownhallList from '../domains/Townhall/TownhallList';
// import Chat from '../domains/Townhall/TownhallChat';
// import SessionSummary from './SessionSummary';
// import SessionData from './SessionData';
// import Logout from './Logout';
// import Login from './Login';
// import Layout from '../layout';
// import LoggedIn from '../components/LoggedIn';
// import LoginTemp from './LoginTemp';
// import Register from './Register';
// import Timeline from '../components/clipper/TimeLine';
// import Verification from './Verification';
// import RequestPasswordReset from './RequestPasswordReset';
// import UpdatePassword from './UpdatePassword';

export default function Routes() {
    return (
        <Switch>
            {/* <Route path='/app/:title'>
                <LoggedIn>
                    <Layout>
                        <Route path='/app/sessions/list'>
                            <TownhallList />
                        </Route>
                        <Route path='/app/sessions/:roomId/live'>
                            <Chat />
                        </Route>
                        <Route path='/app/sessions/summary'>
                            <SessionSummary />
                        </Route>
                        <Route path='/app/sessions/:sessionId/session-summary' component={SessionData} />
                        <Route path='/app/sessions/:sessionId/clips'>
                            <Timeline />
                        </Route>
                    </Layout>
                </LoggedIn>
            </Route> */}
            <Route path='/auth'>
                <Auth />
            </Route>
            <Route path='/app'>
                <LoggedIn>
                    <div>Logged in</div>
                </LoggedIn>
            </Route>
            {/* <Route exact path='/login'>
                <Login />
            </Route>
            <Route exact path='/register'>
                <Register />
            </Route>
            <Route exact path='/login-temporary'>
                <LoginTemp />
            </Route>
            <Route exact path='/logout'>
                <Logout />
            </Route>
            <Route path='/verification/:userId'>
                <Verification />
            </Route>
            <Route path='/forgot-password'>
                <RequestPasswordReset />
            </Route>
            <Route path='/resetpassword/:token'>
                <UpdatePassword />
            </Route>
            <Route path='/'>
                <Redirect to='/login' />
            </Route> */}
            <Route path='/'>
                <Redirect to='/auth/login' />
            </Route>
        </Switch>
    );
}
