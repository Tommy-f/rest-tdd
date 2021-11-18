module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here
    },
  },
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/common/$1',
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    'interfaces',
    'jestGlobalMocks.ts',
    '.module.ts',
    '<rootDir>/src/app.ts',
    '.mock.ts',
    '<rootDir>/dist/',
  ],
};
