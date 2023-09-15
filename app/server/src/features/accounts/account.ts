import { fromGlobalId } from 'graphql-relay';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import { register } from './methods';
import { sign } from '@local/lib/jwt';

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
        const { email, firstName, lastName } = req.body as ExpectedBody;
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
        const { email, eventId } = req.body as ExpectedBody;
        const prisma = getPrismaClient(server.log);
        try {
            const user = await prisma.user.findFirst({ where: { email } });
            if (!user) throw new Error('User not found');
            const { id: globalEventId } = fromGlobalId(eventId);
            const event = await prisma.event.findUnique({ where: { id: globalEventId } });
            if (!event) throw new Error('Event not found');
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
