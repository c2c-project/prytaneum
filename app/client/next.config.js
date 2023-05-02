module.exports = {
    webpack5: true,
    images: {
        domains: ['storage.googleapis.com'],
        minimumCacheTTL: 31536000,
        unoptimized: true, // To fix memory leak issue | REF: https://github.com/vercel/next.js/issues/44685
    },
    typescript: {
        tsconfigPath: './tsconfig.prod.json',
    },
};
