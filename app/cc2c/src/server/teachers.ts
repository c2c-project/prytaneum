'use server';

import { prisma } from '@local/core';
import type { UserWithoutPass } from '@local/app/api/auth/types';

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

export async function getTeacherUrl(classId: string, user: UserWithoutPass) {
    const teacher = await prisma.teacher.findUnique({
        where: { userId_classId: { userId: user.id, classId } },
        select: {
            eventURL: true,
        },
    });

    if (teacher?.eventURL === '') {
        const url = await getEventLink(user, classId);
        await prisma.teacher.update({
            where: { userId_classId: { userId: user.id, classId } },
            data: { eventURL: url },
        });
        return url;
    }

    return teacher?.eventURL || '';
}

export async function getEventLink(user: UserWithoutPass, classId: string) {
    try {
        const classData = await prisma.class.findUnique({
            where: { id: classId },
            select: { prytaneumURL: true },
        });
        if (!classData) throw new Error('Class not found');
        const { prytaneumURL } = classData;
        if (prytaneumURL === '') throw new Error('Prytaneum URL not set yet');
        const url = new URL(prytaneumURL);
        const eventId = url.pathname.split('/')[2];

        if (!process.env.PRYTANEUM_URL) throw new Error('Prytaneum URL ENV not set');
        // Get token from prytaneum
        const result = await fetch(`${process.env.PRYTANEUM_URL}/api/generate-invite-token`, {
            method: 'POST',
            body: JSON.stringify({ email: user.email.toLowerCase(), eventId }),
        });
        console.log(result);

        if (!result.ok) throw new Error('Failed to generate token');
        const { token } = await result.json();

        return `${prytaneumURL}/?token=${token}`;
    } catch (error) {
        console.error(error);
        return '';
    }
}
