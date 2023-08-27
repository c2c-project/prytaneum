'use server';

import { prisma } from '@local/core';

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

export async function getStudentsByClassId(classId: string): Promise<Student[]> {
    const students = await prisma.user.findMany({
        where: {
            studentOf: {
                some: {
                    classId,
                },
            },
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
