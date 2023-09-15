'use server';

import { prisma } from '@local/core';
import { revalidatePath } from 'next/cache';

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

export async function getClassById(id: string) {
    const _class = await prisma.class.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            termId: true,
            name: true,
            prytaneumURL: true,
            students: true,
        },
    });

    return _class;
}

// Ensure to add path to revalidate when using this function from a new route
export async function updateClass(formData: FormData) {
    try {
        const classId = formData.get('classId') as string | null;
        if (!classId) throw new Error('Class id not found');
        const className = formData.get('className') as string | null;
        if (!className) throw new Error('Class name not found');
        const prytaneumURL = formData.get('prytaneumURL') as string | null;
        if (!prytaneumURL) throw new Error('Prytaneum URL not found');
        const termId = formData.get('termId') as string | null;
        if (!termId) throw new Error('Term id not found');

        await prisma.class.update({
            where: {
                id: classId,
            },
            data: {
                name: className === '' ? undefined : className,
                prytaneumURL: prytaneumURL === '' ? undefined : prytaneumURL,
                termId: termId === '' ? undefined : termId,
            },
        });

        revalidatePath('/class/[id]');
        return { isError: false, message: 'Class updated' };
    } catch (error) {
        console.error(error);
        return { isError: true, message: 'Error updating class' };
    }
}
