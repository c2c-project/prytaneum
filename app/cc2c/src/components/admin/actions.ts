'use server';

import { prisma } from '@local/core';
import type { UsersTableSearchFilter } from './UsersTable';
import type { ClassesTableSearchFilter } from './ClassesTable';

export async function getAllUsers(ammount: number) {
    try {
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
    } catch (error) {
        console.error(error);
        return { users: [], hasNextPage: false };
    }
}

export async function hasNextPageUsers(ammount: number, page: number, filter: UsersTableSearchFilter) {
    try {
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
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function loadNextPageUsers(ammount: number, page: number, filter: UsersTableSearchFilter) {
    try {
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
    } catch (error) {
        console.error(error);
        return { users: [], hasNextPage: false };
    }
}

export async function refreshUsers(ammount: number, filter: UsersTableSearchFilter) {
    try {
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
    } catch (error) {
        console.error(error);
        return { users: [], hasNextPage: false };
    }
}

export async function getAllClasses(ammount: number) {
    try {
        const classes = await prisma.class.findMany({
            take: ammount + 1,
            select: {
                id: true,
                termId: true,
                name: true,
            },
        });
        const hasNextPage = classes.length > ammount;

        return { classes: hasNextPage ? classes.slice(0, -2) : classes, hasNextPage };
    } catch (error) {
        console.error(error);
        return { classes: [], hasNextPage: false };
    }
}

export async function hasNextPageClasses(ammount: number, page: number, filter: ClassesTableSearchFilter) {
    try {
        const classes = await prisma.class.findMany({
            take: ammount,
            skip: page * ammount,
            where: {
                termId: {
                    contains: filter.termId,
                },
                name: {
                    contains: filter.name,
                },
            },
        });

        return classes.length > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function loadNextPageClasses(ammount: number, page: number, filter: ClassesTableSearchFilter) {
    try {
        const classes = await prisma.class.findMany({
            take: ammount + 1,
            skip: page * ammount,
            where: {
                termId: {
                    contains: filter.termId,
                },
                name: {
                    contains: filter.name,
                },
            },
            select: {
                id: true,
                termId: true,
                name: true,
            },
        });

        const hasNextPage = classes.length > ammount;

        return { classes: hasNextPage ? classes.slice(0, -2) : classes, hasNextPage };
    } catch (error) {
        console.error(error);
        return { classes: [], hasNextPage: false };
    }
}

export async function refreshClasses(ammount: number, filter: ClassesTableSearchFilter) {
    try {
        const classes = await prisma.class.findMany({
            take: ammount + 1,
            where: {
                termId: {
                    contains: filter.termId,
                },
                name: {
                    contains: filter.name,
                },
            },
            select: {
                id: true,
                termId: true,
                name: true,
            },
        });

        const hasNextPage = classes.length > ammount;

        return { classes: hasNextPage ? classes.slice(0, -2) : classes, hasNextPage };
    } catch (error) {
        console.error(error);
        return { classes: [], hasNextPage: false };
    }
}
