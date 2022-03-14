module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageProvider: 'v8',
  modulePathIgnorePatterns: ['.dist/', '.protocols', '.models'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*-protocols.ts', '!src/presentation/protocols/'],
};
