'use server';

import { prisma } from '@local/core';

export async function getClassByTeacherId(userId: string) {
    const _class = await prisma.class.findFirst({
        where: {
            teachers: {
                some: {
                    userId: {
                        equals: userId,
                    },
                },
            },
        },
    });

    return _class?.id || '';
}
