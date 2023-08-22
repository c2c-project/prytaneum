'use server';

import { prisma } from '@local/core';
import { revalidatePath } from 'next/cache';

export async function promoteToTeacher(userId: string, path: string) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role: 'TEACHER' },
        });
        revalidatePath(path);
    } catch (error) {
        console.error(error);
    }
}

export async function promoteToAdmin(userId: string, path: string) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role: 'ADMIN' },
        });
        revalidatePath(path);
    } catch (error) {
        console.error(error);
    }
}

export async function makeTeacherOfClass(userId: string, classId: string, path: string) {
    try {
        await prisma.teacher.create({
            data: {
                userId,
                classId,
            },
        });
        revalidatePath(path);
    } catch (error) {
        console.error(error);
    }
}

export async function makeStudentOfClass(userId: string, classId: string, path: string) {
    try {
        await prisma.student.create({
            data: {
                userId,
                classId,
            },
        });
        revalidatePath(path);
    } catch (error) {
        console.error(error);
    }
}
