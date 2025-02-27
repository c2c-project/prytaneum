import { fromGlobalId } from 'graphql-relay';

import { register } from './methods';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient, getRedisClient } from '@local/core/utils';
import { sign } from '@local/lib/jwt';
import { createAndGetGoogleOAuthClient } from '@local/core/utils/google-auth';

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
            const user = await prisma.user.findFirst({ where: { email: email.toLowerCase() } });
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

// Callback route for Google OAuth 2.0 authentication
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
            return res.status(500).send('Error authenticating');
        }
    },
});
