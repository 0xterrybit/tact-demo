module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  snapshotSerializers: ["@tact-lang/ton-jest/serializers"],
  globalSetup: './jest.setup.js',
  globalTeardown: './jest.teardown.js',

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverage: true, // 启用覆盖率收集
  coverageDirectory: "./coverage", // 覆盖率报告输出目录
  coverageReporters: ["text", "html"], // 覆盖率报告格式

};