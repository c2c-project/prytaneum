'use server';

import { prisma } from '@local/core';
import { revalidatePath } from 'next/cache';

export type Class = {
    id: string;
    termId: string;
    name: string;
};

export async function getAllClasses(): Promise<Class[]> {
    try {
        const classes = await prisma.class.findMany({
            select: { id: true, termId: true, name: true },
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
            select: { id: true, termId: true, name: true },
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
            data: { name, termId },
        });
        revalidatePath('/dashboard');
    } catch (error) {
        console.error(error);
    }
}
