var testRunnerConfig = {
  describe: 'Stylus Mixins',
  testDirPath: './test',
  stylus: {
    use: require('../lib/grid')(),
    import: '../index.styl'
  }
}

require('stylus-test-runner')(testRunnerConfig)
