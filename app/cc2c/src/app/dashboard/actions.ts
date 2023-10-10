'use server';

import { prisma } from '@local/core';
import { revalidatePath } from 'next/cache';
import type { Class } from '@local/server';
import { UserWithToken } from '../api/auth/[...nextauth]/route';

export async function getAllClasses(): Promise<Class[]> {
    try {
        const classes = await prisma.class.findMany({
            select: { id: true, termId: true, name: true, prytaneumURL: true },
        });
        return classes;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getClassById(id: string): Promise<Class | null> {
    try {
        const _class = await prisma.class.findUnique({
            where: { id },
            select: { id: true, termId: true, name: true, prytaneumURL: true },
        });
        return _class;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createClass(formData: FormData): Promise<void> {
    try {
        const name = formData.get('name') as string | null;
        const termId = formData.get('termId') as string | null;
        if (!name || !termId) throw new Error('Missing required fields');
        await prisma.class.create({
            data: { name, termId, prytaneumURL: '' },
        });
        revalidatePath('/dashboard');
    } catch (error) {
        console.error(error);
    }
}

export async function getStudentData(user: UserWithToken) {
    try {
        const student = await prisma.student.findFirst({
            where: { userId: user.id },
            select: { preWriting: true, postWriting: true, classId: true, eventURL: true },
        });

        if (!student) throw new Error('Student not found');
        const { preWriting, postWriting } = student;

        const preWritingSubmitted = preWriting !== '';
        const postWritingSubmitted = postWriting !== '';

        if (student.eventURL === '') {
            const eventURL = await getEventLink(user, student.classId);
            await prisma.student.update({
                where: { userId_classId: { userId: user.id, classId: student.classId } },
                data: { eventURL },
            });
            return { preWritingSubmitted, postWritingSubmitted, classId: student.classId, eventURL };
        }

        return { preWritingSubmitted, postWritingSubmitted, classId: student.classId, eventURL: student.eventURL };
    } catch (error) {
        console.error(error);
        return { preWritingSubmitted: false, postWritingSubmitted: false, classId: '', eventURL: '' };
    }
}

export async function getEventLink(user: UserWithToken, classId: string) {
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
