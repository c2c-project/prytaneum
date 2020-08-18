/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useRouteMatch, RouteProps } from 'react-router-dom';
import Route from './Route';

export default function RouteFile(props: RouteProps & { path: string }) {
    const { children, path, ...rest } = props;
    const match = useRouteMatch();
    // const location = useLocation();

    let propPath: string;
    if (match.url === '/') {
        propPath = path;
    } else {
        propPath = `${match.url}${path}`;
    }
    // console.log(propPath);
    return (
        <Route path={propPath} {...rest}>
            {children}
        </Route>
    );
}
