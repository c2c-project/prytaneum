import React from 'react';

import { AppBar } from '@local/components';
import { CreateClass } from './CreateClass';

export default async function CreateClassPage() {
    return (
        <React.Fragment>
            <AppBar />
            {/* @ts-ignore Server Component */}
            <CreateClass />
        </React.Fragment>
    );
}
