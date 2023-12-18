'use server';

import { prisma } from '@local/core';

export const handlePreWritingSubmit = async (formData: FormData) => {
    try {
        const userId = formData.get('userId') as string | null;
        if (!userId) throw new Error('Missing User ID');
        const classId = formData.get('classId') as string | null;
        if (!classId) throw new Error('Missing Class ID');
        const preWriting = formData.get('preWriting') as string | null;
        if (!preWriting) throw new Error('No pre-writing found');

        await prisma.student.update({
            where: { userId_classId: { userId: userId as string, classId: classId as string } },
            data: { preWriting: preWriting as string, preWritingSubmissionTime: new Date() },
        });

        return { isError: false, message: '' };
    } catch (err) {
        console.error(err);
        return { isError: true, message: 'Error uploading pre-writing' };
    }
};

export const handlePostWritingSubmit = async (formData: FormData) => {
    try {
        const userId = formData.get('userId') as string | null;
        if (!userId) throw new Error('Missing User ID');
        const classId = formData.get('classId') as string | null;
        if (!classId) throw new Error('Missing Class ID');
        const postWriting = formData.get('postWriting') as string | null;
        if (!postWriting) throw new Error('No post-writing found');

        await prisma.student.update({
            where: { userId_classId: { userId: userId as string, classId: classId as string } },
            data: { postWriting: postWriting as string, postWritingSubmissionTime: new Date() },
        });

        return { isError: false, message: '' };
    } catch (err) {
        console.error(err);
        return { isError: true, message: 'Error uploading post-writing' };
    }
};
