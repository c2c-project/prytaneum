/* eslint-disable react/prop-types */
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

interface Props {
    children: ReactElement<any, any> | undefined; // this is strange?
}

export default function TransitionPage({ children }: Props) {
    const location = useLocation();
    return (
        <Fade in timeout={{ enter: 400, exit: 400 }} key={location.key}>
            {children}
        </Fade>
    );
}
