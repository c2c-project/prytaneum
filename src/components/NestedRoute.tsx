/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Slide } from '@material-ui/core';
import {
    Route,
    useRouteMatch,
    RouteProps,
    useLocation,
} from 'react-router-dom';

export default function Routes(props: RouteProps & { path: string }) {
    const { children, path, ...rest } = props;
    const match = useRouteMatch();
    // const location = useLocation();
    console.log(`${match.url}${path}`);
    return (
        <Route path={`${match.url}${path}`} {...rest}>
            {/* <Slide in key={location.key}> */}
            {children}
            {/* </Slide> */}
        </Route>
    );
}
