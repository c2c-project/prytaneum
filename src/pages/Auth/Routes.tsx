/* eslint-disable react/no-children-prop */
import React from 'react';
import { Route, useHistory, MemoryRouter } from 'react-router-dom';
import { Slide, IconButton, useTheme, Fade } from '@material-ui/core';
import { Close as CloseIcon, ArrowBack as BackIcon } from '@material-ui/icons';

import Page from 'layout/Page';
import AppBar from 'layout/AppBar';
import Login from './Login';
import Register from './Register';
import ForgotPasswordRequest from './ForgotPassRequest';

// export default function MyRoutes() {
//     const theme = useTheme();
//     const history = useHistory();
//     return (
//         <div>
//             <Route
//                 path='/login'
//                 children={
//                     <Login
//                         onLogin={() => history.push('/home')}
//                         registerRoute='/auth/register'
//                         forgotPassRoute='/auth/forgot-password/request'
//                     />
//                 }
//             />
//             <Route path='/register' children={<Register />} />

//             {/* <Route path='/register'>
//                 {({ match, history }) => (
//                     <Slide
//                         direction={firstEnter ? 'up' : 'left'}
//                         onEntered={() => setFirstEnter(false)}
//                         in={Boolean(match)}
//                         timeout={400}
//                         unmountOnExit
//                     >
//                         <div>
//                             <AppBar>
//                                 <IconButton
//                                     onClick={() => history.goBack()}
//                                     edge='start'
//                                     color='inherit'
//                                     aria-label='back-button'
//                                 >
//                                     <BackIcon />
//                                 </IconButton>
//                             </AppBar>
//                             <Page maxWidth='sm'>
//                                 <Register />
//                             </Page>
//                         </div>
//                     </Slide>
//                 )}
//             </Route>
//             <Route path='/forgot-password/request'>
//                 {({ match, history }) => (
//                     <Slide
//                         direction={firstEnter ? 'up' : 'left'}
//                         onEntered={() => setFirstEnter(false)}
//                         in={Boolean(match)}
//                         timeout={400}
//                         unmountOnExit
//                     >
//                         <div>
//                             <AppBar>
//                                 <IconButton
//                                     onClick={() => history.goBack()}
//                                     edge='start'
//                                     color='inherit'
//                                     aria-label='back-button'
//                                 >
//                                     <BackIcon />
//                                 </IconButton>
//                             </AppBar>
//                             <Page maxWidth='sm'>
//                                 <ForgotPasswordRequest />
//                             </Page>
//                         </div>
//                     </Slide>
//                 )}
//             </Route> */}
//         </div>
//     );
// }

export default function Routes() {
    const history = useHistory();
    return (
        <div>
            <Route path='/auth/login'>
                <Page>
                    <Login
                        onLogin={() => history.push('/home')}
                        registerRoute='/auth/register'
                        forgotPassRoute='/auth/forgot-password/request'
                    />
                </Page>
            </Route>
            <Route path='/auth/register'>
                <Page>
                    <Register />
                </Page>
            </Route>
            <Route path='/auth/forgot-password/request'>
                <Page>
                    <ForgotPasswordRequest />
                </Page>
            </Route>
        </div>
    );
}
