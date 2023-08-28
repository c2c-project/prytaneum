import React from 'react';

import { AppBar } from '@local/components';
import Landing from './landing';

export default async function LandingPage() {
    return (
        <React.Fragment>
            <AppBar />
            <Landing />
        </React.Fragment>
    );
}
