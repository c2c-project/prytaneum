import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@local/core';

type OperationType = 'writing' | 'pre-writing' | 'post-writing' | 'assignment';

export async function POST(request: NextRequest) {
    const data: FormData = await request.formData();
    const file = data.get('file') as File | null;

    if (!file) {
        return new NextResponse('No file', { status: 500 });
    }

    const type = data.get('type') as OperationType | null;
    if (!type) return new NextResponse('No type', { status: 500 });

    // Add bucket name to form data
    data.append('bucket', 'cc2c');

    // Send file to gcp microservice for upload
    const result = await fetch(`${process.env.GCP_SERVICE_URL || 'http://localhost:3002'}/cc2c/upload-file`, {
        method: 'POST',
        body: data,
    });

    const jsonData = (await result.json()) as { message: string; generatedFileName?: string };

    if (result.status !== 200 || jsonData.generatedFileName === undefined) {
        // Upload assumed unsuccessful, return error message & status
        return new NextResponse(jsonData.message, { status: result.status });
    }

    // Upload successful, store file name in database
    // prisma.assignment.create({
    //     data: {
    //         classId: data.classId,
    //         fileName: jsonData.generatedFileName,
    //     },
    // });

    return new NextResponse(jsonData.message, { status: 200 });
}
