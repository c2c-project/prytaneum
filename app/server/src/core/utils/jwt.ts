import type { FastifyRequest } from 'fastify';
import { verify } from '@local/lib/jwt';

/**
 * Helper function for extracting the the authentication JWT from a `FastifyRequest`
 */
export async function extractAuthenticationJwt(req: FastifyRequest) {
    if (req.cookies.jwt) {
        const decodedJwt = await verify(req.cookies.jwt);
        return (decodedJwt as { id: string }).id;
    }
    if (req.headers.authorization) {
        // Will be a string like "Bearer <jwt token here>", w/ split on a space it will be ['Bearer", <jwt here>]
        const [, jwt] = req.headers.authorization.split(' ');
        const decodedJwt = await verify(jwt);
        return (decodedJwt as { id: string }).id;
    }
    return null;
}
