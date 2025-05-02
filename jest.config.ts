export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
};