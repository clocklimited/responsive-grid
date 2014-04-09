var testRunnerConfig = {
  describe: 'Responsive Grid',
  testDirPath: './test',
  stylus: {
    use: require('../lib/responsive-grid')(),
    import: '../index.styl'
  }
}

require('stylus-test-runner')(testRunnerConfig)
