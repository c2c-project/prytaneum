'use server';

import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '@local/core';
import { redirect } from 'next/navigation';

export const updatePasswordWithToken = async (formData: FormData) => {
    try {
        const token = formData.get('token') as string | null;
        if (!token) throw new Error('Missing token');
        // Get other data from token
        const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        console.log(userId);
        // Set password
        const password = formData.get('password') as string | null;
        if (!password) throw new Error('Missing password field');
        const confirmPassword = formData.get('confirmPassword') as string | null;
        if (!confirmPassword) throw new Error('Missing confirmPassword field');
        if (password !== confirmPassword) throw new Error('Passwords do not match');
        await prisma.user.update({
            where: { id: userId },
            data: { password: await bcrypt.hash(password, 10) },
        });
        redirect('/auth/signin');
    } catch (error) {
        console.error(error);
        return { isError: true, message: error instanceof Error ? error.message : 'Unknown error occured' };
    }
};
