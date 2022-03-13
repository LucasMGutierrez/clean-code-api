module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageProvider: 'v8',
  modulePathIgnorePatterns: ['.data/', '.dist/', '.src/presentation/protocols/'],
  collectCoverageFrom: ['src/**/*.ts'],
};
