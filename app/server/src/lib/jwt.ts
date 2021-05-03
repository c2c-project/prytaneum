import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret'; // TODO: env

export async function sign(payload: string | Buffer | Record<string, unknown>, options?: jwt.SignOptions) {
    return jwt.sign(payload, JWT_SECRET, options);
}

export async function verify(token: string, options?: jwt.VerifyOptions) {
    return jwt.verify(token, JWT_SECRET, options);
}
