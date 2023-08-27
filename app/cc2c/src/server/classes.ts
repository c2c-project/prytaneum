'use server';

import { prisma } from '@local/core';

export type Class = {
    id: string;
    termId: string;
    name: string;
    prytaneumURL: string;
};

export async function getAllClasses(): Promise<Class[]> {
    const classes = await prisma.class.findMany({
        select: {
            id: true,
            termId: true,
            name: true,
            prytaneumURL: true,
        },
    });

    return classes;
}

export async function getClassById(id: string): Promise<Class | null> {
    const _class = await prisma.class.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            termId: true,
            name: true,
            prytaneumURL: true,
        },
    });

    return _class;
}
