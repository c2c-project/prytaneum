'use server';

import { prisma } from '@local/core';
import { revalidatePath } from 'next/cache';
import jwt from 'jsonwebtoken';

import mg from '@local/lib/email/client';

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

type UnregisteredStudent = {
    id: string;
    studentId: string;
    email: string;
    firstName: string;
};

export async function sendRegistrationEmails(formData: FormData) {
    try {
        const classId = formData.get('classId') as string | null;
        if (!classId) throw new Error('Class id not found');
        const unparsedStudents = formData.get('unregisteredStudents') as string | null;
        if (!unparsedStudents) throw new Error('No students found');
        const unregisteredStudents = JSON.parse(unparsedStudents) as UnregisteredStudent[];
        console.log('students', unregisteredStudents);
        // Verify env variables
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured');
        if (!process.env.MAILGUN_DOMAIN) throw new Error('MAILGUN_DOMAIN not configured');

        interface RecipiantVariables {
            [key: string]: { first: string; registrationLink: string };
        }
        const recipiantVariables: RecipiantVariables = {};
        const emails: string[] = [];

        unregisteredStudents.forEach((student) => {
            const { id, firstName, email } = student;
            const payload = { userId: id };
            const token = jwt.sign(payload, process.env.JWT_SECRET as string);
            const registrationLink = `${process.env.ORIGIN_URL}/auth/complete-registration/?token=${token}`;
            recipiantVariables[email] = { first: firstName, registrationLink };
            emails.push(email);
        });

        console.log(emails, recipiantVariables);

        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `CC2C <${process.env.MAILGUN_FROM_EMAIL}>`,
            to: emails,
            'recipient-variables': JSON.stringify(recipiantVariables),
            subject: 'Welcome to the Connecting Classrooms to Congress project!',
            template: 'cc2c-complete-registration',
            'v:complete-registration-url': '%recipient.registrationLink%',
            'v:first-name': '%recipient.first%',
        });

        revalidatePath(`/class/${classId}`);
        return { isError: false, message: '' };
    } catch (error) {
        console.error(error);
        return { isError: true, message: error instanceof Error ? error.message : 'Unknown error' };
    }
}
