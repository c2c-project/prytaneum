import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { UserWithoutPass } from '@local/app/api/auth/types';
import type { MutationResult } from '@local/core';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials) throw new Error('No credentials');

                const res = await fetch(`${process.env.ORIGIN_URL || 'http://localhost:3000'}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                type UserWithToken = UserWithoutPass & { accessToken: string };
                // const user = (await res.json()) as (UserWithoutPass & { accessToken: string }) | null;
                const parsedResult = (await res.json()) as MutationResult<UserWithToken>;
                if (parsedResult.isError) {
                    console.error(parsedResult.message);
                    return null;
                }

                const user = parsedResult.body;

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
