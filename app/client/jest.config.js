module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    modulePaths: ['src', '.yarn'],
    moduleNameMapper: {
        '^@local/(.*)$': '<rootDir>/src/$1',
    },
    globals: {
        'ts-jest': {
            tsconfig: {
                jsx: 'react-jsx',
            },
        },
    },
};
