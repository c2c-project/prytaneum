export function checkEnv() {
    if (!process.env.NODE_ENV) throw new Error('Must define NODE_ENV');
    if (process.env.NODE_ENV === 'production') {
        if (!process.env.COOKIE_SECRET) throw new Error('Must define COOKIE_SECRET in production');
        if (!process.env.JWT_SECRET) throw new Error('Must define JWT_SECRET in production');
        if (!process.env.SERVER_PORT) throw new Error('Must define PORT in production');
        if (!process.env.HOST) throw new Error('Must define HOST in production');
        if (!process.env.GCP_PROJECT_ID) throw new Error('Must define GCP_PROJECT_ID in production');
    }
}
