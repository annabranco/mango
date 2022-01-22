module.exports = async () => {
  return {
    coverageDirectory: "coverage/jest-coverage",
    verbose: true,
    collectCoverageFrom: [
      "**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/*.test.js",
      "!**/coverage/**",
      "!**/dist/**",
      "!**/src/config/**",
      "!**/index.js",
      "!**/*.config.js",
    ],
    setupFiles: ["<rootDir>/src/config/jest-setup.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    modulePaths: ["<rootDir>/src"],
    moduleNameMapper: {
      "src/(.*)": "<rootDir>/src/$1",
    },
    roots: ["<rootDir>/src"],
    moduleDirectories: ["node_modules", "src"],
    projects: [
      {
        displayName: "backend",
        testEnvironment: "node",
        testMatch: ["<rootDir>/api-dev/**/*.test.js"],
      },
      {
        displayName: "frontend",
        testEnvironment: "jsdom",
        testMatch: ["<rootDir>/src/**/*.test.js"],
      },
    ],
  };
};
