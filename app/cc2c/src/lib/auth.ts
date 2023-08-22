'use server';

import type { MutationResult } from '@local/core';
import type { UserWithoutPass } from '@local/app/api/auth/types';

export interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

export async function signUp(signUpFormData: SignUpFormData) {
    const res = await fetch(`${process.env.ORIGIN_URL || 'http://localhost:3000'}/api/auth/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: signUpFormData.name,
            email: signUpFormData.email,
            password: signUpFormData.password,
        }),
    });

    const parsedResult = (await res.json()) as MutationResult<UserWithoutPass | null>;

    return {
        res: parsedResult,
        user: parsedResult.body,
        isError: parsedResult.isError,
        errorMessage: parsedResult.message,
    };
}
