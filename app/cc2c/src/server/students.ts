'use server';

import { prisma } from '@local/core';
import { revalidatePath } from 'next/cache';

export type Student = {
    id: string;
    studentId: string;
    email: string;
    firstName: string;
    lastName: string;
    researchProjectConsent: boolean;
    shadowAccount: boolean;
};

export async function getAllStudents(): Promise<Student[]> {
    const students = await prisma.user.findMany({
        where: {
            role: 'STUDENT',
        },
        select: {
            id: true,
            studentId: true,
            email: true,
            firstName: true,
            lastName: true,
            researchProjectConsent: true,
            shadowAccount: true,
        },
    });

    return students;
}

export async function getStudentById(studentId: string): Promise<Student | null> {
    const student = await prisma.user.findUnique({
        where: {
            id: studentId,
        },
        select: {
            id: true,
            studentId: true,
            email: true,
            firstName: true,
            lastName: true,
            researchProjectConsent: true,
            shadowAccount: true,
        },
    });

    return student;
}

export async function getStudentsByClassId(classId: string) {
    const students = await prisma.student.findMany({
        where: { classId },
        select: {
            userId: true,
            preWriting: true,
            postWriting: true,
            user: {
                select: {
                    studentId: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    researchProjectConsent: true,
                    shadowAccount: true,
                },
            },
        },
        orderBy: {
            user: {
                studentId: 'asc',
            },
        },
    });

    return students;
}

export async function updateStudentData(formData: FormData, resetPreWriting = false, resetPostWriting = false) {
    try {
        const studentId = formData.get('studentId') as string | null;
        if (!studentId) throw new Error('Student id not found');
        const classId = formData.get('classId') as string | null;
        if (!classId) throw new Error('Class id not found');

        if (resetPreWriting && resetPostWriting) {
            await prisma.student.updateMany({
                where: { userId: studentId },
                data: { preWriting: '', postWriting: '' },
            });
        } else if (resetPreWriting) {
            await prisma.student.updateMany({
                where: { userId: studentId },
                data: { preWriting: '' },
            });
        } else if (resetPostWriting) {
            await prisma.student.updateMany({
                where: { userId: studentId },
                data: { postWriting: '' },
            });
        }

        revalidatePath(`/class/${classId}`);
        return { isError: false, message: '' };
    } catch (error) {
        console.error(error);
        return { isError: true, message: error instanceof Error ? error.message : 'Unknown error' };
    }
}
