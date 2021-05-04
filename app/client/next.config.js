module.exports = {
    async rewrites() {
        return [
            {
                source: '/graphql',
                destination: 'http://localhost:3002/graphql',
            },
        ];
    },
};
