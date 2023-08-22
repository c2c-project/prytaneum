/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    env: {
        ORIGIN_URL: process.env.ORIGIN_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    webpack: (config) => {
        config.watchOptions = {
            poll: 5000,
            aggregateTimeout: 300,
        };
        return config;
    },
};

module.exports = nextConfig;
