import React from 'react';

import { AppBar } from '@local/components';
import { ForgotPassword } from './ForgotPassword';

export default async function SignInPage() {
    return (
        <React.Fragment>
            <AppBar />
            <ForgotPassword />
        </React.Fragment>
    );
}
