module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    modulePaths: ['src', '.yarn'],
    moduleNameMapper: {
        '^@local(.*)$': '<rootDir>/src$1',
    },
    setupFiles: ['dotenv/config'],
    coveragePathIgnorePatterns: ['<rootDir>/src/__generated__/prisma/', '<rootDir>/build/'],
};
