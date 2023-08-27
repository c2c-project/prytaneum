import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

import { prisma } from '@local/core';
import type { RosterCSVData } from '@local/components';

/**
 * POST /api/upload/roster
 * Takes data parsed from a CSV file on Client.
 * Creates class if DNE
 * Creates user if DNE
 * Adds user to class as student
 */
export async function POST(request: NextRequest) {
    const data: FormData = await request.formData();
    const csvData = data.get('data');
    if (!csvData) return new NextResponse('No data', { status: 500 });

    const usersToRegister = JSON.parse(csvData as string) as RosterCSVData[];
    const cache: Record<string, string> = {};

    for (const data of usersToRegister) {
        const { student_id, course_id, email, first_name, last_name, research_project_consent } = data;
        try {
            let _class = { id: '' };

            // Check if class already exists in cache
            if (cache.hasOwnProperty(course_id)) {
                _class = { id: cache[course_id] };
            } else {
                // Not in cache, create new or fetch from DB
                _class = await prisma.class.upsert({
                    where: {
                        termId: course_id,
                    },
                    update: {},
                    create: {
                        termId: course_id,
                        name: '',
                    },
                    select: {
                        id: true,
                    },
                });
                cache[course_id] = _class.id;
            }

            // Create new user
            const newUser = await prisma.user.create({
                data: {
                    studentId: student_id,
                    email: email,
                    password: await bcrypt.hash('', 10),
                    firstName: first_name,
                    lastName: last_name,
                    researchProjectConsent: research_project_consent === 1 ? true : false,
                    shadowAccount: true,
                },
            });

            // Add new user to class as student
            await prisma.student.create({
                data: {
                    userId: newUser.id,
                    classId: _class.id,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    return new NextResponse('OK', { status: 200 });
}
