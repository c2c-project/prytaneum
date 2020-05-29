/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

export default function TransitionPage({ children }) {
    const location = useLocation();
    return (
        <Fade
            in
            timeout={{ enter: 400, exit: 400 }}
            key={location.key}
        >
            {children}
        </Fade>
    );
}
