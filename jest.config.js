module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/components/**/**/*.ts(x)", "<rootDir>/pages/*.ts(x)", "<rootDir>/hooks/**/**/*.ts(x)"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
};
