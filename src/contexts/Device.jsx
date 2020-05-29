/* eslint-disable react/prop-types */
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const DeviceContext = React.createContext();

export default function Device({ children }) {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <DeviceContext.Provider value={matches ? 'mobile' : 'desktop'}>
            {children}
        </DeviceContext.Provider>
    );
}
