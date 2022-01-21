module.exports = async () => {
  return {
    verbose: true,
    collectCoverageFrom: [
      "**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/*.test.js",
      "!**/coverage/**",
      "!**/index.js",
    ],
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
