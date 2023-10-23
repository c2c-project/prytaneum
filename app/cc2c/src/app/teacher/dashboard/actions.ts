'use server';

import { prisma } from '@local/core';

export async function getClassesByTeacherId(userId: string) {
    const classes = await prisma.class.findMany({
        where: {
            teachers: {
                some: {
                    userId: {
                        equals: userId,
                    },
                },
            },
        },
        select: {
            id: true,
            name: true,
        },
    });

    return classes;
}
