/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
    ],
    coverageProvider: 'v8',
    preset: 'ts-jest',
    rootDir: 'src/',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/unit/**/*.spec.(js|ts)'],
    transform: {
        '^.+\\.(js|ts)$': 'ts-jest',
    },
};
