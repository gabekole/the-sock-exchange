module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.setupTextEncoder.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    }
};