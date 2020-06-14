/* eslint-disable react/prop-types */
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiTheme from 'theme';

export const DeviceContext = React.createContext<'desktop' | 'mobile'>(
    'desktop'
);

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function Device({ children }: Props) {
    const matches = useMediaQuery<typeof MuiTheme>((theme) =>
        theme.breakpoints.down('sm')
    );
    return (
        <DeviceContext.Provider value={matches ? 'mobile' : 'desktop'}>
            {children}
        </DeviceContext.Provider>
    );
}
