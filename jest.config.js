module.exports = {
  // preset: ['ts-jest', '@shelf/jest-mongodb'],
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageProvider: 'v8',
  modulePathIgnorePatterns: ['.dist/', '.protocols', '.models'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*-protocols.ts', '!src/presentation/protocols/'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
