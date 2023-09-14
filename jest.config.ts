const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run

  testPathIgnorePatterns: ["__tests__/__fixtures__"],

  projects: [
    {
      preset: "ts-jest",
      displayName: "bff",
      testEnvironment: "node",
      testMatch: [
        "<rootDir>/__tests__/unit/api/**/*.test.ts",
        "<rootDir>/__tests__/unit/apiService/**/*.test.ts",
      ],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
    {
      preset: "ts-jest",
      displayName: "ui",
      testEnvironment: "jest-environment-jsdom",
      testMatch: ["<rootDir>/__tests__/unit/ui/**/*.test.tsx"],
      //setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      globals: {
        "ts-jest": {
          tsconfig: "tsconfig.test.json",
        },
      },
    },
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
