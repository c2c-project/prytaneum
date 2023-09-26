import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import mg from '@local/lib/email/client';
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

    // Verify env variables
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured');
    if (!process.env.MAILGUN_DOMAIN) throw new Error('MAILGUN_DOMAIN not configured');

    interface RecipiantVariables {
        [key: string]: { first: string; registrationLink: string };
    }
    const recipiantVariables: RecipiantVariables = {};
    const emails = [];

    // Create users and classes, then add users to classes
    for (const data of usersToRegister) {
        const { student_id, course_id, email, first_name, last_name, research_project_consent } = data;
        const lowerCaseEmail = email.toLowerCase().replace(/ /g, ''); // Remove spaces and make lowercase
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
                    email: lowerCaseEmail,
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

            // Create JWT token for user to complete registration and add to email list
            const payload = { userId: newUser.id };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            const registrationLink = `${process.env.ORIGIN_URL}/auth/complete-registration/?token=${token}`;

            recipiantVariables[lowerCaseEmail] = { first: first_name, registrationLink };
            emails.push(lowerCaseEmail);

            // Create prytaneum account for user as well
            const response = await fetch(`${process.env.PRYTANEUM_URL}/api/create-account`, {
                method: 'POST',
                body: JSON.stringify({ email: lowerCaseEmail, firstName: first_name, lastName: last_name }),
            });

            if (response.ok) console.log(`Successfully created Prytaneum account: ${lowerCaseEmail}`);
            else {
                console.error(response);
                throw new Error(`Error creating Prytaneum account: ${lowerCaseEmail}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    try {
        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `CC2C <${process.env.MAILGUN_FROM_EMAIL}>`,
            to: emails,
            'recipient-variables': JSON.stringify(recipiantVariables),
            subject: 'Welcome to the Connecting Classrooms to Congress project!',
            template: 'cc2c-complete-registration',
            'v:complete-registration-url': '%recipient.registrationLink%',
            'v:first-name': '%recipient.first%',
        });
    } catch (error) {
        console.error(error);
        return new NextResponse('Error sending emails', { status: 400 });
    }

    return new NextResponse('OK', { status: 200 });
}
