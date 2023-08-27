'use server';

import type { MutationResult } from '@local/core';
import type { UserWithoutPass } from '@local/app/api/auth/types';

export interface TeacherSignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    authorizationCode: string;
}

export async function teacherSignUp(signUpFormData: TeacherSignUpFormData) {
    const res = await fetch(`${process.env.ORIGIN_URL || 'http://localhost:3000'}/api/auth/user/teacher`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: signUpFormData.firstName,
            lastName: signUpFormData.lastName,
            email: signUpFormData.email,
            password: signUpFormData.password,
            authorizationCode: signUpFormData.authorizationCode,
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

export interface StudentSignUpFormData {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    classId: string;
    consent: boolean;
}

export async function signUpStudent(signUpFormData: StudentSignUpFormData) {
    const res = await fetch(`${process.env.ORIGIN_URL || 'http://localhost:3000'}/api/auth/user/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            studentId: signUpFormData.studentId,
            firstName: signUpFormData.firstName,
            lastName: signUpFormData.lastName,
            email: signUpFormData.email,
            password: signUpFormData.password,
            classId: signUpFormData.classId,
            consent: signUpFormData.consent,
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
