import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import { register } from './methods';

const server = getOrCreateServer();

server.route({
    method: 'POST',
    url: '/graphql/create-account',
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
