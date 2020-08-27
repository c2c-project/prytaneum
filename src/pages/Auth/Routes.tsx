import React from 'react';
import { Route, useHistory, match as MatchType } from 'react-router-dom';
import { Slide } from '@material-ui/core';

import Nav from 'layout/Nav';
import Page from 'layout/Page';
import Login from './Login';
import Register from './Register';
import ForgotPasswordRequest from './ForgotPassRequest';

interface Props {
    // eslint-disable-next-line @typescript-eslint/ban-types
    match: MatchType<{}> | null;
}

export default function Routes({ match: parentMatch }: Props) {
    const history = useHistory();
    const [firstEnter, setFirstEnter] = React.useState(true);
    return (
        <Slide
            in={Boolean(parentMatch)}
            direction='up'
            onEntered={() => setFirstEnter(false)}
            onExited={() => setFirstEnter(true)}
        >
            <div>
                <Route path='/auth/login'>
                    {({ match }) => (
                        <Slide
                            direction='right'
                            in={Boolean(match)}
                            timeout={firstEnter ? 0 : 400}
                            unmountOnExit
                        >
                            <div>
                                <Nav back />
                                <Page maxWidth='sm'>
                                    <Login
                                        onLogin={() => history.push('/home')}
                                        registerRoute='/auth/register'
                                        forgotPassRoute='/auth/forgot-password/request'
                                    />
                                </Page>
                            </div>
                        </Slide>
                    )}
                </Route>
                <Route path='/auth/register'>
                    {({ match }) => (
                        <Slide
                            direction='left'
                            in={Boolean(match)}
                            timeout={firstEnter ? 0 : 400}
                            unmountOnExit
                        >
                            <div>
                                <Nav back />
                                <Page maxWidth='sm'>
                                    <Register />
                                </Page>
                            </div>
                        </Slide>
                    )}
                </Route>
                <Route path='/auth/forgot-password/request'>
                    {({ match }) => (
                        <Slide
                            direction='left'
                            in={Boolean(match)}
                            timeout={firstEnter ? 0 : 400}
                            unmountOnExit
                        >
                            <div>
                                <Nav back />
                                <Page maxWidth='sm'>
                                    <ForgotPasswordRequest />
                                </Page>
                            </div>
                        </Slide>
                    )}
                </Route>
            </div>
        </Slide>
    );
}
