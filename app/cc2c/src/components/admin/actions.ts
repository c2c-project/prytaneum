'use server';

import { prisma } from '@local/core';
import { UsersTableSearchFilter } from './UsersTable';

export async function getAllUsers(ammount: number) {
    const users = await prisma.user.findMany({
        take: ammount + 1,
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
        },
    });

    const hasNextPage = users.length > ammount;

    return { users: hasNextPage ? users.slice(0, -2) : users, hasNextPage };
}

export async function hasNextPage(ammount: number, page: number, filter: UsersTableSearchFilter) {
    const users = await prisma.user.findMany({
        take: ammount,
        skip: page * ammount,
        where: {
            email: {
                contains: filter.email,
            },
            firstName: {
                contains: filter.firstName,
            },
            lastName: {
                contains: filter.lastName,
            },
        },
    });

    return users.length > 0;
}

export async function loadNextPage(ammount: number, page: number, filter: UsersTableSearchFilter) {
    const users = await prisma.user.findMany({
        take: ammount + 1,
        skip: page * ammount,
        where: {
            email: {
                contains: filter.email,
            },
            firstName: {
                contains: filter.firstName,
            },
            lastName: {
                contains: filter.lastName,
            },
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
        },
    });

    const hasNextPage = users.length > ammount;

    return { users: hasNextPage ? users.slice(0, -2) : users, hasNextPage };
}

export async function refresh(ammount: number, filter: UsersTableSearchFilter) {
    const users = await prisma.user.findMany({
        take: ammount + 1,
        where: {
            email: {
                contains: filter.email,
            },
            firstName: {
                contains: filter.firstName,
            },
            lastName: {
                contains: filter.lastName,
            },
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
        },
    });

    const hasNextPage = users.length > ammount;

    return { users: hasNextPage ? users.slice(0, -2) : users, hasNextPage };
}
