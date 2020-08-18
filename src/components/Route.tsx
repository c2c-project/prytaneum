/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route as ReactRouterRoute, RouteProps } from 'react-router-dom';

export default function Route(props: RouteProps) {
    return <ReactRouterRoute exact {...props} />;
}
