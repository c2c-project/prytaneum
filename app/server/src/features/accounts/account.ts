import { fromGlobalId } from 'graphql-relay';

import { register, registerWithGoogleOAuth } from './methods';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient, getRedisClient } from '@local/core/utils';
import { sign } from '@local/lib/jwt';
import { createAndGetGoogleOAuthClient, getOrCreateGoogleOAuthClient } from '@local/core/utils/google-auth';
import { google } from 'googleapis';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '@local/features/utils';

const toUserId = toGlobalId('User');

const server = getOrCreateServer();

server.route({
    method: 'POST',
    url: '/api/create-account',
    handler: async (req, res) => {
        interface ExpectedBody {
            email: string;
            firstName: string;
            lastName: string;
        }
        const { email, firstName, lastName } = JSON.parse(req.body as string) as ExpectedBody;
        const prisma = getPrismaClient(server.log);
        try {
            const result = await register(prisma, { email, firstName, lastName });
            server.log.info(result);
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'POST');
            res.status(200).send('Successfully created account');
        } catch (error) {
            server.log.error(error);
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'POST');
            res.status(500).send('Error creating account');
        }
    },
});

server.route({
    method: 'POST',
    url: '/api/generate-invite-token',
    handler: async (req, res) => {
        interface ExpectedBody {
            email: string;
            eventId: string;
        }
        const { email, eventId } = JSON.parse(req.body as string) as ExpectedBody;
        const prisma = getPrismaClient(server.log);
        try {
            const user = await prisma.user.findFirst({ where: { email } });
            if (!user) throw new Error('User not found');
            const { id: globalEventId } = fromGlobalId(eventId);
            const event = await prisma.event.findUnique({ where: { id: globalEventId } });
            if (!event) throw new Error('Event not found');
            // Add this user to the invited list for this event
            try {
                await prisma.eventInvited.create({
                    data: {
                        user: { connect: { id: user.id } },
                        event: { connect: { id: globalEventId } },
                    },
                });
            } catch (error) {
                server.log.error(error);
            }
            const token = await sign({ email, eventId });
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'POST');
            res.status(200).send(JSON.stringify({ token }));
        } catch (error) {
            server.log.error(error);
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'POST');
            res.status(500).send('Error generating token');
        }
    },
});

server.route({
    method: 'GET',
    url: '/api/auth/redirect/google',
    handler: async (req, res) => {
        try {
            const { postAuthRedirectUrl } = req.query as { postAuthRedirectUrl: string };
            console.log('postAuthRedirectUrl', postAuthRedirectUrl);
            const googleAuthClient = createAndGetGoogleOAuthClient();
            const authorizationUri = googleAuthClient.generateAuthUrl({
                access_type: 'offline',
                prompt: 'consent',
                scope: ['profile', 'email'],
                state: JSON.stringify({
                    postAuthRedirectUrl: postAuthRedirectUrl || process.env.ORIGIN || 'http://localhost:8080',
                }),
            });
            res.redirect(authorizationUri);
        } catch (error) {
            res.code(500).send({ error: 'Could not generate authorization URI' });
        }
    },
});

// Callback routes for Google OAuth 2.0 authentication
// Saves the refresh token in the database
server.route({
    method: 'GET',
    url: '/api/auth/callback/google',
    handler: async (req, res) => {
        try {
            const {
                error,
                state: reqState,
                code,
            } = req.query as { error: string | undefined; state: string; code: string };

            if (error) {
                throw new Error(error);
            }

            const prisma = getPrismaClient(server.log);

            const googleAuthClient = getOrCreateGoogleOAuthClient();
            const tokenResponse = await googleAuthClient.getToken(code);
            const { tokens } = tokenResponse;
            googleAuthClient.setCredentials(tokens);

            const oauth2 = google.oauth2('v2');
            const userInfoResponse = await oauth2.userinfo.get({ auth: googleAuthClient });
            const userProfile = userInfoResponse.data;

            // Check if the user exists in your database; if not, register a new user.
            let user = await prisma.user.findUnique({ where: { email: userProfile.email! } });
            let token;
            if (!user) {
                server.log.info(`New user detected, registering new user with oauth email: ${userProfile.email}`);
                const result = await registerWithGoogleOAuth(prisma, {
                    email: userProfile.email!,
                    firstName: userProfile.given_name || 'First',
                    lastName: userProfile.family_name || 'Last',
                    picture: userProfile.picture || '',
                });
                token = result.token;
                user = result.user;
            } else {
                token = await jwt.sign({ id: toUserId(user).id });
                if (tokens.refresh_token) {
                    await prisma.user.update({
                        where: { id: user?.id },
                        data: { oAuthRefreshToken: tokens.refresh_token },
                    });
                } else {
                    googleAuthClient.on('tokens', async (_tokens) => {
                        if (_tokens.refresh_token) {
                            await prisma.user.update({
                                where: { id: user?.id },
                                data: { oAuthRefreshToken: _tokens.refresh_token },
                            });
                        }
                    });
                }
            }

            res.setCookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'lax', // Adjust based on your requirements
                path: '/', // Cookie is valid for the entire site
                maxAge: 60 * 60 * 24 * 30, // 30 days expiration
            });
            let redirectUrl = process.env.ORIGIN || 'http://localhost:8080';
            try {
                type State = { postAuthRedirectUrl: string };
                const { postAuthRedirectUrl } = JSON.parse(reqState) as State;
                redirectUrl = postAuthRedirectUrl;
            } catch (err) {
                server.log.error(err);
            }
            res.redirect(redirectUrl);
        } catch (error) {
            server.log.error(error);
            return res.code(500).send('Error authenticating');
        }
    },
});

server.route({
    method: 'GET',
    url: '/api/auth/callback/googleWithExistingUser',
    handler: async (req, res) => {
        try {
            const {
                error,
                state: reqState,
                code,
            } = req.query as { error: string | undefined; state: string; code: string };

            if (error) {
                server.log.error(error);
                throw new Error(error);
            }

            const redis = getRedisClient(server.log);
            const prisma = getPrismaClient(server.log);

            type State = { userId: string; postAuthRedirectUrl: string };
            const { userId, postAuthRedirectUrl } = JSON.parse(reqState) as State;

            const state = await redis.get(`${userId}-state`);
            if (!state) throw new Error('State not found in Redis');
            if (state !== reqState) throw new Error('State mismatch');

            const googleAuthClient = createAndGetGoogleOAuthClient();
            googleAuthClient.on('tokens', async (tokens) => {
                if (tokens.refresh_token) {
                    await prisma.user.update({
                        where: { id: userId },
                        data: { oAuthRefreshToken: tokens.refresh_token },
                    });
                }
            });
            await googleAuthClient.getToken(code);
            res.redirect(postAuthRedirectUrl);
        } catch (error) {
            server.log.error(error);
            return res.code(500).send('Error authenticating');
        }
    },
});
