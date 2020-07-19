module.exports = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest',
  runner: '@jest-runner/electron/main',
  testEnvironment: 'node',
};