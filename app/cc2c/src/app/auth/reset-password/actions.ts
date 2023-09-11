'use server';

import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '@local/core';

export const updatePasswordWithToken = async (formData: FormData) => {
    try {
        const token = formData.get('token') as string | null;
        if (!token) throw new Error('Missing token');
        // Get other data from token
        const { email } = jwt.verify(token, process.env.JWT_SECRET as string) as { email?: string };
        if (!email) throw new Error('Invalid Token Data');
        // Set password
        const password = formData.get('password') as string | null;
        if (!password) throw new Error('Missing password field');
        const confirmPassword = formData.get('confirmPassword') as string | null;
        if (!confirmPassword) throw new Error('Missing confirmPassword field');
        if (password.length < 8) throw new Error('Password must be at least 8 characters long');
        if (password !== confirmPassword) throw new Error('Passwords do not match');
        await prisma.user.update({
            where: { email },
            data: { password: await bcrypt.hash(password, 10) },
        });
        return { isError: false, message: 'Password updated successfully' };
    } catch (error) {
        console.error(error);
        return { isError: true, message: error instanceof Error ? error.message : 'Unknown error occured' };
    }
};
