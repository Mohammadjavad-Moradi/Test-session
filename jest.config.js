module.exports = {
  // A map from regular expressions to paths to transformers

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testMatch: ['<rootDir>/**/*test.{js,jsx}'], // looks for your test

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  coverageProvider: 'v8',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    //"!src/**/*.test.{js,jsx}",
    "!src/utils/api.js",
    "!src/index.js",
    "!src/serviceWorker.js",
    "!src/setupTests.js",
    "!src/reportWebVitals.js"
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/mocks/',
    '/__tests__/',
    '/public/',
    '/Config/',
  ],
  // coverageReporters: ['text', 'json', 'html', 'lcov'],
  // setup coverage test case
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  passWithNoTests: true,
};
