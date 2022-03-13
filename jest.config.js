module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageProvider: 'v8',
  modulePathIgnorePatterns: ['.dist/', '.src/presentation/protocols/'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*-protocols.ts', '!src/presentation/protocols/'],
};
