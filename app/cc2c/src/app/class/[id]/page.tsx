import React from 'react';

import { AddTeacherFormModal, AppBar } from '@local/components';
import { Class } from './Class';

interface ClassPageProps {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ClassPage({ params }: ClassPageProps) {
    const { id: classId } = params;

    return (
        <React.Fragment>
            <AppBar />
            {/* @ts-ignore Server Component */}
            <Class classId={classId} />
            <AddTeacherFormModal classId={classId} />
        </React.Fragment>
    );
}
