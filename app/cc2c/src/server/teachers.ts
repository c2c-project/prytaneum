'use server';

import { prisma } from '@local/core';

export type Teacher = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};

export async function getAllTeachers(): Promise<Teacher[]> {
    const teachers = await prisma.user.findMany({
        where: {
            role: 'TEACHER',
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
        },
    });

    return teachers;
}
