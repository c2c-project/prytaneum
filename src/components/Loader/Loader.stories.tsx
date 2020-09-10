import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from 'theme';

import Component from './Loader';

export default {
    title: 'Components/Loader',
    component: Component,
};

export function Loader() {
    return <Component />;
}
