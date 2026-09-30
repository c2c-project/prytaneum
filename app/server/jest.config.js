module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: '<rootDir>/custom-jest-environment.js',
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    modulePaths: ['src', '.yarn'],
    moduleNameMapper: {
        '^@local(.*)$': '<rootDir>/src$1',
        '^axios$': require.resolve('axios'),
    },
    setupFiles: ['dotenv/config'],
    coveragePathIgnorePatterns: ['<rootDir>/src/__generated__/prisma/', '<rootDir>/build/', '<rootDir>/prisma/'],
    testPathIgnorePatterns: ['<rootDir>/prisma/'],
};
