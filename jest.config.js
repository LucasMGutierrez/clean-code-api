module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageProvider: 'v8',
  modulePathIgnorePatterns: ['.dist/', '.protocols', '.domain'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*-protocols.ts',
    '!src/presentation/protocols/',
    '!<rootDir>/src/main/**',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
