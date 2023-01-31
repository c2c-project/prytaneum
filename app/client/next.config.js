module.exports = {
    webpack5: true,
    images: {
        domains: ['storage.googleapis.com'],
        minimumCacheTTL: 31536000,
    },
    typescript: {
        tsconfigPath: './tsconfig.prod.json'
    }
};
