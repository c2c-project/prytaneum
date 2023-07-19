import { Fragment } from 'react';
import { prisma } from '@local/core/prisma';

async function createUser() {
    'use server';
    console.log('Creating user');
    await prisma.user.create({
        data: {
            email: 'test@test.com',
            password: 'test',
            name: 'Test User',
        },
    });
}

export default async function Dashboard() {
    return (
        <Fragment>
            <header>
                <h1>Landing</h1>
                <button onClick={createUser}>Click</button>
            </header>
        </Fragment>
    );
}
