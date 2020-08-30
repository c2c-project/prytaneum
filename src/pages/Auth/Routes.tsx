import React from 'react';
import { Route, useHistory, match as MatchType, Link } from 'react-router-dom';
import { Slide, IconButton } from '@material-ui/core';
import { Close as CloseIcon, ArrowBack as BackIcon } from '@material-ui/icons';

import AppBar from 'layout/AppBar';
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
    const isMatch = Boolean(parentMatch);
    const [firstEnter, setFirstEnter] = React.useState(true);
    React.useEffect(() => {
        if (!isMatch) setFirstEnter(true);
    }, [parentMatch]);
    return (
        <div>
            <Route path='/auth/login'>
                {({ match }) => (
                    <Slide
                        direction={firstEnter ? 'up' : 'right'}
                        in={Boolean(match)}
                        onEntered={() => setFirstEnter(false)}
                        timeout={400}
                        unmountOnExit
                    >
                        <div>
                            <AppBar>
                                <IconButton
                                    onClick={() => history.goBack()}
                                    edge='start'
                                    color='inherit'
                                    aria-label='back-button'
                                >
                                    <CloseIcon />
                                </IconButton>
                            </AppBar>
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
                        direction={firstEnter ? 'up' : 'left'}
                        onEntered={() => setFirstEnter(false)}
                        in={Boolean(match)}
                        timeout={400}
                        unmountOnExit
                    >
                        <div>
                            <AppBar>
                                <IconButton
                                    onClick={() => history.goBack()}
                                    edge='start'
                                    color='inherit'
                                    aria-label='back-button'
                                >
                                    <BackIcon />
                                </IconButton>
                            </AppBar>
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
                        direction={firstEnter ? 'up' : 'left'}
                        onEntered={() => setFirstEnter(false)}
                        in={Boolean(match)}
                        timeout={400}
                        unmountOnExit
                    >
                        <div>
                            <AppBar>
                                <IconButton
                                    onClick={() => history.goBack()}
                                    edge='start'
                                    color='inherit'
                                    aria-label='back-button'
                                >
                                    <BackIcon />
                                </IconButton>
                            </AppBar>
                            <Page maxWidth='sm'>
                                <ForgotPasswordRequest />
                            </Page>
                        </div>
                    </Slide>
                )}
            </Route>
        </div>
    );
}
