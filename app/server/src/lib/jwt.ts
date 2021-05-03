import jwt from 'jsonwebtoken';

export async function sign(payload: string | Buffer | Record<string, unknown>, options?: jwt.SignOptions) {
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export async function verify(token: string, options?: jwt.VerifyOptions) {
    return jwt.verify(token, process.env.JWT_SECRET, options);
}
