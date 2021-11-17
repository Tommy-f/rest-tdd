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

// export default {
//   global: {
//     'ts-jest': {
//       moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
//       transform: {
//         '^.+\\.(ts|tsx|js)?$': 'ts-jest',
//       },
//       globals: {
//         'ts-jest': {
//           tsConfig: 'tsconfig.json',
//         },
//       },
//       testMatch: [
//         '**/?(*.)+(spec|test).ts?(x)',
//         '**/[a-zA-Z]+/**/*.test[s]?.(ts|js)',
//         '**/test[s]?/*.+(ts|tsx|js)',
//       ],
//     },
//   },
// };
