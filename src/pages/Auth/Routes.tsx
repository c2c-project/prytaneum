import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    useHistory,
    useLocation,
} from 'react-router-dom';
import { Slide, Grid, Container } from '@material-ui/core';

import Login from './Login';
import Register from './Register';
import LoginTemp from './LoginTemp';
import Logout from './Logout';
import ForgotPassReset from './ForgotPassReset';
// import ForgotPassRequest from './ForgotPassRequest';
import routes from './route-names';

export default function Routes() {
    const history = useHistory();
    return (
        <Route path='/'>
            {/* {({ match }) => (
                <Slide direction='right' in>
                    <div>
                        <Route exact path={routes.login}>
                            <Login
                                onLogin={() => history.push('/auth/home')}
                                registerRoute={routes.register}
                                forgotPassRoute={routes.forgotPassRequest}
                            />
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
                        <Route path={routes.forgotPasswordReset}>
                            <ForgotPassReset />
                        </Route>
                    </div>
                </Slide>
            )} */}

            <Route exact path={routes.login}>
                {({ match }) => (
                    <Slide direction='right' in={Boolean(match)}>
                        <Container
                            maxWidth='xs'
                            style={{ position: 'relative' }}
                        >
                            <div style={{ position: 'absolute' }}>
                                <Login
                                    onLogin={() => history.push('/auth/home')}
                                    registerRoute={routes.register}
                                    forgotPassRoute={routes.forgotPassRequest}
                                />
                            </div>
                        </Container>
                    </Slide>
                )}
            </Route>
            <Route exact path={routes.register}>
                {({ match }) => (
                    <Slide direction='left' in={Boolean(match)}>
                        <Container
                            maxWidth='xs'
                            style={{ position: 'relative' }}
                        >
                            <div style={{ position: 'absolute' }}>
                                <Register />
                            </div>
                        </Container>
                    </Slide>
                )}
            </Route>
            <Route exact path={routes.loginTemp}>
                <LoginTemp />
            </Route>
            <Route exact path={routes.logout}>
                <Logout />
            </Route>
            <Route path={routes.forgotPasswordReset}>
                <ForgotPassReset />
            </Route>
            {/* <Route path={routes.forgotPassRequest}>
                <ForgotPassRequest />
            </Route> */}
        </Route>
    );
}

// export default function Routes() {
//     const history = useHistory();
//     const location = useLocation();
//     return (
//         <Route path='/'>
//             <Route exact path={routes.login}>
//                 {({ match }) => (
//                     <Slide direction='right' in={Boolean(match)}>
//                         <div
//                             style={{
//                                 backgroundColor: 'blue',
//                                 height: '100%',
//                                 width: '100%',
//                                 position: 'absolute',
//                             }}
//                         />
//                     </Slide>
//                 )}
//             </Route>
//             <Route exact path={routes.register}>
//                 {({ match }) => (
//                     <Slide direction='left' in={Boolean(match)}>
//                         <div
//                             style={{
//                                 backgroundColor: 'purple',
//                                 height: '100%',
//                                 width: '100%',
//                                 position: 'absolute',
//                             }}
//                         />
//                     </Slide>
//                 )}
//             </Route>
//         </Route>
//     );
// }
