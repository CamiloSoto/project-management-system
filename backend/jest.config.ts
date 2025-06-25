import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    '\\.module\\.ts$',
    '\\.decorator\\.ts$',
    'main.ts',
  ],
};

export default config;
