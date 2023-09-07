import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  // setupFilesAfterEnv: [
  //   "<rootDir>/setupTests.ts"
  // ],
  testEnvironment: 'jsdom',
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  testMatch: ['<rootDir>/src/**/*.test.tsx', '<rootDir>/src/**/*.test.jsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

};

export default config;
